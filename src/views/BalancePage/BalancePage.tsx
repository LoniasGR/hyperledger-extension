import React from 'react';

type Props = {
  toCredentials: () => void,
};

function BalancePage(props: Props) {
  const { toCredentials } = props;
  return (
    <div>
      <h2 id="username">{`${username}`}</h2>
      <p>Your balance is</p>
      <h3 id="balance">{`${balance}`}</h3>
      <div className="centered">
        <button type="button" className="previous" onClick={toCredentials}>
          &#8249; Back
        </button>
      </div>
    </div>
  );
}

export default BalancePage;
