export default async function handler(req, res) {
  const swiggyURL =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    // Fetch data directly from Swiggy API
    const response = await fetch(swiggyURL);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    res.status(500).json({ error: 'Error fetching data from Swiggy' });
  }
}
