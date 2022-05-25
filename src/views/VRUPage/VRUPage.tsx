import React, {
  ChangeEvent, useState, useEffect, useRef,
} from 'react';
import { getVRU } from '../../utils/utils';

import './VRUPage.css';

type Props = {
  toSelection: () => void,
  privateKey: string,
  publicKey: string,
};

function VRUPage({ toSelection, privateKey, publicKey }: Props) {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [start, setStart] = useState(0);
  const [startBoolean, setStartBoolean] = useState(false);
  const [end, setEnd] = useState(0);
  const [endBoolean, setEndBoolean] = useState(false);
  const [results, setResults] = useState(-1);
  const [newResult, setNewResult] = useState(0);
  const [error, setError] = useState('');

  const isMounted = useRef(false);

  const dateChange = (
    e: ChangeEvent,
    setter: (arg0: string) => void,
  ): void => {
    const target = e.target as HTMLInputElement;
    setter(target.value);
  };

  useEffect(() => {
    if (startDate !== '' && startTime !== '') {
      setStart(Date.parse(`${startDate} ${startTime}`));
      setStartBoolean(true);
    }
  }, [startDate, startTime]);

  useEffect(() => {
    if (endDate !== '' && endTime !== '') {
      setEnd(Date.parse(`${endDate} ${endTime}`));
      setEndBoolean(true);
    }
  }, [endDate, endTime]);

  useEffect(() => {
    if (isMounted.current) {
      getVRU(privateKey, publicKey, start, end)
        .then((result) => {
          if (result.error !== undefined) {
            setError(result.error);
            setResults(-1);
          } else {
            setError('');
            setResults(result.assets!);
          }
        });
    } else {
      isMounted.current = true;
    }
  }, [newResult]);

  return (
    <>
      <div className="centered">
        <label htmlFor="meeting-time">
          Start time:
          <input type="date" required onChange={(e: ChangeEvent) => dateChange(e, setStartDate)} />
          <input type="time" required onChange={(e: ChangeEvent) => dateChange(e, setStartTime)} />
        </label>
        <label htmlFor="meeting-time">
          End time:
          <input type="date" onChange={(e: ChangeEvent) => dateChange(e, setEndDate)} />
          <input type="time" onChange={(e: ChangeEvent) => dateChange(e, setEndTime)} />
        </label>
      </div>
      <button
        type="button"
        className="submit search"
        disabled={!startBoolean && !endBoolean}
        onClick={() => { setNewResult(newResult + 1); }}
      >
        Search
      </button>
      {results !== -1 && (
      <p>
        There are
        {' '}
        {results}
        {' '}
        assets in this time range.
      </p>
      )}
      {error !== '' && (
      <p>
        An error occurred:
        {' '}
        {error}
      </p>
      )}
      <button type="button" className="previous submit" onClick={toSelection}>
        &#8249; Back
      </button>
    </>
  );
}

export default VRUPage;
