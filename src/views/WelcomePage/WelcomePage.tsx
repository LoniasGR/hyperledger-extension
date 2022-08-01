import React from 'react';

import Button from '../../components/Button/Button';

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
        <Button fullWidth onClick={toCredentials}>Go</Button>
      </div>
    </div>
  );
}

export default WelcomePage;
