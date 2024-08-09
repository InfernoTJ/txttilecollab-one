import React, { useEffect, useState } from "react";
import "../common/static/css/Liveorder.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "../common/static/image/emptybox1.jpg";
function Liveorder() {
  const navigate = useNavigate();

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [view, setView] = useState("liveOrders");
  const [liveOrders, setLiveOrders] = useState([]);

  const [confirmOrders, setConfirmOrders] = useState([]);

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
    };

    getmail(order,'started')
  
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

  // const handleCancelOrderClick = (order) => {



  //   const confirmform = {
  //     method: "GET",
  //     redirect: "follow",
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
  //   };

  //   const getmailconnection = {
  //     method: "GET",
  //     redirect: "follow",
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


const getmail =(order,status)=>{
  const gettradermailconnection = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue="+order.TraderId, gettradermailconnection)
    .then((response) => response.json())
    .then((result) => {
      const emaildata = result[0];
      emailform.append("AppUserId", emaildata.AppUserId);
      sendtradermail(order,status)
    })
    .catch((error) => console.error(error));
}

  const sendtradermail = (order,status)=>{


    emailform.append(
      "Body",
      `Your order ${order.OrderNo} has been ${status} by ${user.Name}`
    );

    const emailconnection = {
      method: "POST",
      body: emailform,
      redirect: "follow",
    };


    fetch(
      "https://textileapp.microtechsolutions.co.in/php/sendemail.php",
      emailconnection
    )
      .then((response) => response.text())
      .then((result) => {console.log(result)})
      .catch((error) => console.error(error));
  }

  const handleCancelOrderClick = (order) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    getmail(order,'cancelled')

    fetch("https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId="+order.LoomOrderId+"&Confirmed=false", requestOptions)
      .then((response) => response.text())
      .then((result) => {
    console.log(result);

        toast.success(`Cancelled ${order.OrderNo}`);
        loadliveorders();
      })
      .catch((error) => console.error(error));
  }

  const handlecardclick = (orderid) => {
    navigate("../live-orders/orderdetails/" + orderid);
  };
  const loadliveorders = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
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
                className={`livebtn ${view === "confirmOrders" ? "active" : ""
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
                  {liveOrders.map((order) => (
                    <div
                      className="live-ordersCards-all"
                      key={order.id}
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
                            margin: "10px",
                          }}
                        >
                          <p>OR: {order.OrderNo}</p>
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
                          onClick={() => handleStartOrderClick(order)}
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
                          onClick={() =>
                            handleCancelOrderClick(order)
                          }
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
                    </div>
                  ))}
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
                        onClick={() => handlecardclick(order.LoomOrderId)}
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
                          onClick={() =>
                            handleCancelOrderClick(order)
                          }
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
      </div>
    </>
  );
}

export default Liveorder;
