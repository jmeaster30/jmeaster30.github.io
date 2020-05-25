let clinton_width = 1076; //main pic width in pixels
let clinton_height = 1356; //main pic height in pixels
let clinton_scale = 0.5;
let clinton_file = "https://cdn.kapwing.com/video_image-vb_12UTqn.png";

let album_boundaries = [new Quad(new Point(236, 473), //top left
                                 new Point(615, 591), //top right
                                 new Point(133, 827), //bottom left
                                 new Point(488, 956))  //bottom right
                       ];

/*
 *  DO NOT EDIT ANYTHING BELOW THIS COMMENT UNLESS YOU KNOW WHAT YOU ARE DOING
 */

var clinton_img;
var albums = [];

var auth_token = null;
var auth_status = "";

function get_auth()
{  
  console.log("Sending Spotify Auth Request.");
  var client_auth_cred = "ZjAxYjlmMTJiMDk2NGYzYmJiY2E3YzE3YzQxN2RlYjE6NTU0MjEzNTlkYzRkNGM2NWFlMmFjMTJmNzlmMzA1MjQ=";
  
  const Http = new XMLHttpRequest();
  const url='https://accounts.spotify.com/api/token';
  
  Http.open("POST", url);
  
  //set headers
  Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  Http.setRequestHeader("Authorization", "Basic " + client_auth_cred);
  
  Http.send("grant_type=client_credentials");
  auth_status = "WAITING";
  
  Http.onreadystatechange = (e)=>{
    if(Http.status == 200)
    {
      var json_response = JSON.parse(Http.responseText);
      if(json_response){
        console.log("Auth Successful");
        auth_token = json_response.token_type + " " + json_response.access_token;
        auth_status = "SUCCESS";
      } else {
        console.log("JSON parse error");
        auth_token = null;
        auth_status = "ERROR";
      }
    }
    else
    {
      console.log("Request error code: " + Http.status);
      auth_token = null;
      auth_status = "ERROR";
    }
  }
}

function auth_wait()
{
  if(auth_status === "WAITING")
  {
    setTimeout(auth_wait(), 100);
  }
}

//search functions
function search()
{
  //get search_term
  search_term = document.getElementById('search_term').value;
  
  if(auth_token == null){
    get_auth();
    auth_wait();
  }
  
  //fix search term
  fixed_search = '?q=' + search_term.replace(/\s/g, '%20') + '&type=album&limit=10';
  
  //query spotify
  const Http = new XMLHttpRequest();
  const url='https://api.spotify.com/v1/search' + fixed_search;
  
  Http.open("GET", url);
  
  //set headers
  Http.setRequestHeader("Authorization", auth_token);
  
  Http.send();
  
  Http.onreadystatechange = (e)=>{
    if(Http.status == 200)
    {
      build_results(Http.responseText);
    }
    else
    {
      console.log("Request error code: " + Http.status);
    }
  }
}

function build_results(search_results)
{
  var json_results = JSON.parse(search_results);
  if(json_results)
  {
    var album_results = json_results.albums.items;
    document.getElementById('results').innerHTML = "";
    album_results.forEach((album_entry)=>{
      var node = document.createElement("div");
      node.setAttribute("onclick", "setImage(\"" + album_entry.images[0].url + "\")");
      var album_pic = document.createElement("img")
      album_pic.setAttribute("src", album_entry.images[album_entry.images.length - 1].url);
      node.appendChild(album_pic);
      var album_name = document.createTextNode(album_entry.name + ": ");
      node.appendChild(album_name);
      var artists = "";
      album_entry.artists.forEach((artist)=>{
        if(artists === ""){
          artists = artist.name;
        } else {
          artists = artists + ", " + artist.name;
        }
      });
      node.appendChild(document.createTextNode(artists));
      document.getElementById('results').appendChild(node);
    });
  }
  else
  {
    console.log("Error parsing json");
  }
}

function setImage(url)
{
  //get number of boundary to put it in
  var s = document.getElementById('selection');
  var album_idx = parseInt(s.options[s.selectedIndex].value) - 1;
  
  loadImage(url, (img)=>{
    //console.log(album_idx);
    albums[album_idx].setImage(img);
  }, (e)=>{
    console.log("Error when loading image: " + url);
  });
}

//p5js functions
function preload()
{
  //Load in the clinton image
  clinton_img = loadImage(clinton_file, function(){
    console.log("Image loaded successfully.");
  }, function(event){
    console.log("Image failed to load.");
    console.log(event);
  });
}

function setup() {
  var canvas = createCanvas(clinton_width * clinton_scale, clinton_height * clinton_scale, WEBGL);
  canvas.parent("clinton-container");
  colorMode(HSB, 100);
  get_auth();
  
  album_boundaries.forEach((boundary)=>{
    albums.push(new Album(boundary));
  });
  
  //build select box
  for(var i = 0; i < album_boundaries.length; i++)
  {
    var option = document.createElement('option');
    option.innerHTML = i + 1;
    option.setAttribute("value", i + 1);
    document.getElementById('selection').appendChild(option);
  }
}

function draw() {
  background(color(100 * noise(frameCount / 30), 100, 100));
  translate(-width / 2, -height / 2);
  albums.forEach((album, idx)=>{
    album.draw(clinton_scale);
  });
  
  image(clinton_img, 0, 0, clinton_width * clinton_scale, clinton_height * clinton_scale);
}
