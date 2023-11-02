import React, { useState } from 'react';
import axios from 'axios';
import './User_Buyers_details.css'
import Icon from './user-icon.png';

function UserBuyersDetails() {
    const [newBuyer, setNewBuyer] = useState({
      companyName: '',
      companyAddress: '',
      companyGSTNo: '',
      stateName: '',
      stateCode: '',
    });
  

  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleCreateBuyer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/buyers/add', newBuyer);
      setNewBuyer({
        companyName: '',
        companyAddress: '',
        companyGSTNo: '',
        stateName: '',
        stateCode: '',
      });
      setIsDataSaved(true);
    } catch (error) {
      console.error('Error creating seller:', error);
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
    <h2 className='user-form-head'>BUYER'S DETAILS</h2>
    <form onSubmit={ handleCreateBuyer} className='user-form'>
      <div className='user-input'>
        <input className='user-input-first'
          type="text"
          placeholder="Company Name"
          value={newBuyer.companyName}
          required
          onChange={(e) => setNewBuyer({ ...newBuyer, companyName: e.target.value })}
        />
      </div>
      <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            placeholder="Company Address"
            value={newBuyer.companyAddress}
            required
            onChange={(e) => setNewBuyer({ ...newBuyer, companyAddress: e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            placeholder="Company GST No"
            value={newBuyer.companyGSTNo}
            required
            onChange={(e) => setNewBuyer({ ...newBuyer, companyGSTNo: e.target.value })}
          />
        </div>
      </div>
      <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            placeholder="State Name"
            value={newBuyer.stateName}
            required
            onChange={(e) => setNewBuyer({ ...newBuyer, stateName: e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            placeholder="State Code"
            value={newBuyer.stateCode}
            required
            onChange={(e) => setNewBuyer({ ...newBuyer, stateCode: e.target.value })}
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
        <button type="submit" className='user-form-button-value'>SAVE</button>
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

export default UserBuyersDetails;
