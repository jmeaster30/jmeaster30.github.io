
function loadPage(pagename) {
  let elem = document.getElementById('main-content');
  fetch(`pages/${pagename}.html`)
    .then(resp => resp.text())
    .then(html => {
      elem.innerHTML = html;
      switch (pagename) {
        case 'projects': break;
        case 'blog': initBlogPage(); break;
      }
      elem.dataset.loaded = "true";
    })
    .catch(error => {
      console.error(error);
    });
}

function pageTabClick(event) {
  if (event.target.dataset?.isSelected !== "yes") {
    document.getElementById('main-content').dataset.loaded = "false";
    let currentlyClicked = document.querySelectorAll('[data-is-selected="yes"]');
    for (var i = 0; i < currentlyClicked.length; i++) {
      currentlyClicked.item(i).dataset.isSelected = "no";
    }
    event.target.dataset.isSelected = "yes";
    loadPage(event.target.dataset.page);
    document.getElementById('site-body').dataset.page = event.target.dataset.page;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByClassName('site-button');
  for (var i = 0; i < buttons.length; i++) {
    buttons.item(i).addEventListener('click', pageTabClick);
  }
  loadPage("projects");
});
