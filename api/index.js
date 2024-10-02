// api/index.js

const axios = require('axios');

const fetchRestaurants = async (req, res) => {
  const url =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

const fetchMenu = async (req, res) => {
  const { id } = req.query; // Get restaurant ID from query parameters
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

const handler = (req, res) => {
  if (req.method === 'GET') {
    if (req.url.startsWith('/restaurants')) {
      return fetchRestaurants(req, res);
    } else if (req.url.startsWith('/menu')) {
      return fetchMenu(req, res);
    } else {
      return res.status(404).json({ error: 'Not Found' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
