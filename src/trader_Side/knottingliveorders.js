import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "../common/static/css/Liveorder.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import add from "../common/static/image/emptybox1.jpg";

export default function BasicTabs() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [liveOrders, setLiveOrders] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = (orderId) => {};

  React.useEffect(() => {
    getliveorders();
  }, []);
  const getliveorders = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getknottingoffer.php?TraderId="+user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result.filter((order)=>order.Orderfinish===null));
        setLiveOrders(
          result.filter((order)=>order.Orderfinish===null)
        ); 
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div>
        <h1 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          Knotting Live orders
        </h1>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {liveOrders.length===0 &&  <div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'80vh'}}> <img src={add} style={{width:'25%',}} alt="add" /> 
              <h2 style={{color:'#dda960',fontSize:'35px'}}>No order yet</h2></div> 
              </div>}
          <div className="live-ordersCards-container" style={{}}>
            {liveOrders.length > 0 && (
              liveOrders.map((order) => (
                <div className="live-ordersCards-all" key={order.id}>
                  <div
                    onClick={() => handleCardClick(order.id)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  >
                    <div
                      style={{
                        color: "var(--secondary-color)",
                        fontWeight: "bold",
                      }}
                    >
                      <p>OR: {order.OfferNo}</p>
                    </div>
                    <div
                      style={{
                        color: "var(--secondary-color)",
                        fontWeight: "bold",
                      }}
                    >
                      <p>Party: {order.Name}</p>
                    </div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Reed: {order.Reed}</p><p>ReedSpace: {order.ReedSpace}</p></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
        </Box>
      </Box>
    </>
  );
}
