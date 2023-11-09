import React,{useContext,useEffect,useState} from "react";
import axios from 'axios';
const StaffAuthContext = React.createContext(null);

const StaffAuthProvider = (props) => {
  const [staff, setStaff] = useState(null);
  const [stafflist, setStafflist] = useState([]); 

  const login = (staffname,staffemail,staffpassword) => {
    setStaff(staffname,staffemail,staffpassword);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/staff/list')
    .then(res=>{setStafflist(res.data)
    })
    .catch(err=>{console.log(err)})
  })
 
  const logout = () => {
    setStaff(null);
  };
  
  return (
    <StaffAuthContext.Provider
      value={{ staff, stafflist, login, logout }}>
      {props.children}
    </StaffAuthContext.Provider>
  );
};

const StaffUseAuth = () => {
  return useContext(StaffAuthContext);
};


export { StaffAuthProvider, StaffUseAuth };