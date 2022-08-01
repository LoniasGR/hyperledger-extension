import React from 'react';
import Button from '../../components/Button/Button';

type Props = {
  organisation: number,
  username: string,
  toCredentials:() => void,
  toBalance:() => void,
  toVRU: () => void,
  toParts: () => void,
};
function SelectPage({
  toCredentials, toBalance, toVRU, toParts, organisation, username,
}: Props) {
  return (
    <div>
      <h2>
        Welcome,
        {' '}
        {username}
      </h2>
      {organisation === 1 && <Button fullWidth onClick={toBalance}>Balance</Button>}
      {organisation === 2 && <Button fullWidth onClick={toVRU}>VRU</Button>}
      {organisation === 3 && <Button fullWidth onClick={toParts}>Parts</Button>}
      <Button fullWidth onClick={toCredentials}>Back</Button>
    </div>
  );
}

export default SelectPage;
