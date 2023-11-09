// adminauth.js

import axios from 'axios';

// Define the base API URL
const BASE_URL = 'http://your-api-url.com/admin';

export const login = async (adminemail, adminpassword) => {
  try {
    const response = await axios.g(`${BASE_URL}/login`, {
      adminemail,
      adminpassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
