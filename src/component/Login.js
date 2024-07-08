import React, { useState } from "react";
import '../common/static/css/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiFacebook, CiTwitter, CiInstagram, } from "react-icons/ci";
import logo from '../common/static/image/logo.png';
import { toast } from "react-toastify";



const AdminLogin = () => {

    const [passShow, setPassShow] = useState(false);
    const navigate = useNavigate();



    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [allerror, setAllerror] = useState(false)
    const [mailerror, setMailerror] = useState(false)
    const [passworderror, setPassworderror] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = async()  => {
        if (!email && !password) {
            toast.error('Enter the Credentials')
            setAllerror(true)
            return
        } else {
            setAllerror(false)
            if (!email) {
                toast.error('Enter An Email')
                setMailerror(true)
                return
            } else { setMailerror(false) }
            if (!password) {
                toast.error('Enter An Password')
                setPassworderror(true)
                return
            } else { setPassworderror(false) }
        }
        if (!emailRegex.test(email)) {
            toast.error('Enter An Valid Email')
            setMailerror(true)
            return
        } else {
            setMailerror(false)
        }
        if (password.length < 6) {
            toast.error('Password Should be minimum 6 characters')
            setPassworderror(true)
            return
        } else {
            setPassworderror(false)
        }

        const formdata = new FormData();
        formdata.append("AppUserId", email);
        formdata.append("Password", password);

      try {
        setPassworderror(false)
        setMailerror(false)
          const response = await fetch("https://textileapp.microtechsolutions.co.in/php/postlogin.php", {
              method: "POST",
              body: formdata,
              redirect: "follow"
          })
  
  
          const json = await response.json()
          if (!response.ok) {
  
              toast.error("Invalid Credentials")
          }
          if (response.ok) {
  
              sessionStorage.setItem('user', JSON.stringify(json))
              const userString = sessionStorage.getItem('user');
              const user = userString ? JSON.parse(userString) : null;
  
              if (user) {
                  toast.success('Login Sucessfull')
                  navigate('/sidebar/home')
              }
          }
      } catch (error) {
        setPassworderror(true)
        setMailerror(true)
        toast.error('Either Invalid Username Or Password')
      }
      
    };


    const handleloomreg = () => {
        navigate("/loom-register/otp/resgistrationform")
    }

    return (
        <>
            <div>
                <div className='adminlogin-container'>
                    <div className='company-info'>



                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>

                        <div className="social-icons">
                            <CiTwitter className="sicon" />
                            <CiFacebook className="sicon" />
                            <CiInstagram className="sicon" />
                        </div>

                    </div>

                    <div className='login-container'>
                    <form autoComplete="off" onSubmit={handleLogin} className='login-form'>
                            <h2>LOGIN</h2>
                            <label htmlFor="email">Email</label>
                            <input className="email-input"
                                id="email"

                                style={{ borderColor: (allerror || mailerror) ? 'red' : '' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                                placeholder="Enter your email"
                            />
                           {(allerror || mailerror) && <p style={{color:"red" ,margin:'0'}}>Invalid Credentials</p>}

                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input
                                    value={password}
                                    style={{ borderColor: (allerror || passworderror) ? 'red' : '' }}

                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    type={passShow ? "text" : "password"}
                                    placeholder="Enter your password"
                                />
                               
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
                                </div>
                            </div>
                            {(allerror || passworderror) && <p style={{color:"red" ,margin:'0'}}>Invalid Credentials</p>}

                            <p className="forgot-password-link">
                                <Link to="/forgot-password" className="pass-link" style={{ textDecoration: 'none', fontWeight: '300', cursor: 'pointer', color: '#FF5F15', fontSize: '14px' }}>Forgot Password?</Link>
                            </p>

                            {/* <button style={{ margin: '0 auto' }} type="submit" className="loginformbtn" onClick={handleLogin}>
                                LOGIN
                            </button> */}
                            <button style={{ margin: '0 auto' }} type="submit" className="loginformbtn" >
                                LOGIN
                            </button>
                            <p style={{ textAlign: 'center', marginTop: '60px' }}>
                                Don't have an Account?
                            </p>

                            <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }} className="navlink-container">
                                <div className='loom-class'>
                                    <button onClick={handleloomreg} className='btn1'>SignUp</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </>



    )
}

export default AdminLogin

