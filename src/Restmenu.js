import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRestmenu from './components/utils/usehooks';

const Restmenu = () => {
  const { resid } = useParams();
  console.log(resid, 'resid');
  const resinfo1 = useRestmenu(resid);
  return resinfo1 === null ? (
    <div>Loading.....</div>
  ) : (
    <div>
      <h1>MENU</h1>
      <ol>
        {resinfo1.map((inf, index) => (
          <li key={index}>
            {inf.card.info.name}:
            {inf.card.info.price / 100 || inf.card.info.defaultPrice / 100}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Restmenu;
