import React, { useEffect, useState } from "react";
import "../common/static/css/cancel.css";

import { toast } from "react-toastify";
import add from "../common/static/image/emptybox1.jpg";
function Cancelledorder() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [cancelledorder, setcancelledorder] = useState([]);
  const [cancelledknotting, setcancelledknotting] = useState([]);

  const handleknottingstartorder = (oid)=>{
    const restartknottingform = new FormData();
    restartknottingform.append("Id", oid);
    restartknottingform.append("ConfirmLoom", "");
    
    const restartknottingconnection = {
      method: "POST",
      body: restartknottingform,
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/confirmknottingoffer.php", restartknottingconnection)
      .then((response) => response.text())
      .then((result) => {//console.log(result)
        toast.success('Restarted OR'+oid)
        getknottingcanncelled()
      })
      .catch((error) => console.error(error));
  }

  const handleStartOrderClick = (oid) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${oid}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        loadcancelledorder();
        toast.success("Restarted OR" + oid);
      })
      .catch((error) => console.error(error));
  };

  const loadcancelledorder = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      " https://textileapp.microtechsolutions.co.in/php/loomliveorder.php?LoomTraderId=" +
        user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // //console.log(
        //   result.filter(
        //     (order) => order.Confirmed === 0 && order.Completed === null
        //   )
        // );
        setcancelledorder(
          result.filter(
            (order) => order.Confirmed === 0 && order.Completed === null
          )
        );
      })
      .catch((error) => console.error(error));
  };
  const getknottingcanncelled = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getknottingoffer.php?LoomId=" +
        user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);

        setcancelledknotting(
          result.filter(
            (order) => order.ConfirmLoom === 0 && order.Orderfinish === null
          )
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getknottingcanncelled();
    loadcancelledorder();
  }, []);

  return (
    <>
      <div
        // className='completed-title'
        style={{
          // marginTop: "30px",
          marginLeft: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            color: "white",
            backgroundColor: "var(--primary-color)",
            padding: "15px 50px",
            borderRadius: "5px",
          }}
        >
          Cancelled Order
        </h3>
      </div>
      {(cancelledorder.length === 0 && cancelledknotting.length===0) && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // height: "70vh",
            }}
          >
            {" "}
            <img src={add} style={{ width: "30%" }} alt="add" />
            <h2 style={{ color: "#dda960", fontSize: "35px" }}>No order yet</h2>
          </div>
        </div>
      )}
      <div className="cancel-container">
        <div className="subcancel-container">
          <div
           style=
           {{ padding: 50,
            height: "auto",
             width: "100%" 
             }}>
            <div 
            className=
            "live-ordersCards-container"
            >
              {cancelledorder.map((order) => (
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
                  <div 
                  // className="live-orderCards-btns"
                  >
                    <button
                      onClick={() => handleStartOrderClick(order.LoomOrderId)}
                      className="start-order-btn"
                      style={{
                        backgroundColor: "var(--tershary-color)",
                        borderRadius: "10px",
                        color: "var(--main)",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 15px",
                        margin: "5px",
                        width: "80%",
                       // margin: "0 auto",
                        marginBottom: "5px",
                      }}
                    >
                      Restart
                    </button>
                  </div>
                </div>
               
              ))}
              {cancelledknotting.map((knotingcan) => (
                <div
                  className="cnsllive-ordersCards-all"
                  key={knotingcan.id}
                  style={{
                    border: "3px solid var(--tershary-color)",
                    borderRadius: "10px",
                  }}
                >
                   <div >
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>OR: {knotingcan.OfferNo}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>Party: {knotingcan.Name}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px'}}><p>Reed: {knotingcan.Reed}</p><p>ReedSpace: {knotingcan.ReedSpace}</p></div> 
                    </div>
               
               
                  <hr />
                  <div className="live-orderCards-btns">
                    <button
                      onClick={() =>
                        handleknottingstartorder(knotingcan.KnottingId)
                      }
                      className="start-order-btn"
                      style={{
                        backgroundColor: "var(--tershary-color)",
                        borderRadius: "10px",
                        color: "var(--main)",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 15px",
                        margin: "5px",
                        width: "80%",
                       // margin: "0 auto",
                        marginBottom: "5px",
                      }}
                    >
                      Restart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancelledorder;
