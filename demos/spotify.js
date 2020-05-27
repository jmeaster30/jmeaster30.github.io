//get css colors
var entry_border_up;
var entry_border_down;
var entry_bg_up;
var entry_bg_down;
$(document).ready(function(){
  var style = getComputedStyle(document.body);
  entry_border_up = style.getPropertyValue("--entry-border-color-up");
  entry_border_down = style.getPropertyValue("--entry-border-color-down");
  entry_bg_up = style.getPropertyValue("--entry-bg-color-up");
  entry_bg_down = style.getPropertyValue("--entry-bg-color-down");
});

//number of results spotify gives back
let num_results = 15;

let num_of_images = 2;

//clinton picture variables
let clinton_width = 1076; //main pic width in pixels
let clinton_height = 1356; //main pic height in pixels
let clinton_scale = 0.5;
let clinton_file = "https://cdn.kapwing.com/video_image-vb_12UTqn.png";

let clinton_boundaries = {"hands": new Quad(new Point(236, 473), //top left
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
                        };

//obama picture variables
let obama_width = 1440;
let obama_height = 1738;
let obama_scale = 0.4;
let obama_file = "https://i.ibb.co/72FLkB7/obama.png";

let obama_boundaries = {"obama": new Quad(new Point(249, 1038),
                                          new Point(1031, 1007),
                                          new Point(277, 1760),
                                          new Point(1079, 1737))};



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
                    .addClass("result_entry")
                    .attr("onclick", "setImage(\"" + album_entry.images[0].url + "\")");

      var album_pic = $("<img>")
                         .attr("src", album_entry.images[album_entry.images.length - 1].url);
      node.append($("<div></div>").addClass("album_pic").append(album_pic));

      var sub_div = $("<div></div>").addClass("album_artist");
      
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
      
      node
        .mousedown(function(){
          $( this ).css("border-style", "inset");
          $( this ).css("border-color", entry_border_down);
          $( this ).css("background-color", entry_bg_down);
        })
        .mouseup(function(){
          $( this ).css("border-style", "outset");
          $( this ).css("border-color", entry_border_up);
          $( this ).css("background-color", entry_bg_up);
        });

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
  var r = floor(random(num_of_images));

  if(r == 0)
  {
    //Load in the clinton image
    the_img = loadImage(clinton_file, function(){
      console.log("Image loaded successfully.");
    }, function(event){
      console.log("Image failed to load.");
      console.log(event);
    });
    img_width = clinton_width;
    img_height = clinton_height;
    img_scale = clinton_scale;
    img_boundaries = clinton_boundaries;
  }
  else if(r == 1)
  {
    the_img = loadImage(obama_file, function(){
      console.log("Obama loaded successfully.");
    }, function(event){
      console.log("obama failed to load.");
      console.log(event);
    });
    img_width = obama_width;
    img_height = obama_height;
    img_scale = obama_scale;
    img_boundaries = obama_boundaries;
  }
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
