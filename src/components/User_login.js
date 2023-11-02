import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User_login.css';
import  background  from './background.png';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from your Express API
    axios.get('http://localhost:5000/users/userdet')
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleLogin = () => {
    // Find a user with the provided email and password
    const authenticatedUser = userList.find((user) => user.Email === email && user.Password === password);

    if (authenticatedUser) {
      setUser(authenticatedUser);
      window.location.href='/company'
      setErrorMessage('');
    } else {
      setUser(null);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <div className='login-container'> 
      <div className='login'>
      <h2 className='login-head'>USER LOGIN</h2>
      <div className='login-form'>
        <div className='login-email'>
            <h3 className='label'>Email</h3>
            <br />
            <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
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
      <button onClick={handleLogin} className='login-button-value'>Login</button>
        </div>
        <div className='login-error'>
      {errorMessage && <p>{errorMessage}</p>}
      {user && (
        <div>
          <p>Welcome, {user.Name}!</p>
          {/* Display user-specific content here */}
        </div>
      )}
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
    
    </div>
  );
}

export default UserLogin;
