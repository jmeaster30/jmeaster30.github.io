$(document).ready(function(){
  console.log("ready!");
  
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
  var url_start = location.pathname.match(/[\s\S]*jmeaster30.github.io($|\/)/)[0];
  if(url_start[url_start.length - 1] != '/') {
    url_start = url_start + "/";
  }
  var full_url = url_start + local_url;
  $.get(full_url, function(data){
    $("#window").html(data);
  });
}
