import React, { useState } from 'react';
import axios from 'axios';
import './loginstyles.css'; 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/userdet', { email, password });

      // Check response and handle login logic here
      if (response.data.success) {
        // Successful login, handle redirection or state update
        console.log('Login successful');
      } else {
        // Failed login, handle error message or state update
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className="login">
      <div className="div">
        <div className="group">
          <div className="overlap">
            <input
              type="text"
              className="email-form"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password-form"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="group-wrapper">
              <div className="overlap-group-wrapper">
                <div className="overlap-group">
                 <div
                    className="elements-buttons-big-simple"
                    divClassName="elements-buttons-big-instance"
                    text="Login"
                    onClick={handleLogin}
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
