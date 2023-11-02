import React from 'react'
import './Staff_Dashbord.css'

function StaffDashbord() {
  return (
    <div className='dashboard'>
    <div className='dashboard-container'>    
            <div className='dashboard-nav-button'>
                <button className='dashboard-nav-button-value' onClick={() => window.location.href='/company'}>
                  COMPANY
                  </button>
            </div>
            <div className='dashboard-nav-button'>
                <button className='dashboard-nav-button-value' onClick={() => window.location.href='/company'}>
                  COMPANY
                  </button>
            </div>
            <div className='dashboard-nav-button'>
                <button className='dashboard-nav-button-value' onClick={() => window.location.href='/company'}>
                  COMPANY
                  </button>
            </div>
            <div className='dashboard-nav-button'>
                <button className='dashboard-nav-button-value' onClick={() => window.location.href='/company'}>
                  COMPANY
                  </button>
            </div>
            <div className='dashboard-nav-button'>
                <button className='dashboard-nav-button-value' onClick={() => window.location.href='/company'}>
                  COMPANY
                  </button>
            </div>
            <div className='dashboard-nav-button'>
                <button className='dashboard-nav-button-value' onClick={() => window.location.href='/company'}>
                  COMPANY
                  </button>
        </div>
    </div>
</div>
  )
}

export default StaffDashbord