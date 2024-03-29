import React, { useState, useEffect } from 'react';
import { getBalance } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

type Props = {
  toSelection: () => void,
  privateKey: string,
  publicKey: string,
  organisation: number,
};

function BalancePage({
  toSelection, privateKey, publicKey, organisation,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    getBalance(privateKey, publicKey, organisation)
      .then((result) => {
        if (result.error !== undefined) {
          setError(result.error);
          setLoading(false);
        } else {
          setUsername(result.username!);
          setBalance(result.balance!);
          setLoading(false);
        }
      });
  }, []);

  let elements: JSX.Element;

  if (loading) {
    elements = <Loader />;
  } else if (error !== '') {
    elements = (
      <div>
        <h2>{`Error: ${error}`}</h2>
      </div>
    );
  } else {
    elements = (
      <>
        <h2 id="username">{`${username}`}</h2>
        <p>Your balance is</p>
        <h3 id="balance">{`${Number(balance).toFixed(2)}`}</h3>
      </>
    );
  }

  return (
    <div>
      {elements}
      <div className="centered">
        <Button fullWidth onClick={toSelection} className="previous">&#8249; Back</Button>
      </div>
    </div>
  );
}

export default BalancePage;
