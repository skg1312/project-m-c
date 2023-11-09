import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Adminlogin.css';
import background from '../images/background.png';

function Adminlogin() {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [AdminList, setAdminList] = useState([]);
  const [Admin, setAdmin] = useState(null);

  useEffect(() => {
    // Fetch user data from your Express API
    axios.get('http://localhost:5000/admin')
      .then((response) => {
        setAdminList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleLogin = () => {
    // Find a staff member with the provided email and password
    const authenticatedUser = AdminList.find(
      (admin) => admin.adminemail === Email && admin.adminpassword === password
    );

    if (authenticatedUser) {
      setAdmin(authenticatedUser);
      setErrorMessage(''); // Clear any previous error message
    } else {
      setAdmin(null);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className='login-container'>
        <div className='login'>
          <h2 className='login-head'>ADMIN LOGIN</h2>
          <div className='login-form'>
            <div className='login-email'>
              <h3 className='label'>Email</h3>
              <br />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className='login-input'
              />
            </div>
            <div className='login-password'>
              <h3 className='label'>Password</h3>
              <br />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='login-input'
              />
            </div>
            <br />
            <br />
            <div className='login-button'>
              <button onClick={handleLogin} className='login-button-value'>
                Login
              </button>
            </div>
            <div className='login-error'>
              {errorMessage && <p>{errorMessage}</p>}
              {Admin && (
                <div>
                  <p>Welcome, {Admin.Name}!</p>
                  {/* Display user-specific content here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='login-content'>
        <div className='login-content-head'>
          <h2>COMPANY NAME</h2>
        </div>
        <div className='login-content-body'>
          <h3>Tagline</h3>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
