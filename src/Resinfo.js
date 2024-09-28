import { useState, useEffect } from 'react';
import Shimmer from './components/Shimmer';
const Resinfo = () => {
  console.log('sahil');
  const [resinfo, setresinfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      '/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=30531&catalog_qa=undefined&submitAction=ENTER'
    );

    const json = await data.json();

    console.log(json);

    setresinfo(json.data);
  };

  if (resinfo === null) return <Shimmer />;

  const { name, id, avgRating, cuisines } = resinfo?.cards[0]?.card?.card?.info;

  const { itemcards } =
    resinfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.title;

  console.log(resinfo, 'resinfo');

  return (
    <div>
      <h1>{name}</h1>
      <h1>{id}</h1>
      <h1>{avgRating}</h1>
      <h1>{cuisines.join(',')}</h1>
    </div>
  );
};

export default Resinfo;
