import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import useOnlineStatus from './utils/useonlineStatus';
import Restaurantcard from '../Restaurantcard';

const Body = () => {
  // console.log(process.env.API_URL);
  const [resList, setnewList] = useState([]);
  const [filteredrestaurant, setfilteredrestaurant] = useState([]);

  const [searchtext, setsearchtext] = useState('');
  // const RestaurantCardPromoted = WithPromotedLabel(Restaurantcard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );

    const json = await data.json();
    console.log(json, 'json');

    setnewList(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setfilteredrestaurant(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const onlinestatus = useOnlineStatus();

  if (onlinestatus == false)
    return <h1>LOOks like your internet connection is not working fine</h1>;
  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=''>
      <div className='flex items-center'>
        <div className='m-4 p-4'>
          <input
            type='text'
            className='border solid border-black'
            value={searchtext}
            onChange={(e) => {
              setsearchtext(e.target.value);
            }}
          />
          <button
            className='px-4 bg-green-100  m-4 rounded-lg '
            onClick={() => {
              const filteredrestaurants = resList.filter((res) =>
                res.info.name.toLowerCase().includes(searchtext.toLowerCase())
              );
              setfilteredrestaurant(filteredrestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className='px-2 bg-green-100  m-6 rounded-lg'
            onClick={() => {
              setfilteredrestaurant(
                resList.filter((abc) => abc.info.avgRating == 4.4)
              );
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className='flex flex-wrap'>
        {filteredrestaurant.map((restaurant) => (
          <Restaurantcard restData={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;
