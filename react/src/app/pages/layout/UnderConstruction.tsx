import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from "react-bootstrap";
import styles from 'app/styles/main.scss';
import classNames from "classnames";

import HAMMERGUY from 'assets/under_construction/uc1.gif';
import HARDHATDIGGER from 'assets/under_construction/uc2.gif';
import SCROLLYSIGN from 'assets/under_construction/uc3.gif';
import PICKACHUJACKHAMMER from 'assets/under_construction/uc5.gif';
import PAINT from 'assets/under_construction/uc6.gif';
import SONIC from 'assets/under_construction/uc8.gif';
import GRAYFOOTER from 'assets/under_construction/uc9.gif';
import LIGHTSABER from 'assets/under_construction/uc10.gif';
import THESEPAGES from 'assets/under_construction/uc12.gif';
import WATCHYOURSTEP from 'assets/under_construction/uc13.gif';
import EXOTICTROPICALS from 'assets/under_construction/uc14.gif';
import PIKACHULIGHTSABER from 'assets/under_construction/uc15.gif';
import GEARS1 from 'assets/under_construction/uc16.gif';
import COOLCONSTRUCTION from 'assets/under_construction/uc17.gif';
import GEARS2 from 'assets/under_construction/uc18.gif';
import SITEUNDERCONSTRUCTION from 'assets/under_construction/uc19.gif';
import THECONSTRUCTION from 'assets/under_construction/uc20.gif';
import DIGSIGN from 'assets/under_construction/uc21.gif';
import SAWGUY from 'assets/under_construction/uc22.gif';
import HAMMERSIGN from 'assets/under_construction/uc23.gif';
import WEBWOVEN from 'assets/under_construction/uc24.gif';
import SPINCONSTRUCTION from 'assets/under_construction/uc25.gif';
import SPINUNDERCONSTRUCTION from 'assets/under_construction/uc26.gif';
import DIG from 'assets/under_construction/uc27.gif';
import JACKHAMMER from 'assets/under_construction/uc28.gif';

interface UnderConstructionProperties {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const UnderConstruction = ({show, setShow}: UnderConstructionProperties) => {
  const handleHide = () => setShow(false);

  const images = React.useMemo(() => [HAMMERGUY, HARDHATDIGGER, PICKACHUJACKHAMMER, PAINT,
  LIGHTSABER, THESEPAGES, GEARS1, COOLCONSTRUCTION, GEARS2,
  SITEUNDERCONSTRUCTION, DIGSIGN, SAWGUY, HAMMERSIGN, WEBWOVEN, SPINCONSTRUCTION,
  SPINUNDERCONSTRUCTION, DIG, JACKHAMMER, SONIC, SCROLLYSIGN].sort((a, b) => 0.5 - Math.random()), [show]);

  return (<>
    <Modal size="lg" show={show} onHide={handleHide}>
      <div className={styles.gallery}>
        <Row>
          <img src={WATCHYOURSTEP} className={styles.full}/> 
        </Row>
        <Row>
          <Col md={2} className={styles.center}><img src={PIKACHULIGHTSABER} className={styles.fill}/></Col>
          <Col md={8} className={styles.center}><img src={THECONSTRUCTION} className={styles.fill}/></Col>
          <Col md={2} className={styles.center}><img src={PIKACHULIGHTSABER} className={classNames(styles.flipped, styles.fill)}/></Col>
        </Row>
        {images.map((value, index) => <span className={styles.galleryItem}>
          <img src={value} key={index}/>
        </span>)}
        <Row>
          <img src={EXOTICTROPICALS} className={styles.full}/> 
        </Row>
        <Row>
          <img src={GRAYFOOTER} className={styles.full}/> 
        </Row>
      </div>
    </Modal>
  </>);
}

export default UnderConstruction;