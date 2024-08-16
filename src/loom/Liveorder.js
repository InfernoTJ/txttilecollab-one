import React, { useEffect, useState } from "react";
import "../common/static/css/Liveorder.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";
import add from "../common/static/image/emptybox1.jpg";
import { IoClose } from "react-icons/io5";
import { HiMiniInformationCircle } from "react-icons/hi2";
function Liveorder() {
  const navigate = useNavigate();

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [view, setView] = useState("liveOrders");
  const [liveOrders, setLiveOrders] = useState([]);

  const [confirmOrders, setConfirmOrders] = useState([]);

  const authorization = new Headers();
  authorization.append("x-api-key", "yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3");
  
  const handleLiveOrdersClick = () => {
    setView("liveOrders");
  };

  const handleConfirmOrdersClick = () => {
    setView("confirmOrders");
  };

  const handleStartOrderClick = (order) => {
    
    
    const confirmform = {
      method: "GET",
      redirect: "follow",
        // headers: authorization,
       
    };

    getmail(order, "started");
    fetch(
      `https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${order.LoomOrderId}&Confirmed=true`,
      confirmform
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success(`Order ${order.OrderNo} confirmed`);
        navigate(`../loom/LoomBooking/${order.LoomOrderId}`);
      })
      .catch((error) => console.error(error));
  };
  const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
  const handleInfoBtnClick = () => {
    setisInfoFormOpen(!isInfoFormOpen);
  };
  const handleFormClose = () => {
    setisInfoFormOpen(false);
  };
  const [selectedLoom, setSelectedLoom] = useState(null);

  const handleLoomSelection = (loomNumber) => {
    setSelectedLoom(loomNumber);
  };
  // const handleCancelOrderClick = (order) => {

  //   const confirmform = {
  //     method: "GET",
  //     redirect: "follow",
   // headers: authorization,
  //   };

  //   const emailform = new FormData();

  //   emailform.append(
  //     "Body",
  //     `Your order ${order.OrderNo} has been cancelled by ${user.Name}`
  //   );

  //   const emailconnection = {
  //     method: "POST",
  //     body: emailform,
  //     redirect: "follow",
   // headers: authorization,
  //   };

  //   const getmailconnection = {
  //     method: "GET",
  //     redirect: "follow",
   // headers: authorization,
  //   };

  //   fetch(
  //     "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue=" +
  //       order.TraderId,
  //     getmailconnection
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       const emaildata = result[0];
  //       emailform.append("AppUserId", emaildata.AppUserId);
  //       fetch(
  //         `https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${order.LoomOrderId}&Confirmed=false`,
  //         confirmform
  //       )
  //         .then((response) => response.text())
  //         .then((result) => {
  //           console.log(result);
  //           toast.success("Order is cancelling please wait");
  //           fetch(
  //             "https://textileapp.microtechsolutions.co.in/php/sendemail.php",
  //             emailconnection
  //           )
  //             .then((response) => response.text())
  //             .then((result) => {
  //               console.log(result);
  //               toast.success(`Cancelled ${order.OrderNo}`);
  //               loadliveorders();
  //             })
  //             .catch((error) => console.error(error));
  //         })
  //         .catch((error) => console.error(error));
  //     })
  //     .catch((error) => console.error(error));

  // };

  const emailform = new FormData();

  const getmail = (order, status) => {
    
    
    const gettradermailconnection = {
      method: "GET",
      redirect: "follow",
       // headers: authorization,
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue=" +
        order.TraderId,
      gettradermailconnection
    )
      .then((response) => response.json())
      .then((result) => {
        const emaildata = result[0];
        emailform.append("AppUserId", emaildata.AppUserId);
        sendtradermail(order, status);
      })
      .catch((error) => console.error(error));
  };

  const sendtradermail = (order, status) => {
    emailform.append(
      "Body",
      `Your order ${order.OrderNo} has been ${status} by ${user.Name}`
    );

   
   
    const emailconnection = {
      method: "POST",
      body: emailform,
      redirect: "follow",
       // headers: authorization,
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/sendemail.php",
      emailconnection
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const handleCancelOrderClick = (order) => {
    
    
    const requestOptions = {
      method: "GET",
      redirect: "follow",
       // headers: authorization,
    };

    getmail(order, "cancelled");

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=" +
        order.LoomOrderId +
        "&Confirmed=false",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        toast.success(`Cancelled ${order.OrderNo}`);
        loadliveorders();
      })
      .catch((error) => console.error(error));
  };

  const handlecardclick = (order) => {
    const data={
      enquiryid:order.EnquiryId,
      orderno:order.OrderNo
    }
    navigate("../live-orders/orderdetails/" + order.LoomOrderId,{state:data});
  };
  const loadliveorders = () => {
    
    
    const requestOptions = {
      method: "GET",
      redirect: "follow",
       // headers: authorization,
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/loomliveorder.php?LoomTraderId=" +
        user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(
          result.filter(
            (order) => order.Confirmed === null && order.Completed === null
          )
        );
        setLiveOrders(
          result.filter(
            (order) => order.Confirmed === null && order.Completed === null
          )
        );
        setConfirmOrders(
          result.filter(
            (order) => order.Confirmed === 1 && order.Completed === null
          )
        );
      })
      .catch((error) => console.error(error));
  };
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmDelete = (order) => {
    handleStartOrderClick(order)
    setShowConfirm(false);
  };
  const askconfirmation=(order)=>
  {
    setShowConfirm(true)
  }
  useEffect(() => { 
    loadliveorders();
  }, []);

  return (
    <>
      <div className="live-order-container" style={{ height: "85vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px",
          }}
        >
          <div
            style={{
              height: "5vh",
              width: "50%",
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              background: "#e4f5f7",
              borderRadius: "15px",
              padding: "5px",
            }}
          >
            <div onClick={handleLiveOrdersClick} style={{ flex: 1 }}>
              <button
                className={`livebtn ${view === "liveOrders" ? "active" : ""}`}
              >
                Live Order
              </button>
            </div>
            <div className="vl"></div>
            <div onClick={handleConfirmOrdersClick} style={{ flex: 1 }}>
              <button
                className={`livebtn ${
                  view === "confirmOrders" ? "active" : ""
                }`}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>

        {view && (
          <div>
            {view === "liveOrders" && (
              <>
                {liveOrders.length === 0 && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "80vh",
                      }}
                    >
                      {" "}
                      <img src={add} style={{ width: "25%" }} alt="add" />
                      <h2 style={{ color: "#dda960", fontSize: "35px" }}>
                        No order yet
                      </h2>
                    </div>
                  </div>
                )}
                <div className="live-ordersCards-container">
                  {liveOrders && <> 
                  {liveOrders.map((order) => (
                    <div
                      className="live-ordersCards-all"
                      key={order.id}
                      onClick={() => handleLoomSelection(order)}
                      style={{
                        border: "3px solid var(--tershary-color)",
                        borderRadius: "10px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "10px",
                          }}
                        >
                          <p>OR: {order.OrderNo}</p>
                          <HiMiniInformationCircle
                            onClick={handleInfoBtnClick}
                            style={{
                              color: "var(--secondary-color)",
                              fontSize: "25px",
                              cursor: "pointer",
                              marginRight: "3px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "bold",
                            margin: "10px",
                          }}
                        >
                          <p>Party: {order.PartyName}</p>
                        </div>
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "bold",
                            margin: "10px",
                            fontSize: "13px",
                          }}
                        >
                          <p>Qlt: {order.Quality}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="live-orderCards-btns">
                        <button
                          onClick={() => askconfirmation(order)}
                          className="start-order-btn"
                          style={{
                            backgroundColor: "var(--tershary-color)",
                            borderRadius: "10px",
                            color: "var(--main)",
                            border: "none",
                            cursor: "pointer",
                            padding: "10px 15px",
                            margin: "5px",
                            width: "50%",
                          }}
                        >
                          Start
                        </button>
                        <button
                          className="btn2"
                          onClick={() => handleCancelOrderClick(order)}
                          style={{
                            backgroundColor: "var(--complementary-color)",
                            borderRadius: "10px",
                            color: "var(--main)",
                            border: "none",
                            cursor: "pointer",
                            padding: "10px 15px",
                            margin: "5px",
                            width: "50%",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                      {showConfirm && (
                    <div className="custom-confirmation-dialog">
                      <div className="dialog-content">
                        <p>Are you sure you want to start order {order.OrderNo}?</p>
                        <button style={{ width: "30%" ,backgroundColor:'var(--complementary-color)' }}
                        className="btn2" onClick={ ()=>confirmDelete(order)}>Yes</button>
                        <button   style={{ width: "30%" }}
                        className="btn2" onClick={() => setShowConfirm(false)}>No</button>
                      </div>
                    </div>
                  )}
                    </div>
                  ))} 
                  </>
                  }
                </div>
              </>
            )}
            {view === "confirmOrders" && (
              <>
                {confirmOrders.length === 0 && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "80vh",
                      }}
                    >
                      {" "}
                      <img src={add} style={{ width: "25%" }} alt="add" />
                      <h2 style={{ color: "#dda960", fontSize: "35px" }}>
                        No order yet
                      </h2>
                    </div>
                  </div>
                )}
                <div className="confirmOrdersCards-container">
                  {confirmOrders.map((order) => (
                    <div
                      key={order.id}
                      className="confirmOrdersCards-all"
                      //  style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }}
                    >
                      <div
                        onClick={() => handlecardclick(order)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      >
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          <p>OR: {order.OrderNo}</p>
                        </div>
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          <p>Party: {order.PartyName}</p>
                        </div>
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            fontWeight: "bold",
                          }}
                        >
                          <p>Qlt: {order.Quality}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="cnfm-order-btn">
                        <button
                          className="btn1"
                          style={{ margin: "0 auto" }}
                          onClick={() => handleCancelOrderClick(order)}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
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
            <h2 style={{ color: "var(--primary-color)", padding: "20px" }}>
              {selectedLoom && selectedLoom.OrderNo} Information
            </h2>
            <IoClose
              style={{ fontSize: "30px", color: "var(--primary-color)",marginRight:'20%' }}
              onClick={handleFormClose}
            />
          </div>
          {selectedLoom && (
            <div style={{ marginLeft: "50px" }}>
              <div>
                <h3>Enquiry No: {selectedLoom.EnquiryNo}</h3>
              </div>
              <div>
                <h3>Agent Name: {selectedLoom.AgentName}</h3>
              </div>
              <div>
                <h3>Fabric Length: {selectedLoom.FabricLength}</h3>
              </div>
              <div>
                <h3>Fabric Quality: {selectedLoom.FabricQuality}</h3>
              </div>
              <div>
                <h3>Fabric Width: {selectedLoom.FabricWidth}</h3>
              </div>
              <div>
                <h3>Machine Type: {selectedLoom.MachineType}</h3>
              </div>
              <div>
                <h3>Shedding Type: {selectedLoom.SheddingType}</h3>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between",padding:'0 10% 0 0' }}> 
                <div>
                  <div>
                    <h3>Width: {selectedLoom.Width}</h3>
                  </div>
                  <div>
                    <h3>RPM: {selectedLoom.RPM}</h3>
                  </div>
                </div>
                <div>
                  <div>
                    <h3>No of Frames: {selectedLoom.NoofFrame}</h3>
                  </div>
                  <div>
                    <h3>No of Feeders: {selectedLoom.NoofFeedero}</h3>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between",padding:'0 5% 0 0' }}>
                {" "}
                <div>
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
                </div>{" "}
                <div>
                  {" "}
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
              {selectedLoom.Photopath && (
                <div>
                  <img
                    src={selectedLoom.Photopath}
                    style={{
                      width: "50%",
                      maxHeight: "25vh",
                      borderRadius: "5px",
                      border:'1px solid black'
                    }}
                    alt="designpaper"
                  />
                </div>
              )}
            </div>
          )}
        </div>
       
      </div>
    </>
  );
}

export default Liveorder;
