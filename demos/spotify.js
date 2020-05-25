page_script = {}
page_script = {
  "album_limit": 10,
  "clinton_width": 1076, //main pic width in pixels
  "clinton_height": 1356, //main pic height in pixels
  "clinton_scale": 0.5,
  "clinton_file": "https://cdn.kapwing.com/video_image-vb_12UTqn.png",

  "album_boundaries": [new page_script.Quad(new page_script.Point(236, 473), //top left
                                            new page_script.Point(615, 591), //top right
                                            new page_script.Point(133, 827), //bottom left
                                            new page_script.Point(488, 956))  //bottom right
                      ],

/*
 *  DO NOT EDIT ANYTHING BELOW THIS COMMENT UNLESS YOU KNOW WHAT YOU ARE DOING
 */

  "Point": function(x, y)
    {
      this.x = x;
      this.y = y;
    },
  "Quad": function(top_left, top_right, bottom_left, bottom_right)
    {
      this.top_left = top_left;
      this.top_right = top_right;
      this.bottom_left = bottom_left;
      this.bottom_right = bottom_right;
    },
  "Album": function(bounding_quad, image)
    {
      this.b_quad = bounding_quad;
      if(image){
        this.image = image;
      } else {
        this.backup = createImage(2, 2);
        this.backup.set(0, 0, color(255, 0, 0));
        this.backup.set(0, 1, color(0, 0, 255));
        this.backup.set(1, 1, color(255, 0, 0));
        this.backup.set(1, 0, color(0, 0, 255));
      }

      this.setImage = function(image) {
        this.image = image;
      };
      
      this.draw = function(scale) {
        noStroke();
        if(this.image) {
          texture(this.image);
        } else {
          texture(this.backup);
        }
        quad(this.b_quad.top_left.x * scale, this.b_quad.top_left.y * scale,
             this.b_quad.top_right.x * scale, this.b_quad.top_right.y * scale,
             this.b_quad.bottom_right.x * scale, this.b_quad.bottom_right.y * scale,
             this.b_quad.bottom_left.x * scale, this.b_quad.bottom_left.y * scale);
      };
    },

  "clinton_img": null,
  "albums": [],

  "auth_token": null,
  "auth_status": "",

  "get_auth": function()
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
      page_script.auth_status = "WAITING";
  
      Http.onreadystatechange = (e)=>{
        if(Http.status == 200)
        {
          var json_response = JSON.parse(Http.responseText);
          if(json_response){
            console.log("Auth Successful");
            page_script.auth_token = json_response.token_type + " " + json_response.access_token;
            page_script.auth_status = "SUCCESS";
          } else {
            console.log("JSON parse error");
            page_script.auth_token = null;
            page_script.auth_status = "ERROR";
          }
        }
        else
        {
          console.log("Request error code: " + Http.status);
          page_script.auth_token = null;
          page_script.auth_status = "ERROR";
        } 
      }
    },

  "auth_wait": function()
    {
      if(page_script.auth_status === "WAITING") {
        setTimeout(page_script.auth_wait(), 100);
      }
    },

//search functions
  "search": function()
    {
      //get search_term
      var search_term = $("#search_term").val();
  
      if(page_script.auth_token == null){
        page_script.get_auth();
        page_script.auth_wait();
      }
  
      //fix search term
      var fixed_search = '?q=' + search_term.replace(/\s/g, '%20') + '&type=album&limit=' + page_script.album_limit;
  
      //query spotify
      const Http = new XMLHttpRequest();
      const url='https://api.spotify.com/v1/search' + fixed_search;
    
      Http.open("GET", url);
  
      //set headers
      Http.setRequestHeader("Authorization", page_script.auth_token);
  
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
    },

  "build_results": function(search_results)
    {
      var json_results = JSON.parse(search_results);
      if(json_results)
      {
        var album_results = json_results.albums.items;
        $("#results").html("");
        //this loop can probably be converted to jquery but im lazy
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
          $("#results").append($(node));
        });
      }
      else
      {
        console.log("Error parsing json");
      }
    },

  "setImage": function(url)
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
}

//p5js functions
function preload()
{
  //Load in the clinton image
  page_script.clinton_img = loadImage(page_script.clinton_file, function(){
    console.log("Image loaded successfully.");
  }, function(event){
    console.log("Image failed to load.");
    console.log(event);
  });
}

function setup() {
  var canvas = createCanvas(page_script.clinton_width * page_script.clinton_scale, 
                            page_script.clinton_height * page_script.clinton_scale, WEBGL);
  canvas.parent("clinton-container");
  colorMode(HSB, 100);
  page_script.get_auth();
  
  page_script.album_boundaries.forEach((boundary)=>{
    page_script.albums.push(new Album(boundary));
  });
  
  //build select box
  for(var i = 0; i < page_script.album_boundaries.length; i++)
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
  page_script.albums.forEach((album, idx)=>{
    album.draw(page_script.clinton_scale);
  });
  
  image(page_script.clinton_img, 0, 0, 
    page_script.clinton_width * page_script.clinton_scale, 
    page_script.clinton_height * page_script.clinton_scale.clinton_scale);
}
