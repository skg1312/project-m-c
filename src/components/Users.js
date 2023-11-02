import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [newUser, setNewUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    // Add more fields as needed
  });

  const [updatedUserData, setUpdatedUserData] = useState({
    Name: '',
    Email: '',
    Password: '',
    // Add more fields as needed
  });

  useEffect(() => {
    // Fetch user data from your Express API
    axios.get('http://localhost:5000/users/userdet')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/signup', newUser);
      setUsers([...users, response.data]);
      setNewUser({
        Name: '',
        Email: '',
        Password: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUserUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const handleUserDelete = (userId) => {
    axios.delete(`http://localhost:5000/users/delete/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="App">
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.Name}
          onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.Email}
          onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.Password}
          onChange={(e) => setNewUser({ ...newUser, Password: e.target.value })}
        />
        {/* Add more input fields as needed */}
        <button type="submit">Create User</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.Name}</p>
            <p>Email: {user.Email}</p>
            {/* Add more fields as needed */}
            <button onClick={() => setSelectedUser(user)}>Update</button>
            <button onClick={() => handleUserDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>Update User</h2>
          <UserUpdate
            user={selectedUser}
            onUpdate={handleUserUpdate}
            updatedUserData={updatedUserData}
            setUpdatedUserData={setUpdatedUserData}
          />
        </div>
      )}
    </div>
  );
}

function UserUpdate({ user, onUpdate, updatedUserData, setUpdatedUserData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/update/${user._id}`, updatedUserData);
      onUpdate(response.data);
      setUpdatedUserData({
        Name: '',
        Email: '',
        Password: '',
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={updatedUserData.Name}
        onChange={(e) => setUpdatedUserData({ ...updatedUserData, Name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={updatedUserData.Email}
        onChange={(e) => setUpdatedUserData({ ...updatedUserData, Email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={updatedUserData.Password}
        onChange={(e) => setUpdatedUserData({ ...updatedUserData, Password: e.target.value })}
      />
      {/* Add more input fields as needed */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Users;
