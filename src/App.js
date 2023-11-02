import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import SuperAdminLogin from './components/SuperAdmin_login';
import UserLogin from './components/User_login';
import StaffLogin from './components/Staff_login';
import UserCompanyDetails from './components/User_Company_details';
import UserSellersDetails from './components/User_Sellers_details';
import UserBuyersDetails from './components/User_Buyers_details';
import UserConsignmentDetails from './components/User_Consignment_details';
import UserCustomerDetails from './components/User_Customer_details';
import UserItemList from './components/User_Item_List';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<UserItemList />} />
          <Route path='/customer' element={<UserCustomerDetails />} />
          <Route path='/consignment' element={<UserConsignmentDetails />} />
          <Route path='/buyers' element={<UserBuyersDetails />} />
          <Route path='/sellers' element={<UserSellersDetails />} />
          <Route path='/company' element={<UserCompanyDetails />} />
          <Route path='/admin/*' element={<SuperAdminLogin />} />
          <Route path='/user/*' element={<UserLogin />} />
          <Route path='/staff/*' element={<StaffLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
