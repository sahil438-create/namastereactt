import { Link } from 'react-router-dom';

const Restaurantcard = (props) => {
  const url =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/';
  const { restData } = props;
  const { cloudinaryImageId, name, costForTwo, avgRating, cuisines, sla, id } =
    restData?.info;

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
      <div className='bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300'>
        <Link to={'/ResName/' + id + '/' + name}>
          <img
            className='w-full h-48 object-cover rounded-t-lg'
            src={url + cloudinaryImageId}
            alt={name}
          />
          <div className='p-4'>
            <h3 className='font-bold text-lg truncate'>{name}</h3>
            <p className='text-gray-500 text-sm'>{costForTwo}</p>
            <div className='flex items-center mt-1'>
              <span className='text-yellow-500 text-sm'>{avgRating} ⭐</span>
            </div>
            <p className='text-gray-400 text-sm'>{sla?.slaString}</p>
            <p className='text-gray-500 text-sm whitespace-normal break-words'>
              {cuisines.join(', ')}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Restaurantcard;
