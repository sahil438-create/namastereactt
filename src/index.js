import React, { lazy, Suspense, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import myimage from './download.jpg';
import Body from './components/Body';
import Error from './error';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Contact from './Contact';
import Resinfo from './Resinfo';
import Restmenu from './Restmenu';
import './App.css';

import {
  ClerkProvider,
  useAuth,
  SignedOut,
  SignIn,
  SignInButton,
  useClerk,
  SignedIn,
  UserButton,
} from '@clerk/clerk-react';

import {
  RouterProvider,
  Routes,
  Outlet,
  useLocation,
  HashRouter,
  useNavigate,
  Route,
  createHashRouter,
  createBrowserRouter,
  Link,
} from 'react-router-dom';
import Header from './components/header';
import { CartContext, CartProvider } from './components/CartContext';
import SignInPage from './components/sign-in';
import Grocery from './components/Grocery';
import SignUpPage from './components/sign-up';

// const Grocery = lazy(() => import('./components/Grocery'));

const RootLayout = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState('DARKMODE');
  const [Dark, setDark] = useState(
    'bg-green dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl font-mono'
  );

  const toggleDarkMode = () => {
    if (mode === 'DARKMODE') {
      setDark(
        'bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl font-mono text-amber-600'
      );
      setMode('LIGHTMODE');
    } else {
      setDark(
        'bg-green dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl font-mono'
      );
      setMode('DARKMODE');
    }
  };

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey='pk_test_cG93ZXJmdWwtc3RhcmZpc2gtNzYuY2xlcmsuYWNjb3VudHMuZGV2JA'
    >
      <div className={Dark}>
        <button
          className='px-4 bg-green-100 m-4 rounded-lg'
          onClick={toggleDarkMode}
        >
          {mode}
        </button>
        <Header />
        <Outlet />
      </div>
    </ClerkProvider>
  );
};

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded]);

  if (!isLoaded) return <Outlet />;

  return <Outlet />;
};

const About = () => {
  return (
    <div>
      <h1>This is About</h1>
    </div>
  );
};

const Cart = () => {
  const { cart } = useContext(CartContext);

  const [showadd, setshowadd] = useState('');

  const [totalValue, setTotalValue] = useState(0); // Total value calculation

  const [showMap, setShowMap] = useState(false); // To control visibility of map and input
  const [address, setAddress] = useState(''); // To store the address
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  }); // Map center
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleAddAddressClick = () => {
    setShowMap(true);
  };

  const handleMapSelect = (selectedAddress) => {
    setAddress(selectedAddress); // Set the address from the map
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarkerPosition({ lat, lng });

    getGeocodeAddress(lat, lng);
  };

  const getGeocodeAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const selectedAddress = results[0].formatted_address;
        handleMapSelect(selectedAddress);
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  // Fetch current location using browser's Geolocation API
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMarkerPosition({ lat, lng }); // Update marker to current location
          setCenter({ lat, lng }); // Center the map on current location
          getGeocodeAddress(lat, lng); // Reverse geocode to get address
        },
        (error) => {
          console.error('Error getting location: ', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Calculate total value whenever the cart changes
  useEffect(() => {
    const total = cart.reduce((sum, elem) => {
      const price =
        elem.card.info.price / 100 || elem.card.info.defaultPrice / 100;
      return sum + price;
    }, 0);
    setTotalValue(total);
  }, [cart]);

  const loadRazorpay = () => {
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => handlePayment();
      document.body.appendChild(script);
    } else {
      handlePayment();
    }
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_vEKLmomRWYZ8C2', // Replace with your Razorpay test key
      amount: totalValue * 100, // Amount in the smallest currency unit (e.g., 50000 paise = 500 INR)
      currency: 'INR',
      name: 'Food Cart',
      description: 'Test Transaction',
      handler: function (response) {
        alert('Payment Successful!');
        console.log('Payment ID:', response.razorpay_payment_id);
      },
      prefill: {
        name: 'Your Name',
        email: 'email@example.com',
        contact: '8950079891',
      },
      notes: {
        address: 'Your Address',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const Showaddress = () => {
    setshowadd(address);
  };

  return (
    <div className='min-h-screen p-8 bg-gray-50 flex flex-col items-center'>
      {/* Cart Items */}
      <div className='bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 mb-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4'>
          Your Cart
        </h1>
        {cart.map((elem, index) => (
          <div
            key={index}
            className='flex justify-between items-center border-b pb-4 mb-4 last:border-none last:pb-0 last:mb-0'
          >
            <div className='text-lg font-medium text-gray-700'>
              {elem.card.info.name}
            </div>
            <div className='text-gray-500'>
              ₹
              {(
                elem.card.info.price / 100 || elem.card.info.defaultPrice / 100
              ).toFixed(2)}
            </div>

            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${elem.card.info.imageId}`}
              alt={elem.card.info.name}
              className='w-24 h-24 rounded-md object-cover shadow-md mb-2'
            />
          </div>
        ))}
        <div className='flex justify-between items-center text-xl font-bold mt-6 border-t pt-4'>
          <h2>Total:</h2>
          <span>₹{totalValue.toFixed(2)}</span>
        </div>
      </div>
      {/* <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/elem.card.info.imageId`}
        alt=''
      /> */}

      {/* Delivery Address Section */}
      <div className='bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 mb-8'>
        <h1 className='text-xl font-bold mb-4 text-gray-800'>
          Choose a delivery address
        </h1>
        <div className='flex space-x-4'>
          <button
            onClick={handleAddAddressClick}
            className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300'
          >
            Add new Address
          </button>
          <button
            onClick={() => Showaddress()}
            className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300'
          >
            Save and Proceed
          </button>
        </div>

        {showadd && <h1 className='text-gray-700 mt-4'>{showadd}</h1>}
      </div>

      {/* Map and Input for Address */}
      {showMap && (
        <div className='bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 mb-8'>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-200'
            placeholder='Enter your address'
          />

          <button
            onClick={handleUseCurrentLocation}
            className='w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 mb-4'
          >
            Use Current Location
          </button>

          <GoogleMapComponent
            onSelectLocation={handleMapSelect}
            markerPosition={markerPosition}
            containerStyle={{ width: '100%', height: '400px' }}
            center={center}
            handleMapClick={handleMapClick}
          />
        </div>
      )}

      {/* Pay Now Button */}
      <button
        onClick={loadRazorpay}
        className='w-full max-w-3xl bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg shadow-lg transition duration-300 text-xl font-semibold'
      >
        Pay Now
      </button>
    </div>
  );
};

// Separate Map Component
const GoogleMapComponent = ({
  onSelectLocation,
  markerPosition,
  containerStyle,
  center,
  handleMapClick,
}) => (
  <LoadScript googleMapsApiKey='AIzaSyCEzAZGTWqc-dzKlgIkXyRHbVG3p_YtNlA'>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleMapClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  </LoadScript>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Body /> },
      { path: '/Contact', element: <Contact /> },
      { path: '/Grocery', element: <Grocery /> },
      { path: '/home', element: <Body /> },
      { path: '/about', element: <About /> },
      { path: '/sign-in/*', element: <SignInPage /> },

      {
        element: <DashboardLayout />,
        path: '',
        children: [
          { path: '/cart', element: <Cart /> },
          { path: '/:ResName/:resid/:name', element: <Restmenu /> },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
