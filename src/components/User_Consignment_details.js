import React, { useState } from 'react';
import axios from 'axios';
import './User_Consignment_details.css'
import Icon from './user-icon.png';
function UserConsignmentDetails() {
    const [newConsignment, setNewConsignment] = useState({
      itemDetails: '',
      itemQuantity: '',
      itemHSN: '',
      itemQuantityKg: '',
      itemAmount: '',
      itemRate: '',
    });
  const [isDataSaved, setIsDataSaved] = useState(false);
    const handleCreateConsignment = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/consignments/add', newConsignment);
        setNewConsignment({
          itemDetails: '',
          itemQuantity: '',
          itemHSN: '',
          itemQuantityKg: '',
          itemAmount: '',
          itemRate: '',
        });
        setIsDataSaved(true);
      } catch (error) {
        console.error('Error creating consignment:', error);
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
    <h2 className='user-form-head'>CONSIGNMENT DETAILS</h2>
    <form onSubmit={handleCreateConsignment} className='user-form'>
      <div className='user-input'>
        <input className='user-input-first'
          type="text"
          id="itemDetails"
          placeholder="Item Details"
          value={newConsignment.itemDetails}
          required
          onChange={(e) => setNewConsignment({ ...newConsignment, itemDetails: e.target.value })}
        />
      </div>
      <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="itemQuantity"
            placeholder="Item Quantity"
            required
            value={newConsignment.itemQuantity}
            onChange={(e) => setNewConsignment({ ...newConsignment, itemQuantity: e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="itemHSN"
            placeholder="Item HSN/SAC"
            required
            value={newConsignment.itemHSN}
            onChange={(e) => setNewConsignment({ ...newConsignment, itemHSN: e.target.value })}
          />
        </div>
      </div>
      <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="itemQuantityKg"
            placeholder="Item Quantity as per kg"
            required
            value={newConsignment.itemQuantityKg}
            onChange={(e) => setNewConsignment({ ...newConsignment, itemQuantityKg: e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="itemAmount"
            placeholder="Item Amount"
            required
            value={newConsignment.itemAmount}
            onChange={(e) => setNewConsignment({ ...newConsignment, itemAmount: e.target.value })}
          />
        </div>
      </div>
      <div className='user-checkbox'>
  <label>
    <input type="checkbox" required/>
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

export default UserConsignmentDetails;


