import React, { useState, useEffect } from 'react';
import { getBalance } from '../../utils/utils';
import Loader from '../../components/Loader/Loader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

type Props = {
  toCredentials: () => void,
  privateKey: string,
  publicKey: string,
};

function BalancePage({
  toCredentials, privateKey, publicKey,
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

  if (loading) {
    return (<Loader />);
  }
  if (error !== '') {
    return (
      <div>
        <h2>{`Error: ${error}`}</h2>
      </div>
    );
  }
  return (
    <div>
      <h2 id="username">{`${username}`}</h2>
      <p>Your balance is</p>
      <h3 id="balance">{`${balance}`}</h3>
      <div className="centered">
        <SubmitButton onClick={toCredentials} className="previous">&#8249; Back</SubmitButton>

      </div>
    </div>
  );
}

export default BalancePage;
