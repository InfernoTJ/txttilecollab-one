import React, { useEffect, useState } from "react";
import "../common/static/css/profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [editable, setEditable] = useState(false);
  const [editContact, seteditContact] = useState(false);

  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [gst, setGst] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [role, setRole] = useState("");

  const [ownerContact, setOwnerContact] = useState("");
  const [managerContact, setManagerContact] = useState("");
  const [otherContact, setOtherContact] = useState("");

  const [ownerContactid, setOwnerContactid] = useState("");
  const [managerContactid, setManagerContactid] = useState("");
  const [otherContactid, setOtherContactid] = useState("");
  const handleEdit = () => {
    setEditable(true);
  };

  const handleContactEdit = () => {
    seteditContact(true);
  };

  const handleSave = () => {
    // Check if required fields are filled
    if (
      !companyName ||
      !ownerName ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !gst
    ) {
      toast.error("No fields should be empty");
      return;
    }

    // Validate GST No
    if (gst.length !== 15) {
      toast.error("GST No should be 15 digits");
      return;
    }

    // Validate Pincode
    if (pincode.length !== 6) {
      toast.error("Pincode should be 6 digits");
      return;
    }

    const formdata = new FormData();
    formdata.append("Id", user.Id);
    formdata.append("Name", companyName);
    formdata.append("OwnerName", ownerName);
    formdata.append("Address", address);
    formdata.append("City", city);
    formdata.append("State", state);
    formdata.append("Country", country);
    formdata.append("Pincode", pincode);
    formdata.append("GSTNumber", gst);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/editcompany.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        toast.success("Company Details Updated Successfully");
      })
      .catch((error) => console.error(error));
    setEditable(false);
  };

  const handleContactSave = () => {
    const isValidContact = (contact) => contact && contact.length === 10;

    // Validate Primary Contact
    if (!isValidContact(primaryContact)) {
      toast.error("Primary contact should be 10 digits");
      return;
    }
    // Validate optional contacts if provided
    if (!isValidContact(ownerContact)) {
      toast.error("Owner contact should be 10 digits");
      return;
    }

    if (!isValidContact(managerContact)) {
      toast.error("Manager contact should be 10 digits");
      return;
    }

    if (!isValidContact(otherContact)) {
      toast.error("Other contact should be 10 digits");
      return;
    }

    const formdata = new FormData();
    formdata.append("LoomTraderDetailId", user.Id);
    formdata.append("PrimaryContact", primaryContact);
    formdata.append("OwnerNo", ownerContact);
    formdata.append("OwnerNoId", ownerContactid);
    formdata.append("ManagerNo", managerContact);
    formdata.append("ManagerNoId", managerContactid);
    formdata.append("OtherNo", otherContact);
    formdata.append("OtherNoId", otherContactid);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/editcontact.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        ////console.log(result);
        toast.success("Contact Updated");
      })
      .catch((error) => console.error(error));
    seteditContact(false);
  };
  const navigate = useNavigate();
  const handleMyenquiriesClick = () => {
    navigate("/sidebar/myenquiries");
  };

  useEffect(() => {
    const getcomapnyinfo = () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue=" +
          user.Id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          //console.log(result);

          if (result.length > 0) {
            const enquiry = result[0];
            setEmail(enquiry.AppUserId);
            setOwnerName(enquiry.OwnerName);
            setCountry(enquiry.Country);
            setCity(enquiry.City);
            setGst(enquiry.GSTNumber);
            setCompanyName(enquiry.Name);
            setAddress(enquiry.Address);
            setState(enquiry.State);
            setPincode(enquiry.Pincode);
            setRegistrationNo(enquiry.RegistrationNumber);
            if (enquiry.LoomOrTrader === "L") {
              setRole("Loom");
            } else if (enquiry.LoomOrTrader === "T") {
              setRole("Trader");
            } else if (enquiry.LoomOrTrader === "Y") {
              setRole("Yarn");
            }

            setPrimaryContact(enquiry.PrimaryContact);
          }
        })
        .catch((error) => console.error(error));
    };

    const getcontactinfo = () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=ContactDetail&Colname=LoomTraderDetailId&Colvalue=" +
          user.Id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          //console.log("contactttt info:", result);

          if (result.length > 0) {
            const owner = result.find(
              (contact) => contact.Designation === "Owner"
            );
            const manager = result.find(
              (contact) => contact.Designation === "Manager"
            );
            const other = result.find(
              (contact) => contact.Designation === "Other"
            );

            if (owner) {
              setOwnerContact(owner.ContactNumber);
              setOwnerContactid(owner.Id);
            }
            if (manager) {
              setManagerContact(manager.ContactNumber);
              setManagerContactid(manager.Id);
            }
            if (other) {
              setOtherContact(other.ContactNumber);
              setOtherContactid(other.Id);
            }
          }
        })
        .catch((error) => console.error(error));
    };
    getcontactinfo();
    getcomapnyinfo();
  }, []);

  return (
    <div className="loom-profile-all">
      <div
        style={{
          backgroundColor: "var(  --tershary-color)",
          paddingBottom: "200px",
          position: "relative",
        }}
      >
        <div className="Lprofile-company-info">
          <div
            style={{
              margin: "30px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
              background: "#fff",
              marginRight: "7%",
            }}
          >
            <h3
              className="profile-company-info-tittle"
              style={{
                color: "var(--primary-color)",
                textAlign: "center",
                paddingTop: "40px",
              }}
            >
              Company Information
            </h3>
            <div className="profile-loom-compamyinfo-form">
              <div style={{ margin: "5px" }}>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    Owner Name
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    Country
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    City
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!editable}
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    GST Num
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                    disabled={!editable}
                  />
                </div>
              </div>
              <div style={{ margin: "5px" }}>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    Company Name
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    Address
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    State
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      color: "var(--primary-color)",
                    }}
                  >
                    PinCode
                  </label>
                  <input
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    disabled={!editable}
                  />
                </div>
              </div>
              <div
                className=" profile-loom-compamyinfo-form-btns"
                style={{ margin: "3.5% 0" }}
              >
                <button
                  style={{ width: "30%", margin: "10px" }}
                  className="btn1"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                {editable && (
                  <button
                    style={{ width: "30%", margin: "10px" }}
                    className="btn2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "30px",
              padding: "3% 0",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
              background: "#fff",
              marginRight: "7%",
            }}
          >
            <div style={{ marginTop: "10px", width: "50%" }}>
              <label
                style={{
                  fontWeight: "bold",
                  margin: "10px",
                  color: "var(--primary-color)",
                }}
              >
                Email
              </label>
              <input
                style={{
                  width: "90%",
                  margin: "10px",
                  border: "1px solid var(--primary-color)",
                }}
                type="text"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px", width: "22%", marginRight: "3%" }}>
              <label
                style={{
                  fontWeight: "bold",
                  margin: "10px",
                  color: "var(--primary-color)",
                }}
              >
                Registration No.
              </label>
              <input
                style={{
                  width: "90%",
                  margin: "10px",
                  border: "1px solid var(--primary-color)",
                  fontWeight: "bold",
                }}
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                // disabled={!editable}
                readOnly
              />
            </div>
            <div style={{ marginTop: "10px", width: "22%" }}>
              <label
                style={{
                  fontWeight: "bold",
                  margin: "10px",
                  color: "var(--primary-color)",
                }}
              >
                Role
              </label>
              <input
                style={{
                  width: "90%",
                  margin: "10px",
                  border: "1px solid var(--primary-color)",
                  fontWeight: "bold",
                }}
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                // disabled={!editable}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="Lprofile-contact-info">
          <div
            style={{
              margin: "30px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
              background: "#fff",
            }}
          >
            <h3
              style={{
                color: "var(--primary-color)",
                textAlign: "center",
                paddingTop: "40px",
              }}
            >
              Contact Information
            </h3>
            <div
              style={{ padding: "5px" }}
              className="profile-loom-contact-form"
            >
              <div style={{ marginTop: "15px" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    margin: "10px",
                    color: "var(--primary-color)",
                  }}
                >
                  Primary Contact
                </label>
                <input
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="text"
                  value={primaryContact}
                  onChange={(e) => setPrimaryContact(e.target.value)}
                  disabled={!editContact}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    margin: "10px",
                    color: "var(--primary-color)",
                  }}
                >
                  Owner Contact No
                </label>
                <input
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="text"
                  value={ownerContact}
                  onChange={(e) => setOwnerContact(e.target.value)}
                  disabled={!editContact}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    margin: "10px",
                    color: "var(--primary-color)",
                  }}
                >
                  Manager Contact No
                </label>
                <input
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="text"
                  value={managerContact}
                  onChange={(e) => setManagerContact(e.target.value)}
                  disabled={!editContact}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    margin: "10px",
                    color: "var(--primary-color)",
                  }}
                >
                  Other Contact No
                </label>
                <input
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="text"
                  value={otherContact}
                  onChange={(e) => setOtherContact(e.target.value)}
                  disabled={!editContact}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "3.5px 0",
                }}
                className="profile-loom-contact-form-btns"
              >
                <button
                  style={{ width: "20%", margin: "10px" }}
                  className="btn1"
                  onClick={handleContactEdit}
                >
                  Edit
                </button>
                {editContact && (
                  <button
                    style={{ width: "20%", margin: "10px" }}
                    className="btn2"
                    onClick={handleContactSave}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;

// import React, { useState } from 'react';
// import '../common/static/css/profile.css';

// const Profile = () => {
//   const [editable, setEditable] = useState(false);

//   const [email, setEmail] = useState('diksha@gmail.com');
//   const [ownerName, setOwnerName] = useState('MTS');
//   const [country, setCountry] = useState('India');
//   const [city, setCity] = useState('Kolhapur');
//   const [primaryContact, setPrimaryContact] = useState('8308058383');
//   const [gst, setGst] = useState('27KLTAH14752');
//   const [companyName, setCompanyName] = useState('Vivek Textiles');
//   const [address, setAddress] = useState('YT park');
//   const [state, setState] = useState('Maharashtra');
//   const [pincode, setPincode] = useState('123654');
//   const [registrationNo, setRegistrationNo] = useState('LU00529');
//   const [role, setRole] = useState('Loom');
//   const [ownerContact, setOwnerContact] = useState('7410258963');
//   const [managerContact, setManagerContact] = useState('9874563210');
//   const [otherContact, setOtherContact] = useState('9632587410');

//   const handleEdit = () => {
//     setEditable(true);
//   };

//   const handleSave = () => {
//     setEditable(false);
//     setEmail('');
//     setOwnerName('');
//     setCountry('');
//     setCity('');
//     setPrimaryContact('');
//     setGst('');
//     setCompanyName('');
//     setAddress('');
//     setState('');
//     setPincode('');
//     setRegistrationNo('');
//     setRole('');
//     setOwnerContact('');
//     setManagerContact('');
//     setOtherContact('');
//   };

//   return (
//     <div className='loom-profile-all'>
//       <div style={{ backgroundColor: 'var(  --tershary-color)', paddingBottom: '200px', position: 'relative' }}>
//         <div className='profile-company-info' style={{ position: 'absolute', top: '30px', left: '30px', zIndex: '10', width: 'calc(50%)' }}>
//           <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }}>
//             <h3 className='profile-company-info-tittle' style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Company Information</h3>
//             <div className='profile-loom-compamyinfo-form'>
//               <div style={{ margin: '5px' }}>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Email</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Owner Name</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={ownerName}
//                     onChange={(e) => setOwnerName(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Country</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>City</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Primary Contact</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={primaryContact}
//                     onChange={(e) => setPrimaryContact(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>GST Num</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={gst}
//                     onChange={(e) => setGst(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//               </div>
//               <div style={{ margin: '5px' }}>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Company Name</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Address</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>State</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={state}
//                     onChange={(e) => setState(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>PinCode</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Registration Number</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={registrationNo}
//                     onChange={(e) => setRegistrationNo(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Role</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <button style={{ width: '30%', margin: '10px' }} className='btn1' onClick={handleEdit}>Edit</button>
//                 <button style={{ width: '30%', margin: '10px' }} className='btn2' onClick={handleSave}>Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='profile-contact-info' style={{ position: 'absolute', top: '30px', right: '30px', zIndex: '10', width: 'calc(50% - 60px)' }}>
//           <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }}>
//             <h3 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Contact Information</h3>
//             <div style={{ marginTop: '25px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Primary Contact</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={primaryContact}
//                 onChange={(e) => setPrimaryContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Owner Contact No</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={ownerContact}
//                 onChange={(e) => setOwnerContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Manager Contact No</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={managerContact}
//                 onChange={(e) => setManagerContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Other Contact No</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={otherContact}
//                 onChange={(e) => setOtherContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div>
//               <button style={{ width: '15%', margin: '10px' }} className='btn1' onClick={handleEdit}>Edit</button>
//               <button style={{ width: '15%', margin: '10px' }} className='btn2' onClick={handleSave}>Save</button>
//             </div>
//           </div>
//           <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }} className='loom-profile-myloom'>
//             <div style={{ marginTop: '75px', padding: "30px" }}>
//               <span>My Loom </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
