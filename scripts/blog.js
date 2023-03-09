// newest to oldest
const posts = [
  { link: "testpost2.html", title: "This is ANOTHER test post", author: "John Easterday", date: "3/8/2023" },
  { link: "testpost.html", title: "This is a test post", author: "John Easterday", date: "3/8/2023" }
]

function loadPost(page) {
  let content = document.getElementById('post-content');
  content.style.opacity = 0;

  let loading = document.getElementById('post-loading');
  loading.style.opacity = 100;

  let idx = posts.findIndex(x => x.link == page.link);
  let prevPostButton = document.getElementById('prev-post');
  let nextPostButton = document.getElementById('next-post');

  if (idx === 0) {
    nextPostButton.dataset.turnOff = "yes"
  } else {
    nextPostButton.dataset.turnOff = "no"
  }

  if (idx === posts.length - 1) {
    prevPostButton.dataset.turnOff = "yes"
  } else {
    prevPostButton.dataset.turnOff = "no"
  }

  fetch(`posts/${page.link}`)
    .then(resp => resp.text())
    .then(html => {
      content.innerHTML = html;
      content.dataset.postIndex = idx;
      content.style.opacity = 100;
      loading.style.opacity = 0;
      loading.style.height = 0;
    })
    .catch(error => {
      console.error(error);
    });
}

function nextPost() {
  let content = document.getElementById("post-content");
  let next_index = Number(content.dataset.postIndex) - 1;
  loadPost(posts[next_index]);
}

function prevPost() {
  let content = document.getElementById("post-content");
  let prev_index = Number(content.dataset.postIndex) + 1;
  loadPost(posts[prev_index]);
}

function initBlogPage() {
  loadPost(posts[0]);
  document.getElementById("prev-post").addEventListener('click', prevPost);
  document.getElementById("next-post").addEventListener('click', nextPost);
}
