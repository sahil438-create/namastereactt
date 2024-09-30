const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Define the endpoint to fetch the Swiggy restaurants list
app.get('/', async (req, res) => {
  const url =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    // Make a GET request to the Swiggy API with headers
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Log the JSON response to the console
    console.log(response.data);

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
