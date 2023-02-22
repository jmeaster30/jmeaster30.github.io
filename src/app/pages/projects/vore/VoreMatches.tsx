import React from 'react';
import styles from 'app/styles/voreStyles.scss';

export interface VoreMatchesProperties {
  searchText: string
  matches: any[]
  err: any
}

export interface MatchProperties {
  searchText: string
  match: any
  key: number
}

export const Match = ({searchText, match, key}: MatchProperties) => {
  if (!match) return <div className={styles.match} key={key}>{'No Matches'}</div>;

  const beforeMatch = React.useMemo(() => {
    const minOffset = match.offset.start - 6;
    const realMinOffset = minOffset < 0 ? 0 : minOffset;

    return `${minOffset != realMinOffset ? '' : '...'}${searchText.slice(realMinOffset, match.offset.start)}`;
  }, [searchText, match]);

  const afterMatch = React.useMemo(() => {
    const maxOffset = match.offset.end + 6;
    const realMaxOffset = maxOffset > searchText.length ? searchText.length : maxOffset;

    return `${searchText.slice(match.offset.end, realMaxOffset)}${maxOffset != realMaxOffset ? '' : '...'}`;
  }, [searchText, match]);

  return (<div className={styles.match} key={key}>
    <div className={styles.title}>{`Match Number: ${match.matchNumber}`}</div>
    <div className={styles.matchedText}>
      <pre>
        <code className={styles.aroundMatch}>{beforeMatch}</code>
        {match.replacement
          ? <><s><code className={styles.replacedMatch}>{match.value}</code></s><code className={styles.duringMatch}>{match.replacement}</code></> 
          : <code className={styles.duringMatch}>{match.value}</code> }
        <code className={styles.aroundMatch}>{afterMatch}</code>
      </pre>
    </div>
  </div>);
}

export const VoreMatches = ({searchText, matches, err}: VoreMatchesProperties) => {

  const matchArray = React.useMemo(() => {
    if (err) return null;
    const result = JSON.parse(JSON.stringify(matches));
    result.unshift(null)
    return result;
  }, [matches]);

  const textCache = React.useMemo(() => {
    return searchText;
  }, [matches]);

  return (
    <div className={styles.matchesContainer}>
      <label className={styles.voreLabel}>Matches:</label>
      <div className={styles.matches}>
        {matchArray?.map((value: any, index: number, arr: any[]) => {
          if (arr.length == 1) {
            return <Match key={index} searchText={textCache} match={value}/>;
          } else if (index >= 1) {
            return <Match key={index} searchText={textCache} match={value}/>;
          }
          return null;
        }) || (
          <pre className={styles.errors}><code>{JSON.stringify(err, null, 4)}</code></pre>
        )}
      </div>
    </div>
  )
}

export default VoreMatches;