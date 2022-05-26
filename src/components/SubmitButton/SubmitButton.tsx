import React, { MouseEventHandler } from 'react';
import './SubmitButton.css';

type Props = {
  onClick: MouseEventHandler,
  children: JSX.Element | string,
  className?: string,
};

function SubmitButton({
  onClick,
  children,
  className,
}: Props) {
  let classes:string = 'submit';
  if (className !== '') {
    classes += (` ${className}`);
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

SubmitButton.defaultProps = {
  className: '',
};

export default SubmitButton;
