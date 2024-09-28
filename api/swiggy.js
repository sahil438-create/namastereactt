// // api/swiggy.js
// export default async function handler(req, res) {
//   const apiUrl =
//     'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     res.status(200).json(data); // Send the API response back to your React app
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching data from API' });
//   }
// }
