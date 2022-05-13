import React, { ChangeEvent } from 'react';
import { arrayBufferToString } from '../../utils/utils';
import './CredentialPage.css';

type Props = {
  toBalance: () => void,
  toWelcome: () => void,
  privateKey: string,
  publicKey: string,
  changePrivateKey: (newKey: string) => void,
  changePublicKey: (newKey: string) => void,
};

function readKey(
  e: ChangeEvent,
  changeKey: (newKey: string) => void,
) {
  // TODO: Some error logging  const reader = new FileReader();
  e.preventDefault();
  const reader = new FileReader();
  const target = e.target as HTMLInputElement;

  reader.onload = () => {
    const newKey = reader.result || '';
    if (typeof newKey !== 'string') {
      const newNewKey = arrayBufferToString(newKey);
      changeKey(newNewKey);
    } else { changeKey(newKey); }
  };
  if (target.files !== null) {
    reader.readAsText(target.files[0]);
  }
}

function CredentialPage(props: Props) {
  const {
    toBalance,
    toWelcome,
    publicKey, privateKey, changePrivateKey, changePublicKey,
  } = props;
  return (
    <div id="second-page">
      <h1>Insert your private and public key to continue.</h1>
      <form>
        <div className="vertical centered">
          <p>Private key:</p>
          <label htmlFor="private-key" id="private-key-label">
            Select private key
            <input type="file" id="private-key" onChange={(e) => readKey(e, changePrivateKey)} />
          </label>
        </div>

        <div className="vertical centered">
          <p>Public key:</p>
          <label htmlFor="public-key" id="public-key-label">
            Select public key
            <input type="file" id="public-key" onChange={(e) => readKey(e, changePublicKey)} />
          </label>
        </div>

        <div className="centered">
          <button type="button" className="previous" onClick={toWelcome}>
            &#8249; Back
          </button>
          <button type="button" className="next" onClick={toBalance}>
            Next &#8250;
          </button>
        </div>
      </form>
    </div>
  );
}

export default CredentialPage;
