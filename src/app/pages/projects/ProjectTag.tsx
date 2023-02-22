import * as React from 'react';
import { observer } from "mobx-react";

interface ProjectTagProperties {
  text: string;
}

export const ProjectTag = observer(({ text } : ProjectTagProperties) => {

  const generateColor = React.useCallback(() => {
    return [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  }, []);

  const [backgroundColor, textColor] = React.useMemo(() => {
    const back = generateColor().toUpperCase();
    let rgb = [];
    for (let i = 0; i <= 2; i++) {
      let sl = back.substring(i * 2, i * 2 + 2);
      rgb[i] = parseInt(sl, 16);
    } 
    const luma = (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
    return [`#${back}`, `#${(luma >= 165) ? '000' : 'FFF'}`];
  }, [text]);

  return (
    <span style={{
      backgroundColor,
      color: textColor,
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '4px',
      paddingBottom: '4px',
      margin: '4px',
      borderRadius: '8px',

    }}>{text}</span>
  )
});

export default ProjectTag;