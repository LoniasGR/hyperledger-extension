import React, { useState } from 'react';
import './App.css';
import BalancePage from './views/BalancePage/BalancePage';
import CredentialPage from './views/CredentialPage/CredentialPage';
import WelcomePage from './views/WelcomePage/WelcomePage';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const toCredentials = () => setCurrentPage('credentials');
  const toBalance = () => setCurrentPage('balance');
  const toWelcome = () => setCurrentPage('welcome');

  const changePrivateKey = (newKey: string) => setPrivateKey(newKey);
  const changePublicKey = (newKey: string) => setPublicKey(newKey);

  if (currentPage === 'credentials') {
    return (
      <CredentialPage
        toBalance={toBalance}
        toWelcome={toWelcome}
        privateKey={privateKey}
        publicKey={publicKey}
        changePrivateKey={changePrivateKey}
        changePublicKey={changePublicKey}
      />
    );
  }
  if (currentPage === 'balance') {
    return <BalancePage toCredentials={toCredentials} />;
  }
  return <WelcomePage toCredentials={toCredentials} />;
}

export default App;
