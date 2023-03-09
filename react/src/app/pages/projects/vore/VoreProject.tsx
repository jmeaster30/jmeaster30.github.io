import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, Col, Row } from 'react-bootstrap';
import styles from 'app/styles/voreStyles.scss';
import * as libvorejs from '@jmeaster30/libvorejs';
import VoreEditor from './VoreEditor';
import VoreMatches from './VoreMatches';
import VoreExamples from './VoreExamples';
import UnderConstruction from 'app/pages/layout/UnderConstruction';

export const VoreProject = observer(() => {
  const [results, setResults] = React.useState<any>(null);
  const [sourceCode, setSourceCode] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [showUC, setShowUC] = React.useState(false);

  const searchHandler = React.useCallback(() => {
    libvorejs.search(sourceCode, searchText)
      .then(value => {
        setResults(value);
      })
      .catch(err => {
        console.log(err);
        setResults(err);
      });
  }, [sourceCode, searchText]);

  const updateSource = React.useCallback((event: any) => {
    setSourceCode(event.target.value)
  }, [setSourceCode]);

  const updateSearchText = React.useCallback((event: any) => {
    setSearchText(event.target.value)
  }, [setSearchText]);

  const onSelectExample = React.useCallback((source: string, searchText: string) => {
    setSourceCode(source);
    setSearchText(searchText);
  }, [setSourceCode, setSearchText]);

  const onDocClick = React.useCallback(() => {
    setShowUC(true);
  }, [])

  const getResultString = React.useCallback((results: any) => {
    if (results?.error) {
      return `ERROR: ${results?.error?.message}`;
    }
    return results?.output || "";
  }, []);

  return (
    <Row className={styles.voreBody}>
      <UnderConstruction show={showUC} setShow={setShowUC}/>
      <Col md={12}>
        <Row className={styles.voreHeader}>
          <Col md={12}><h4><b>Vore</b> is a regular expression language designed to be easier to read and easier to remember than original regular expressions.</h4></Col>
        </Row>
        <Row>
          <Col md={6} className={styles.voreSourceSection}>
            <VoreEditor title="Source Code:" onChange={updateSource} value={sourceCode}/>
          </Col>
          <Col md={6} className={styles.voreSourceSection}>
            <VoreEditor title="Search Text:" onChange={updateSearchText} value={searchText}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button className={styles.voreSearchButton} onClick={searchHandler}>Search</Button>
            <VoreExamples className={styles.voreSearchButton} onSelect={onSelectExample}/>
            <Button className={styles.voreSearchButton} onClick={onDocClick}>Documentation</Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} className={styles.voreSourceSection}>
            <VoreMatches searchText={searchText} matches={results?.matches || []} err={results?.error}/>
          </Col>
          <Col md={6} className={styles.voreSourceSection}>
            <VoreEditor title="Result Text:" editable={false} value={getResultString(results)}/>
          </Col>
        </Row>
      </Col>
    </Row>
  )
});

export default VoreProject;