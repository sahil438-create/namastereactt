import { Link } from 'react-router-dom';

const Restaurantcard = (props) => {
  const url =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  const { restData } = props;
  const { cloudinaryImageId, name, costForTwo, avgRating, cuisines, sla, id } =
    restData?.info;

  return (
    <div className=' rounded-lg m-4 p-4   w-[250px] bg-gray md:hover:scale-110 darkFrontPageCoreOffering'>
      <Link to={'/ResName/' + id + '/' + name}>
        <img
          className='flex w-[250px] h-[200px] rounded-lg'
          src={url + cloudinaryImageId}
          width='250px'
        />
        <h3 className='font-bold py-4 text-lg'>{name}</h3>
        <h4>{costForTwo}</h4>
        <h5>{avgRating}</h5>
        <h5>{sla.slaString}</h5>
        <h5>{cuisines.join('     ,    ')}</h5>
      </Link>
    </div>
  );
};

export const C = (Restaurantcard) => {
  return () => {
    return (
      <div>
        <Restaurantcard />
      </div>
    );
  };
};
export default Restaurantcard;
