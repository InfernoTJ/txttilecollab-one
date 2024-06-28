import React, { useState } from "react";
import '../common/static/css/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiFacebook, CiTwitter, CiInstagram, } from "react-icons/ci";
import logo from '../common/static/image/logo.png';



const AdminLogin = () => {

    const [passShow, setPassShow] = useState(false);
    const navigate = useNavigate();


    const handleLogin = () => {
        // Perform login logic
        navigate('/sidebar');
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
                        <form autoComplete="off" className='login-form'>
                            <h2>LOGIN</h2>
                            <label htmlFor="email">Email</label>
                            <input className="email-input"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />

                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <input
                                
                                    id="password"
                                    type={passShow ? "text" : "password"}
                                    placeholder="Enter your password"
                                />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
                                </div>
                            </div>

                            <p className="forgot-password-link">
                                <Link to="/forgot-password" className="pass-link" style={{ textDecoration: 'none', fontWeight: '300', cursor: 'pointer', color: '#FF5F15', fontSize: '14px' }}>Forgot Password?</Link>
                            </p>

                            <button style={{ margin: '0 auto' }} type="submit" className="loginformbtn" onClick={handleLogin}>
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

