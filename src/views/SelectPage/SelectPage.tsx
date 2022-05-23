import React from 'react';

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
      <button type="button" className="submit" onClick={toBalance}>
        Balance
      </button>
      <button type="button" className="submit" onClick={toVRU}>
        VRU
      </button>
      <button type="button" className="submit" onClick={toParts}>
        Parts
      </button>
      <button type="button" className="submit" onClick={toCredentials}>
        Back
      </button>

    </div>
  );
}

export default SelectPage;
