import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './components/CartContext'; // Import CartContext
import useRestmenu from './components/utils/usehooks';

const Restmenu = () => {
  const { resid } = useParams();
  const resinfo1 = useRestmenu(resid);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

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
            <span>
              <button
                onClick={() => handleAddToCart(inf)}
                className='bg-green-50'
              >
                ADD
              </button>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Restmenu;
