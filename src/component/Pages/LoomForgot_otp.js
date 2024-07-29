import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import otpimage from'../../common/static/image/otp.png'
import logo from '../../common/static/image/logo.png'
import OTPInput from 'react-otp-input';
import { toast } from 'react-toastify';

const LoomForgot_otp = () => {
    const [otp, setOtp] = useState('');
 
const[otpError,setotpError]=useState(false)
    const handleSubmit = () => {
      
        const checkotp = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("https://textileapp.microtechsolutions.co.in/php/verifyotp.php?otp="+otp, checkotp)
            .then((response) => response.json())
            .then((result) => {
                //console.log(result)
                toast.success('OTP verified')
                navigate('/forgot-password/otp')
            })
            .catch((error) => {console.error(error)
                toast.error('Invalid Otp')
                setotpError('Invalid OTP')
            });
       
    };
    const navigate = useNavigate('')
  return (
    <div className='loomregister-container'>
            <div className='loom-login'>
                <div className='logo-registration'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='registration-login-form' >
                <img src={otpimage} style={{ position:'absolute',top:150, width:'8vw'}} alt=''/>
                
                <div>
                            <div >
                                <div style={{marginBottom:'30px',textAlign:'center'}}>
                                <label style={{fontWeight:'bold',fontSize:'20px'}} >Enter OTP</label>
                                </div>
                                <OTPInput 
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={7}
                                    separator={<span style={{ width: '1rem' }}></span>} 
                                    inputStyle={{
                                        width: '3rem',
                                        height: '3rem',
                                        margin: '0 0.5rem',
                                        fontSize: '1.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid  var(--primary-color)',
                                    }}
                                    renderInput={(props) => <input {...props} />}
    /> 
                                {otpError && <p style={{ color: 'red' }}>{otpError}</p>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: "center",marginTop:'30px'  }}>
                                <button style={{ width: "35%"}} className='btn2' onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
            </div>
        </div> 
          </div>
  )
}

export default LoomForgot_otp
