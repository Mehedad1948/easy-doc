import React, { ReactNode } from 'react';
interface ChildProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

function Button({ children, onClick, className }: ChildProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={
        className +
        ' ' +
        `bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded`
      }
    >
      {children}
    </button>
  );
}

export default Button;
