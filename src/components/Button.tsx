import React, { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...rest }, ref) => {
  return (
    <button className="p-1 rounded border border-neutral-300 bg-neutral-200 cursor-pointer active:bg-neutral-300 hover:bg-neutral-100" ref={ref} {...rest}>
      {children}
    </button>
  );
});

export default Button;