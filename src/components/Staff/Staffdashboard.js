import React from 'react'
import './Staffdashboard.css'
import background from '../images/Desktop.png';
import gr from '../images/gr.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import mv from '../images/mv.png';
import mi from '../images/mi.png';
import ms from '../images/ms.png';
function StaffDashboard() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
     <div className='staff-dashboard'>
        <h1 className='staff-dashboard-title'>MAIN MENU</h1>
          <div className='staff-dashboard-buttons'>
            <div className='staff-dashboard-buttons-row'>
              <button className='staff-dashboard-button'>
                <img src={gr} alt='gr' className='staff-dashboard-button-icon' />
                GENERATE REPORTS
                </button>
              <button className='staff-dashboard-button'>
                <img src={mu} alt='mu' className='staff-dashboard-button-icon' />
                MANAGE SELLERS
                </button>
              <button className='staff-dashboard-button'>
                <img src={ms} alt='ms' className='staff-dashboard-button-icon' />
                MANAGE BUYERS
                </button>
                <button className='staff-dashboard-button'>
                <img src={ms} alt='ms' className='staff-dashboard-button-icon' />
                MANAGE COMPANY
                </button>
            </div>
            <div className='staff-dashboard-buttons-row'>
              <button className='staff-dashboard-button'>
                <img src={mv} alt='mv' className='staff-dashboard-button-icon' />
                MANAGE VECHICLES
                </button>
              <button className='staff-dashboard-button'>
                <img src={mi} alt='mi' className='staff-dashboard-button-icon' />
                MANAGE INVOICE
                </button>
              <button className='staff-dashboard-button'>
                <img src={mc} alt='mc' className='staff-dashboard-button-icon' />
                MANAGE CLIENT
                </button>
                <button className='staff-dashboard-button'>
                <img src={mc} alt='mc' className='staff-dashboard-button-icon' />
                MANAGE CONSIGNMENT
                </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StaffDashboard