export default async function handler(req, res) {
  const swiggyURL =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    const response = await fetch(swiggyURL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }, // Optional: Some servers use User-Agent checks
    });

    const contentType = response.headers.get('content-type');

    // Check if the response is JSON, otherwise handle as error
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(500).json({
        error: 'Swiggy API did not return JSON data',
        details:
          'Received HTML instead of JSON; likely due to CORS or bot-blocking.',
      });
    }
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    res.status(500).json({ error: 'Error fetching data from Swiggy' });
  }
}
