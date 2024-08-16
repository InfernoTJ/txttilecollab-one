
import React, { useEffect, useState } from "react";
import "../common/static/css/updateMyEnquries.css";
import { useNavigate } from "react-router-dom";
import add from '../common/static/image/emptybox1.jpg'

const Update_myenquiries = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [enquiries, setenquiries] = useState([]);
  const navigate = useNavigate();
  const handleCardClick = (enquiryid) => {
    navigate(`../updatemyenquiriesform/${enquiryid}`);
  };

  useEffect(() => {
    getenquires();
  }, []);

  const getenquires = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getjoin.php?TraderId="+user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setenquiries(Array.isArray(result) ? result : []);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="update-myenquiries-container">
      <div>
        <h2 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          List of My Enquiries
        </h2>
      </div>
          {enquiries.length===0 && <div>   
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'80vh'}}> <img src={add} style={{width:'25%',}} alt="add" /> 
              <h2 style={{color:'#dda960',fontSize:'35px'}}>No enquiries found.</h2></div> 
              </div>}
      <div

        className="update-myenquiries"
        style={{
            height: "80vh",
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gridTemplateRows: "repeat(5,1fr)",
            gap: "20px",
        }}>
        {enquiries && 
          enquiries.map((enquiry) => (
            <div key={enquiry.EnquiryNo} onClick={()=>handleCardClick(enquiry.EnquiryId)} style={{textAlign:'center',display:'flex',flex:'1',justifyContent:'center'}} className="update-myenquiries-card">
              <p >Enquiry: <br/> {enquiry.EnquiryNo}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Update_myenquiries;
