import * as React from 'react';
import { observer } from 'mobx-react';
import ProjectEntry, { ProjectEntryProperties } from '../projects/ProjectEntry';
import { Col, Row } from 'react-bootstrap';
import ProjectsFilter from './ProjectsFilter';

const projects_list = [
  {title: 'BlastPDF', description: 'Modify and generate PDF files utilizing a builder pattern for expressive pdf templates', gitLink: 'https://github.com/jmeaster30/BlastPDF', tags: ['C#']},
  {title: 'ocean', description: 'A toy programming language that I am using for learning about compilers and development tooling', gitLink: 'https://github.com/jmeaster30/ocean', tags: ['Rust'], image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg"},
  {title: 'noise engine', description: 'An opengl game engine', gitLink: 'https://github.com/jmeaster30/noise-engine', tags: ['C++', 'OpenGL']},
  {title: 'spotify api demo', description: 'Inspired by billclintonswag.com but with more people.', link: '/projects/spotifyswag', tags: ['TypeScript', 'SpotifyAPI','p5.js']},
  {title: 'stax', description: 'A concatenative stack-based programming language', gitLink: 'https://github.com/jmeaster30/stax', tags: ['Java']},
  {title: 'simpledns', description: 'A really basic DNS server', gitLink: 'https://github.com/jmeaster30/simpledns', tags: ['Rust', 'Networking']},
  {title: 'vore', description: 'A regex engine with english-like syntax', gitLink: 'https://github.com/jmeaster30/vore', link: '/projects/vore', tags: ['Go', 'Regex Engine']},
  {title: 'Particle Life', description: 'A simulation of basic rules on a set of particles', link: '/projects/particlelife', tags: ['TypeScript', 'ThreeJS']},
]

interface ProjectsGridProperties {
  chunkSize: number;
  list: ProjectEntryProperties[];
}

const ProjectsGrid = observer(({ chunkSize, list } : ProjectsGridProperties) => {
  const chunks = React.useMemo(() => {
    let result = [];
    for (let i = 0; i < list.length;) {
      let chunk = [];
      for (let j = 0; j < chunkSize; j++) {
        if (i < list.length) {
          chunk.push(list[i]);
          i += 1;
        } else {
          break;
        }
      }
      result.push(chunk);
    }
    return result;
  }, [chunkSize, list]);

  return <div>
    {chunks.map((row, i) => <Row key={i+1} style={{marginBottom: '16px'}}>
      {row.map((col, j) => <Col key={(j+1)+"-"+(i+1)} md={12 / chunkSize}>
        <ProjectEntry {...col}/>
      </Col>)}
    </Row>)}
  </div>;
})

const ProjectsPage = observer(() => {
  const [filteredList, setFilteredList] = React.useState<ProjectEntryProperties[]>([]);
  
  const tags_list = React.useMemo(() => {
    let result: string[] = [];
    for (let proj of projects_list) {
      for (let tag of proj.tags) {
        result.push(tag);
      }
    }
    return result;
  }, [projects_list]);

  const handleFilterUpdate = React.useCallback((selectedTags: string[]) => {
    let arr = [...projects_list];
    arr = arr.filter(value => {
      if (selectedTags.length == 0) return true;
      for(let selectedTag of selectedTags) {
        if (value.tags.indexOf(selectedTag) >= 0) {
          return true;
        }
      }
      return false;
    }).sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0));
    setFilteredList(arr);
  }, [filteredList, setFilteredList]);
  
  React.useEffect(() => {
    handleFilterUpdate(tags_list);
  }, [tags_list]);

  return <div>
    <Row>
      <ProjectsFilter options={tags_list} onFilterUpdate={handleFilterUpdate}/>
    </Row>
    <Row>
      <ProjectsGrid chunkSize={4} list={filteredList}/>
    </Row>
  </div> 
});

export default ProjectsPage;