import * as React from 'react';
import styles from 'app/styles/voreStyles.scss';

export const VoreEditor = ({title, onChange, editable = true, value}: any) => {
  return (<div className={styles.editorContainer}>
    <label className={styles.voreLabel}>{title}</label>
    <textarea style={{"resize": "none"}} className={styles.editor} placeholder="" onChange={onChange} readOnly={!editable} value={value}></textarea>
  </div>);
};

export default VoreEditor;
