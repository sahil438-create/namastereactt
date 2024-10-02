import { useEffect, useState } from 'react';
const useRestmenu = (resid12) => {
  const [resinfo, setresinfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(
      `https://namastereactt.onrender.com/ResName/${resid12}`
    );
    // const response = await fetch(`http://localhost:5000/ResName/${resid12}`);

    const json = await response.json();

    if (
      json?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards
    ) {
      setresinfo(
        json?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
          ?.card?.itemCards
      );
    } else {
      setresinfo(
        json?.data?.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
          ?.card?.categories[0]?.itemCards
      );
    }
  };
  return resinfo;
};
export default useRestmenu;
