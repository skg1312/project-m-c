import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    // Fetch user data from your Express API
    axios.get('http://localhost:5000/users/userdet')
      .then((res) => {
        setUserlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = (Email, Password) => {
    // Check user credentials and set the authenticated user if valid
    const authenticatedUser = userlist.find(user => user.Email === Email && user.Password === Password);
  
    console.log('Provided email:', Email);
    console.log('Provided password:', Password);
    console.log('User list:', userlist);
  
    if (authenticatedUser) {
      console.log('Authenticated user:', authenticatedUser);
      setUser(authenticatedUser);
    } else {
      console.error('Login failed: Invalid email or password');
    }
  };
  

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, userlist, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
