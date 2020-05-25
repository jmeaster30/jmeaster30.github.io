$(document).ready(function(){
  loadPage("home.html"); //load the home page in to start

  //get css custom property
  var style = getComputedStyle(document.body);
  var border_color_u = style.getPropertyValue('--border-color-up');
  var border_color_d = style.getPropertyValue('--border-color-down');
  var button_color_u = style.getPropertyValue('--button-color-up');
  var button_color_d = style.getPropertyValue('--button-color-down');

  //set navigation buttons
  $(".my_nav_btn")
    .mousedown(function(){
      console.log("mouse down");
      $( this ).css("border-style", "inset");
      $( this ).css("border-color", border_color_d);
      $( this ).css("background-color", button_color_d);
    })
    .mouseup(function(){
      console.log("mouse up");
      $( this ).css("border-style", "outset");
      $( this ).css("border-color", border_color_u);
      $( this ).css("background-color", button_color_u);
    });
  
  //home
  $("#home_btn").click(function(){
    console.log("home button clicked");
    loadPage("home.html");
  });

  //repos
  $("#repos_btn").click(function(){
    console.log("repositories clicked");
    loadPage("test.html");
    loadScript("test.js");
  });

  //demos
  $("#demos_btn").click(function(){
    console.log("demos button clicked");
  });

  //resume
  $("#resume_btn").click(function(){
    console.log("resume button clicked");
  });
});

let loadPage = function(local_url){ 
  var url_start = "https://jmeaster30.github.io/"; //this being hard coded gives me bad vibes but it works
  var full_url = url_start + local_url;
  $.get(full_url, function(data){
    $("#window").html(data);
  });
}

let loadScript = function(local_url){
  var url_start = "https://jmeaster30.github.io/";
  var full_url = url_start + local_url;
  $.getScript(full_url, function(data, textStatus, jqxhr){
    console.log(data);
    console.log(textStatus);
    console.log(jqxhr.status);
    console.log("Loaded Script");
  });
}
