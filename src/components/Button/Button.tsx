import React, { MouseEventHandler } from 'react';
import './Button.css';

type Props = {
  onClick: MouseEventHandler,
  children: JSX.Element | string,
  fullWidth?: boolean,
  className?: string,
  disabled?: boolean,
};

function Button({
  onClick,
  disabled,
  fullWidth,
  children,
  className,
}: Props) {
  let classes:string = '';
  if (className !== '') {
    classes += (` ${className}`);
  }
  if (fullWidth) {
    classes += ' submit';
  }
  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  fullWidth: false,
  disabled: false,
};

export default Button;
