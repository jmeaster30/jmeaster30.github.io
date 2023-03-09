import * as React from 'react';
import { observer } from "mobx-react";
import styles from "app/styles/shared/ProjectEntryStyle.scss";
import ProjectTag from './ProjectTag';
import { useHistory } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import UnderConstruction from '../layout/UnderConstruction';

export interface ProjectEntryProperties {
  title: string;
  description: string;
  link?: string;
  gitLink?: string;
  tags: string[];
  image?: string;
}

export const ProjectEntry = observer(({ title, description, link, gitLink, tags = [], image } : ProjectEntryProperties) => {

  const [showUC, setShowUC] = React.useState(false);
  const history = useHistory();

  const handleInternalLinkClick = React.useCallback(() => {
    if (link) {
      history.push(link)
    }
  }, [history, link]);

  const onUnderConstructionClick = React.useCallback(() => {
    setShowUC(true);
  }, []);

  return (
    <div className={styles.projectEntryCard}>
      <UnderConstruction show={showUC} setShow={setShowUC}/>
      <Row>
        <Col md={gitLink ? 10 : 12}>
          <span className={styles.projectEntryTitle}>
            {link ? <a onClick={handleInternalLinkClick}>{title}</a> : <span className={styles.noLink} onClick={onUnderConstructionClick}>{title}</span>}
          </span>
        </Col>
        {gitLink && <Col md={2}><a className={styles.projectEntryLink} href={gitLink} target="_blank"><img src="https://raw.githubusercontent.com/rdimascio/icons/master/icons/light/github.svg" alt="Github"/></a></Col>}
      </Row>
      <hr/>
      <div style={{marginBottom: '8px'}}>
        { tags.map((x, idx) => <ProjectTag key={idx} text={x}/>) }
      </div>
      <div style={{display: 'block'}} className={styles.projectEntryBody}>{description}</div>
    </div>
  )
});

export default ProjectEntry;