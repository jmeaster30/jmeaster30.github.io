$(document).ready(function(){   
  var url_start = location.href.match(/[\s\S]*.io($|\/)/)[0];
  if(url_start[url_start.length - 1] != '/')
    url_start = url_start + '/';
  
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
