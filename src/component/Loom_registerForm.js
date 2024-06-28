



import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import logo from '../common/static/image/logo.png';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [ownerContact, setOwnerContact] = useState('');
    const [otherContact, setOtherContact] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [primaryContact, setPrimaryContact] = useState('');
    const [managerContact, setManagerContact] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otpError, setOtpError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSignup(true); 
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setShowOtp(true); 
        }, 2000);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
       
        // if (otp === '1234') { 
            navigate('/');
        // } else {
        //     setOtpError('Invalid OTP');
        // }
    };

    const handleBackToSelection = () => {
        setSelectedCategory('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className='loomregister-container'>
            <div className='loom-login'>
                <div className='logo-registration'>
                    <img src={logo} alt="Logo" />
                </div>

                <div className='registration-login-form'>
                    {!selectedCategory && !showSignup && (
                        <>
                            <div style={{ padding: '30px' }}>
                                <h2 style={{ color: 'var(--primary-color)' }}>Select your role</h2>
                            </div>
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <div className='card' onClick={() => setSelectedCategory('Loom')} style={{ display: 'flex', height: '50px', width: '150px', padding: '30px', alignItems: 'center', justifyContent: 'center', background: 'var(--complementary-color)', color: 'var(--main)', cursor: 'pointer' }}>
                                    <h3>Loom</h3>
                                </div>
                                <div className='card' onClick={() => setSelectedCategory('Trader')} style={{ display: 'flex', height: '50px', width: '150px', padding: '30px', alignItems: 'center', justifyContent: 'center', background: 'var(--complementary-color)', color: 'var(--main)', cursor: 'pointer' }}>
                                    <h3>Trader</h3>
                                </div>
                                <div className='card' onClick={() => setSelectedCategory('Yarn')} style={{ display: 'flex', height: '50px', width: '150px', padding: '30px', alignItems: 'center', justifyContent: 'center', background: 'var(--complementary-color)', color: 'var(--main)', cursor: 'pointer' }}>
                                    <h3>Yarn</h3>
                                </div>
                            </div>
                        </>
                    )}

                    {selectedCategory && !showSignup && (
                        <>
                            <div style={{ display: "flex", alignItems: 'center', gap: '30px', width: '85%', }}>
                                <IoMdArrowRoundBack onClick={handleBackToSelection} style={{ float: 'left', cursor: 'pointer', color: 'var(--primary-color)' }} />
                                <h2 style={{ color: 'var(--primary-color)' }}>Registration Form for {selectedCategory}</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '90%', }}>
                                <div style={{ margin: '15px', padding: '10px' }}>
                                    <div>
                                        <label>Company Name</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Company Name' type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                    </div>
                                    <div style={{ color: 'var(--primary-color)', padding: '10px' }}>
                                        <h3>Address</h3>
                                    </div>
                                    <div>
                                        <label>Address</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Country</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Country' type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>State</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter State' type='text' value={state} onChange={(e) => setState(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>City</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter City' type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Pincode</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Pincode' type='text' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ margin: '15px', padding: '10px' }}>
                                    <div>
                                        <label>GST No</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter 15 digit GST No' type='text' value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
                                    </div>
                                    <div style={{ color: 'var(--primary-color)', padding: '10px' }}>
                                        <h3>Contact Info</h3>
                                    </div>
                                    <div>
                                        <label>Owner Contact</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Owner Contact' type='text' value={ownerContact} onChange={(e) => setOwnerContact(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Manager Contact</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Manager Contact' type='text' value={managerContact} onChange={(e) => setManagerContact(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Primary Contact</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Primary Contact' type='text' value={primaryContact} onChange={(e) => setPrimaryContact(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Other Contact</label>
                                        <input style={{ width: '90%', margin: "10px" }} placeholder='Enter Other Contact' type='text' value={otherContact} onChange={(e) => setOtherContact(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ margin: '10px' }}>
                                <button onClick={handleSubmit} className='btn1'>
                                    Register
                                </button>
                            </div>
                        </>
                    )}

                    {showSignup && !showOtp && (
                        <div>
                            <h2 style={{ textAlign: 'center' }}>Signup</h2>
                            <div style={{ margin: '20px' }}>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input placeholder='Enter Email Address' value={email} onChange={handleEmailChange} type='text'></input>
                                </div>
                                <div className='form-group'>
                                    <label>Username</label>
                                    <input placeholder='Enter Username' value={username} onChange={handleUsernameChange} type='text'></input>
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input value={password} onChange={handlePasswordChange} placeholder='Enter Password' type='password'></input>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: "center" }} className='loom-btn'>
                                <button style={{ width: "45%" }} className='btn2' onClick={handleSignupSubmit} disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    )}

                    {showOtp && (
                        <div>
                            <div >
                                <div style={{marginBottom:'30px'}}>
                                <label >Enter OTP</label>
                                </div>
                                <OtpInput 
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    separator={<span style={{ width: '1rem' }}></span>} // Adding space between inputs
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
                                <button style={{ width: "35%"}} className='btn2' onClick={handleOtpSubmit}>Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
