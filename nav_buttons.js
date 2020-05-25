$(document).ready(function(){
  //get css custom property
  var style = getComputedStyle(document.body);
  var border_color_u = style.getPropertyValue('--border-color-up');
  var border_color_d = style.getPropertyValue('--border-color-down');
  var button_color_u = style.getPropertyValue('--button-color-up');
  var button_color_d = style.getPropertyValue('--button-color-down');
  var url_start = location.href.match(/[\s\S]*.io($|\/)/)[0];
  if(url_start[url_start.length - 1] != '/')
    url_start = url_start + '/';

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
    window.location = url_start + "index.html";
  });

  //repos
  $("#repos_btn").click(function(){
    console.log("repositories clicked");
    window.location = url_start + "repo_page.html";
  });

  //demos
  $("#demos_btn").click(function(){
    console.log("demos button clicked");
    window.location = url_start + "demo_page.html";
  });

  //resume
  $("#resume_btn").click(function(){
    console.log("resume button clicked");
  });
});
