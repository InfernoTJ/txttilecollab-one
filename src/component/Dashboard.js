import React from 'react';
import '../common/static/css/dashboard.css'

function Dashboard() {

  return (
    <>
    <div className='dashboard-title'>
      <h5>Dashboard of Loom Owner</h5>
    </div>
      <div className='dashboard-container'>
        <div class="card">
          <h6>Loom Details</h6>
        </div>
        <div class="card">
          <h6>Job work enquiry</h6>
        </div>
        <div class="card">
          <h6>Get Yarn Rates</h6>
        </div>
        <div class="card">
          <h6>Live Orders</h6>
        </div>
        <div class="card">
          <h6>Calculations</h6>
        </div>
        <div class="card">
          <h6>Complated Orders</h6>
        </div>

      </div>


    </>

  )
}

export default Dashboard
