// import React, { lazy, Suspense, useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import myimage from './download.jpg';
// import Body from './components/Body';
// import Error from './error';
// import Contact from './Contact';
// import Resinfo from './Resinfo';
// import Restmenu from './Restmenu';
// import './App.css';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Header from './components/header';

// const Grocery = lazy(() => import('./components/Grocery'));

// const Applayout = () => {
//   const [mode, setMode] = useState('DARKMODE');
//   const [Dark, setDark] = useState(
//     'bg-green dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl font-mono'
//   );

//   const toggleDarkMode = () => {
//     setMode((prevMode) => {
//       const newMode = prevMode === 'DARKMODE' ? 'LIGHTMODE' : 'DARKMODE';
//       setDark(
//         newMode === 'DARKMODE'
//           ? 'bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl font-mono text-amber-600'
//           : 'bg-green dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl font-mono'
//       );
//       return newMode;
//     });
//   };

//   return (
//     <div className={Dark}>
//       <button
//         className='px-4 bg-green-100 m-4 rounded-lg'
//         onClick={toggleDarkMode}
//       >
//         {mode}
//       </button>
//       <Header />
//       <Outlet />
//     </div>
//   );
// };

// const About = () => {
//   return (
//     <div>
//       <h1>This is About</h1>
//     </div>
//   );
// };

// const approuter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Applayout />,
//     children: [
//       {
//         path: 'about',
//         element: <About />,
//       },
//       {
//         path: 'contact',
//         element: <Contact />,
//       },
//       {
//         path: 'grocery',
//         element: (
//           <Suspense fallback={<h1>Loading...</h1>}>
//             <Grocery />
//           </Suspense>
//         ),
//       },
//       {
//         path: '/',
//         element: <Body />,
//       },
//       {
//         path: 'home',
//         element: <Body />,
//       },
//       {
//         path: ':ResName/:resid',
//         element: <Restmenu />,
//       },
//     ],
//   },
// ]);
