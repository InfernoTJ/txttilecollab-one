import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import logo from '../../common/static/image/logo.png'
import { toast } from 'react-toastify';
import password from '../../common/static/image/password.webp'
const Forgot_password = () => {
    const userString = sessionStorage.getItem('email');
    const email = userString ? JSON.parse(userString) : null;

    const [resetPass, setResetPass] = useState('');
    const [confmPass, setconfmPass] = useState('');



    const navigate = useNavigate('')
    const handleSubmit = () => {
        if (confmPass===resetPass) {
           
           if (resetPass.length > 5) {
             const passwordresetform = new FormData();
             passwordresetform.append("AppUserId", email);
             passwordresetform.append("Password",resetPass );
             
             const passwordresetconn = {
               method: "POST",
               body: passwordresetform,
               redirect: "follow"
             };
             
             fetch("https://textileapp.microtechsolutions.co.in/php/updatepassword.php", passwordresetconn)
               .then((response) => response.text())
               .then((result) => {//console.log(result)
                 toast.success('Password sucessfully reset.')
                 navigate('/');
                 sessionStorage.removeItem('email')
               })
               .catch((error) => console.error(error));
 
             return
           } else {
            toast.error('Minimun 6 characters password')
            return
           }
        } else {
            toast.error('Both passwords should be same.')

            return
        }
         
    };
    useEffect(()=>{
      
    })

  return (
    <div  className='loomregister-container'>
    <div className='loom-login'>
        <div className='logo-registration'>
            <img src={logo} alt="Logo" />
        </div>
        <div className='registration-login-form' >
                <img src={password} style={{ position:'absolute',top:20}} alt='' />
        
        <div className='loomForgotPass-otp-container'>
            <div style={{ marginTop: '50px'}} className='form-group'>
                <label style={{fontSize:'20px',marginBottom:'10px'}}>Reset Password</label>
                <input
                style={{width:'20vw'}}
                    type='text'
                    placeholder='Enter New Password'
                    // id='otp'
                    // name='otp'
                    value={resetPass}
                    onChange={(e) => setResetPass(e.target.value)}
                />
            </div>
           

            <div style={{ marginTop: '50px'}} className='form-group'>
                <label style={{fontSize:'20px',marginBottom:'10px'}}>Confirm Password</label>
                <input
                style={{width:'20vw'}}
                    type='text'
                    placeholder='Confirm Password'
                    // id='otp'
                    // name='otp'
                    value={confmPass}
                    onChange={(e) => setconfmPass(e.target.value)}
                />
            </div>

            <div style={{ marginTop: '50px',textAlign:'center' }}>
                <button style={{width:'10vw'}} onClick={handleSubmit}  className='btn2' >Submit</button>
            </div>
        </div>
    </div>
</div> 
  </div>
  )
}

export default Forgot_password