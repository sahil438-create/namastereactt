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
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from 'react-router-dom';
import Header from './components/header';
import { CartContext, CartProvider } from './components/CartContext';

const Grocery = lazy(() => import('./components/Grocery'));

const Applayout = () => {
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
  );
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
  console.log(showMap, 'showmap');
  const [address, setAddress] = useState(''); // To store the address
  const handleAddAddressClick = () => {
    setShowMap(true);
  };

  const handleMapSelect = (selectedAddress) => {
    setAddress(selectedAddress); // Set the address from the map
  };

  const containerStyle = {
    width: '400px',
    height: '400px',
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const [markerPosition, setMarkerPosition] = useState(center);

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
  console.log(showadd, 'showadd');
  return (
    <div>
      {cart.map((elem, index) => (
        <div key={index}>
          <p>{elem.card.info.name}</p>
          <p>
            {(
              elem.card.info.price / 100 || elem.card.info.defaultPrice / 100
            ).toFixed(2)}
          </p>
        </div>
      ))}
      <h1 className='flex justify-between mb-4'>
        To Pay: {totalValue.toFixed(2)}
      </h1>
      <h1>Choose a delivery address</h1>
      <button
        onClick={handleAddAddressClick}
        className='bg-blue-500 text-white py-2 px-4 rounded'
      >
        Add new Address
      </button>
      <button
        onClick={() => Showaddress()}
        className='bg-blue-500 text-white py-2 px-4 rounded'
      >
        Save and Proceed
      </button>
      <h1>{showadd}</h1>

      {showMap && (
        <>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='mt-4 p-2 border rounded'
            placeholder='Enter your address'
          />
          <GoogleMapComponent
            onSelectLocation={handleMapSelect}
            markerPosition={markerPosition}
            containerStyle={containerStyle}
            center={center}
            handleMapClick={handleMapClick}
          />
        </>
      )}
      <button
        onClick={loadRazorpay}
        className='bg-green-500 text-white py-2 px-4 rounded'
      >
        Pay Now
      </button>
    </div>
  );
};

//Separate Map Component
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

const approuter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'cart', element: <Cart /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'grocery',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: '/', element: <Body /> },
      { path: 'home', element: <Body /> },
      { path: ':ResName/:resid', element: <Restmenu /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <RouterProvider router={approuter} />
  </CartProvider>
);
