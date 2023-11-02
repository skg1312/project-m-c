import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffList() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    // Fetch staff data from your Express API
    axios.get('http://localhost:5000/staff/list')
      .then((response) => {
        setStaffList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Staff Members</h2>
      <ul>
        {staffList.map((staff, index) => (
          <li key={index}>
            <p>Name: {staff.Name}</p>
            <p>Email: {staff.Email}</p>
            <p>Access: {staff.Access}</p>
            <p>Id Proof: {staff.IdProof}</p>
            <p>Office Branch: {staff.OfficeBranch}</p>
            <p>Number: {staff.Number}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffList;
