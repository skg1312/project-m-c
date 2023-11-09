import React from 'react';
import AdminCreateInvoice from './components/Admin/AdminCreateInvoice';
import Admindashboard from './components/Admin/Admindashboard';
import StaffDashboard from './components/Staff/Staffdashboard';
import UserDashboard from './components/User/Userdashboard';
import BuyerManage from './components/Manage/BuyerManage';
import SellerManage from './components/Manage/SellerManage';
import VechicleManage from './components/Manage/VechicleManage';
import CompanyManage from './components/Manage/CompanyManage';
import ConsignmentManage from './components/Manage/ConsignmentManage';
import UserManage from './components/Manage/UserManage';
import StaffManage from './components/Manage/StaffManage';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
      <h2 style={{ textAlign: 'center' }}>Admin dashboard</h2>
      <Admindashboard />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Staff dashboard</h2>
      <StaffDashboard />
      <hr />
      <h2 style={{ textAlign: 'center' }}>User dashboard</h2>
      <UserDashboard />
      <hr />
      <hr />
      <h1 style={{ textAlign: 'center' }}>Manage</h1>
      <h2 style={{ textAlign: 'center' }}>Buyer Manage</h2>
      <BuyerManage />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Seller Manage</h2>
      <SellerManage />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Vechicle Manage</h2>
      <VechicleManage />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Company Manage</h2>
      <CompanyManage />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Consignment Manage</h2>
      <ConsignmentManage />
      <hr />
      <h2 style={{ textAlign: 'center' }}>User Manage</h2>
      <UserManage />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Staff Manage </h2>
      <StaffManage />
      <hr />
      <hr />
      <h1 style={{ textAlign: 'center' }}>Invoice</h1>
      <p style={{ textAlign: 'center' }}>Not connected to the backend</p>
      <AdminCreateInvoice />
    </div>
  );
}

export default App;
