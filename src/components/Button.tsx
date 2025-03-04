import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cx } from 'class-variance-authority';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <button
        className='p-1 rounded border border-neutral-300 bg-neutral-200 cursor-pointer active:bg-neutral-300 hover:bg-neutral-100'
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export const TransparentButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        className={cx(
          'p-1 rounded border border-neutral-700 cursor-pointer active:border-neutral-300 hover:border-neutral-200 hover:text-neutral-200',
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
export default Button;
