import React, { useState } from 'react';
import '../common/static/css/loomregister.css'
import logo from '../common/static/image/logo.png';

import { useNavigate } from 'react-router-dom';
const LoomRegister = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);



    const navigate = useNavigate('')
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission logic here
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);

        navigate('/loom-register/otp');
    };


    return (

        <div  className='loomregister-container'>
            <div className='loom-login'>
                <div className='logo-registration' >
                    <div>
                        <img src={logo} alt="" />
                    </div>

                </div>
                <div className='registration-login-form' >
                    <h2> Signup</h2>
                    <div style={{ margin: '20px' }}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input placeholder='Enter Email Address' value={email}
                                onChange={handleEmailChange} type='text'></input>
                        </div>

                        <div className='form-group'>
                            <label>User Name</label>
                            <input placeholder='Enter User Name' value={username}
                                onChange={handleUsernameChange} type='text'></input>
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input value={password}
                                onChange={handlePasswordChange} placeholder='Enter Password' type='text'></input>
                        </div>
                    </div>

                    <div className='loom-btn'>
                        <button className='btn2' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default LoomRegister



