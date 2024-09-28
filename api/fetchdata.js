// /api/fetchData.js
export default async function handler(req, res) {
  const apiUrl =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        // You can add headers here if necessary, like an API key
        // 'Authorization': 'Bearer <your-token>',
        // 'Content-Type': 'application/json'
      },
    });

    // Check if the response is okay (status code 2xx)
    if (!response.ok) {
      // Log the status text and code for debugging
      console.error(
        `Error: Received status ${response.status} ${response.statusText} from Swiggy API.`
      );
      return res.status(response.status).json({
        message: `Error fetching data from Swiggy API: ${response.statusText}`,
        status: response.status,
      });
    }

    const data = await response.json(); // Parse JSON response
    res.status(200).json(data); // Return the data to the client
  } catch (error) {
    // Handle network errors or unexpected issues
    console.error('Error fetching data:', error.message);
    res.status(500).json({
      message: 'Failed to fetch data from Swiggy API',
      error: error.message,
    });
  }
}
