const projects_list = [
    {title: 'BlastPDF', description: 'Modify and generate PDF files utilizing a builder pattern for expressive pdf templates', gitLink: 'https://github.com/jmeaster30/BlastPDF', tags: ['C#', 'PDF', 'Code Generators']},
    {title: 'Ocean', description: 'A toy programming language that I am using for learning about compilers and development tooling', gitLink: 'https://github.com/jmeaster30/ocean', tags: ['Rust', 'Compiler']},
    {title: 'Noise Engine', description: 'An opengl game engine', gitLink: 'https://github.com/jmeaster30/noise-engine', tags: ['C++', 'OpenGL']},
    {title: 'Spotify API Demo', description: 'Inspired by billclintonswag.com but with more people.', link: '/projects/spotifyswag', tags: ['TypeScript', 'SpotifyAPI','p5.js']},
    {title: 'Stax', description: 'A concatenative stack-based programming language', gitLink: 'https://github.com/jmeaster30/stax', tags: ['Java', 'Compiler']},
    {title: 'SimpleDNS', description: 'A really basic DNS server', gitLink: 'https://github.com/jmeaster30/simpledns', tags: ['Rust', 'Networking']},
    {title: 'Vore', description: 'A regex engine with english-like syntax', gitLink: 'https://github.com/jmeaster30/vore', link: '/projects/vore', tags: ['Go', 'Regex Engine']},
    {title: 'Particle Life', description: 'A simulation of basic rules on a set of particles', link: '/projects/particlelife', tags: ['TypeScript', 'ThreeJS']},
    {title: 'PgPac', description: 'PostgreSQL deployment tool', gitLink: 'https://github.com/jmeaster30/pgpac', tags: ['PostgreSQL', 'Go', 'Database']},
    //{title: 'Pipe Layer', description: 'An HTML5 game based on the mobile game Flow', link: '/games/pipelayer', tags: ['Game', 'TypeScript', 'HTML5']}
];

function hsvToHex(h) {
    const f = n => {
        const k = (n + h / 60) % 6;
        const color = 1 - Math.max(Math.min(k, 4-k, 1), 0);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(5)}${f(3)}${f(1)}`;
}

function clickTag(event) {
    if (event.target.dataset.selected == "yes") {
        event.target.dataset.selected = "no";
        event.target.style.backgroundColor = "white";
    } else {
        event.target.dataset.selected = "yes";
        event.target.style.backgroundColor = event.target.dataset.color;
    }
}

function buildTags() {
    let tagListContainer = document.getElementById("projects-tags-list");
    let tags = projects_list
        .flatMap(value => value.tags)
        .filter((item, pos, self) => self.indexOf(item) == pos)
        .sort((a, b) => a.toLowerCase() > b.toLowerCase());
    for (let i = 0; i < tags.length; i++) {
        let entry = document.createElement("span");
        entry.setAttribute("class", "projects-tag");
        entry.dataset.color = hsvToHex(360 * (i / tags.length), 100, 100);
        entry.innerHTML = tags[i];

        entry.addEventListener('click', clickTag);

        tagListContainer.appendChild(entry);
    }
}

function buildProjects() {
    let projectsListContainer = document.getElementById("projects-list");
    let tagListContainer = document.getElementById("projects-tags-list");
    let tagEntries = [];
    for(let i = 0; i < tagListContainer.children.length; i++) {
        let elem = tagListContainer.children[i];
        tagEntries.push({tag: elem.innerHTML, color: elem.dataset.color});
    }

    let projects = projects_list.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
    for (let i = 0; i < projects.length; i++) {
        let entry = document.createElement("div");
        entry.setAttribute("class", "projects-card");
        entry.dataset.projectTitle = projects_list[i].title;

        let title = document.createElement("div");
        title.setAttribute("class", "projects-card-title");
        title.innerHTML = projects_list[i].title;
        entry.appendChild(title);

        let divider = document.createElement("hr");
        divider.style.borderTop = "2px solid white";
        entry.appendChild(divider);
        
        let tagList = document.createElement("div");
        tagList.setAttribute("class", "projects-card-tags");
        projects_list[i].tags = projects_list[i].tags.sort((a, b) => a.toLowerCase() > b.toLowerCase());
        for (let j = 0; j < projects_list[i].tags.length; j++) {
            let tag = document.createElement("span");
            tag.setAttribute("class", "projects-card-tag");
            tag.style.backgroundColor = tagEntries.find(x => x.tag == projects_list[i].tags[j])?.color || "#fff";
            tag.innerHTML = projects_list[i].tags[j];
            tagList.appendChild(tag);
        }
        entry.appendChild(tagList);

        let desc = document.createElement("div");
        desc.setAttribute("class", "projects-card-desc");
        desc.innerHTML = projects_list[i].description;
        entry.appendChild(desc);

        projectsListContainer.appendChild(entry);
    }
}

function initProjectPage() {
    buildTags();
    buildProjects();
}
