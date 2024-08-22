import React, { useState, useEffect } from "react";
import "../common/static/css/loomBooking.css";
import add from "../common/static/image/loomadd.png";
import { IoClose } from "react-icons/io5";
import { HiMiniInformationCircle } from "react-icons/hi2";
import "../common/static/css/loom_booking.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Loom_booking() {
  const navigate = useNavigate();
  const [chckstate, setchckstate] = useState(false);

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [knottingorder, setknottingorder] = useState();
  const [knottingid, setknottingid] = useState("");

  const [bookingdata, setbookingdata] = useState([]);
  const authorization = new Headers();
  authorization.append("x-api-key", "yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3");

  const today = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedToday = formatDate(today);

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [data, setData] = useState();

  const getloom = () => {
    const requestOptions = {
      method: "GET",
      // headers: authorization,
      redirect: "follow",
    };

    fetch(
      `https://textileapp.microtechsolutions.co.in/php/todayloom.php?LoomTraderId=${user.Id}&Todaydate=${formattedToday}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((jsonData) => {
        //console.log(jsonData);

        const uniqueData = jsonData.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.LoomDetailId === item.LoomDetailId
          ))
        );

        setData(uniqueData); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getknottingid = async () => {
    const rqoption = {
      method: "GET",
      // headers: authorization,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=KnottingOffer&Colname=OfferNo&Colvalue=" +
        knottingorder,
      rqoption
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        const enquiry = result[0];
        if (enquiry) {
          toast.success("Got knotting order " + enquiry.OfferNo);
          setknottingid(enquiry.KnottingId);
          setknottingorder(enquiry.OfferNo);
        } else {
          toast.info("Didnt find an order");
        }
      })
      .catch((error) => console.error(error));
  };

  const getmethods = (selectedLoom) => {
    const getmethodconn = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://textileapp.microtechsolutions.co.in/php/loombooking.php?LoomDetailId=${selectedLoom.LoomDetailId}&BookedFromDate=${fromdate}&BookedToDate=${todate}`,
      getmethodconn
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        const methods = result[0];
        if (methods.BookedFromDate === null && methods.BookedToDate === null) {
          // toast("update");
          updateloom(methods.BookingId)
        } else {
          // toast("post");
          bookloom(methods.BookingId)
        }
      })
      .catch((error) => console.error(error));
  };

  const updateloomavailabilityform = new FormData();

  // const updateloom=()=>{
  //   toast('update')
  // }

  const updateloom = (bookingid) => {
    const today = new Date(todate);
    // toast("update");
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
    updateloomavailabilityform.append(
      "LoomAvailableTo",
      availableto4monthsahead
    );

    confirmknottingoffer();
    updateloomavailability(bookingid);
  };

  const confirmknottingoffer = () => {
    const authorization = new Headers();
    authorization.append("x-api-key", "yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3");

    const confirmknottingform = new FormData();
    confirmknottingform.append("Id", knottingid);
    confirmknottingform.append("ConfirmLoom", "true");

    const confirmknottingoffers = {
      method: "POST",
      body: confirmknottingform,
      redirect: "follow",
      // headers: authorization,
    };

    fetch(
      `https://textileapp.microtechsolutions.co.in/php/confirmknottingoffer.php`,
      confirmknottingoffers
    )
      .then((response) => response.text())
      .then((result) => {
        ////console.log(result);
        toast.success("Confirmed " + selectedLoom.LoomNo);
        getloom();
        setSelectedLoom(null);
      })
      .catch((error) => console.error(error));
  };
  const updateloomavailability = (bookingid) => {
    updateloomavailabilityform.append("BookingId", bookingid);
    updateloomavailabilityform.append("KnottingOrderId", knottingid);
    updateloomavailabilityform.append("BookedFromDate", fromdate);
    updateloomavailabilityform.append("BookedToDate", todate);

    const authorization = new Headers();
    authorization.append("x-api-key", "yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3");

    const updateloomavailabilityconnection = {
      method: "POST",
      body: updateloomavailabilityform,
      redirect: "follow",
      // headers: authorization,
    };
    fetch(
      "https://textileapp.microtechsolutions.co.in/php/updateloomavailabilitynew.php",
      updateloomavailabilityconnection
    )
      .then((response) => response.text())
      .then((result) => {
        ////console.log(result);
      })
      .catch((error) => console.error(error));
  };
  const postloombookingform = new FormData();

  const postloombooking = () => {
    postloombookingform.append("KnottingOrderId", knottingid);
    postloombookingform.append("BookedFromDate", fromdate);
    postloombookingform.append("BookedToDate", todate);

    const postloomcon = {
      method: "POST",
      body: postloombookingform,
      redirect: "follow",
      // headers: authorization,
    };
    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postloombooking.php",
      postloomcon
    )
      .then((response) => response.text())
      .then((result) => {
        ////console.log(result);
      })
      .catch((error) => console.error(error));
  };
  // const bookloom=()=>{
  //   toast('book')
  // }
  const bookloom = (bookingid) => {
    postloombookingform.append("BookingId", bookingid);
    // toast("book");
    confirmknottingoffer();
    postloombooking();
  };
  const checkbooking = async () => {
    if (!fromdate || !todate) {
      toast.error("Enter from date and to date.");
      return;
    }
    if (fromdate > todate) {
      toast.error("Invalid checking dates");
      return;
    }
    const checkform = new FormData();
    checkform.append("Fromdate", fromdate);
    checkform.append("Todate", todate);
    checkform.append("LoomDetailId", selectedLoom.LoomDetailId);

    const authorization = new Headers();
    authorization.append("x-api-key", "yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3");
    const checkpost = {
      method: "POST",
      body: checkform,
      redirect: "follow",
      // headers: authorization,
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/checkbookdate.php",
      checkpost
    )
      .then((response) => response.text())
      .then((result) => {
        ////console.log(result);
        toast.info(result);
        if (result === "Booked") {
          setchckstate(false);
        } else {
          setchckstate(true);
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getloom();
  }, []);

  const [selectedLoom, setSelectedLoom] = useState(null);

  const handleLoomSelection = (loomNumber) => {
    setknottingorder("");
    setchckstate(false);
    setfromdate("");
    settodate("");
    setSelectedLoom(loomNumber);

    const getloombookings = {
      method: "GET",
      redirect: "follow",
      // headers: authorization,
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomBooking&Colname=LoomDetailId&Colvalue=" +
        loomNumber.LoomDetailId,
      getloombookings
    )
      .then((response) => response.json())
      .then((result) => {
        ////console.log(result);
        setbookingdata(
          result
            .reverse()
            .slice(0, 3)
            .filter((booking) => booking.Available === 0)
        );
      })
      .catch((error) => console.error(error)); // Update selected loom number when a loom is clicked
  };

  //   const for right side form
  const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
  const handleInfoBtnClick = () => {
    setisInfoFormOpen(!isInfoFormOpen);
  };
  const handleFormClose = () => {
    setisInfoFormOpen(false);
  };

  // Add more looms as needed
  return (
    <>
      <div className="loom_booking-container">
        <div className="loom_booking-left">
          <div>
            <h1 style={{ textAlign: "center", color: "var( --primary-color)" }}>
              Loom Booking panel
            </h1>
          </div>
          {data && !data.length && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "60vh",
                }}
              >
                {" "}
                <img src={add} style={{ width: "50%" }} alt="add" />
                <h2
                  style={{
                    color: "#4f5551",
                    marginTop: "50px",
                    fontSize: "30px",
                  }}
                >
                  To start booking add loom
                </h2>
              </div>
            </div>
          )}
          <div className="loom_booking_allcards">
            {data &&
              data.map((data) => (
                <div
                  className="loom_booking_card1"
                  onClick={() => handleLoomSelection(data)}
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
                    <HiMiniInformationCircle
                      onClick={handleInfoBtnClick}
                      style={{
                        color: "white",
                        fontSize: "25px",
                        marginRight: "3px",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="loom_number"
                      style={{
                        background: "var(--secondary-color)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <p style={{ cursor: "pointer", fontSize: "20px" }}>
                        {data.LoomNo}{" "}
                      </p>
                    </div>
                    <hr />

                    <>
                      {data.LoomAvailableFrom.date.substring(0, 10) <=
                        formattedToday &&
                      data.LoomAvailableTo.date.substring(0, 10) >
                        formattedToday ? (
                        <>
                          {" "}
                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",

                              textAlign: "center",
                              color: "var(--primary-color)",
                            }}
                          >
                            Available
                          </p>
                        </>
                      ) : (
                        <>
                          {" "}
                          {data.KnottingOrderId === null &&
                          data.OrderNoId === null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  marginLeft: "10px",
                                  color: "var(--primary-color)",
                                }}
                              >
                                Booked
                              </p>{" "}
                              <p
                                style={{ fontSize: "13px", marginLeft: "10px" }}
                              >
                                From:{" "}
                                <span>
                                  {data.BookedFromDate &&
                                    data.BookedFromDate.date.substring(0, 10)}
                                </span>
                              </p>
                              <p
                                style={{ fontSize: "13px", marginLeft: "10px" }}
                              >
                                To:{" "}
                                {data.BookedToDate &&
                                  data.BookedToDate.date.substring(0, 10)}{" "}
                              </p>{" "}
                            </>
                          ) : data.KnottingOrderId != null ? (
                            <>
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  marginLeft: "10px",
                                  color: "var(--primary-color)",
                                }}
                              >
                                OR: <span>OR{data.KnottingOrderId}</span>
                              </p>{" "}
                              <p
                                style={{ fontSize: "13px", marginLeft: "10px" }}
                              >
                                From:{" "}
                                <span>
                                  {data.BookedFromDate &&
                                    data.BookedFromDate.date.substring(0, 10)}
                                </span>
                              </p>
                              <p
                                style={{ fontSize: "13px", marginLeft: "10px" }}
                              >
                                To:{" "}
                                <span>
                                  {data.BookedToDate &&
                                    data.BookedToDate.date.substring(0, 10)}
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  marginLeft: "10px",
                                  color: "var(--primary-color)",
                                }}
                              >
                                OR: <span>{data.OrderNo}</span>
                              </p>{" "}
                              <p
                                style={{ fontSize: "13px", marginLeft: "10px" }}
                              >
                                To:{" "}
                                <span>
                                  {data.BookedDateTo &&
                                    data.BookedDateTo.date.substring(0, 10)}
                                </span>
                              </p>
                              <p
                                style={{ fontSize: "13px", marginLeft: "10px" }}
                              >
                                Party: {data.PartyName}{" "}
                              </p>{" "}
                            </>
                          )}
                        </>
                      )}
                    </>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {selectedLoom && (
          <div className="loom_booking-right" style={{ margin: "10px" }}>
            <div style={{ position: "fixed", marginRight: "50px" }}>
              <h2
                style={{
                  textAlign: "center",
                  color: "var(--complementary-color)",
                }}
              >
                {selectedLoom
                  ? `Selected Loom: ${selectedLoom.LoomNo}`
                  : "Select Loom No"}
              </h2>
              <div
                // style={{ border: "1px solid var(--secondary-color)", background: 'var(--background-color)', borderRadius: '10px', padding: '10px' }}
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
                    style={{
                      fontWeight: "bold",
                      // padding: "10px",
                      fontSize: 18,
                    }}
                  >
                    Book Loom
                  </label>
                </div>
                <div
                  style={{ height: "48vh", width: "25vw", marginTop: "20px" }}
                >
                  <div style={{ width: "100%" }}>
                    <div>
                      <label style={{ fontWeight: "bold", padding: "10px" }}>
                        Knotting Order No. (Optional)
                      </label>
                      <input
                        style={{
                          width: "85%",
                          margin: "10px",
                          border: "1px solid var(--primary-color)",
                          marginTop: "8px",
                        }}
                        value={knottingorder}
                        onChange={(e) => setknottingorder(e.target.value)}
                        type="text"
                      />
                      <button
                        style={{
                          width: "30%",
                          marginTop: "25px",
                          margin: "10px",
                          backgroundColor: "white",
                          border: "2px solid var(  --primary-color)",
                          color: "var( --primary-color)",
                          fontWeight: "800",
                          padding: "9px 0",
                        }}
                        className="btn1"
                        onClick={getknottingid}
                      >
                        Verify
                      </button>
                    </div>
                    <div
                      className="loom-dateContainer"
                      style={{ display: "flex" }}
                    >
                      <div style={{ marginTop: "10px" }}>
                        <label style={{ fontWeight: "bold", padding: "10px" }}>
                          From Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          style={{
                            width: "85%",
                            margin: "10px",
                            border: "1px solid var(--primary-color)",
                            marginTop: "7px",
                          }}
                          value={fromdate}
                          onChange={(e) => {
                            setfromdate(e.target.value);
                            setchckstate(false);
                          }}
                          type="date"
                        />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <label style={{ fontWeight: "bold", padding: "10px" }}>
                          To Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          style={{
                            width: "85%",
                            margin: "10px",
                            border: "1px solid var(--primary-color)",
                            marginTop: "7px",
                          }}
                          value={todate}
                          onChange={(e) => {
                            settodate(e.target.value);
                            setchckstate(false);
                          }}
                          type="date"
                        />
                      </div>
                    </div>
                    <button
                      className="checkdate"
                      style={{
                        // width: "30%",
                        // marginTop: "35px",
                        margin: "10px",
                        backgroundColor: "white",
                        border: "2px solid var(  --complementary-color)",
                        color: "var( --complementary-color)",
                        fontWeight: "800",
                        padding: "9px 0",
                        borderRadius: "8px",
                      }}
                      onClick={checkbooking}
                    >
                      Check Date
                    </button>
                  </div>
                </div>
                <div
                  className="loom_booking_btn-container"
                  //  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  {chckstate && (
                    <button
                      style={{
                        // width: "30%",

                        margin: "10px",
                      }}
                      className="btn1"
                      // onClick={testbook}
                      // onClick={
                      //   selectedLoom.BookedFromDate === null && selectedLoom.BookedToDate === null
                      //     ? () => updateloom(selectedLoom)
                      //     : () => bookloom(selectedLoom)
                      // }
                      onClick={() => getmethods(selectedLoom)}
                    >
                      Submit
                    </button>
                  )}
                </div>
                <table
                  className="loomform-table"
                  style={{ backgroundColor: "white" }}
                >
                  <thead>
                    <tr>
                      <th>Order No.</th>
                      <th>From Date</th>
                      <th> To Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingdata.length ? (
                      bookingdata
                        .filter((order) => order.BookedFromDate)
                        .map((order) => (
                          <tr>
                            <td>
                              {order.OrderNoId
                                ? "OR" + order.OrderNoId
                                : order.KnottingOrderId
                                ? "OR" + order.KnottingOrderId
                                : "Other"}
                            </td>
                            <td>
                              {order.BookedFromDate.date.substring(0, 10)}
                            </td>
                            <td>{order.BookedToDate.date.substring(0, 10)}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          No booking found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div
                className={`loom_booking_infoform-container ${
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
                  <button
                    className="btn2"
                    style={{ marginTop: "5%" }}
                    onClick={() =>
                      navigate(`../myloomdetails/` + selectedLoom.Id)
                    }
                  >
                    Edit Loom
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Loom_booking;

// main code
// import React from 'react';
// import { useState, useEffect } from "react";
// import '../common/static/css/loomBooking.css'
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
// import '../common/static/css/loom_booking.css';

// function Loom_booking() {
//     const [isBooked, setIsBooked] = useState(true);
//     const [isLoomBooked, setLoomIsBooked] = useState(false);
//     const [id, setId] = useState(493);
//     const [data, setData] = useState();

//     const [orderNum, setOrderNum] = useState(null);
//     const [bookedDate, setBookedDate] = useState(null);

//     // const toggleBookingStatus = () => {
//     //     setIsBooked(!isBooked);
//     // };

//     const getloom = () => {
//         fetch('https://textileapp.microtechsolutions.co.in/php/bookingjoin.php?LoomTraderId=493')
//             .then(response => response.json())
//             .then(jsonData => {
//                 ////console.log(jsonData);
//                 setData(jsonData); // Update state with fetched data

//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);

//             });
//     }

//     useEffect(() => {
//         getloom()
//     }, []);

//     const toggleBookingStatus = () => {
//         setIsBooked(!isBooked);
//         if (!isBooked) {
//             // Simulating booking data, replace with actual data
//             setOrderNum('OR1234');
//             setBookedDate('2024-06-05');
//         } else {
//             setOrderNum(null);
//             setBookedDate(null);
//         }
//     };

//     const [orderId, setOrderId] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const loomBookingStatus = () => {
//         setLoomIsBooked(!isLoomBooked);
//         if (!isLoomBooked) {
//             // Simulating booking data, replace with actual data
//             setOrderId('OR65123');
//             setToDate('2024-06-05');
//         } else {
//             setOrderId(null);
//             setToDate(null);
//         }
//     };

//     const [selectedLoom, setSelectedLoom] = useState(null);

//     const handleLoomSelection = (loomNumber) => {
//         setSelectedLoom(loomNumber); // Update selected loom number when a loom is clicked
//     };

//     //   const for right side form
//     const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
//     const handleInfoBtnClick = () => {
//         setisInfoFormOpen(!isInfoFormOpen);
//     };
//     const handleFormClose = () => {
//         setisInfoFormOpen(false);
//     };
//     const loomTraderId = 493;

//     // //
//     const [loomNo, setLoomNo] = useState('2');
//     const [machineType, setMachineType] = useState('Airjet');
//     const [sheddingType, setSheddingType] = useState('E-Shedding');
//     const [width, setWidth] = useState(250.000);
//     const [rpm, setRpm] = useState(500.00);
//     const [noOfFrames, setNoOfFrames] = useState(10);
//     const [noOfFeeders, setNoOfFeeders] = useState(6);
//     const [selvageJacquard, setSelvageJacquard] = useState(1);
//     const [topBeam, setTopBeam] = useState(0);
//     const [cramming, setCramming] = useState(1);
//     const [lenoDesignEquipment, setLenoDesignEquipment] = useState(0);
//     const [loomAvailableFrom, setLoomAvailableFrom] = useState('2024-06-05');
//     const [loomAvailableTo, setLoomAvailableTo] = useState('2024-12-05');

//     return (
//         <>
//             <div className='loom_booking-container'>
//                 <div className='loom_booking-left'
//                 //style={{ border: '2px solid green', }}
//                 >
//                     <div>
//                         <h1 style={{ textAlign: 'center', color: 'var( --primary-color)' }}>Loom Booking panel  </h1>

//                     </div>
//                     <div
//                         style={{
//                             //  border: '3px solid blue',
//                             padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 0.3fr)', gridTemplateRows: 'repeat(4,0.3fr)', gap: '30px'
//                         }}
//                         className='loom_booking_allcards' >

//                         <div className='loom_booking_card1' onClick={() => handleLoomSelection('L-1')} style={{ border: '2px solid var(--secondary-color)', borderRadius: "8px", position: 'relative' }} >
//                             <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer', fontSize: '30px' }}>
//                                 <IoMdInformationCircleOutline onClick={handleInfoBtnClick} style={{ color: "white" }} />
//                             </div>
//                             <div style={{}}>
//                                 <div className='loomnumber' style={{ background: isBooked ? 'var(--complementary-color)' : 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
//                                     <p style={{ cursor: 'pointer', fontSize: '20px' }} onClick={toggleBookingStatus}> L-1 </p>
//                                 </div>
//                                 <hr />
//                                 {orderNum !== null ? (
//                                     <>
//                                         <p style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '10px' }} >OR : <span>{orderNum}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>To : <span>{bookedDate}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>Party : </p>
//                                     </>
//                                 ) : (
//                                     <p></p>
//                                 )}
//                             </div>
//                         </div>

//                         <div className='loom_booking_card1' onClick={() => handleLoomSelection('L-2')} style={{ border: '2px solid var(--secondary-color)', borderRadius: "8px", position: 'relative' }}>
//                             <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer', fontSize: '30px' }}>
//                                 <IoMdInformationCircleOutline onClick={handleInfoBtnClick} style={{ color: "white" }} />
//                             </div>
//                             <div style={{ textAlign: 'center' }}>
//                                 <div className='loomnumber' style={{ background: isLoomBooked ? 'var(--complementary-color)' : 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
//                                     <p style={{ cursor: 'pointer', fontSize: '20px' }} onClick={loomBookingStatus}> L-2 </p>
//                                 </div>
//                                 <hr />

//                                 {orderId !== null ? (
//                                     <>
//                                         <p style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '10px' }} >OR : <span>{orderNum}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>To : <span>{bookedDate}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>Party : </p>

//                                     </>
//                                 ) : (
//                                     <h3> Available</h3>
//                                 )}
//                             </div>
//                         </div>
// {/*
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div> */}
//                     </div>

//                 </div>
//                 {selectedLoom && (
//                 <div
//                     className='loombooking-right'
//                     style={{

//                         // border: '2px solid blue',
//                         margin: '10px',
//                     }}>
//                     <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>
//                         {selectedLoom ? `Selected Loom :  ${selectedLoom} ` : "Select Loom No"}
//                     </h2>

//                     <div style={{ border: "1px solid  var( --secondary-color)", background: 'var(--background-color)', borderRadius: '10px', padding: '10px' }} className='loom_booking-form-container'>

//                         <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'center' }}>
//                             <label style={{ fontWeight: 'bold', padding: '10px', fontSize: 18 }}>Order No</label>
//                             <input style={{ width: '40%', margin: '10px', border: '1px solid var(--primary-color)' }}
//                                 type="text" placeholder='Order No' />
//                         </div>

//                         <div style={{ height: '40vh', marginTop: '20px' }} className='loom_booking_container'>
//                             <div  >
//                                 {/* <div>
//                                     <label style={{ fontWeight: 'bold',padding:'10px' }}>Order No</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                         type="text" placeholder='Order No' />
//                                 </div> */}

//                                 <div >
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Quality</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', }} type="text" placeholder='Quality' />
//                                 </div>

//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Job Rate Exp</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', }} type="text" placeholder='Enter Job Rate ' />
//                                 </div>
//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Party Name</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', }} type="text" placeholder='Enter Party Name' />
//                                 </div>

//                             </div>
//                             <div >
//                                 <div>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Order Date</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '8px' }} type="date" />
//                                 </div>

//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>From Date</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '7px' }} type="date" />
//                                 </div>

//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>To Date</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '7px' }} type="date" readonly />
//                                 </div>

//                             </div>
//                         </div>

//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                             <button style={{ width: '30%', marginTop: '20px', margin: '10px' }} className='btn1'>Submit</button>
//                         </div>

//                         {/*  */}

//                         <div className={`infoform-container ${isInfoFormOpen ? "form-open" : ""}`}>
//                             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                 <h2 style={{ color: 'var(--primary-color)', padding: '20px' }}>Loom Information</h2>
//                                 <IoClose style={{ fontSize: '30px', color: 'var(--primary-color)' }} onClick={handleFormClose} />
//                             </div>

//                             <div style={{ marginLeft: '50px' }}>
//                                 <div><h3>Loom No :  {loomNo}</h3></div>
//                                 <div><h3>Machine Type : {machineType}</h3></div>
//                                 <div><h3>Shedding Type : {sheddingType}</h3></div>
//                                 <div><h3>Width : {width}</h3></div>
//                                 <div><h3>RPM : {rpm}</h3></div>
//                                 <div><h3>No of Frames : {noOfFrames}</h3></div>
//                                 <div><h3>No of Feeders : {noOfFeeders}</h3></div>
//                                 <div><h3>Selvage Jacquard : {selvageJacquard}</h3></div>
//                                 <div><h3>Top Beam : {topBeam}</h3></div>
//                                 <div><h3>Cramming : {cramming}</h3></div>
//                                 <div><h3>Leno Design Equipment : {lenoDesignEquipment}</h3></div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                  )}
//             </div>

//         </>
//     )
// }

// export default Loom_booking;
