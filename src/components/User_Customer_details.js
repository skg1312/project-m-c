
import React, { useState } from 'react';
import axios from 'axios';
import './User_Consignment_details.css'
import Icon from './user-icon.png';

function UserCustomerDetails() {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    number: '',
    email: '',
    contact: '',
  });
  const [isDataSaved, setIsDataSaved] = useState(false);
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/customers/add', newCustomer);
      setNewCustomer({
        name: '',
        address: '',
        number: '',
        email: '',
        contact: '',
      });
      setIsDataSaved(true);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

      
  return (
    <div>
      <div className='user-logout'>
        <div className='user-logout-box'>
          <div className='user-logout-container'>
            <div className='user-logout-button' onClick={() => window.location.href='/user'}>
              <button className='user-logout-button-value'>
                
                LOGOUT
              <img className='user-logout-icon' src={Icon} alt='icon'/>

              </button>
            </div>
          </div>
        </div>
      </div>
      
    <div className="user-app">
        <div className='user-navigation'>
            <div className='user-navigation-box'>
              <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/company'}>
                  <button className='user-nav-button-value'>COMPANY</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/sellers'}>
                  <button className='user-nav-button-value'>SELLER'S</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/buyers'}>
                  <button className='user-nav-button-value'>BUYER'S</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/consignment'}>
                  <button className='user-nav-button-value'>CONSIGNMENT</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/user'}>
                  <button className='user-nav-button-value'>ITEM'S LIST</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/customer'}>
                  <button className='user-nav-button-value'>CUSTOMER</button>
                  </div>
                </div>
            </div>
        </div>
        <div className='user-sidebar'>

<div className='user-company-deatils'>
  <div className='user-box'>
  <h2 className='user-form-head'>CUSTOMER DETAILS</h2>
<form onSubmit={handleCreateCustomer} className='user-form'>
  <div className='user-input'>
    <input className='user-input-first'
      type="text"
      id="name"
      placeholder="Name"
      value={newCustomer.name}
      required
      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
    />
  </div>
  <div className='user-form-style'>
    <div className='user-input'>
      <input className='user-input-value'
        type="text"
        id="address"
        placeholder="Address"
        required
        value={newCustomer.address}
        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
      />
    </div>
    <div className='user-input'>
      <input className='user-input-value'
        type="text"
        id="number"
        placeholder="Number"
        required
        value={newCustomer.number}
        onChange={(e) => setNewCustomer({ ...newCustomer, number: e.target.value })}
      />
    </div>
  </div>
  <div className='user-form-style'>
    <div className='user-input'>
      <input className='user-input-value'
        type="text"
        id="email"
        placeholder="Email"
        required
        value={newCustomer.email}
        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
      />
    </div>
    <div className='user-input'>
      <input className='user-input-value'
        type="text"
        id="contact"
        placeholder="Contact"
        required
        value={newCustomer.contact}
        onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
      />
    </div>
  </div>
  <div className='user-checkbox'>
    <label>
      <input type="checkbox" required />
      By creating an account, you agree with Terms and Conditions & Privacy Policy
    </label>
  </div>
  <div className='user-form-button'>
    <button type="submit" className='user-form-button-value'>Save</button>
  </div>
</form>

    {isDataSaved && <p className='user-form-massage'>Data has been saved successfully.</p>}
  </div>
</div>

      </div>
      </div>
      </div>
  );
}

export default UserCustomerDetails;


