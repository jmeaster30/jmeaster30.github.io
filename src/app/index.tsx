import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import styles from 'app/styles/main.scss';
import ProjectsPage from './pages/projects/ProjectsPage';
import SiteLayout from './pages/layout/SiteLayout';
import ParticleLifeProject from './pages/projects/particle-life/ParticleLifeProject';
import VoreProject from './pages/projects/vore/VoreProject';
//import PipeLayerGame from './pages/projects/games/pipelayer/PipeLayerGame';
import SpotifyPage from './pages/projects/SpotifyPage';

export const App = () => {
  return (
    <div className={styles.pageLayout}>
      <SiteLayout>
        <Switch>
          {/* <Route exact path="/games/pipelayer"><PipeLayerGame/></Route>
          <Route exact path="/games"><ProjectsPage defaultTags={["Game"]}/></Route>
          */}
          <Route exact path="/projects/particlelife"><ParticleLifeProject/></Route>
          <Route exact path="/projects/spotifyswag"><SpotifyPage/></Route>
          <Route exact path="/projects/vore"><VoreProject/></Route>
          <Route exact path="/projects"><ProjectsPage defaultTags={[]}/></Route>
          <Route exact path="/"><HomePage/></Route>
        </Switch>
      </SiteLayout>
    </div>
  );
};
