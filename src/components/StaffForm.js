import React, { useState } from 'react';
import axios from 'axios';

function StaffForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState('');
  const [idProof, setIdProof] = useState('');
  const [officeBranch, setOfficeBranch] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/staff/add', {
        Name: name,
        Email: email,
        Password: password,
        Access: access,
        IdProof: idProof,
        OfficeBranch: officeBranch,
        Number: number,
        // Add more fields as needed
      });

      console.log('Staff member created:', response.data);
    } catch (error) {
      console.error('Error creating Staff member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Access" name="Access" value={access} onChange={(e) => setAccess(e.target.value)} />
      <input type="text" placeholder="ID Proof" name="IdProof" value={idProof} onChange={(e) => setIdProof(e.target.value)} />
      <input type="text" placeholder="Office Branch" name="OfficeBranch" value={officeBranch} onChange={(e) => setOfficeBranch(e.target.value)} />
      <input type="text" placeholder="Number" name="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
      {/* Add more input fields for additional fields as needed */}
      <button type="submit">Create Staff Member</button>
    </form>
  );
}

export default StaffForm;
