




import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../common/static/css/Liveorder.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import add from '../common/static/image/emptybox1.jpg'
import { toast } from 'react-toastify';
function CustomTabPanel(props) {
  
  const { children, value, index, ...other } = props; 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [value, setValue] = useState(0);
  const [view, setView] = useState('liveOrders');
  const [liveOrders, setLiveOrders] = useState([]);
  const [confirmOrders, setConfirmOrders] = useState([]);
  const [isOrderStarted, setIsOrderStarted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  const handleStartOrderClick = () => {
    navigate('../loombookDetails');
  };

  const handleCancelOrderClick = (order) => {

    const cancelknottingorderform = new FormData();
cancelknottingorderform.append("Id", order.KnottingId);
cancelknottingorderform.append("ConfirmLoom", "false");

const cancelknotingconnection = {
  method: "POST",
  body: cancelknottingorderform,
  redirect: "follow"
};

fetch("https://textileapp.microtechsolutions.co.in/php/confirmknottingoffer.php", cancelknotingconnection)
  .then((response) => response.text())
  .then((result) => {//console.log(result)
    toast.success('Cancelled '+order.OfferNo)
    getliveorders();
  })
  .catch((error) => console.error(error));
  };

  const handleCardClickNavigate = (e) => { 
    e.preventDefault();
    navigate('../live-orders/orderdetails');
  };

  React.useEffect(() => {
    getliveorders();
  }, []);


  const getliveorders = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getknottingoffer.php?LoomId="+user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setLiveOrders(
          result.filter((order)=>order.ConfirmLoom===null && order.Orderfinish===null)
        );
        setConfirmOrders(result.filter((order)=>order.ConfirmLoom===1 && order.Orderfinish===null))
      })
      .catch((error) => console.error(error));
  };


  const handleorderfinish=(kid)=>{
    const finishknottingorder = new FormData();
    finishknottingorder.append("Id", kid);
    
    const finishknottingorderconnection = {
      method: "POST",
      body: finishknottingorder,
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/finishknotting.php", finishknottingorderconnection)
      .then((response) => response.text())
      .then((result) => {//console.log(result)
        toast.success('Finished OR'+kid)
        getliveorders();
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
      <div>
        <h1 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Knotting orders</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{marginLeft:'40%'  }}>
            <Tab style={{fontSize:'18px',fontWeight:'600'}} label="Live Orders" {...a11yProps(0)} />
            <Tab style={{fontSize:'18px',fontWeight:'600'}} label="Confirm Orders" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {view && (<>
            {liveOrders.length===0 && <div>   
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'80vh'}}> <img src={add} style={{width:'25%',}} alt="add" /> 
              <h2 style={{color:'#dda960',fontSize:'35px'}}>No order yet</h2></div> 
              </div>} 
            <div className='live-ordersCards-container' > 
           
           
              {view === 'liveOrders' && liveOrders.map((order) => (<>
                <div className='live-ordersCards-all' key={order.id} >
                  <div  
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.OfferNo}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.Name}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Reed: {order.Reed}</p><p>ReedSpace: {order.ReedSpace}</p></div>
                  </div>
                  <hr/>
                  <div className='live-orderCards-btns' >
                    <button
                      onClick={handleStartOrderClick}
                      className='start-order-btn'
                      style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%', opacity: isOrderStarted ? 0.4 : 1 }}
                    >
                      Start Order
                    </button>
                    <button
                      onClick={() => handleCancelOrderClick(order)}
                      style={{ backgroundColor: 'var(--complementary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '50%' }}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div></>
              ))}
            </div></>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        {confirmOrders.length===0 && <div>   
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'80vh'}}> <img src={add} style={{width:'25%',}} alt="add" /> 
              <h2 style={{color:'#dda960',fontSize:'35px'}}>No order yet</h2></div> 
              </div>} 
          <div className='confirmOrdersCards-container'  >
            {confirmOrders.map((order) => (
              <div className='confirmOrdersCards-all' key={order.id}  >
                <div  style={{ marginLeft: '10px'}}>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.OfferNo}</p></div>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.Name}</p></div>
                   <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Reed: {order.Reed}</p><p>ReedSpace: {order.ReedSpace}</p></div>
                </div>
                <hr />
                    <div className='cnfm-order-btn'>
                      <button className='btn1' style={{margin:'0 auto'}}  onClick={() => handleorderfinish(order.KnottingId)} >Finish Order</button>
                    </div>
              </div>
            ))}
          </div>
        </CustomTabPanel>
      </Box>
    </>
  );
}