import React, {
  useState, useEffect, useRef,
} from 'react';

import { getVRU } from '../../utils/utils';
import DatePicker from '../../components/DatePicker/DatePicker';

import './VRUPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

type Props = {
  toSelection: () => void,
  privateKey: string,
  publicKey: string,
};

function VRUPage({ toSelection, privateKey, publicKey }: Props) {
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
      getVRU(privateKey, publicKey, start, end)
        .then((result) => {
          if (result.error !== undefined) {
            setError(result.error);
            setResults([-1, -1, -1]);
          } else {
            setError('');
            const { highRisk, lowRisk, noRisk } = result.assets!;
            setResults([highRisk, lowRisk, noRisk]);
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
      <SubmitButton
        disabled={!startBoolean || !endBoolean}
        onClick={() => { setNewResult(newResult + 1); }}
      >
        Search
      </SubmitButton>
      {(results[0] !== -1 && results[1] !== -1 && results[2] !== -1)
      && (
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

export default VRUPage;
