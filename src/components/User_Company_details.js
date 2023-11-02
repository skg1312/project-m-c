import React, { useState } from 'react';
import axios from 'axios';
import './User_Company_details.css'
import Icon from './user-icon.png';
function UserCompanyDetails() {
  const [newCompany, setNewCompany] = useState({
    particular: '',
    country: '',
    State: '',
    'Registration type': '',
    'party type': '',
    'GST No': '',
    contact: '',
    'office address': '',
    pincode: '',
  });

  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/companies/add', newCompany);
      setNewCompany({
        particular: '',
        country: '',
        State: '',
        'Registration type': '',
        'party type': '',
        'GST No': '',
        contact: '',
        'office address': '',
        pincode: '',
      });
      setIsDataSaved(true);
    } catch (error) {
      console.error('Error creating company:', error);
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
              <div className='user-nav-container'>
                <div className='user-nav-button' onClick={() => window.location.href='/company'}>
                  <button className='user-nav-button-value'>COMPANY</button>
                  </div>
                </div>
                <div className='user-nav-container'>
                <div className='user-nav-button' onClick={() => window.location.href='/sellers'}>
                  <button className='user-nav-button-value'>SELLER'S</button>
                  </div>
                </div>
                <div className='user-nav-container'>
                <div className='user-nav-button' onClick={() => window.location.href='/buyers'}>
                  <button className='user-nav-button-value'>BUYER'S</button>
                  </div>
                </div>
                <div className='user-nav-container'>
                <div className='user-nav-button' onClick={() => window.location.href='/consignment'}>
                  <button className='user-nav-button-value'>CONSIGNMENT</button>
                  </div>
                </div>
                <div className='user-nav-container'>
                <div className='user-nav-button' onClick={() => window.location.href='/user'}>
                  <button className='user-nav-button-value'>ITEM'S LIST</button>
                  </div>
                </div>
                <div className='user-nav-container'>
                <div className='user-nav-button' onClick={() => window.location.href='/customer'}>
                  <button className='user-nav-button-value'>CUSTOMER</button>
                  </div>
                </div>
            </div>
        </div>
        <div className='user-sidebar'>
        <div className='user-company-deatils'>
            <div className='user-box'>
      <h2 className='user-form-head'>COMPANY DEATAILS</h2>
      <form onSubmit={handleCreateCompany} className='user-form'>
        <div className='user-input'>
          <input className='user-input-first'
            type="text"
            id="particular"
            placeholder="Particulars"
            value={newCompany.particular}
            required
            onChange={(e) => setNewCompany({ ...newCompany, particular: e.target.value })}
          />
        </div>
        <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="country"
            placeholder="Country"
            required
            value={newCompany.country}
            onChange={(e) => setNewCompany({ ...newCompany, country: e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="State"
            placeholder="State"
            value={newCompany.State}
            required
            onChange={(e) => setNewCompany({ ...newCompany, State: e.target.value })}
          />
        </div>
        </div>
        <div className='user-form-style'>
        <div className='user-input'>
            <input className='user-input-value'
            type="text"
            id="registrationType"
            placeholder="Registration Type"
            value={newCompany['Registration type']}
            required
            onChange={(e) => setNewCompany({ ...newCompany, 'Registration type': e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="partyType"
            placeholder="Party Type"
            value={newCompany['party type']}
            required
            onChange={(e) => setNewCompany({ ...newCompany, 'party type': e.target.value })}
          />
        </div>
        </div>
        <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="gstNo"
            placeholder="GST No"
            value={newCompany['GST No']}
            required
            onChange={(e) => setNewCompany({ ...newCompany, 'GST No': e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="contact"
            placeholder="Contact"
            value={newCompany.contact}
            required
            onChange={(e) => setNewCompany({ ...newCompany, contact: e.target.value })}
          />
        </div>
        </div>
        <div className='user-form-style'>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="officeAddress"
            placeholder="Office Address"
            value={newCompany['office address']}
            required
            onChange={(e) => setNewCompany({ ...newCompany, 'office address': e.target.value })}
          />
        </div>
        <div className='user-input'>
          <input className='user-input-value'
            type="text"
            id="pincode"
            placeholder="Pincode"
            value={newCompany.pincode}
            required
            onChange={(e) => setNewCompany({ ...newCompany, pincode: e.target.value })}
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

export default UserCompanyDetails;
