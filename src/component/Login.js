import React, { useState } from "react";
import "../common/static/css/login.css";
import {  useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiFacebook, CiTwitter, CiInstagram } from "react-icons/ci";
import logo from "../common/static/image/logo.png";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [allerror, setAllerror] = useState(false);
  const [mailerror, setMailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email && !password) {
      toast.error("Enter the Credentials");
      setAllerror(true);
      return;
    } else {
      setAllerror(false);
      if (!email) {
        toast.error("Enter An Email");
        setMailerror(true);
        return;
      } else {
        setMailerror(false);
      }
      if (!password) {
        toast.error("Enter An Password");
        setPassworderror(true);
        return;
      } else {
        setPassworderror(false);
      }
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter An Valid Email");
      setMailerror(true);
      return;
    } else {
      setMailerror(false);
    }
    if (password.length < 5) {
      toast.error("Password Should be minimum 6 characters");
      setPassworderror(true);
      return;
    } else {
      setPassworderror(false);
    }

    const formdata = new FormData();
    formdata.append("AppUserId", email);
    formdata.append("Password", password);

    try {
      setPassworderror(false);
      setMailerror(false);
      const response = await fetch(
        "https://textileapp.microtechsolutions.co.in/php/postlogin.php",
        {
          method: "POST",
          body: formdata,
          redirect: "follow",
        }
      );

      const json = await response.json();
      if (!response.ok) {
        toast.error("Invalid Credentials");
      }
      if (response.ok) {

        const data = {
          AppUserId:json.AppUserId,
          Id:json.Id,
          LoomOrTrader:json.LoomOrTrader,
          OwnerName:json.OwnerName,
          Name:json.Name,
          Profilepic:json.Profilepic,
          RegistrationNumber:json.RegistrationNumber,
        };
        sessionStorage.setItem("user", JSON.stringify(data));
        const userString = sessionStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user) {
          toast.success("Login Sucessfull");
          navigate("/sidebar/home");
        }
      }
    } catch (error) {
      setPassworderror(true);
      setMailerror(true);
      toast.error("Either Invalid Username Or Password");
    }
  };

  const handleloomreg = (e) => {
    e.preventDefault();
    navigate("/loom-register/otp/resgistrationform");
  };
  const sendotptomail = () => {
    if (email) {
      setloading(true);
      const sendotpform = new FormData();
      sendotpform.append("AppUserId", email);

      const sendotpconnectionn = {
        method: "POST",
        body: sendotpform,
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/forgotpassword.php",
        sendotpconnectionn
      )
        .then((response) => response.text())
        .then((result) => {
          //console.log(result);
          sessionStorage.setItem("email", JSON.stringify(email));
          toast.success("OTP sent to mail");
          navigate("forgot-password");
          setloading(false)
        })
        .catch((error) => {
          console.error(error);
          setloading(false)
        });
    } else {
      toast.error("Enter your login email");
    }
  };
  return (
    <>
      <div>
        <div className="adminlogin-container">
          <div className="company-info">
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className="social-icons">
              <CiTwitter className="sicon" />
              <CiFacebook className="sicon" />
              <CiInstagram className="sicon" />
            </div>
          </div>

          <div className="login-container">
            <form
              autoComplete="off"
              onSubmit={handleLogin}
              className="login-form"
              >
                {loading&&<p style={{position:'absolute', top:50}}>Loading...</p>} 
              <h2>LOGIN</h2>
              <label htmlFor="email">Email</label>
              <input
                className="email-input"
                id="email"
                style={{ borderColor: allerror || mailerror ? "red" : "" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
              {(allerror || mailerror) && (
                <p style={{ color: "red", margin: "0" }}>Invalid Credentials</p>
              )}

              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  value={password}
                  style={{
                    borderColor: allerror || passworderror ? "red" : "",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={passShow ? "text" : "password"}
                  placeholder="Enter your password"
                  disabled={loading}
                />

                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? (
                    <FaEyeSlash className="eye-icon" />
                  ) : (
                    <FaEye className="eye-icon" />
                  )}
                </div>
              </div>
              {(allerror || passworderror) && (
                <p style={{ color: "red", margin: "0" }}>Invalid Credentials</p>
              )}

              <p className="forgot-password-link">
                <p
                  onClick={sendotptomail}
                  className="pass-link"
                  style={{
                    textDecoration: "none",
                    fontWeight: "300",
                    cursor: "pointer",
                    color: "#FF5F15",
                    fontSize: "14px",
                  }}
                >
                  Forgot Password?
                </p>
              </p>

              {/* <button style={{ margin: '0 auto' }} type="submit" className="loginformbtn" onClick={handleLogin}>
                                LOGIN
                            </button> */}
              <button
                style={{ margin: "0 auto" }}
                type="submit"
                className="loginformbtn"
                disabled={loading}
              >
                LOGIN
              </button>
              <p style={{ textAlign: "center",}}>
                Don't have an Account?
              </p>

              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="navlink-container"
              >
                <div className="loom-class">
                  <button  onClick={handleloomreg} className="btn1" 
                      disabled={loading}>
                    SignUp
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
