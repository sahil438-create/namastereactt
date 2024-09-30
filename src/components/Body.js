// import { useEffect, useState } from 'react';
// import Shimmer from './Shimmer';
// import useOnlineStatus from './utils/useonlineStatus';
// import Restaurantcard from '../Restaurantcard';

// const Body = () => {
//   const [resList, setnewList] = useState([]);
//   const [filteredrestaurant, setfilteredrestaurant] = useState([]);

//   const [searchtext, setsearchtext] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     const data = await fetch('');

//     const json = await data.json();

//     setnewList(
//       json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
//     );
//     setfilteredrestaurant(
//       json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
//     );
//   };
//   console.log(resList, 'resilist');

//   const onlinestatus = useOnlineStatus();

//   if (onlinestatus == false)
//     return <h1>LOOks like your internet connection is not working fine</h1>;
//   return resList.length === 0 ? (
//     <Shimmer />
//   ) : (
//     <div className='flex flex-col items-start justify-start min-h-screen p-4'>
//       <div className='flex items-center space-x-4'>
//         <input
//           type='text'
//           className='search-box w-full max-w-md p-3 text-base text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full shadow-inner outline-none transition-all duration-300 ease-in-out placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 hover:border-gray-400 hover:shadow-md transform focus:scale-105'
//           value={searchtext}
//           onChange={(e) => {
//             setsearchtext(e.target.value);
//           }}
//           placeholder='Search for restaurants...'
//         />

//         <button
//           className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out'
//           onClick={() => {
//             const filteredrestaurants = resList.filter((res) =>
//               res.info.name.toLowerCase().includes(searchtext.toLowerCase())
//             );
//             setfilteredrestaurant(filteredrestaurants);
//           }}
//         >
//           Search
//         </button>

//         <button
//           className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out'
//           onClick={() => {
//             const resList1 = resList.filter((abc) => abc.info.avgRating > 4.5);
//             setfilteredrestaurant(resList1);
//           }}
//         >
//           Top Rated Restaurant
//         </button>
//       </div>

//       <div className='flex flex-wrap justify-start w-full mt-4'>
//         {filteredrestaurant.map((restaurant) => (
//           <Restaurantcard key={restaurant.info.id} restData={restaurant} />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Body;

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
    const data = await fetch('http://localhost:3000');
    const json = await data.json();
    console.log(json);
    const restaurants =
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
    setnewList(restaurants);
    setfilteredrestaurant(restaurants);
  };

  console.log(resList, 'resilist');

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className='flex flex-col items-start justify-start min-h-screen p-4'>
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          className='search-box w-full max-w-md p-3 text-base text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full shadow-inner outline-none transition-all duration-300 ease-in-out placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 hover:border-gray-400 hover:shadow-md transform focus:scale-105'
          value={searchtext}
          onChange={(e) => setsearchtext(e.target.value)}
          placeholder='Search for restaurants...'
        />

        <button
          className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out'
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
          className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out'
          onClick={() => {
            const resList1 = resList.filter((abc) => abc.info.avgRating > 4.5);
            setfilteredrestaurant(resList1);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className='flex flex-wrap justify-start w-full mt-4'>
        {filteredrestaurant.map((restaurant) => (
          <Restaurantcard key={restaurant.info.id} restData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
