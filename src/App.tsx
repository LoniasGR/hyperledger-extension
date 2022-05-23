import React, { useState } from 'react';
import './App.css';
import BalancePage from './views/BalancePage/BalancePage';
import CredentialPage from './views/CredentialPage/CredentialPage';
import SelectPage from './views/SelectPage/SelectPage';
import WelcomePage from './views/WelcomePage/WelcomePage';
import VRUPage from './views/VRUPage/VRUPage';
import PartsPage from './views/PartsPage/PartsPage';

function App() {
  const networkURL = 'http://localhost:8001';

  const [currentPage, setCurrentPage] = useState('welcome');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const toCredentials = () => setCurrentPage('credentials');
  const toBalance = () => setCurrentPage('balance');
  const toWelcome = () => setCurrentPage('welcome');
  const toSelection = () => setCurrentPage('select');
  const toVRU = () => setCurrentPage('vru');
  const toParts = () => setCurrentPage('parts');

  const changePrivateKey = (newKey: string) => setPrivateKey(newKey);
  const changePublicKey = (newKey: string) => setPublicKey(newKey);

  if (currentPage === 'credentials') {
    return (
      <CredentialPage
        toSelection={toSelection}
        toWelcome={toWelcome}
        changePrivateKey={changePrivateKey}
        changePublicKey={changePublicKey}
      />
    );
  }
  if (currentPage === 'balance') {
    return (
      <BalancePage
        toCredentials={toCredentials}
        networkURL={networkURL}
        privateKey={privateKey}
        publicKey={publicKey}
      />
    );
  }
  if (currentPage === 'select') {
    return (
      <SelectPage
        toCredentials={toCredentials}
        toBalance={toBalance}
        toVRU={toVRU}
        toParts={toParts}
      />
    );
  }
  if (currentPage === 'vru') {
    return (
      <VRUPage toSelection={toSelection} />
    );
  }
  if (currentPage === 'parts') {
    return (
      <PartsPage toSelection={toSelection} />
    );
  }
  return <WelcomePage toCredentials={toCredentials} />;
}

export default App;
