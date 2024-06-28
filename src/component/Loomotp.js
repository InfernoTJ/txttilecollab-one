import React, { useState } from 'react';
import logo from '../common/static/image/logo.png';
import { useNavigate } from 'react-router-dom';

function Loomotp() {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/loom-register/otp/resgistrationform')
    };
    const navigate = useNavigate('')

    return (
        <div className='loomregister-container'>
            <div className='loom-login'>
                <div className='logo-registration'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='registration-login-form' >
                  <div style={{padding:'20px'}}>
                    <h3 style={{color:'var(--primary-color)'}}>OTP Verification </h3>
                  </div>
             
                <div style={{display:'flex',flexDirection:'column',alignItems:'center' }} className='otp-container'>
                    <div className='form-group'>
                        <label>Enter OTP</label>
                        <input
                            type='text'
                            placeholder='Enter OTP'
                            id='otp'
                            name='otp'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div style={{padding:'20px'}}>
                        <button  className='btn2' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
           </div> 
          </div>
    );
}

export default Loomotp;
