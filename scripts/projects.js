const projects_list = [
    {title: 'BlastPDF', description: 'Modify and generate PDF files utilizing a builder pattern for expressive pdf templates', gitLink: 'https://github.com/jmeaster30/BlastPDF', tags: ['C#', 'PDF', 'Code Generators']},
    {title: 'Ocean', description: 'A toy programming language that I am using for learning about compilers and development tooling', gitLink: 'https://github.com/jmeaster30/ocean', tags: ['Rust', 'Compiler']},
    {title: 'Noise Engine', description: 'An opengl game engine', gitLink: 'https://github.com/jmeaster30/noise-engine', tags: ['C++', 'OpenGL']},
    {title: 'Spotify API Demo', description: 'Inspired by billclintonswag.com but with more people.', link: '/projects/spotifyswag', tags: ['Javascript', 'SpotifyAPI','p5.js']},
    {title: 'Stax', description: 'A concatenative stack-based programming language', gitLink: 'https://github.com/jmeaster30/stax', tags: ['Java', 'Compiler']},
    {title: 'SimpleDNS', description: 'A really basic DNS server', gitLink: 'https://github.com/jmeaster30/simpledns', tags: ['Rust', 'Networking']},
    {title: 'Vore', description: 'A regex engine with english-like syntax', gitLink: 'https://github.com/jmeaster30/vore', link: '/projects/vore', tags: ['Go', 'Regex Engine', 'WASM']},
    {title: 'Particle Life', description: 'A simulation of basic rules on a set of particles', link: '/projects/particlelife', tags: ['Javascript', 'ThreeJS']},
    {title: 'PgPac', description: 'PostgreSQL deployment tool', gitLink: 'https://github.com/jmeaster30/pgpac', tags: ['PostgreSQL', 'Go', 'Database']},
    {title: 'Syrency', description: 'A Minecraft mod that adds some redstone blocks for automating various things', gitLink: 'https://github.com/jmeaster30/syrency', tags: ['Java']},
    {title: 'Nova Lilith OS', description: 'A toy operating system so I can learn about them and Exokernels', gitLink: 'https://github.com/jmeaster30/nova-lilith-os', tags: ['C++', 'Operating System']},
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
        buildProjects();
    } else {
        event.target.dataset.selected = "yes";
        event.target.style.backgroundColor = event.target.dataset.color;
        buildProjects();
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
    console.log("build projects")
    let projectsListContainer = document.getElementById("projects-list");
    let tagListContainer = document.getElementById("projects-tags-list");
    let tagEntries = [];
    for(let i = 0; i < tagListContainer.children.length; i++) {
        let elem = tagListContainer.children[i];
        tagEntries.push({tag: elem.innerHTML, color: elem.dataset.color, selected: elem.dataset.selected});
    }
    let selectedTags = tagEntries.filter(x => x.selected == "yes");
    console.log(selectedTags);
    let projects = projects_list.filter(value => {
        if (selectedTags.length == 0) return true;
        for(let selectedTag of selectedTags) {
            if (value.tags.includes(selectedTag.tag)) {
                return true;
            }
        }
        return false;
    }).sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
    
    projectsListContainer.innerHTML = "";
    for (let project of projects) {
        let entry = document.createElement("div");
        entry.setAttribute("class", "projects-card");
        entry.dataset.projectTitle = project.title;

        let title = document.createElement("span");
        title.setAttribute("class", "projects-card-title");
        title.innerHTML = project.title;
        entry.appendChild(title);

        if (project.gitLink) {
            let gitIcon = document.createElement("a");
            gitIcon.setAttribute("class", "projects-card-git-link");
            gitIcon.setAttribute("href", project.gitLink);
            gitIcon.setAttribute("target", "_blank");
            gitIcon.innerHTML = "<img class=\"projects-card-git-icon\" src=\"assets/github-mark-white.svg\" alt=\"Github\"/>"
            entry.appendChild(gitIcon);
        }

        let divider = document.createElement("hr");
        divider.style.borderTop = "2px solid white";
        entry.appendChild(divider);
        
        let tagList = document.createElement("div");
        tagList.setAttribute("class", "projects-card-tags");
        project.tags = project.tags.sort((a, b) => a.toLowerCase() > b.toLowerCase());
        for (let j = 0; j < project.tags.length; j++) {
            let tag = document.createElement("span");
            tag.setAttribute("class", "projects-card-tag");
            tag.style.backgroundColor = tagEntries.find(x => x.tag == project.tags[j])?.color || "#fff";
            tag.innerHTML = project.tags[j];
            tagList.appendChild(tag);
        }
        entry.appendChild(tagList);

        let desc = document.createElement("div");
        desc.setAttribute("class", "projects-card-desc");
        desc.innerHTML = project.description;
        entry.appendChild(desc);

        projectsListContainer.appendChild(entry);
    }
}

function initProjectPage() {
    buildTags();
    buildProjects();
}
