import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../common/static/image/logo.png'

const Forgot_password = () => {

    const [resetPass, setResetPass] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // navigate('/loom-register/otp/resgistrationform')
    // };
    // const navigate = useNavigate('')
    const navigate = useNavigate('')
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/');
    };

  return (
    <div className='loomregister-container'>
    <div className='loom-login'>
        <div className='logo-registration'>
            <img src={logo} alt="Logo" />
        </div>
        <div className='registration-login-form' >
        
     
        <div className='loomForgotPass-otp-container'>
            <div className='form-group'>
                <label>Reset Password</label>
                <input
                    type='text'
                    placeholder='Enter New Password'
                    // id='otp'
                    // name='otp'
                    value={resetPass}
                    onChange={(e) => setResetPass(e.target.value)}
                />
            </div>
           
            <div style={{ marginTop: '10px'}}>
                <button onClick={handleSubmit}  className='btn2' >Submit</button>
            </div>
        </div>
    </div>
</div> 
  </div>
  )
}

export default Forgot_password
