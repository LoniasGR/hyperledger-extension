import React, { useState, useEffect } from 'react';
import { getBalance } from '../../utils/utils';
import Loader from '../../components/Loader/Loader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

type Props = {
  toSelection: () => void,
  privateKey: string,
  publicKey: string,
};

function BalancePage({
  toSelection, privateKey, publicKey,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    getBalance(privateKey, publicKey)
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
        <h3 id="balance">{`${balance}`}</h3>
      </>
    );
  }

  return (
    <div>
      {elements}
      <div className="centered">
        <SubmitButton onClick={toSelection} className="previous">&#8249; Back</SubmitButton>
      </div>
    </div>
  );
}

export default BalancePage;
