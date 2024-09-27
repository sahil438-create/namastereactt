import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext'; // Import CartContext
import { Logo_url } from './utils/url';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

const Header = () => {
  const { cartTotal } = useContext(CartContext); // Get cartTotal from context

  return (
    <div className='flex justify-between bg-pink-50 shadow-lg mb-2 mt-2 px-2'>
      <div>
        <Link to='/home'>
          <img className='w-40 h-32' src={Logo_url} alt='Logo' />
        </Link>
      </div>

      <div className='flex items-center'>
        <ul className='flex items-center p-4 m-4 space-x-2'>
          <li className='px-4'>
            <Link to='/home'>Home</Link>
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
          <li className='px-4'>
            <Link to='/Cart'>Cart ({cartTotal})</Link>{' '}
          </li>
        </ul>
      </div>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <button>Signout</button>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
};

export default Header;
