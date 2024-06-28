import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../common/static/image/logo.png'

const LoomForgot_otp = () => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/forgot-password/otp')
    };
    const navigate = useNavigate('')
  return (
    <div className='loomregister-container'>
            <div className='loom-login'>
                <div className='logo-registration'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='registration-login-form' >
                
             
                <div className='otp-container'>
                    <div className='form-group'>
                        <label>Enter OTP</label>
                        <input
                            type='text'
                            placeholder='Enter OTP'
                            id='otp'
                            name='otp'
                            // value={otp}
                            // onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button className='btn2' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div> 
          </div>
  )
}

export default LoomForgot_otp
