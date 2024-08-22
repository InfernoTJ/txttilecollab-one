import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import nochat from "../common/static/image/nochat.jpg";
const Y_trader = () => {


  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const navigate = useNavigate(); 
const[uniquetrader,setuniquetrader]=useState([])
 
 
const gettrader =()=>{
  const gettrader = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(`https://textileapp.microtechsolutions.co.in/php/getyarnrate.php?YarnId=${user.Id}&LoomId=&TraderId=`, gettrader)
    .then((response) => response.json())
    .then((result) => {//console.log(result)

      setuniquetrader(result.filter((loom)=>loom.LoomOrTrader==='T'))

    })
    .catch((error) => console.error(error));
}
const gotochat =(trader)=>{
  const dataToSend = {
    chatingid: trader.Id,
    receivername: trader.LoomOrTraderName,
    roleofreceiver:trader.LoomOrTrader
  };
  navigate('../notifications',{ state: dataToSend })
 }
  useEffect(()=>{

    gettrader()
  },[])





  return (
    <div style={{height:'100vh',padding:'3% 2%'}} className='y-loomcontainer'>

<h5 style={{
              fontSize: "16px",
              fontWeight: 300,
              color: "#fff",
              backgroundColor: "var(--primary-color)",
              padding: "7px",
              margin:0,
             marginBottom:'3%',
              width:'15vw',
              borderRadius: "5px",
            }}>Traders</h5>
   {uniquetrader.length <= 0 && (
        <div
          style={{
            // backgroundColor:'red',
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img src={nochat} style={{ width: "30%" }} alt="" />
          <h2 style={{ color: "#9c9c9c", fontSize: "35px" }}>
            No Chats Yet
          </h2>
        </div>
      )}

    <div className='Y-loom_cards-container' style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)',gridTemplateRows:'repeat(10 ,1fr)'}}>


    {uniquetrader && uniquetrader
    .map((trader) => (
      <div key={trader.TraderId} style={{boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',borderRadius:'15px' , textAlign:'center',alignContent:'center' ,cursor:'pointer'}} onClick={()=>gotochat(trader)}>
        <p>
        Trader:<br/> {trader.LoomOrTraderName}
        </p>
      </div>
  ))}

    </div>
    </div>
  )
}

export default Y_trader
