import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SuperAdminManagement() {
  const [superadmins, setSuperadmins] = useState([]);
  const [selectedSuperAdmin, setSelectedSuperAdmin] = useState(null);
  const [newSuperAdmin, setNewSuperAdmin] = useState({
    Name: '',
    Email: '',
    Password: '',
    // Add more fields as needed
  });
  const [updatedSuperAdminData, setUpdatedSuperAdminData] = useState({
    Name: '',
    Email: '',
    Password: '',
    // Add more fields as needed
  });

  useEffect(() => {
    // Fetch SuperAdmin data from your Express API
    axios.get('http://localhost:5000/superadmin/superadmindet')
      .then((response) => {
        setSuperadmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching SuperAdmin data:', error);
      });
  }, []);

  const handleCreateSuperAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/superadmin/add', newSuperAdmin);
      setSuperadmins([...superadmins, response.data]);
      setNewSuperAdmin({
        Name: '',
        Email: '',
        Password: '',
      });
    } catch (error) {
      console.error('Error creating SuperAdmin:', error);
    }
  };

  const handleSuperAdminUpdate = (updatedSuperAdmin) => {
    const updatedSuperAdmins = superadmins.map((superadmin) =>
      superadmin._id === updatedSuperAdmin._id ? updatedSuperAdmin : superadmin
    );
    setSuperadmins(updatedSuperAdmins);
    setSelectedSuperAdmin(null);
  };

  const handleSuperAdminDelete = (superAdminId) => {
    axios.delete(`http://localhost:5000/superadmin/delete/${superAdminId}`)
      .then(() => {
        const updatedSuperAdmins = superadmins.filter((superadmin) => superadmin._id !== superAdminId);
        setSuperadmins(updatedSuperAdmins);
        setSelectedSuperAdmin(null);
      })
      .catch((error) => {
        console.error('Error deleting SuperAdmin:', error);
      });
  };

  return (
    <div className="SuperAdminManagement">
      <h2>Create SuperAdmin</h2>
      <form onSubmit={handleCreateSuperAdmin}>
        <input
          type="text"
          placeholder="Name"
          value={newSuperAdmin.Name}
          onChange={(e) => setNewSuperAdmin({ ...newSuperAdmin, Name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newSuperAdmin.Email}
          onChange={(e) => setNewSuperAdmin({ ...newSuperAdmin, Email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newSuperAdmin.Password}
          onChange={(e) => setNewSuperAdmin({ ...newSuperAdmin, Password: e.target.value })}
        />
        {/* Add more input fields as needed */}
        <button type="submit">Create SuperAdmin</button>
      </form>

      <h2>SuperAdmins</h2>
      <ul>
        {superadmins.map((superadmin) => (
          <li key={superadmin._id}>
            <p>Name: {superadmin.Name}</p>
            <p>Email: {superadmin.Email}</p>
            {/* Add more fields as needed */}
            <button onClick={() => setSelectedSuperAdmin(superadmin)}>Update</button>
            <button onClick={() => handleSuperAdminDelete(superadmin._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedSuperAdmin && (
        <div>
          <h2>Update SuperAdmin</h2>
          <SuperAdminUpdate
            superadmin={selectedSuperAdmin}
            onUpdate={handleSuperAdminUpdate}
            updatedSuperAdminData={updatedSuperAdminData}
            setUpdatedSuperAdminData={setUpdatedSuperAdminData}
          />
        </div>
      )}
    </div>
  );
}

function SuperAdminUpdate({ superadmin, onUpdate, updatedSuperAdminData, setUpdatedSuperAdminData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/superadmin/update/${superadmin._id}`, updatedSuperAdminData);
      onUpdate(response.data);
      setUpdatedSuperAdminData({
        Name: '',
        Email: '',
        Password: '',
      });
    } catch (error) {
      console.error('Error updating SuperAdmin:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={updatedSuperAdminData.Name}
        onChange={(e) => setUpdatedSuperAdminData({ ...updatedSuperAdminData, Name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={updatedSuperAdminData.Email}
        onChange={(e) => setUpdatedSuperAdminData({ ...updatedSuperAdminData, Email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={updatedSuperAdminData.Password}
        onChange={(e) => setUpdatedSuperAdminData({ ...updatedSuperAdminData, Password: e.target.value })}
      />
      {/* Add more input fields as needed */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default SuperAdminManagement;
