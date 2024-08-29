import React from 'react';
import { useRouteError } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h1>oops!!! Something went Wrong</h1>
      <h2>
        {err.status}:{err.statusText}
      </h2>
    </div>
  );
};
export default Error;
