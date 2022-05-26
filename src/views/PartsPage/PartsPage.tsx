import React, {
  useState, useEffect, useRef,
} from 'react';
import DatePicker from '../../components/DatePicker/DatePicker';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { getParts } from '../../utils/utils';

import './PartsPage.css';

type Props = {
  toSelection: () => void,
  privateKey: string,
  publicKey: string,
};

function PartsPage({ toSelection, privateKey, publicKey }: Props) {
  const [start, setStart] = useState(0);
  const [startBoolean, setStartBoolean] = useState(false);
  const [end, setEnd] = useState(0);
  const [endBoolean, setEndBoolean] = useState(false);
  const [results, setResults] = useState([-1, -1, -1]);
  const [newResult, setNewResult] = useState(0);
  const [error, setError] = useState('');

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      getParts(privateKey, publicKey, start, end)
        .then((result) => {
          if (result.error !== undefined) {
            setError(result.error);
            setResults([-1, -1, -1]);
          } else {
            setError('');
            const highQuality = result.assets!.high_quality;
            const lowQuality = result.assets!.low_quality;
            const { total } = result.assets!;
            console.log(highQuality);
            setResults([total, highQuality, lowQuality]);
          }
        });
    } else {
      isMounted.current = true;
    }
  }, [newResult]);
  return (
    <>
      <DatePicker
        setStart={setStart}
        setStartBoolean={setStartBoolean}
        setEnd={setEnd}
        setEndBoolean={setEndBoolean}
      />
      <button
        type="button"
        className="submit search"
        disabled={!startBoolean && !endBoolean}
        onClick={() => { setNewResult(newResult + 1); }}
      >
        Search
      </button>
      {results[0] !== -1 && (
        <table>
          <tr>
            <th>Total</th>
            <th>High Quality</th>
            <th>Low Quality</th>
          </tr>
          <tr>
            <td>
              {results[0]}
            </td>
            <td>
              {results[1]}
            </td>
            <td>
              {results[2]}
            </td>
          </tr>
        </table>
      )}
      {error !== '' && (
      <p>
        An error occurred:
        {' '}
        {error}
      </p>
      )}
      <SubmitButton onClick={toSelection} className="previous">&#8249; Back</SubmitButton>
    </>
  );
}

export default PartsPage;
