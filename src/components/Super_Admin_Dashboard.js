import React from 'react'
import './Super_Admin_Dashboard.css'

function SuperAdminDashboard() {
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

export default SuperAdminDashboard