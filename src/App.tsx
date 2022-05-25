import React, { useState } from 'react';
import './App.css';
import BalancePage from './views/BalancePage/BalancePage';
import CredentialPage from './views/CredentialPage/CredentialPage';
import SelectPage from './views/SelectPage/SelectPage';
import WelcomePage from './views/WelcomePage/WelcomePage';
import VRUPage from './views/VRUPage/VRUPage';
import PartsPage from './views/PartsPage/PartsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const toCredentials = () => setCurrentPage('credentials');
  const toBalance = () => setCurrentPage('balance');
  const toWelcome = () => setCurrentPage('welcome');
  const toSelection = () => setCurrentPage('select');
  const toVRU = () => setCurrentPage('vru');
  const toParts = () => setCurrentPage('parts');

  if (currentPage === 'credentials') {
    return (
      <CredentialPage
        toSelection={toSelection}
        toWelcome={toWelcome}
        setPrivateKey={setPrivateKey}
        setPublicKey={setPublicKey}
      />
    );
  }
  if (currentPage === 'balance') {
    return (
      <BalancePage
        toCredentials={toCredentials}
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
      <VRUPage
        toSelection={toSelection}
        privateKey={privateKey}
        publicKey={publicKey}
      />
    );
  }
  if (currentPage === 'parts') {
    return (
      <PartsPage
        toSelection={toSelection}
        privateKey={privateKey}
        publicKey={publicKey}
      />
    );
  }
  return <WelcomePage toCredentials={toCredentials} />;
}

export default App;
