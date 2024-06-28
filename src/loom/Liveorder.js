
import React, { useState } from 'react';
import '../common/static/css/Liveorder.css';
import { useNavigate } from 'react-router-dom';

function Liveorder() {
  const navigate = useNavigate();

  const [view, setView] = useState('liveOrders');
  const [liveOrders, setLiveOrders] = useState([
    { id: 1, or: 10, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 2, or: 11, party: 'fgttyrty', quality: 'tuhty' },
  ]);
  const [confirmOrders, setConfirmOrders] = useState([]);
  const [isOrderStarted, setIsOrderStarted] = useState(false);

  const handleLiveOrdersClick = () => {
    setView('liveOrders');
  };

  const handleConfirmOrdersClick = () => {
    setView('confirmOrders');
  };

  const handleCardClick = (orderId) => {
    setIsOrderStarted(true);
    const selectedOrder = liveOrders.find((order) => order.id === orderId);
    setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
    setConfirmOrders([...confirmOrders, selectedOrder]);
  };

  const handleStartOrderClick = () => {
    navigate('../loom/LoomBooking');
  };

  const handleCancelOrderClick = (orderId) => {
    setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
  };

  const handlecardclick = (e) => {
    e.preventDefault();
    navigate('../live-orders/orderdetails');
  };

  return (
    <>
      <div className='live-order-container'>
        <div>
          <h1 style={{ color: 'var(--primary-color)' }}>Live orders</h1>
        </div>
        <div style={{ marginBottom: '20px',display:'flex' }}>
          <button
            className={`btn2 ${view === 'liveOrders' ? 'active' : ''}`}
            onClick={handleLiveOrdersClick}
            style={{ marginRight: '10px' }}
          >
            Live Orders
          </button>
          <button
            className={`btn2 ${view === 'confirmOrders' ? 'active' : ''}`}
            onClick={handleConfirmOrdersClick}
          >
            Confirm Orders
          </button>
        </div>
        {view && (
          <div style={{ padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(4,1fr)', gap: '20px' }}>
            {view === 'liveOrders' ? (
              liveOrders.map((order) => (
                <div key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
                  <div onClick={() => handleCardClick(order.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
                  </div>
                  <hr />
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                    <button
                      onClick={handleStartOrderClick}
                      className='start-order-btn'
                      style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%', opacity: isOrderStarted ? 0.4 : 1 }}
                    >
                      Start Order
                    </button>
                    <button
                      onClick={() => handleCancelOrderClick(order.id)}
                      style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%' }}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))
            ) : (
              confirmOrders.map((order) => (
                <div key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
                  <div onClick={handlecardclick} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
                  </div>
                  <hr />
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                    <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Liveorder;



// import React, { useState } from 'react';
// import '../common/static/css/Liveorder.css';
// import { useNavigate } from 'react-router-dom';

// function Liveorder() {
//   const navigate = useNavigate();

//   const handlecardclick = (e) => {
//     e.preventDefault();
//     navigate('../live-orders/orderdetails');
//   };

//   const [view, setView] = useState('liveOrders');
//   const handleLiveOrdersClick = () => {
//     setView('liveOrders');
//   };

//   const handleConfirmOrdersClick = () => {
//     setView('confirmOrders');
//   };

//   const [isOrderStarted, setIsOrderStarted] = useState(false);

//   const handleCardClick = () => {
//     setIsOrderStarted(true);
//      navigate('../loom/LoomBooking')
//   };

//   const [or,setOr]=useState(10);
//   const [Party,setParty]=useState('asxsaxsd')

//   return (
//     <>
//       <div className='live-order-container'>
//         <div>
//           <h1 style={{ color: 'var(--primary-color)' }}>Live orders </h1>
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <button
//             className={`btn2 ${view === 'liveOrders' ? 'active' : ''}`}
//             onClick={handleLiveOrdersClick}
//             style={{ marginRight: '10px' }}
//           >
//             Live Orders
//           </button>
//           <button
//             className={`btn2 ${view === 'confirmOrders' ? 'active' : ''}`}
//             onClick={handleConfirmOrdersClick}
//           >
//             Confirm Orders
//           </button>
//         </div>
//         {view && (
//           <div style={{ padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(4,1fr)', gap: '30px' }}>
//             {view === 'liveOrders' ? (
//               <> 
//               <div style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
//                 <div  style={{ marginLeft: '10px', cursor: 'pointer' }} >
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR :{or}</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party :{Party}</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality :</p></div>
//                 </div>
//                 <hr />
//                 <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                 {/* <p onClick={handleCardClick} style={{ color: 'var(--complementary-color)', opacity: isOrderStarted ? 0.4 : 1,cursor:"pointer" }}>
//                 Start Order
//                </p> */}
//                <button onClick={handleCardClick} className='start-order-btn' style={{ backgroundColor: 'var(--complementary-color)',borderRadius:'10px', color: 'var(--main)',border: 'none',cursor: 'pointer', padding: '10px 15px',margin:"5px",width:'50%'  ,opacity: isOrderStarted ? 0.4 : 1, }}>Start Order</button>
//                   {/* <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p> */}
//                   <button style={{ backgroundColor: 'var(--complementary-color)',borderRadius:'10px', color: 'var(--main)',border: 'none',cursor: 'pointer', padding: '10px 15px ',margin:"5px",width:'50%' }}>Cancel Order</button>
//                 </div>
//               </div>


          
//                 <div style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
//                 <div onClick={handleCardClick} style={{ marginLeft: '10px', cursor: 'pointer' }} >
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR :</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party :</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality :</p></div>
//                 </div>
//                 <hr />
//                 <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                 <p style={{ color: 'var(--complementary-color)', opacity: isOrderStarted ? 0.4 : 1 }}>
//                 Start Order
//                </p>
//                   <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//                 </div>
//               </div>
//               </>
//             ) : (
//               <div style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
//                 <div onClick={handlecardclick} style={{ marginLeft: '10px', cursor: 'pointer' }} >
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR :</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party :</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality :</p></div>
//                 </div>
//                 <hr />
//                 <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                   <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Liveorder;

// some imp features
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../common/static/css/Liveorder.css';

// function Liveorder() {
//   const navigate = useNavigate();

//   // State to manage live orders
//   const [liveOrders, setLiveOrders] = useState([
//     { id: 1, or: 10, party: 'asxsaxsd', quality: 'Some Quality', started: false },
//     { id: 2, or: 20, party: 'axsd', quality: 'Some Quality', started: false }
//   ]);

//   // State to manage confirmed orders
//   const [confirmOrders, setConfirmOrders] = useState([]);

//   // Function to handle starting an order
//   const handleStartOrder = (orderId) => {
//     // Find the order in liveOrders
//     const orderToStart = liveOrders.find(order => order.id === orderId);
//     if (orderToStart) {
//       // Mark the order as started
//       orderToStart.started = true;
//       // Move the order to confirmOrders
//       setLiveOrders(liveOrders.filter(order => order.id !== orderId));
//       setConfirmOrders([...confirmOrders, orderToStart]);
//     }
//   };

//   // Function to handle confirming an order
//   const handleConfirmOrder = (orderId) => {
//     // Find the order in confirmOrders
//     const orderToConfirm = confirmOrders.find(order => order.id === orderId);
//     if (orderToConfirm) {
//       // Perform logic to confirm the order (e.g., API call)
//       // For demo, alert is used

//       // Remove the order from confirmOrders (optional)
//       setConfirmOrders(confirmOrders.filter(order => order.id !== orderId));
//     }
//   };

//   return (
//     <div className='live-order-container'>
//       <div>
//         <h1 style={{ color: 'var(--primary-color)' }}>Live orders</h1>
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <button className='btn2' onClick={() => navigate('../live-orders/liveorder')} style={{ marginRight: '10px' }}>
//           Live Orders
//         </button>
//         <button className='btn2'>
//           Confirm Orders
//         </button>
//       </div>
//       <div style={{ padding: '20px', margin: '10px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
//         {liveOrders.map(order => (
//           <>
//             <div key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
//               <div style={{ marginLeft: '10px', cursor: 'pointer' }}>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>OR: {order.or}</p>
//                 </div>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>Party: {order.party}</p>
//                 </div>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>Quality: {order.quality}</p>
//                 </div>
//               </div>
//               <hr />
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                 {!order.started ? (
//                   <p onClick={() => handleStartOrder(order.id)} style={{ color: 'var(--complementary-color)', cursor: "pointer" }}>
//                     Start Order
//                   </p>
//                 ) : (
//                   <p style={{ color: 'var(--complementary-color)' }}>Order Started</p>
//                 )}
//                 <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//               </div>
//             </div>


//             <div key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
//               <div style={{ marginLeft: '10px', cursor: 'pointer' }}>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>OR: {order.or}</p>
//                 </div>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>Party: {order.party}</p>
//                 </div>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>Quality: {order.quality}</p>
//                 </div>
//               </div>


//               <hr />
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                 {!order.started ? (
//                   <p onClick={() => handleStartOrder(order.id)} style={{ color: 'var(--complementary-color)', cursor: "pointer" }}>
//                     Start Order
//                   </p>
//                 ) : (
//                   <p style={{ color: 'var(--complementary-color)' }}>Order Started</p>
//                 )}
//                 <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//               </div>
//             </div>
//           </>
//         ))}
//       </div>
//       <div style={{ padding: '20px', margin: '10px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>

//         {confirmOrders.map(order => (
//           <>
//             <h1>  confirm order</h1>
//             <div key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="box">
//               <div onClick={() => navigate('../live-orders/orderdetails')} style={{ marginLeft: '10px', cursor: 'pointer' }}>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>OR: {order.or}</p>
//                 </div>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>Party: {order.party}</p>
//                 </div>
//                 <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
//                   <p>Quality: {order.quality}</p>
//                 </div>
//               </div>
//               <hr />
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                 <p onClick={() => handleConfirmOrder(order.id)} style={{ color: 'var(--complementary-color)' }}>
//                   Confirm Order
//                 </p>
//               </div>
//             </div>
//           </>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Liveorder;


// 
// import React, { useState } from 'react';
// import '../common/static/css/Liveorder.css'
// import { useNavigate } from 'react-router-dom';

// function Liveorder() {
//   const navigate = useNavigate();

//   const handlecardclick = (e) => {
//     e.preventDefault();
//     navigate('../live-orders/orderdetails');
//   };

//   const [isOrderStarted, setIsOrderStarted] = useState(false);

//   const handleCardClick = () => {
//     setIsOrderStarted(true);
//   };
//   return (
//     <>
//       <div className='live-order-container'>
//       <div>
//           <h1 style={{ color: 'var( --primary-color)' }}>Live orders </h1>
//         </div>
//         <div style={{ padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(4,1fr)', gap: '30px' }}>
       
//           <div style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} classname="box">
//             <div onClick={handleCardClick} style={{ marginLeft: '10px', cursor: 'pointer' }}  >
//               <div style={{ color: 'var(--secondary-color )', fontWeight: 'bold' }}><p>OR :</p></div>
//               <div style={{ color: 'var(--secondary-color )', fontWeight: 'bold' }}><p>Party :</p></div>
//               <div style={{ color: 'var(--secondary-color )', fontWeight: 'bold' }}><p>Quality :</p></div>
//             </div>
//             <hr />
//             <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//               <p style={{ color: 'var(--complementary-color)', opacity: isOrderStarted ? 0.4 : 1 }}>
//                 Start Order
//               </p>
//               <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//             </div>
//           </div>


//           <div style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} classname="box">
//             <div onClick={handlecardclick} style={{ marginLeft: '10px', cursor: 'pointer' }}  >
//               <div style={{ color: 'var(--secondary-color )', fontWeight: 'bold' }}><p>Order Number :</p></div>
//               <div style={{ color: 'var(--secondary-color )', fontWeight: 'bold' }}><p>Party Name :</p></div>
//               <div style={{ color: 'var(--secondary-color )', fontWeight: 'bold' }}><p>Quality :</p></div>
//             </div>
//             <hr />
//             <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//               {/* <p style={{ color: 'var(--complementary-color)' }}>Start Order</p> */}
//               <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//             </div>
//           </div>

//           {/* <div style={{ border: '1px solid red' }} classname="box"></div>
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


//         </div>

//       </div>

//     </>
//   )
// }

// export default Liveorder