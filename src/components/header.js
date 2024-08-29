import { Link } from 'react-router-dom';
import { Logo_url } from './utils/url';

const Header = () => {
  return (
    <div className='flex justify-between bg-pink-50 shadow-lg mb-2 mt-2 px-2'>
      <div>
        <Link to='/home'>
          <img className='w-40 h-32' src={Logo_url} />
        </Link>
      </div>

      <div className='flex items-center'>
        <ul className='flex items-center p-4 m-4 space-x-2 '>
          <li className='px-4'>
            <Link to='/Home'>Home</Link>
          </li>

          <li className='px-4'>
            <Link to='/Grocery'>Grocery</Link>
          </li>
          <li className='px-4'>
            <Link to='/about'>About</Link>
          </li>
          <li className='px-4'>
            <Link to='/Contact'>Contact</Link>
          </li>
          <li className='px-4'>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
