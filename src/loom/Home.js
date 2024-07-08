
import React from 'react';
import '../common/static/css/home.css';
import user from '../common/static/image/user.jpg';
// import img9 from '../common/static/image/img9.webp';
import img12 from '../common/static/image/img12.png';

function Home() {
  return (
    <div>
      <div className="Home_container"> 
        <div className='background-image-container' > 
        <img className="background-image" src={img12} alt="" />   
      </div>
      </div>

      <div className="profileUser-card">
        <img src={user} alt="User" className="profile-image" />
        <div className="profile-content">
          <div className="profile-details">
            <h2>Vivek Textiles</h2>
            <h3>Registration Num: LU00529</h3>
            <p>Address: YT park</p>
          </div>
          
          <div className='dashboardd-cards'>
          <div className='profile-cards'>
                <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
                  <p style={{ fontSize: "15px", fontWeight: 'bold' }}>Number of Users</p>
                </div>
                <hr />
                <p className='count'>50+</p>
          
            </div>

            <div className='profile-cards'>
            <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
              <p style={{fontSize:"15px",fontWeight:'bold'}}>Number of Loom owner</p>
              </div>
              <hr/>
              <p className='count'>50</p>
            </div>

            <div className='profile-cards'>
              <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
              <p style={{fontSize:"15px",fontWeight:'bold'}}>Number of Fabric trader</p>
              </div>
              <hr/>
              <p className='count'>50</p>
            </div>

           
            <div className='profile-cards'>
            <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
              <p style={{fontSize:"15px",fontWeight:'bold'}}>Job Work Enquiries</p>
              </div>
              <hr/>
              <p className='count'>50</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

