import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Define the Swiggy API endpoint you want to fetch data from
  const swiggyURL =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    // Fetch data from the Swiggy API
    const response = await fetch(swiggyURL);
    const data = await response.json();

    // Send the data back to the client
    res.status(200).json(data);
  } catch (error) {
    // Handle errors by sending an error message to the client
    res.status(500).json({ error: 'Error fetching data from Swiggy' });
  }
}
