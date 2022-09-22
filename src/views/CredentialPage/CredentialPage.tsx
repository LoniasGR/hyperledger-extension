import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { getInitInfo } from '../../api/api';
import Button from '../../components/Button/Button';
import { arrayBufferToString, getActualStorageData, setStorageData } from '../../utils/utils';
import './CredentialPage.css';

type Props = {
  privateKey: string,
  publicKey: string,
  toSelection: () => void,
  toWelcome: () => void,
  setPrivateKey: (newKey: string) => void,
  setPublicKey: (newKey: string) => void,
  setOrganisation: (organisation: number) => void,
  setUsername: (username: string) => void,
};

function readKey(
  e: ChangeEvent,
  keyType: string,
  changeKey: (newKey: string) => void,
  setKeySet: (status: boolean) => void,
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
    setKeySet(true);
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
  toSelection,
  toWelcome,
  setPrivateKey,
  setPublicKey,
  setOrganisation,
  privateKey,
  publicKey,
  setUsername,
}: Props) {
  const [privateKeyFilename, setPrivateKeyFilename] = useState('');
  const [publicKeyFilename, setPublicKeyFilename] = useState('');
  const [isPrivateKeySet, setIsPrivateKeySet] = useState(false);
  const [isPublicKeySet, setIsPublicKeySet] = useState(false);

  const [error, setError] = useState('');

  const updateKeys = useCallback(async () => {
    const privateFilename = await getActualStorageData('privateKeyFilename');
    const privateKeyTemp = await getActualStorageData('privateKey');
    if (privateFilename && privateKeyTemp) {
      setPrivateKeyFilename(privateFilename);
      setPrivateKey(privateKeyTemp);
      setIsPrivateKeySet(true);
    }

    const publicFilename = await getActualStorageData('publicKeyFilename');
    const publicKeyTemp = await getActualStorageData('publicKey');
    if (publicFilename && publicKeyTemp) {
      setPublicKeyFilename(publicFilename);
      setPublicKey(publicKeyTemp);
      setIsPublicKeySet(true);
    }
  }, []);

  useEffect(() => {
    updateKeys()
      .catch((err) => console.log(err));
  }, []);

  const onNextClick = async () => {
    getInitInfo(privateKey, publicKey)
      .then((result) => {
        if (result.error !== undefined) {
          setError(result.error);
          return;
        }
        setOrganisation(result.organisation!);
        setUsername(result.username!);
        toSelection();
      });
  };

  return (
    <div id="second-page">
      <h1>Insert your private and public key to continue.</h1>
      <form>
        <div className="vertical centered">
          <p>Private key:</p>
          <label htmlFor="private-key" id="private-key-label">
            {!privateKeyFilename ? 'Select private key' : (
              <p>
                <strong>File: </strong>
                {`${privateKeyFilename}`}
              </p>
            )}
            <input type="file" id="private-key" onChange={(e) => readKey(e, 'private', setPrivateKey, setIsPrivateKeySet, setPrivateKeyFilename)} />
          </label>
        </div>

        <div className="vertical centered">
          <p>Public key:</p>
          <label htmlFor="public-key" id="public-key-label">
            {!publicKeyFilename ? 'Select public key' : (
              <p>
                <strong>File: </strong>
                {`${publicKeyFilename}`}
              </p>
            )}
            <input type="file" id="public-key" onChange={(e) => readKey(e, 'public', setPublicKey, setIsPublicKeySet, setPublicKeyFilename)} />
          </label>
        </div>

        {
          error !== '' && (
          <div>
            <h2>{`Error: ${error}`}</h2>
          </div>
          )
        }

        <div className="centered">
          <Button className="previous" onClick={toWelcome}>
            &#8249; Back
          </Button>
          <Button className="next" disabled={!isPrivateKeySet || !isPublicKeySet} onClick={onNextClick}>
            Next &#8250;
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CredentialPage;
