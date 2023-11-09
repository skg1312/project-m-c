import React,{useContext,useEffect,useState} from "react";
import axios from 'axios';
const UserAuthContext = React.createContext(null);

const UserAuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userlist, setUserlist] = useState([]); 

  const login = (username,useremail,userpassword) => {
    setUser(username,useremail,userpassword);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/users/list')
    .then(res=>{setUserlist(res.data)
    })
    .catch(err=>{console.log(err)})
  })
 
  const logout = () => {
    setUser(null);
  };
  
  return (
    <UserAuthContext.Provider
      value={{ user, userlist, login, logout }}>
      {props.children}
    </UserAuthContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(UserAuthContext);
};


export { UserAuthProvider, UserAuth };