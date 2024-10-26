import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './components/CartContext'; // Import CartContext
import useRestmenu from './components/utils/usehooks';

const Restmenu = () => {
  const { resid, name } = useParams();
  const resinfo1 = useRestmenu(resid);
  const { addToCart } = useContext(CartContext);
  console.log(resinfo1, 'hb');

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return resinfo1 === null ? (
    <div>Loading.....</div>
  ) : (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-8'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
          {name}
        </h1>

        <ol className='space-y-6'>
          {resinfo1.map((inf, index) => (
            <li
              key={index}
              className='border-b pb-6 flex justify-between items-start'
            >
              <div className='flex-1 pr-4'>
                <p className='text-lg font-medium text-gray-800'>
                  {inf.card.info.name}
                </p>
                <p className='text-gray-500 mb-2'>
                  ₹
                  {inf.card.info.price / 100 ||
                    inf.card.info.defaultPrice / 100}
                </p>{' '}
                <h1>
                  {inf.card.info.itemAttribute.vegClassifier == 'VEG'
                    ? '🟢'
                    : '🔴'}
                </h1>
                <div className='flex items-center space-x-2 text-sm text-gray-600 mb-2'>
                  <span className='bg-yellow-300 text-white px-2 py-1 rounded'>
                    {inf.card.info.rating || '4.7'}
                  </span>
                  <span>({inf.card.info.reviews || '39'})</span>
                </div>
                <p className='text-gray-600'>
                  {inf.card.info.description?.substring(0, 12000)}
                </p>
              </div>

              <div className='flex flex-col items-center space-y-2'>
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${inf.card.info.imageId}`}
                  alt={inf.card.info.name}
                  className='w-24 h-24 rounded-md object-cover shadow-md mb-2'
                />
                <button
                  onClick={() => handleAddToCart(inf)}
                  className='bg-green-500 text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-green-600 transition-all duration-300'
                >
                  ADD
                </button>
                <p className='text-sm text-gray-500'>Customisable</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Restmenu;
