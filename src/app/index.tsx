import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import styles from 'app/styles/main.scss';
import ProjectsPage from './pages/projects/ProjectsPage';
import SiteLayout from './pages/layout/SiteLayout';
import SpotifyProject from './pages/projects/spotify/SpotifyProject';
import ParticleLifeProject from './pages/projects/particle-life/ParticleLifeProject';
import VoreProject from './pages/projects/vore/VoreProject';

export const App = () => {
  return (
    <div className={styles.pageLayout}>
      <SiteLayout>
        <Switch>
          <Route exact path="/projects/particlelife"><ParticleLifeProject/></Route>
          <Route exact path="/projects/spotifyswag"><SpotifyProject/></Route>
          <Route exact path="/projects/vore"><VoreProject/></Route>
          <Route exact path="/projects"><ProjectsPage/></Route>
          <Route exact path="/"><HomePage/></Route>
        </Switch>
      </SiteLayout>
    </div>
  );
};
