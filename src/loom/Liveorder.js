
import React, { useEffect,useState } from 'react';
import '../common/static/css/Liveorder.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Liveorder() {
  const navigate = useNavigate();

  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [view, setView] = useState('liveOrders');
  const [liveOrders, setLiveOrders] = useState([]);
  const [confirmOrders, setConfirmOrders] = useState([]);
  const [isOrderStarted, setIsOrderStarted] = useState(false);

  const [orderid, setorderid] = useState();

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

  const handleStartOrderClick=(oid) =>{

        navigate(`../loom/LoomBooking/${oid}`);
      
  
  };

  const handleCancelOrderClick = (orderId) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch(`https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${orderId}&Confirmed=false`, requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
        toast.success('Cancelled OR'+ orderId)
        loadliveorders()
      })
      .catch((error) => console.error(error));
    setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
  };

  const handlecardclick = (orderid) => {
 
    navigate('../live-orders/orderdetails/'+orderid);
  };
  const loadliveorders = () => {

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://textileapp.microtechsolutions.co.in/php/loomliveorder.php?LoomTraderId="+user.Id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setLiveOrders(Array.isArray(result) ? result : [])
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {

   

    loadliveorders()
  }, [])


  
  return (
    <>
      <div className='live-order-container'  style={{height:'85vh'}}>
       
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px' }}>
  <div style={{ height: '5vh', width: '50%', display: 'flex', gap: '5px', justifyContent: 'center', background: '#e4f5f7',  borderRadius: '15px', padding: '5px' }}>
    <div onClick={handleLiveOrdersClick} style={{ flex: 1 }}>
      <button className={`livebtn ${view === 'liveOrders' ? 'active' : ''}`}>Live Order</button>
    </div>
    <div className='vl'></div>
    <div onClick={handleConfirmOrdersClick} style={{ flex: 1 }}>
      <button className={`livebtn ${view === 'confirmOrders' ? 'active' : ''}`}>Confirm Order</button>
    </div>
  </div>
</div>
        
        {view && (
          <div>
            {view === 'liveOrders' && (
              <div className='live-ordersCards-container'>
                {liveOrders
                .filter((order) => order.Confirmed === null && order.Completed===null)
                .map((order) => (
                  <div className='live-ordersCards-all' key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }}>
                    <div >
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>OR: {order.OrderNo}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>Party: {order.PartyName}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px',fontSize:'13px'}}><p>Qlt: {order.Quality}</p></div>
                    </div>
                    <hr />
                    <div className='live-orderCards-btns'>
                      <button
                        onClick={()=>handleStartOrderClick(order.LoomOrderId)}
                        className='start-order-btn' 
                        style={{ backgroundColor: 'var(--tershary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%',  }}
                      >
                        Start
                      </button>
                      <button className='btn2'
                        onClick={() => handleCancelOrderClick(order.LoomOrderId)}
                        style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {view === 'confirmOrders' && (
              <div className='confirmOrdersCards-container'>
                {liveOrders
                 .filter((order) => order.Confirmed === 1 && order.Completed===null)
                 .map((order) => (
                  <div key={order.id} className='confirmOrdersCards-all'
                  //  style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} 
                   >
                    <div onClick={ ()=>handlecardclick(order.LoomOrderId)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.OrderNo}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.PartyName}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Qlt: {order.Quality}</p></div>
                    </div>
                    <hr />
                    <div className='cnfm-order-btn'>
                      <button className='btn1' style={{margin:'0 auto'}}  onClick={() => handleCancelOrderClick(order.LoomOrderId)} >Cancel Order</button>
                    </div>
                  </div>
                ))}
              </div>
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

//   const [view, setView] = useState('liveOrders');
//   const [liveOrders, setLiveOrders] = useState([
//        { id: 1, or: 10, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 2, or: 11, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 3, or: 12, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 4, or: 13, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 5, or: 14, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 6, or: 15, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 7, or: 16, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 8, or: 17, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 9, or: 18, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 10, or: 19, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 11, or: 20, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 12, or: 21, party: 'fgttyrty', quality: 'tuhty' },
//   ]);
//   const [confirmOrders, setConfirmOrders] = useState([]);
//   const [isOrderStarted, setIsOrderStarted] = useState(false);

//   const handleLiveOrdersClick = () => {
//     setView('liveOrders');
//   };

//   const handleConfirmOrdersClick = () => {
//     setView('confirmOrders');
//   };

//   const handleCardClick = (orderId) => {
//     setIsOrderStarted(true);
//     const selectedOrder = liveOrders.find((order) => order.id === orderId);
//     setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
//     setConfirmOrders([...confirmOrders, selectedOrder]);
//   };

//   const handleStartOrderClick = () => {
//     navigate('../loom/LoomBooking');
//   };

//   const handleCancelOrderClick = (orderId) => {
//     setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
//   };

//   const handlecardclick = (e) => {
//     e.preventDefault();
//     navigate('../live-orders/orderdetails');
//   };

//   return (
//     <>
//       <div className='live-order-container'>
//         <div>
//           <h1 style={{ color: 'var(--primary-color)' }}>Live orders</h1>
//         </div>
//         <div style={{ marginBottom: '20px',display:'flex' }}>
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
//           <div className='live-ordersCards-container' 
//           // style={{ padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(4,1fr)', gap: '20px' }}
//           >
//             {view === 'liveOrders' ? (
//               liveOrders.map((order) => (
//                 <div className='live-ordersCards-all' key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} >
//                   <div  onClick={() => handleCardClick(order.id)}
//                     // style={{ marginLeft: '10px', cursor: 'pointer' }}
//                    >
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
//                   </div>
//                   <hr />
//                   <div className='live-orderCards-btns' 
//                   //  style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}
//                    >
//                     <button
//                       onClick={handleStartOrderClick}
//                       className='start-order-btn'
//                       style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%', opacity: isOrderStarted ? 0.4 : 1 }}
//                     >
//                       Start
//                     </button>
//                     <button
//                       onClick={() => handleCancelOrderClick(order.id)}
//                       style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%' }}
//                     >
//                       Cancel 
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
              
//               confirmOrders.map((order) => (
//                 // <div className='confirmOrdersCards-container'>
//                 <div key={order.id}
//                 //  style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} 
//                  className="confirmOrdersCards-all">
//                   <div onClick={handlecardclick} style={{ marginLeft: '10px', cursor: 'pointer' }}>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
//                   </div>
//                   <hr />
//                   <div className='cnfm-order-btn'
//                     // style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}
//                     >
//                     <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
//                   </div>
//                 </div>
//                 // </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Liveorder;


//MUI  code
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import '../common/static/css/Liveorder.css';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = useState(0);
//   const [view, setView] = useState('liveOrders');
//   const [liveOrders, setLiveOrders] = useState([
//     { id: 1, or: 10, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 2, or: 11, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 3, or: 12, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 4, or: 13, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 5, or: 14, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 6, or: 15, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 7, or: 16, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 8, or: 17, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 9, or: 18, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 10, or: 19, party: 'fgttyrty', quality: 'tuhty' },
//     { id: 11, or: 20, party: 'asxsaxsd', quality: 'yutuy' },
//     { id: 12, or: 21, party: 'fgttyrty', quality: 'tuhty' },


//   ]);
//   const [confirmOrders, setConfirmOrders] = useState([]);
//   const [isOrderStarted, setIsOrderStarted] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleCardClick = (orderId) => {
//     setIsOrderStarted(true);
//     const selectedOrder = liveOrders.find((order) => order.id === orderId);
//     setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
//     setConfirmOrders([...confirmOrders, selectedOrder]);
//   };

//   const handleStartOrderClick = () => {
//     navigate('../loom/LoomBooking');
//   };

//   const handleCancelOrderClick = (orderId) => {
//     setLiveOrders(liveOrders.filter((order) => order.id !== orderId));
//   };

//   const handleCardClickNavigate = (e) => {
//     e.preventDefault();
//     navigate('../live-orders/orderdetails');
//   };

//   return (
//     <>
//       {/* <div>
//         <h1 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Live orders</h1>
//       </div> */}
//       <Box sx={{ width: '100%' }}>
//         <Box sx={{ borderBottom: 1,borderColor: 'divider', display: 'flex', justifyContent: 'center',background:'var(--color)'}}>
//           <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
//             <Tab label="Live Orders" {...a11yProps(0)} sx={{ fontSize: '1.2rem',marginRight:"60px",color:'black' }} />
//             <Tab label="Confirm Orders" {...a11yProps(1)} sx={{ fontSize: '1.2rem',marginLeft:'30px',color:'black' }} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}>
//           {view && (
//             <div className='live-ordersCards-container' > 
           
           
//               {view === 'liveOrders' && liveOrders.map((order) => (
//                 <div className='live-ordersCards-all' key={order.id} >
//                   <div  onClick={() => handleCardClick(order.id)} 
//                   style={{ marginLeft: '10px', cursor: 'pointer' }}
//                   >
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
//                     <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
//                   </div>
//                   <hr />
//                   <div className='live-orderCards-btns' >
//                     <button
//                       onClick={handleStartOrderClick}
//                       className='start-order-btn'
//                       style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%', opacity: isOrderStarted ? 0.4 : 1 }}
//                     >
//                       Start 
//                     </button>
//                     <button
//                       onClick={() => handleCancelOrderClick(order.id)}
//                       style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%' }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <div className='confirmOrdersCards-container'  >
//             {confirmOrders.map((order) => (
//               <div className='confirmOrdersCards-all' key={order.id}  >
//                 <div onClick={handleCardClickNavigate} style={{ marginLeft: '10px', cursor: 'pointer' }}>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
//                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
//                 </div>
//                 <hr />
//                 <div className='cnfm-order-btn' style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
//                   <p style={{ color: 'var(--complementary-color)' }}>Cancel</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CustomTabPanel>
//       </Box>
//     </>
//   );
// }










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