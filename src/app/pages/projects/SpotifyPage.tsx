import { observer } from "mobx-react";
import React from "react";
import styles from '../../styles/spotifyStyles.scss'

export const SpotifyPage = observer(() => {

  return <div className={styles.spotifyContainer}>
    <iframe src="https://johneasterday.syrency.com/spotify-demo/"/>
  </div>
});

export default SpotifyPage;