export default async function handler(req, res) {
  const swiggyURL =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    // Attempt to fetch data from Swiggy
    const response = await fetch(swiggyURL);

    // Log status and headers for debugging purposes
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);

    // Check for a successful JSON response
    if (
      response.ok &&
      response.headers.get('content-type')?.includes('application/json')
    ) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      // If response is not JSON, return an error message
      const errorText = await response.text();
      console.error('Non-JSON response:', errorText);
      res.status(500).json({
        error: 'Swiggy API did not return JSON data',
        details: errorText,
      });
    }
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    res.status(500).json({ error: 'Error fetching data from Swiggy' });
  }
}
