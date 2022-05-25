import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { arrayBufferToString, getActualStorageData, setStorageData } from '../../utils/utils';
import './CredentialPage.css';

type Props = {
  toSelection: () => void,
  toWelcome: () => void,
  setPrivateKey: (newKey: string) => void,
  setPublicKey: (newKey: string) => void,
};

function readKey(
  e: ChangeEvent,
  keyType: string,
  changeKey: (newKey: string) => void,
  changeKeyName: (newKeyName: string) => void,
) {
  // TODO: Some error logging
  e.preventDefault();
  const reader = new FileReader();
  const target = e.target as HTMLInputElement;

  reader.onload = () => {
    let newKey = reader.result || '';
    if (typeof newKey !== 'string') {
      newKey = arrayBufferToString(newKey);
    }
    changeKey(newKey);
    if (keyType === 'private') {
      const privateKey = newKey;
      setStorageData({ privateKey });
    } else {
      const publicKey = newKey;
      setStorageData({ publicKey });
    }
  };

  if (target.files !== null) {
    changeKeyName(target.files[0].name);
    if (keyType === 'private') {
      const privateKeyFilename = target.files[0].name;
      setStorageData({ privateKeyFilename });
    } else {
      const publicKeyFilename = target.files[0].name;
      setStorageData({ publicKeyFilename });
    }
    reader.readAsText(target.files[0]);
  }
}

function CredentialPage({
  toSelection, toWelcome, setPrivateKey, setPublicKey,
}: Props) {
  const [privateKeyFilename, setPrivateKeyFilename] = useState('');
  const [publicKeyFilename, setPublicKeyFilename] = useState('');

  const updateKeys = useCallback(async () => {
    const privateFilename = await getActualStorageData('privateKeyFilename');
    const privateKey = await getActualStorageData('privateKey');
    if (privateFilename !== '' && privateKey !== '') {
      setPrivateKeyFilename(privateFilename);
      setPrivateKey(privateKey);
    }

    const publicFilename = await getActualStorageData('publicKeyFilename');
    const publicKey = await getActualStorageData('publicKey');
    if (publicFilename !== '' && publicKey !== '') {
      setPublicKeyFilename(publicFilename);
      setPublicKey(publicKey);
    }
  }, []);

  useEffect(() => {
    updateKeys()
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="second-page">
      <h1>Insert your private and public key to continue.</h1>
      <form>
        <div className="vertical centered">
          <p>Private key:</p>
          <label htmlFor="private-key" id="private-key-label">
            {privateKeyFilename === '' ? 'Select private key' : (
              <p>
                <strong>File: </strong>
                {`${privateKeyFilename}`}
              </p>
            )}
            <input type="file" id="private-key" onChange={(e) => readKey(e, 'private', setPrivateKey, setPrivateKeyFilename)} />
          </label>
        </div>

        <div className="vertical centered">
          <p>Public key:</p>
          <label htmlFor="public-key" id="public-key-label">
            {publicKeyFilename === '' ? 'Select public key' : (
              <p>
                <strong>File: </strong>
                {`${publicKeyFilename}`}
              </p>
            )}
            <input type="file" id="public-key" onChange={(e) => readKey(e, 'public', setPublicKey, setPublicKeyFilename)} />
          </label>
        </div>

        <div className="centered">
          <button type="button" className="previous" onClick={toWelcome}>
            &#8249; Back
          </button>
          <button type="button" className="next" onClick={toSelection}>
            Next &#8250;
          </button>
        </div>
      </form>
    </div>
  );
}

export default CredentialPage;
