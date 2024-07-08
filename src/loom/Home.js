
import React, { useEffect, useState } from 'react';
import '../common/static/css/home.css';
import userr from '../common/static/image/user.jpg';
// import img9 from '../common/static/image/img9.webp';
import img12 from '../common/static/image/img12.png';

function Home() {

  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

const [nouser,setnouser]=useState()
const [loomownerc,setloomownerc]=useState()
const [tradercount,settradercount]=useState()
const [totalenquires,settotalenquires]=useState()


useEffect(() => {

  const calculateuser = ()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/getappuser.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log('got user')
      
        setnouser(result.length);
        // setnouser(result.AppUserId.length)
      })
      .catch((error) => console.error(error));

  }
  const calculateloom =()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=LoomOrTrader&Colvalue=L", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log('got looms')
        setloomownerc(result.length)
      })
      .catch((error) => console.error(error));
  }
  const calculatetraders =()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=LoomOrTrader&Colvalue=T", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log('got traders')
        settradercount(result.length)
      })
      .catch((error) => console.error(error));
  }
  const caculatequiries =()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/gettable.php?table=Enquiry", requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log('got quires')
        settotalenquires(result.length)
      })
      .catch((error) => console.error(error));

  }
  caculatequiries()
  calculatetraders()
  calculateloom()
  calculateuser()
}, []);

  return (
    <div>
      <div className="Home_container"> 
        <div className='background-image-container' > 
        <img className="background-image" src={img12} alt="" />   
      </div>
      </div>

      <div className="profileUser-card">
        <img src={userr} alt="User" className="profile-image" />
        <div className="profile-content">
          <div className="profile-details">
            <h2>{user.Name}</h2>
            <h3>Registration Num: {user.RegistrationNumber}</h3>
            <p>Address: {user.Address}</p>
          </div>
          
          <div className='dashboardd-cards'>
          <div className='profile-cards'>
                <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
                  <p style={{ fontSize: "15px", fontWeight: 'bold' }}>Number of Users</p>
                </div>
                <hr />
                <p className='count'>{nouser}</p>
          
            </div>

            <div className='profile-cards'>
            <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
              <p style={{fontSize:"15px",fontWeight:'bold'}}>Number of Loom owner</p>
              </div>
              <hr/>
              <p className='count'>{loomownerc}</p>
            </div>

            <div className='profile-cards'>
              <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
              <p style={{fontSize:"15px",fontWeight:'bold'}}>Number of Fabric trader</p>
              </div>
              <hr/>
              <p className='count'>{tradercount}</p>
            </div>

           
            <div className='profile-cards'>
            <div className='company-card' style={{ background: 'var(--secondary-color)', padding:'5px',color:"white" }}>
              <p style={{fontSize:"15px",fontWeight:'bold'}}>Job Work Enquiries</p>
              </div>
              <hr/>
              <p className='count'>{totalenquires}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

