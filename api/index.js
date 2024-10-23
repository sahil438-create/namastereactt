const express = require('express');
const axios = require('axios');

const app = express();

// Manually add CORS headers middleware
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://sahil438-create.github.io'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Handle OPTIONS preflight requests
app.options('/api/*', (req, res) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://sahil438-create.github.io'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.sendStatus(204); // No Content
});

// Function to make requests with retries
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      if (i < retries - 1) {
        console.error(`Retrying... (${i + 1}/${retries})`);
      } else {
        throw error; // Throw error if all retries fail
      }
    }
  }
};

// Route 1: Fetch Swiggy restaurant list
app.get('/api/restaurants', async (req, res) => {
  const url =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    const data = await fetchWithRetry(url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route 2: Fetch Swiggy restaurant menu by restaurant ID
app.get('/api/ResName/:id', async (req, res) => {
  const resid12 = req.params.id;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resid12}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const data = await fetchWithRetry(url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching menu details:', error.message);
    res.status(500).json({ error: 'Failed to fetch menu details' });
  }
});

// Export the Express app as a Vercel serverless function
module.exports = app;
