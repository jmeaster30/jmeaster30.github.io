import { observer } from 'mobx-react';
import * as React from 'react';
import { useHistory } from 'react-router';
import HomeIcon from 'assets/home9.gif';
import ProjectsIcon from 'assets/Projects.gif';
import styles from '../../styles/main.scss';

interface SiteButtonProps {
  url: string,
  image: string
}

const SiteButton = observer(({url, image} : SiteButtonProps) => {
  const history = useHistory();

  const handleSiteNav = React.useCallback(() => {
    history.push(url);
  }, [history, url]);

  return <div><a onClick={handleSiteNav}><img className={styles.siteControlButton} src={image}/></a></div>;
})

const SiteControls = observer(() => (
  <div>
    <SiteButton url="/" image={HomeIcon}/>
    <SiteButton url="/projects" image={ProjectsIcon}/>
  </div>
));

export default SiteControls;