import * as React from 'react';
import { observer } from "mobx-react";
import styles from 'app/styles/main.scss';

const HomePage = observer(() => {
  return <div className={styles.homePageBody}>
    <p>Hello my name is John Easterday. I really like programming, art, computers, and cats.</p>
    <p>Programming topics I am interested in are:
      <ul>
        <li>Compilers</li>
        <li>Generative Art</li>
        <li>Game Engines</li>
        <li>Office Applications</li>
        <li>File Formats</li>
        <li>Using code to automate my work</li>
      </ul>
    </p>
    <p>
      The programming languages I really like (and because I like them I try to use them as much as I can) are:
      <ul>
        <li>C++</li>
        <li>C#</li>
        <li>Rust</li>
        <li>D</li>
        <li>Python</li>
        <li>Typescript</li>
        <li>Haskell</li>
        <li>And many more...</li>
      </ul>
    </p>
    <p>
      Currently (August 2022), I am the lead developer of a small programming team working on medical billing software. We use C#, React, PostgreSQL and Azure for our tech stack. I have lead successful migrations (minimal downtime observed from customers and no lost data) from SQLServer to PostgreSQL and from on-prem IIS servers to Azure-hosted App Services (including blob storage for documents and azure functions for background processing).
    </p>
  </div>
});

export default HomePage;