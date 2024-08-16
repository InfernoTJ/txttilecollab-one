import React, { useEffect, useState } from 'react'
import './../common/static/css/y_loom.css'
import {  useNavigate } from "react-router-dom";
import nochat from "../common/static/image/nochat.jpg"; 
const Y_loom = () => {

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [uniqueLooms,setuniqueLooms] = useState([]);
const navigate = useNavigate(); 



const getlooms =()=>{
  const yarnforloom = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch(`https://textileapp.microtechsolutions.co.in/php/getyarnrate.php?YarnId=${user.Id}&LoomId=&TraderId=`, yarnforloom)
    .then((response) => response.json())
    .then((result) => {console.log(result)
      setuniqueLooms(result.filter((loom)=>loom.LoomOrTrader==='L'))
    })
    .catch((error) => console.error(error));
}




const gotochat =(loom)=>{
  const dataToSend = {
    chatingid: loom.Id,
    receivername: loom.LoomOrTraderName,
    roleofreceiver:loom.LoomOrTrader
  };
 navigate('../notifications',{ state: dataToSend })
}

  useEffect(()=>{
 
    getlooms()
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
            }}>Looms</h5>

            {uniqueLooms.length <= 0 && (
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

    {uniqueLooms && uniqueLooms
    .map((loom) => (  
      <div style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',borderRadius:'15px'  , textAlign:'center',alignContent:'center',cursor:'pointer'}} onClick={()=>gotochat(loom)}>
        <p> 
          Loom: <br/> {loom.LoomOrTraderName}
        </p>
      </div>
  ))}

    </div>
    </div>
  )
}

export default Y_loom




// import React from 'react';
// import './../common/static/css/y_loom.css';

// const Y_loom = () => {
//   const gridItems = Array.from({ length: 100 }).map((_, index) => (
//     <div key={index} style={{ border: '2px solid blue' }}>
//       {index === 0 && <p>Loom:-LU00529</p>}
//       {index === 1 && <p>Loom:-LU00529</p>}
//       {index === 2 && <p>Loom:-LU00529</p>}
//       {index === 3 && <p>Loom:-LU00529</p>}
//       {index === 4 && <p>Loom:-LU00529</p>}
//       {index === 5 && <p>Loom:-LU00529</p>}
//       {index === 6 && <p>Loom:-LU00529</p>}
//       {index === 7 && <p>Loom:-LU00529</p>}
//       {index === 8 && <p>Loom:-LU00529</p>}
//     </div>
//   ));

//   return (
//     <div style={{ height: '100vh' }} className='y-loomcontainer'>
//       <div
//         className='Y-loom_cards-container'
//         // style={{
//         //   display: 'grid',
//         //   gridTemplateColumns: 'repeat(10, 1fr)',
//         //   // gridTemplateRows: 'repeat(5, 1fr)'
//         // }}
//       >
//         {gridItems}
//       </div>
//     </div>
//   );
// };

// export default Y_loom;
