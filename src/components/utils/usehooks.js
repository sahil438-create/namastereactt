import { useEffect, useState } from 'react';

const useRestmenu = (resid12) => {
  const [resinfo, setresinfo] = useState(null);
  const [itemname, setname] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(
      'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=' +
        resid12 +
        '&catalog_qa=undefined&submitAction=ENTER'
    );

    const json = await response.json();
    if (
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards
    ) {
      setresinfo(
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
          ?.card?.itemCards
      );
    }
  };

  return resinfo;
};
export default useRestmenu;
