import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../common/static/css/adminuserinformation.css'
function UserInformation() {
  const { uid } = useParams();
  const [loominfo, setloominfo] = useState([]);
  const [isloomtraderyarn, setisloomtraderyarn] = useState();
  const [contactinfo, setcontactinfo] = useState([]);

  const loommachinewisecount = () => {
    const getloominfo = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/userloomcount.php?LoomTraderId=" +
        uid,
      getloominfo
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setloominfo(result);
      })
      .catch((error) => console.error(error));
  };

  const getuserinfo = () => {
    const getdetails = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail &Colname=Id&Colvalue=" +
        uid,
      getdetails
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const data = result[0];
        setisloomtraderyarn(data);
      })
      .catch((error) => console.error(error));
  };
  const getcontactinfo = () => {
    const getcontacts = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=ContactDetail&Colname=LoomTraderDetailId&Colvalue=" +
        uid,
      getcontacts
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setcontactinfo(result);
      })
      .catch((error) => console.error(error));
  };
  const [loomcount, setloomcount] = useState();
  const getloomcount = () => {
    const myloomconnection = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomsDetails&Colname=LoomTraderId&Colvalue=" +
        uid,
      myloomconnection
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result.filter((loom)=>loom.Active===1));
        setloomcount(result.filter((loom)=>loom.Active===1).length);
      })
      .catch((error) => console.error(error));
  };

  const[enquiresinfo,setenquiresinfo]=useState([])
  const getenquriescount =()=>{
    const getenquiriescount = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/userenquirycount.php?LoomTraderId="+uid, getenquiriescount)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        setenquiresinfo(result)
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    loommachinewisecount();
    getuserinfo();
    getenquriescount();
    getcontactinfo();
    getloomcount()
  }, []);

  return (
    <>
{isloomtraderyarn && <h1 style={{textAlign:"center"}}>{isloomtraderyarn.LoomOrTrader === "L"?'Loom':isloomtraderyarn.LoomOrTrader === "T"?'Trader':'Yarn'} - {isloomtraderyarn.Name}</h1>}
 
      <div className="responsive"
        style={{
          
          //backgroundColor: "dodgerblue",
          padding: "0 5%",
          margin:'10vh 0'
        }}
      >
        {isloomtraderyarn && (
        <div className="firstdiv" style={{// backgroundColor: "#FFD3A2" ,
           padding:50 ,borderRadius:'15px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' ,width:isloomtraderyarn.LoomOrTrader==="Y"?'60vw':'40vw',}}>
         
         <h5
            style={{
              fontSize: "16px",
              fontWeight: 300,
              color: "#fff",
              backgroundColor: "var(--primary-color)",
              padding: "7px",
              margin: '15px 2.5px',
              width:'15vw',
              borderRadius: "5px",
            }}
          >User Information</h5>
          
            <div className="responsive"

            >
              <div>
                <h3>Email: {isloomtraderyarn.AppUserId}</h3>
                <h3>GST Number: {isloomtraderyarn.GSTNumber}</h3>
                <h3>Company Name: {isloomtraderyarn.Name}</h3>
                <h3>Owner/Promoter: {isloomtraderyarn.OwnerName}</h3>
                <h3>Address: {isloomtraderyarn.Address}</h3>
                <h3>City: {isloomtraderyarn.City}</h3>
                <h3>State: {isloomtraderyarn.State}</h3>
                <h3>Country: {isloomtraderyarn.Country}</h3>
              
                <h3>Pincode: {isloomtraderyarn.Pincode}</h3>
              </div>
              <div>
              <img
                    style={{ width: "100px", borderRadius: 100 }}
                    src={isloomtraderyarn.Profilepic}
                    alt="Profile"
                  />
               
                <h3>
                  Registration Number: {isloomtraderyarn.RegistrationNumber}
                </h3>
              
                <h3>Primary Contact: {isloomtraderyarn.PrimaryContact}</h3>
                {contactinfo.map((contacts) => (
                  <div>
                    <h3>
                      {contacts.Designation} Contact: {contacts.ContactNumber}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
        </div>
          )}

        {isloomtraderyarn && !(isloomtraderyarn.LoomOrTrader==="Y") && <div className="firstdiv" style={{ //backgroundColor: "#A2FFA4" ,
          padding:20,borderRadius:'15px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',width:'20vw'}}>
          <h5
            style={{
              fontSize: "16px",
              fontWeight: 300,
              color: "#fff",
              backgroundColor: "var(--primary-color)",
              padding: "7px",
              margin: '15px 2.5px',
              width:'15vw',
              borderRadius: "5px",
            }}
          >
            {isloomtraderyarn.LoomOrTrader==="L"?'Loom Machine Information':"Enquiries Information"}
          </h5>

          {isloomtraderyarn.LoomOrTrader === "L" &&
          <div style={{marginTop:'25%'}}>
            {loominfo.map((looms) => (
              <div>
                <h3>
                  {looms.MachineType} : {looms.Count}
                </h3>
              </div>
            ))}
            <h3>Total loom count : {loomcount}</h3>
            
             </div>
           }
           {isloomtraderyarn.LoomOrTrader === "T" &&
          <div style={{marginTop:'25%'}}>
            {enquiresinfo.map((enquiry) => (
              <div>
                <h3>
                  {enquiry.MachineType} Enquiries : {enquiry.Count}
                </h3>
              </div>
            ))}

             </div>
           }
        </div>}
      </div>
    </>
  );
}

export default UserInformation;
