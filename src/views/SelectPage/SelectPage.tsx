import React from 'react';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

type Props = {
  toCredentials:() => void,
  toBalance:() => void,
  toVRU: () => void,
  toParts: () => void,
};
function SelectPage({
  toCredentials, toBalance, toVRU, toParts,
}: Props) {
  return (
    <div>
      <SubmitButton onClick={toBalance}>Balance</SubmitButton>
      <SubmitButton onClick={toVRU}>VRU</SubmitButton>
      <SubmitButton onClick={toParts}>Parts</SubmitButton>
      <SubmitButton onClick={toCredentials}>Back</SubmitButton>
    </div>
  );
}

export default SelectPage;
