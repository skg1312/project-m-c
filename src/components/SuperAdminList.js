import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SuperAdminList() {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(() => {
    // Fetch superadmin data from your Express API
    axios.get('http://localhost:5000/superadmin/superadmindet')
      .then((response) => {
        setSuperAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching superadmin data:', error);
      });
  }, []);

  return (
    <div>
      <h2>SuperAdmins</h2>
      <ul>
        {superAdmins.map((superAdmin, index) => (
          <li key={index}>
            <p>Name: {superAdmin.Name}</p>
            <p>Email: {superAdmin.Email}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuperAdminList;
