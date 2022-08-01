import React, { useState } from 'react';
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
  const [organisation, setOrganisation] = useState(0);
  const [username, setUsername] = useState('');

  const toCredentials = () => setCurrentPage('credentials');
  const toBalance = () => setCurrentPage('balance');
  const toWelcome = () => setCurrentPage('welcome');
  const toSelection = () => setCurrentPage('select');
  const toVRU = () => setCurrentPage('vru');
  const toParts = () => setCurrentPage('parts');

  if (currentPage === 'credentials') {
    return (
      <CredentialPage
        setUsername={setUsername}
        privateKey={privateKey}
        publicKey={publicKey}
        toSelection={toSelection}
        toWelcome={toWelcome}
        setPrivateKey={setPrivateKey}
        setPublicKey={setPublicKey}
        setOrganisation={setOrganisation}
      />
    );
  }
  if (currentPage === 'select') {
    return (
      <SelectPage
        username={username}
        toCredentials={toCredentials}
        toBalance={toBalance}
        toVRU={toVRU}
        toParts={toParts}
        organisation={organisation}
      />
    );
  }
  if (currentPage === 'balance') {
    return (
      <BalancePage
        toSelection={toSelection}
        privateKey={privateKey}
        publicKey={publicKey}
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
