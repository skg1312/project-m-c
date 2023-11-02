import React, { useState } from 'react';
import axios from 'axios';

function SuperAdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/superadmin/add', {
        Name: name,
        Email: email,
        Password: password,
        // Add more fields as needed
      });

      console.log('SuperAdmin created:', response.data);
    } catch (error) {
      console.error('Error creating SuperAdmin:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* Add more input fields for additional fields as needed */}
      <button type="submit">Create SuperAdmin</button>
    </form>
  );
}

export default SuperAdminForm;
