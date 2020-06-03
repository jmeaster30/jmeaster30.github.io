//number of results spotify gives back
let num_results = 15;

let pics = [
//clinton picture variables
{
  "width": 1076, //main pic width in pixels
  "height": 1356, //main pic height in pixels
  "scale": 0.5,
  "file": "imgs/clinton.png",
  "boundaries": {"hands": new Quad(new Point(236, 473), //top left
                                   new Point(615, 591), //top right
                                   new Point(133, 827), //bottom left
                                   new Point(488, 956)),  //bottom right
                  "wall": new Quad(new Point(852, 623),
                                   new Point(1131, 701),
                                   new Point(776, 931),
                                   new Point(1025, 1040)),
                  "floor left": new Quad(new Point(265, 1129),
                                         new Point(621, 1212),
                                         new Point(45, 1354),
                                         new Point(471, 1460)),
                  "floor right": new Quad(new Point(629, 1138),
                                          new Point(1024, 1128),
                                          new Point(642, 1378),
                                          new Point(1138, 1359))
                }
},
//obama picture variables
{
  "width": 1440,
  "height": 1738,
  "scale": 0.4,
  "file": "imgs/obama.png",
  "boundaries": {"obama": new Quad(new Point(249, 1038),
                                   new Point(1031, 1007),
                                   new Point(277, 1760),
                                   new Point(1079, 1737))
                }
}
];  //end of pictures array


/*
 *  DO NOT EDIT ANYTHING BELOW THIS COMMENT UNLESS YOU KNOW WHAT YOU ARE DOING
 */

var the_img;
var img_width;
var img_height;
var img_scale;
var img_boundaries;
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
  var search_term = $("#search_term").val();
  
  if(auth_token == null){
    get_auth();
    auth_wait();
  }
  
  //fix search term
  var fixed_search = '?q=' + search_term.replace(/\s/g, '%20') + '&type=album&limit=' + num_results;
  
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
    $("#results").empty();
    
    album_results.forEach((album_entry)=>{
      var node = $("<div></div>")
                    .addClass("row")
                    .attr("onclick", "setImage(\"" + album_entry.images[0].url + "\")");

      var album_pic = $("<img>")
                         .attr("src", album_entry.images[album_entry.images.length - 1].url);
      node.append($("<div></div>").addClass("col").append(album_pic));

      var sub_div = $("<div></div>").addClass("col");
      
      var album_name = $("<h4></h4>")
                          .addClass("album_name")
                          .text(album_entry.name);
      sub_div.append(album_name);
      
      var artists = "";
      album_entry.artists.forEach((artist)=>{
        if(artists === ""){
          artists = artist.name;
        } else {
          artists = artists + ", " + artist.name;
        }
      });
      sub_div.append($("<p></p>")
                        .addClass("artist_name")
                        .text(artists));

      node.append(sub_div);

      $("#results").append(node);
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
  var selected = $("#selection").children("option:selected").val();
  var album_idx = parseInt(selected);
  
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
  //pick random number
  var r = floor(random(pics.length));

  //Load in the clinton image
  the_img = loadImage(pics[r].file, function(){
    console.log("Image loaded successfully.");
  }, function(event){
    console.log("Image failed to load.");
    console.log(event);
  });
  
  img_width = pics[r].width;
  img_height = pics[r].height;
  img_scale = pics[r].scale;
  img_boundaries = pics[r].boundaries;
}

function setup() {
  var canvas = createCanvas(img_width * img_scale, img_height * img_scale, WEBGL);
  canvas.parent("img-container");
  colorMode(HSB, 100);
  get_auth();
  
  //set boundaries and create selections
  var i = 0;
  $.each(img_boundaries, (name, boundary)=>{
    albums.push(new Album(boundary));
    
    var option = document.createElement('option');
    option.innerHTML = name;
    option.setAttribute("value", i);
    $('#selection').append(option);
    i += 1;
  });
}

function draw() {
  background(color(100 * noise(frameCount / 30), 100, 100));
  translate(-width / 2, -height / 2);
  albums.forEach((album, idx)=>{
    album.draw(img_scale);
  });
  
  image(the_img, 0, 0, img_width * img_scale, img_height * img_scale);
}
