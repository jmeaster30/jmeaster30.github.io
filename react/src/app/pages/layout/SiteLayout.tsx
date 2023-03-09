import * as React from 'react';
import { observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
import styles from 'app/styles/main.scss';
import SiteControls from './SiteControls';

interface SiteLayoutProps {
  children: React.ReactElement
}

const SiteLayout = observer(({ children }: SiteLayoutProps) => {
  return <div>
    <Row className={styles.siteHeader}>
      <Col>
        <h1 className={styles.siteTitle}>My Website :)</h1>
      </Col>
    </Row>
    <Row className={styles.siteContainer}>
      <Col className={styles.siteControls}><SiteControls/></Col>
      <Col className={styles.siteBody}>{ children }</Col>
    </Row>
  </div>
});

export default SiteLayout;
