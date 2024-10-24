import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import useOnlineStatus from './utils/useonlineStatus';
import Restaurantcard from '../Restaurantcard';

const Body = () => {
  const [resList, setnewList] = useState([]);
  const [filteredrestaurant, setfilteredrestaurant] = useState([]);
  const [searchtext, setsearchtext] = useState('');
  const onlinestatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch('http://localhost:5000/api/restaurants');

    const json = await data.json();

    const restaurants =
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
    setnewList(restaurants);
    setfilteredrestaurant(restaurants);
  };

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className='flex flex-col items-start justify-start min-h-screen p-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full'>
        <input
          type='text'
          className='w-full sm:w-2/3 p-3 mb-4 sm:mb-0 text-base text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full shadow-inner outline-none transition-all duration-300 ease-in-out placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 hover:border-gray-400 hover:shadow-md'
          value={searchtext}
          onChange={(e) => setsearchtext(e.target.value)}
          placeholder='Search for restaurants...'
        />

        <button
          className='w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out'
          onClick={() => {
            const filteredrestaurants = resList.filter((res) =>
              res.info.name.toLowerCase().includes(searchtext.toLowerCase())
            );
            setfilteredrestaurant(filteredrestaurants);
          }}
        >
          Search
        </button>

        <button
          className='w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out'
          onClick={() => {
            const resList1 = resList.filter((abc) => abc.info.avgRating > 4.5);
            setfilteredrestaurant(resList1);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className='flex flex-wrap justify-start mt-4'>
        {filteredrestaurant.map((restaurant) => (
          <Restaurantcard key={restaurant.info.id} restData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
