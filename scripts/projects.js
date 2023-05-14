const projects_list = [
    {title: 'BlastPDF', description: 'Modify and generate PDF files utilizing a builder pattern for expressive pdf templates', gitLink: 'https://github.com/jmeaster30/BlastPDF', tags: ['C#']},
    {title: 'ocean', description: 'A toy programming language that I am using for learning about compilers and development tooling', gitLink: 'https://github.com/jmeaster30/ocean', tags: ['Rust']},
    {title: 'noise engine', description: 'An opengl game engine', gitLink: 'https://github.com/jmeaster30/noise-engine', tags: ['C++', 'OpenGL']},
    {title: 'spotify api demo', description: 'Inspired by billclintonswag.com but with more people.', link: '/projects/spotifyswag', tags: ['TypeScript', 'SpotifyAPI','p5.js']},
    {title: 'stax', description: 'A concatenative stack-based programming language', gitLink: 'https://github.com/jmeaster30/stax', tags: ['Java']},
    {title: 'simpledns', description: 'A really basic DNS server', gitLink: 'https://github.com/jmeaster30/simpledns', tags: ['Rust', 'Networking']},
    {title: 'vore', description: 'A regex engine with english-like syntax', gitLink: 'https://github.com/jmeaster30/vore', link: '/projects/vore', tags: ['Go', 'Regex Engine']},
    {title: 'Particle Life', description: 'A simulation of basic rules on a set of particles', link: '/projects/particlelife', tags: ['TypeScript', 'ThreeJS']},
    //{title: 'Pipe Layer', description: 'An HTML5 game based on the mobile game Flow', link: '/games/pipelayer', tags: ['Game', 'TypeScript', 'HTML5']}
];

function hsvToHex(h) {
    const f = n => {
        const k = (n + h / 60) % 6;
        const color = 1 - Math.max(Math.min(k, 4-k, 1), 0);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
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
}

function initProjectPage() {
    buildTags();
    buildProjects();
}
