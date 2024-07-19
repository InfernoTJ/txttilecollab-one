import React from "react";
import { useState, useEffect } from "react";
import "../common/static/css/loomBooking.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import searchnotfound from "../common/static/image/searchnotfound.jpeg";
import { flexRender } from "material-react-table";
function LoomBooking() {
  const [bookingid, setbookingid] = useState();

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [data, setData] = useState();

  const { oid } = useParams();
  const [odernumberr, setodernumberr] = useState(null);
  const [quality, setquality] = useState(null);
  const [orderdate, setorderdate] = useState(null);
  const [jobrateexp, setjobrateexp] = useState(null);
  const [partyname, setpartyname] = useState(null);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
  const [confirmloombook, setconfirmloombook] = useState();

  // const toggleBookingStatus = () => {
  //     setIsBooked(!isBooked);
  // };
  const updateloom = () => {
    const today = new Date(todate);

    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + 4);

    // Handle year change if necessary
    if (futureDate.getMonth() !== (today.getMonth() + 4) % 12) {
      futureDate.setDate(0); // Set date to the last day of the previous month
    }

    // Format date to yyyy-mm-dd
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Format future date
    const availableto4monthsahead = formatDate(futureDate);

    const formdata = new FormData();
    formdata.append("BookingId", bookingid);
    formdata.append("OrderNoId", oid);
    formdata.append("BookedFromDate", fromdate);
    formdata.append("BookedToDate", todate);
    formdata.append("LoomAvailableTo", availableto4monthsahead);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/updateloomavailability.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        fetch(
          `https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${oid}&Confirmed=true`,
          requestOption
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            toast.success("Confirmed OR" + oid);
            setconfirmloombook(selectedLoom);
            setSelectedLoom(null);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    const requestOption = {
      method: "GET",
      redirect: "follow",
    };
  };

  const bookloom = (selectedLoom) => {
    const formdataa = new FormData();
    formdataa.append("LoomDetailId", selectedLoom.LoomDetailId);
    formdataa.append("OrderNoId", oid);
    formdataa.append("KnottingOrderId", "");
    formdataa.append("LoomNo", selectedLoom.LoomNo);
    formdataa.append("Available", "false");
    formdataa.append("LoomAvailableFrom", "");
    formdataa.append("LoomAvailableTo", fromdate);
    formdataa.append("BookedFromDate", fromdate);
    formdataa.append("BookedToDate", todate);

    const requestOptionns = {
      method: "POST",
      body: formdataa,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postloombooking.php",
      requestOptionns
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        fetch(
          `https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${oid}&Confirmed=true`,
          requestOptionn
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            toast.success("Confirmed OR" + oid);
            setconfirmloombook(selectedLoom);
            setSelectedLoom(null);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    const requestOptionn = {
      method: "GET",
      redirect: "follow",
    };
  };
  const getloom = () => {
    fetch(
      `https://textileapp.microtechsolutions.co.in/php/loombyorder.php?LoomTraderId=${user.Id}&OrderNoId=${oid}`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        setData(jsonData); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const getorderdetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getidloomorder.php?LoomOrderId=" +
        oid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.length > 0) {
          const orderss = result[0];
          setodernumberr(orderss.OrderNo);
          setorderdate(orderss.Orderdate.date.substring(0, 10));
          setquality(orderss.Quality);
          setjobrateexp(orderss.JobRate);
          setpartyname(orderss.PartyName);
          setfromdate(orderss.BookedDateFrom.date.substring(0, 10));
          settodate(orderss.BookedDateTo.date.substring(0, 10));
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getorderdetails();
    getloom();
  }, []);

  const [selectedLoom, setSelectedLoom] = useState(null);

  const handleLoomSelection = (loomNumber) => {
    setSelectedLoom(loomNumber); // Update selected loom number when a loom is clicked
    setbookingid(loomNumber.BookingId);
  };

  //   const for right side form
  const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
  const handleInfoBtnClick = () => {
    setisInfoFormOpen(!isInfoFormOpen);
  };
  const handleFormClose = () => {
    setisInfoFormOpen(false);
  };

  return (
    <>
      <div className="loombooking-container">
        <div
          className="loombooking-left"
          //style={{ border: '2px solid green', }}
        >
          <div>
            <h1 style={{ textAlign: "center", color: "var( --primary-color)" }}>
              Loom Booking panel{" "}
            </h1>
          </div>
          <div
            style={{
              //  border: '3px solid blue',
              padding: "20px",
              margin: "10px",
              display: "grid",
              height: "88vh",
              gridTemplateColumns:Array.isArray(data) && data.length > 0? "repeat(5, 0.3fr)":'',
              gridTemplateRows:Array.isArray(data) && data.length > 0? "repeat(4,0.3fr)":'',
              gap: Array.isArray(data) && data.length > 0?  "30px":'',
            }}
            className="loom_numbers"
          >
            {Array.isArray(data) && data.length > 0 ? (
              data.map((data) => (
                <div
                  key={data.LoomNo}
                  onClick={() => handleLoomSelection(data)}
                  style={{
                    border: "2px solid var(--secondary-color)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                  className="box2"
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      cursor: "pointer",
                      fontSize: "30px",
                    }}
                  >
                    <IoMdInformationCircleOutline
                      onClick={handleInfoBtnClick}
                      style={{ color: "white" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      className="loomnumber"
                      style={{
                        background:
                          selectedLoom === data || confirmloombook === data
                            ? "var(--complementary-color)"
                            : "var(--secondary-color)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <p style={{ cursor: "pointer", fontSize: "20px" }}>
                        {" "}
                        {data.LoomNo}
                      </p>
                    </div>
                    <hr />
                    {confirmloombook === data ? (
                      <>
                        <p>
                          OR Number: <span>{odernumberr}</span>
                        </p>
                        <p>
                          To Date: <span>{todate}</span>
                        </p>
                      </>
                    ) : (
                      <h3>Available</h3>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <img src={searchnotfound} style={{width:'40%',height:'45%',  marginTop:'10%'}} alt="searchnotfound" />
              </div>
            )}
          </div>
        </div>

        <div
          className="loombooking-right"
          style={{
            // border: '2px solid blue',
            margin: "10px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "var(--primary-color)" }}>
            {selectedLoom
              ? `Selected Loom :  ${selectedLoom.LoomNo} `
              : "Select Loom No"}
          </h2>

          <div
            style={{
              border: "1px solid  var( --secondary-color)",
              background: "var(--background-color)",
              borderRadius: "10px",
              padding: "10px",
            }}
            className="loom_booking-form-container"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <label
                style={{ fontWeight: "bold", padding: "10px", fontSize: 18 }}
              >
                Order No
              </label>
              <input
                style={{
                  width: "40%",
                  margin: "10px",
                  border: "1px solid var(--primary-color)",
                }}
                value={odernumberr}
                type="text"
                placeholder="Order No"
              />
            </div>

            <div
              style={{ height: "40vh", marginTop: "20px" }}
              className="loom_booking_container"
            >
              <div>
                <div>
                  <label style={{ fontWeight: "bold", padding: "10px" }}>
                    Quality
                  </label>
                  <input
                    style={{
                      width: "85%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    value={quality}
                    readonly
                    type="text"
                    placeholder="Quality"
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "bold", padding: "10px" }}>
                    Job Rate Exp
                  </label>
                  <input
                    style={{
                      width: "85%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    value={jobrateexp}
                    readonly
                    type="text"
                    placeholder="Enter Job Rate "
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "bold", padding: "10px" }}>
                    Party Name
                  </label>
                  <input
                    style={{
                      width: "85%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    value={partyname}
                    readonly
                    type="text"
                    placeholder="Enter Party Name"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label style={{ fontWeight: "bold", padding: "10px" }}>
                    Order Date
                  </label>
                  <input
                    style={{
                      width: "85%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                      marginTop: "8px",
                    }}
                    value={orderdate}
                    readonly
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "bold", padding: "10px" }}>
                    From Date
                  </label>
                  <input
                    style={{
                      width: "85%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                      marginTop: "7px",
                    }}
                    value={fromdate}
                    readonly
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "bold", padding: "10px" }}>
                    To Date
                  </label>
                  <input
                    style={{
                      width: "85%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                      marginTop: "7px",
                    }}
                    value={todate}
                    readonly
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedLoom && (
                <button
                  style={{ width: "30%", marginTop: "20px", margin: "10px" }}
                  className="btn1"
                  onClick={
                    selectedLoom.BookedFromDate === null
                      ? updateloom
                      : () => bookloom(selectedLoom)
                  }
                >
                  {selectedLoom.BookedFromDate === null
                    ? "Updating"
                    : "Posting"}
                </button>
              )}
            </div>

            {/*  */}
            {selectedLoom && (
              <div
                className={`infoform-container ${
                  isInfoFormOpen ? "form-open" : ""
                }`}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h2
                    style={{ color: "var(--primary-color)", padding: "20px" }}
                  >
                    Loom Information
                  </h2>
                  <IoClose
                    style={{ fontSize: "30px", color: "var(--primary-color)" }}
                    onClick={handleFormClose}
                  />
                </div>

                <div style={{ marginLeft: "50px" }}>
                  <div>
                    <h3>Loom No: {selectedLoom.LoomNo}</h3>
                  </div>
                  <div>
                    <h3>Machine Type: {selectedLoom.MachineType}</h3>
                  </div>
                  <div>
                    <h3>Shedding Type: {selectedLoom.SheddingType}</h3>
                  </div>
                  <div>
                    <h3>Width: {selectedLoom.Width}</h3>
                  </div>
                  <div>
                    <h3>RPM: {selectedLoom.RPM}</h3>
                  </div>
                  <div>
                    <h3>No of Frames: {selectedLoom.NoofFrames}</h3>
                  </div>
                  <div>
                    <h3>No of Feeders: {selectedLoom.NoofFeeders}</h3>
                  </div>
                  {selectedLoom.SelvageJacquard === 1 && (
                    <div>
                      <h3>Selvage Jacquard: Available </h3>
                    </div>
                  )}
                  {selectedLoom.TopBeam === 1 && (
                    <div>
                      <h3>Top Beam: Available</h3>
                    </div>
                  )}
                  {selectedLoom.Cramming === 1 && (
                    <div>
                      <h3>Cramming: Available </h3>
                    </div>
                  )}
                  {selectedLoom.LenoDesignEquipment === 1 && (
                    <div>
                      <h3>Leno Design Equipment: Available </h3>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoomBooking;

// import React, { useState } from 'react';
// import '../common/static/css/loomBooking.css';
// import { IoMdInformationCircleOutline } from "react-icons/io";

// function LoomBooking() {
//     const [isBooked, setIsBooked] = useState(true);
//     const [selectedLoom, setSelectedLoom] = useState(null);

//     const toggleBookingStatus = () => {
//         setIsBooked(!isBooked);
//     };

//     const handleLoomClick = (loomNumber) => {
//         setSelectedLoom(loomNumber);
//     };

//     return (
//         <>
//             <div className='loombooking-container'>
//                 <div className='loombooking-left' style={{ border: '2px solid green', margin: '10px' }}>
//                     <div>
//                         <h1 style={{ textAlign: 'center', color: 'var( --primary-color)' }}>Loom Booking panel  </h1>
//                     </div>
//                     <div style={{ border: '3px solid blue', padding: '20px', margin: '10px', display: 'grid', height: '80vh', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(5,1fr)', gap: '30px' }} className='loom_numbers'>
//                         {[...Array(20)].map((_, index) => (
//                             <div key={index} style={{ border: '2px solid var(--secondary-color)', borderRadius: "8px", background: isBooked ? 'var(--complementary-color)' : 'var(--tershary-color)', color: 'white' }} className="box" onClick={() => handleLoomClick(index + 1)}>
//                                 <div style={{ textAlign: 'center' }}>
//                                     <div className='loomnumber' style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
//                                         <p style={{ cursor: 'pointer', fontSize: '20px' }}>L- {index + 1}</p>
//                                         <IoMdInformationCircleOutline style={{ cursor: 'pointer', fontSize: '30px' }} />
//                                     </div>
//                                     <hr />
//                                     {isBooked && selectedLoom === index + 1 && (
//                                         <>
//                                             <p>OR: <span id="orderNo">123456</span></p>
//                                             <p>To: <span id="bookedDate">2024-06-05</span></p>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='loombooking-right' style={{ border: '2px solid blue', margin: '10px' }}>
//                     <div>
//                         <h1 style={{ textAlign: 'center', color: 'var( --primary-color)' }}>Selected Loom No: {selectedLoom ? `L-${selectedLoom}` : 'None'}</h1>
//                     </div>
//                     {selectedLoom && (
//                         <div style={{ margin: '10px', border: "1px solid var(--secondary-color)", marginTop: '90px', background: 'var(--background-color)', borderRadius: '10px' }} className='loom_booking-form-container'>
//                             <div className='loom_booking_container'>
//                                 <div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>Order No</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                             type="text" placeholder='Order No' />
//                                     </div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>Quality</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }} type="text" placeholder='Quality' />
//                                     </div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>Job Rate Exp</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }} type="text" placeholder='Enter Job Rate ' />
//                                     </div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>Party Name</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }} type="text" placeholder='Enter Party Name' />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>Order Date</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '5px' }} type="date" />
//                                     </div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>From Date</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '5px' }} type="date" />
//                                     </div>
//                                     <div>
//                                         <label style={{ fontWeight: 'bold' }}>To Date</label>
//                                         <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '3px' }} type="date" readOnly />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                 <button style={{ width: '30%', marginTop: '20px', margin: '10px' }} className='btn1'>Submit</button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default LoomBooking;
