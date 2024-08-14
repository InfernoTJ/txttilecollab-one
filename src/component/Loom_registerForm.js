import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import logo from "../common/static/image/logo.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./../common/static/css/loomregister.css";
import img6 from "../common/static/image/img6.jpeg";
import Select from "react-select";
// import img8 from '../common/static/image/img8.jpg';
import { Country, State, City } from "country-state-city";
import img13 from "../common/static/image/img13.jfif";
//import img14 from "../common/static/image/img14.jfif";

import img15 from "../common/static/image/img15.webp";
//import img16 from "../common/static/image/img16.jpg";
import { toast } from "react-toastify";
import otpimage from "../common/static/image/otp.png";

const RegistrationForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [otherContact, setOtherContact] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [ownername, setownername] = useState("");

  //   const [state, setState] = useState("");
  //   const [country, setCountry] = useState("");
  //   const [city, setCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const defaultCountry = Country.getAllCountries().find(
    (country) => country.name === "India"
  );
  const defaultState = defaultCountry
    ? State.getStatesOfCountry(defaultCountry.isoCode).find(
        (state) => state.name === "Maharashtra"
      )
    : null;
  const [selectedCountry, setSelectedCountry] = useState(
    defaultCountry || ''
  );
  const [selectedState, setSelectedState] = useState(defaultState || '');
  const [selectedCity, setSelectedCity] = useState('');

  const [primaryContact, setPrimaryContact] = useState("");
  const [managerContact, setManagerContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidContact = (contact) => contact && contact.length === 10;

    // Check if required fields are filled
    if (
      !companyName ||
      !gstNo ||
      !ownername ||
      !primaryContact ||
      !address ||
      !pincode
    ) {
      toast.error("Enter the * fields");
      return;
    }

    // Validate GST No
    if (gstNo.length !== 15) {
      toast.error("GST No should be 15 digits");
      return;
    }

    // Validate Primary Contact
    if (!isValidContact(primaryContact)) {
      toast.error("Primary contact should be 10 digits");
      return;
    }

    // Validate Pincode
    if (pincode.length !== 6) {
      toast.error("Pincode should be 6 digits");
      return;
    }

    // Validate optional contacts if provided
    if (ownerContact && !isValidContact(ownerContact)) {
      toast.error("Owner contact should be 10 digits");
      return;
    }

    if (managerContact && !isValidContact(managerContact)) {
      toast.error("Manager contact should be 10 digits");
      return;
    }

    if (otherContact && !isValidContact(otherContact)) {
      toast.error("Other contact should be 10 digits");
      return;
    }

    setShowSignup(true);
  };

  const checkmailexists =()=>{
    const checkmailexistsform = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=AppUserId&Colvalue="+email, checkmailexistsform)
      .then((response) => response.json())
      .then((result) => {console.log(result)

        if(!(result.length===0))
        {
          toast.error("Email already in use")
        }else
        {
          handleSignupSubmit()
        }

      })
      .catch((error) => console.error(error));

     

  }
  const handleSignupSubmit = () => {
    if (email && username && password) {
      if (password.length > 5) {
        setIsLoading(true);
        const sendotp = new FormData();
        sendotp.append("Email", email);
        sendotp.append("Name", username);

        const sendotpconnection = {
          method: "POST",
          body: sendotp,
          redirect: "follow",
        };

        fetch(
          "https://textileapp.microtechsolutions.co.in/php/sendemailotp.php",
          sendotpconnection
        )
          .then((response) => response.text())
          .then((result) => {
            //console.log(result);
            setIsLoading(false);
            setShowOtp(true);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
            toast.error("Invalid Email");
          });
      } else {
        toast.error("Minimun 6 characters password.");
      }
    } else {
      toast.error("Fill the required fields");
    }

  };

  
  
  const senddetails=()=>{
    const detailsform = new FormData();
  detailsform.append("AppUserId", email);
  detailsform.append("Name", companyName);
  detailsform.append("OwnerName", ownername);
  detailsform.append("Address", address);
  detailsform.append("City", selectedCity ? selectedCity.name : selectedCity);
  detailsform.append("State",selectedState ? selectedState.name : selectedState);
  detailsform.append("Country", selectedCountry ? selectedCountry.name : selectedCountry);
  detailsform.append("Pincode", pincode);
  detailsform.append("GSTNumber", gstNo);
  detailsform.append("RegistrationNumber", selectedCategory==="L"?"LU":selectedCategory==='T'?"TR":"YR");
  detailsform.append("PrimaryContact",primaryContact);
  detailsform.append("LoomOrTrader", selectedCategory);

  const detailsconnection = {
    method: "POST",
    body: detailsform,
    redirect: "follow",
  };
  fetch(
    "https://textileapp.microtechsolutions.co.in/php/postdetail.php",
    detailsconnection
  )
    .then((response) => response.text())
    .then((result) => {
      //console.log(result);
      contactform.append("LoomTraderDetailId", result);
      sendcontactdetails()
     
    })
    .catch((error) => {console.error(error)
    });
  
  }

  const contactform = new FormData();

const sendcontactdetails=()=>{
  contactform.append("OwnerNo", ownerContact);
  contactform.append("ManagerNo", managerContact);
  contactform.append("OtherNo", otherContact);

  const contactconnection = {
    method: "POST",
    body: contactform,
    redirect: "follow",
  };
  fetch(
    "https://textileapp.microtechsolutions.co.in/php/postcontact.php",
    contactconnection
  )
    .then((response) => response.text())
    .then((result) => {//console.log(result)
    toast.success('Account created')
    navigate("/");
    })
    .catch((error) => {console.error(error)
    });
}
  const sendata = () => {

    const appuserform = new FormData();

    appuserform.append("AppUserId", email);
    appuserform.append("Name", username);
    appuserform.append("Password", password);

    const appuserconnection = {
      method: "POST",
      body: appuserform,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postappuser.php",
      appuserconnection
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result)
        senddetails()
      })
      .catch((error) => {console.error(error)
      });
  };



  const handleOtpSubmit = () => {

  
    const checkotp = {
      method: "GET",
      redirect: "follow",
    };
    
    
    fetch(
      "https://textileapp.microtechsolutions.co.in/php/verifyotp.php?otp=" +
        otp,
      checkotp
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        sendata();
      //  if (sendata()) {
         
      //    toast.success("Account Created");
      //    navigate("/");
      //  }else{
      //   toast.error("Email already Exists")
      //   setShowOtp(false)
      //  }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid Otp");
        setOtpError("Invalid OTP");
      });
   
  };

  const handleBackToSelection = () => {
    setSelectedCategory("");
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

  //here is the selection code
  useEffect(() => {
    // toast(selectedCategory==="L"?"LU":selectedCategory==='T'?"TU":"YR")
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => { 
    if (selectedCountry) { 
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    } else { 
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(
        City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      );
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "95%",
      border: "1px black solid",
      borderRadius: "5px",
      margin: "10px",
    }),
  };
  return (
    <div className="loomregister-container">
      <div className="loom-login">
        <div className="logo-registration">
          <img src={logo} alt="Logo" />
        </div>

        <div className="registration-login-form">
          {!selectedCategory && !showSignup && (
            <div style={{ textAlign: "center", marginTop: "-150px" }}>
              <div style={{ padding: "30px" }}>
                <h1 style={{ color: "var(--primary-color)" }}>
                  Select your role
                </h1>
              </div>
              <div style={{ display: "flex", gap: "30px" }}>
                <div
                  className="card"
                  onClick={() => setSelectedCategory("L")}
                  style={{
                    display: "flex",
                    height: "150px",
                    width: "220px",
                    padding: "0",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    borderRadius: "30px",
                  }}
                >
                  <img
                    style={{
                      height: "170px",
                      width: "200px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                    src={img6}
                    alt="Loom"
                  />
                  <h2
                    style={{
                      position: "absolute",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "70px",
                      borderRadius: "30px",
                    }}
                  >
                    Loom
                  </h2>
                </div>

                {/* <div className='card' onClick={() => setSelectedCategory('Trader')} style={{ display: 'flex', height: '50px', width: '150px', padding: '30px', alignItems: 'center', justifyContent: 'center', background: 'var(--complementary-color)', color: 'var(--main)', cursor: 'pointer' }}>
                                    <h2>Trader</h2>
                                </div> */}

                <div
                  className="card"
                  onClick={() => setSelectedCategory("T")}
                  style={{
                    display: "flex",
                    height: "150px",
                    width: "220px",
                    padding: "0",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    borderRadius: "30px",
                  }}
                >
                  <img
                    style={{
                      height: "170px",
                      width: "200px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                    src={img13}
                    alt="yarn"
                  />
                  <h2
                    style={{
                      position: "absolute",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "70px",
                      borderRadius: "30px",
                    }}
                  >
                    Trader
                  </h2>
                </div>

                <div
                  className="card"
                  onClick={() => setSelectedCategory("Y")}
                  style={{
                    display: "flex",
                    height: "150px",
                    width: "220px",
                    padding: "0",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    borderRadius: "30px",
                  }}
                >
                  <img
                    style={{
                      height: "170px",
                      width: "200px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                    src={img15}
                    alt="yarn"
                  />
                  <h2
                    style={{
                      position: "absolute",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "75px",
                      borderRadius: "30px",
                    }}
                  >
                    Yarn
                  </h2>
                </div>
              </div>
            </div>
          )}

          {selectedCategory && !showSignup && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                  width: "85%",
                }}
              >
                <IoMdArrowRoundBack
                  onClick={handleBackToSelection}
                  style={{
                    float: "left",
                    cursor: "pointer",
                    fontSize: "28px",
                    marginLeft: 40,
                    color: "var(--primary-color)",
                  }}
                />
                <h2 style={{ color: "var(--primary-color)" }}>
                  Registration Form for {selectedCategory==="L"?"Loom":selectedCategory==='T'?"Trader":"Yarn"}
                </h2>
              </div>
              <div
                className="signup_resgistration"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
              >
                <div style={{ margin: "15px", padding: "10px" }}>
                  <div>
                    <label>Company Name <span style={{ color: "red" }}>*</span></label>
                    <input
                      style={{ width: "90%", margin: "10px" }}
                      placeholder="Enter Company Name"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div
                    style={{ color: "var(--primary-color)", padding: "5px" }}
                  >
                    <h3>Address</h3>
                  </div>
                  <div>
                    <label>Address <span style={{ color: "red" }}>*</span></label>
                    <input
                      style={{ width: "90%", margin: "10px" }}
                      placeholder="Enter Address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Country</label>
                    <Select
                      styles={customStyles}
                      options={countries.map((country) => ({
                        value: country.isoCode,
                        label: country.name,
                      }))}
                      value={
                        selectedCountry
                          ? {
                              value: selectedCountry.isoCode,
                              label: selectedCountry.name,
                            }
                          : null
                      }
                      onChange={(option) =>
                        handleCountryChange(
                          option
                            ? countries.find((c) => c.isoCode === option.value)
                            : null
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>State</label>
                    <Select
                      styles={customStyles}
                      options={states.map((state) => ({
                        value: state.isoCode,
                        label: state.name,
                      }))}
                      value={
                        selectedState
                          ? {
                              value: selectedState.isoCode,
                              label: selectedState.name,
                            }
                          : null
                      }
                      onChange={(option) =>
                        handleStateChange(
                          option
                            ? states.find((s) => s.isoCode === option.value)
                            : null
                        )
                      }
                      isDisabled={!selectedCountry}
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <Select
                      styles={customStyles}
                      options={cities.map((city) => ({
                        value: city.name,
                        label: city.name,
                      }))}
                      value={
                        selectedCity
                          ? {
                              value: selectedCity.name,
                              label: selectedCity.name,
                            }
                          : null
                      }
                      onChange={(option) =>
                        handleCityChange(
                          option
                            ? cities.find((c) => c.name === option.value)
                            : null
                        )
                      }
                      isDisabled={!selectedState}
                    />
                  </div>
                  <div>
                    <label>Pincode <span style={{ color: "red" }}>*</span></label>
                    <input
                      style={{
                        width: "90%",
                        margin: "10px",
                        border: "1px solid black",
                      }}
                      placeholder="Enter Pincode"
                      type="number"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ margin: "15px", padding: "10px" }}>
                  <div>
                    <label>Owner Name/Promoter <span style={{ color: "red" }}>*</span></label>
                    <input
                      style={{ width: "90%", margin: "10px" }}
                      placeholder="Enter owner name"
                      type="text"
                      value={ownername}
                      onChange={(e) => setownername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>GST No <span style={{ color: "red" }}>*</span></label>
                    <input
                      style={{
                        width: "90%",
                        margin: "10px",
                        textTransform: "uppercase",
                      }}
                      placeholder="Enter 15 digit GST No"
                      type="text"
                      value={gstNo}
                      onChange={(e) => setGstNo(e.target.value)}
                    />
                  </div>
                  <div
                    style={{ color: "var(--primary-color)", padding: "5px" }}
                  >
                    <h3>Contact Info</h3>
                  </div>
                  <div>
                    <label>Primary Contact <span style={{ color: "red" }}>*</span></label>
                    <input
                      style={{
                        width: "90%",
                        margin: "10px",
                        border: "1px solid black",
                      }}
                      placeholder="Enter Primary Contact"
                      type="number"
                      value={primaryContact}
                      onChange={(e) => setPrimaryContact(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Owner Contact</label>
                    <input
                      style={{
                        width: "90%",
                        margin: "10px",
                        border: "1px solid black",
                      }}
                      placeholder="Enter Owner Contact"
                      type="number"
                      value={ownerContact}
                      onChange={(e) => setOwnerContact(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Manager Contact</label>
                    <input
                      style={{
                        width: "90%",
                        margin: "10px",
                        border: "1px solid black",
                      }}
                      placeholder="Enter Manager Contact"
                      type="number"
                      value={managerContact}
                      onChange={(e) => setManagerContact(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Other Contact</label>
                    <input
                      style={{
                        width: "90%",
                        margin: "10px",
                        border: "1px solid black",
                      }}
                      placeholder="Enter Other Contact"
                      type="number"
                      value={otherContact}
                      onChange={(e) => setOtherContact(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{ width: "20%" }}
                  onClick={handleSubmit}
                  className="btn1"
                >
                  Register
                </button>
              </div>
            </div>
          )}

          {showSignup && !showOtp && (
            <div style={{ width: "30vw" }}>
              <h1 style={{ textAlign: "center" }}>Signup</h1>
              <div style={{ margin: "20px" }}>
                <div className="form-group">
                  <label>Email <span style={{ color: "red" }}>*</span></label>
                  <input
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    type="text"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Username <span style={{ color: "red" }}>*</span></label>
                  <input
                    placeholder="Enter Username"
                    value={username}
                    onChange={handleUsernameChange}
                    type="text"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Password <span style={{ color: "red" }}>*</span></label>
                  <input
                    style={{ border: "2px solid var(--primary-color)" }}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password should be more than 6 characters"
                    type="password"
                  ></input>
                </div>
              </div>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="loom-btn"
              >
                <button
                  style={{ width: "45%" }}
                  className="btn2"
                  onClick={checkmailexists}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          )}

          {showOtp && (
            <>
              {" "}
              <img
                src={otpimage}
                style={{ position: "absolute", top: 110, width: "12vw" }}
                alt=""
              />
              <div>
                <div>
                  <div style={{ marginBottom: "30px", textAlign: "center" }}>
                    <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Enter OTP
                    </label>
                  </div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={7}
                    separator={<span style={{ width: "1rem" }}></span>}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 0.5rem",
                      fontSize: "1.5rem",
                      borderRadius: "4px",
                      border: "1px solid  var(--primary-color)",
                    }}
                    renderInput={(props) => <input {...props} />}
                  />
                  {otpError && <p style={{ color: "red" }}>{otpError}</p>}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <button
                    style={{ width: "35%" }}
                    className="btn2"
                    onClick={handleOtpSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
