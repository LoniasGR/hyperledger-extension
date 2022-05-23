import React from 'react';

import './VRUPage.css';

type Props = {
  toSelection: () => void,
};

function VRUPage({ toSelection }: Props) {
  return (
    <>
      <div className="centered">
        <label htmlFor="meeting-time">
          Start time:
          <input type="datetime-local" />
        </label>
        <label htmlFor="meeting-time">
          End time:
          <input type="datetime-local" />
        </label>
      </div>
      <div className="centered">
        <button type="button" className="previous" onClick={toSelection}>
          &#8249; Back
        </button>
      </div>
    </>
  );
}

export default VRUPage;
