import React, { MouseEventHandler } from 'react';
import './SubmitButton.css';

type Props = {
  onClick: MouseEventHandler,
  children: JSX.Element | string,
  className?: string,
  disabled?: boolean,
};

function SubmitButton({
  onClick,
  disabled,
  children,
  className,
}: Props) {
  let classes:string = 'submit';
  if (className !== '') {
    classes += (` ${className}`);
  }
  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

SubmitButton.defaultProps = {
  className: '',
  disabled: false,
};

export default SubmitButton;
