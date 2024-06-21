import './Error.css';
import React from 'react';

interface Props extends React.PropsWithChildren {
  error: boolean;
  handleError: (status: boolean) => void;
}

const Error: React.FC<Props> = ({error, handleError, children}) => {
  return (
    <>
      {error ? (
        <div className="error-alert">
          {children}
          <span className="close" onClick={() => handleError(false)}>&#10006;</span>
        </div>
      ): null}
    </>
  );
};

export default Error;