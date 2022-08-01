import React, {
  useState, useEffect, useRef,
} from 'react';

import { getVRU } from '../../api/api';
import DatePicker from '../../components/DatePicker/DatePicker';

import './VRUPage.css';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

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
  const [loading, setLoading] = useState(true);
  let elements: JSX.Element;

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      getVRU(privateKey, publicKey, start, end)
        .then((result) => {
          if (result.error !== undefined) {
            setError(result.error);
            setResults([-1, -1, -1]);
            setLoading(false);
          } else {
            setError('');
            const { highRisk, lowRisk, noRisk } = result.assets!;
            setResults([highRisk, lowRisk, noRisk]);
            setLoading(false);
          }
        });
    } else {
      isMounted.current = true;
    }
  }, [newResult]);

  if (loading) {
    elements = <Loader />;
  } else if (error !== '') {
    elements = (
      <p>
        An error occurred:
        {' '}
        {error}
      </p>
    );
  } else {
    elements = (
      <table>
        <tr>
          <th>High Risk</th>
          <th>Low Risk</th>
          <th>No Risk</th>
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
    );
  }

  return (
    <>
      <DatePicker
        setStart={setStart}
        setStartBoolean={setStartBoolean}
        setEnd={setEnd}
        setEndBoolean={setEndBoolean}
      />
      <Button
        fullWidth
        disabled={!startBoolean || !endBoolean}
        onClick={() => { setLoading(true); setNewResult(newResult + 1); }}
      >
        Search
      </Button>
      {newResult !== 0
      && (
        elements
      )}
      <Button fullWidth onClick={toSelection} className="previous">&#8249; Back</Button>
    </>
  );
}

export default VRUPage;
