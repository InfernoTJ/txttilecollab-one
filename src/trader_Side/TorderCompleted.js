import React, { useEffect, useState } from "react";
import "../common/static/css/completedOrder.css";
import { useNavigate } from "react-router-dom";
import add from "../common/static/image/emptybox1.jpg";

function CompletedOrder() {
  const [completedorder, setcompletedorder] = useState([]);
  const [knottingcompletedorder, setknottingcompletedorder] = useState([]);
  const userString = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const user = userString ? JSON.parse(userString) : null;

  const handlecardclick = (order) => {
    navigate(`../trader-live-orders/trorderdetails/${order.LoomOrderId}`, {
      state: { Name: order.Name, Completed: order.Completed },
    });
  };
  const loadcompletedorder = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/traderliveorder.php?LoomTraderId=" +
        user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result)
        setcompletedorder(Array.isArray(result) ? result.filter((order) => order.Completed === 1) : []);
      })
      .catch((error) => console.error(error));
  };
  const getknottingcompletedorders = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getknottingoffer.php?TraderId=" +
        user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);

        setknottingcompletedorder(
          result.filter(
            (order) => order.ConfirmTrader === 1 && order.Orderfinish === 1
          )
        );
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getknottingcompletedorders();
    loadcompletedorder();
  }, []);
  return (
    <>
      <div className="completedOrder-container">
        <div
          className="suborder-container"
          style={{ marginTop: "30px", marginLeft: "20px" }}
        >
          <div className="completed-title">
            <h5>Completed Order</h5>
          </div>

          {completedorder.length === 0 &&
            knottingcompletedorder.length === 0 && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "70vh",
                  }}
                >
                  {" "}
                  <img src={add} style={{ width: "30%" }} alt="add" />
                  <h2 style={{ color: "#dda960", fontSize: "35px" }}>
                    No orders completed yet
                  </h2>
                </div>
              </div>
            )}
          <div className="live-ordersCards-container">
            {completedorder.map((order) => (
                <div
                  onClick={() => handlecardclick(order)}
                  className="live-ordersCards-all"
                  key={order.id}
                  style={{
                    border: "3px solid var(--tershary-color)",
                    borderRadius: "10px",
                    cursor: "pointer",
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedOrder;
