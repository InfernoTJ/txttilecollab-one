import React, { useEffect, useState } from "react";
import "../common/static/css/profile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosAddCircle } from "react-icons/io";
const Profile = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [editable, setEditable] = useState(false);
  const [editContact, seteditContact] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [designpaper, setDesignpaper] = useState();
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
const[picstate,setpicstate]=useState(false)
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDesignpaper(file); // Store the selected file in the state
      setPreviewUrl(URL.createObjectURL(file));
      setpicstate(true)
      console.log("Selected image:", file.name);
      // Further handling if needed
    }
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
        console.log(result);

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
          setDesignpaper(enquiry.Profilepic);
          setPreviewUrl(enquiry.Profilepic);
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

  const saveprofilepic = () => {
    const updateprofilepic = new FormData();
    updateprofilepic.append("Id", user.Id);
    updateprofilepic.append("Profilepic", designpaper);

    const updateprofilepicconnection = {
      method: "POST",
      body: updateprofilepic,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/updateprofile.php",
      updateprofilepicconnection
    )
      .then((response) => response.text())
      .then((result) => {console.log(result)
        toast.success('Profile Picutre Updated')
        setpicstate(false)
        getcomapnyinfo()
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
        console.log("contactttt info:", result);

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
  useEffect(() => {
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
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                padding: "0 15% 0 5%",
                alignContent: "center",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <h3
                className="profile-company-info-tittle"
                style={{
                  color: "var(--primary-color)",
                }}
              >
                Company Information
              </h3>
              
           
            </div>
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
                <div style={{ marginTop: "10px" }}>
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
              {/* <div
                className=" profile-loom-compamyinfo-form-btns"
                // style={{ margin: "3.5% 0" }}
              >
             
              </div> */}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "30px",
              padding: "20px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
              background: "#fff",
              width: "85%",
              gap: "30px",

              flexDirection: "column",
            }}
          >
            <div style={{ marginTop: "10px" }}>
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
                  // width: "90%",
                  // margin: "10px",
                  border: "1px solid var(--primary-color)",
                }}
                type="text"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
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
                Registration No.
              </label>
              <input
                style={{
                  //   width: "90%",
                  //   margin: "10px",
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
            <div style={{ marginTop: "10px" }}>
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
                  //   width: "90%",
                  // margin: "10px",
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
              Profile Picture
            </h3>
            <div
              style={{ padding: "5px" }}
              className="profile-loom-contact-form"
            >
             <div style={{ marginTop: "10px", display: "flex",justifyContent:'center',marginBottom:'20px' }}>
                <div >
                
                    <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <label htmlFor="imageUpload">
                      <img
                        src={previewUrl}
                        style={{
                          width: "150px",
                          borderRadius: "5px",
                          cursor:'pointer',
                          border: "1px solid black",
                        }}
                        alt="profileimage"
                      />
                     {picstate && <IoIosAddCircle
                        style={{
                          color: "var(--primary-color)",
                          position: "absolute",
                          bottom: "-5px",
                          right: "-10px",  cursor:'pointer',
                          backgroundColor:'white',
                          borderRadius:'50%',
                          border:'2px solid var(--primary-color)',
                          fontSize: "30px", // Adjust the size as needed
                        // Optional: Rounded background
                        }}
                      />}
                    </label>
                  </div>
                </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  disabled={!picstate}
                  />
                </div>
             
              <div
                style={{
                  display: "flex",
                  justifyContent:'center',
                  alignItems: "center",
                  margin: "3.5px 0",
                }}
                className="profile-loom-contact-form-btns"
              >
                <button
                  style={{ margin: "10px",width:'40%' }}
                  className="btn1"
                  onClick={()=>setpicstate(!picstate)}
                >
                  Edit
                </button>
                {picstate &&  <button
                      style={{ width: "40%", margin: "10px" }}
                      className="btn2"
                      onClick={saveprofilepic}
                    >
                      Save
                    </button>}
              </div>
            </div>
          </div>
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
                  style={{ margin: "10px" }}
                  className="btn1"
                  onClick={handleContactEdit}
                >
                  Edit
                </button>
                {editContact && (
                  <button
                    style={{ margin: "10px" }}
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
    </div>
  );
};

export default Profile;
