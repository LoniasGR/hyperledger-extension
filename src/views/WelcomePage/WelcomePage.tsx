import React from 'react';
import './WelcomePage.css';

type Props = {
  toCredentials: () => void,
};

function WelcomePage(props: Props) {
  const { toCredentials } = props;
  return (
    <div>
      <h1>Welcome to the Pledger wallet!</h1>
      <div className="center-image">
        <img src="http://www.pledger-project.eu/sites/all/themes/shinbun/logo_inverse.png" alt="Pledger Logo" />
        <button type="button" className="submit" onClick={toCredentials}>Go</button>
      </div>
    </div>
  );
}

export default WelcomePage;
