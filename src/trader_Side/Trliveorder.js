import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import add from "../common/static/image/emptybox1.jpg";
const Trliveorder = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const handlecardclick = (order) => {
    navigate(`../trader-live-orders/trorderdetails/${order.LoomOrderId}`, {
      state: { Name: order.Name, Completed: order.Completed, enquiryid:order.EnquiryId,
        orderno:order.OrderNo,loomid:order.LoomTraderId},
    });
  };

  const [liveOrders, setLiveOrders] = useState([]);

  useEffect(() => {
    const loadliveorders = () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        " https://textileapp.microtechsolutions.co.in/php/traderliveorder.php?LoomTraderId=" +
          user.Id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(
            result.filter(
              (order) => order.Confirmed === 1 && order.Completed === null
            )
          );
          setLiveOrders(
            result.filter(
              (order) => order.Confirmed === 1 && order.Completed === null
            )
          );
        })
        .catch((error) => console.error(error));
    };

    loadliveorders();
  }, []);

  return (
    <div className="Trliveorder-container">
      <div>
        <h1 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          Live orders{" "}
        </h1>
      </div>

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
            <h2 style={{ color: "#dda960", fontSize: "35px" }}>No order yet</h2>
          </div>
        </div>
      )}

      <div
        style={{
          padding: "20px",
          margin: "10px",
          display: "grid",
          height: "88vh",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(4,1fr)",
          gap: "30px",
        }}
        className="trlive-Order-cards"
      >
        {liveOrders.map((order) => (
          <div
            style={{
              border: "3px solid var(--tershary-color)",
              borderRadius: "10px",
            }}
            className="trlive-order-box"
          >
            <div
              onClick={() => handlecardclick(order)}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              <div
                style={{ color: "var(--secondary-color)", fontWeight: "bold" }}
              >
                <p>
                  OR :<b>{order.OrderNo}</b>{" "}
                </p>
              </div>
              <div
                style={{ color: "var(--secondary-color)", fontWeight: "bold" }}
              >
                <p>
                  Party :<b>{order.Name} </b>{" "}
                </p>
              </div>
              <div
                style={{ color: "var(--secondary-color)", fontWeight: "bold" }}
              >
                <p>
                  Quality : <b>{order.Quality} </b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trliveorder;
