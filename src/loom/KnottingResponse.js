




import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../common/static/css/Liveorder.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
  const [value, setValue] = useState(0);
  const [view, setView] = useState('liveOrders');
  const [liveOrders, setLiveOrders] = useState([
    { id: 1, or: 10, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 2, or: 11, party: 'fgttyrty', quality: 'tuhty' },
    { id: 3, or: 12, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 4, or: 13, party: 'fgttyrty', quality: 'tuhty' },
    { id: 5, or: 14, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 6, or: 15, party: 'fgttyrty', quality: 'tuhty' },
    { id: 7, or: 16, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 8, or: 17, party: 'fgttyrty', quality: 'tuhty' },
    { id: 9, or: 18, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 10, or: 19, party: 'fgttyrty', quality: 'tuhty' },
    { id: 11, or: 20, party: 'asxsaxsd', quality: 'yutuy' },
    { id: 12, or: 21, party: 'fgttyrty', quality: 'tuhty' },


  ]);
  const [confirmOrders, setConfirmOrders] = useState([]);
  const [isOrderStarted, setIsOrderStarted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const handleCardClickNavigate = (e) => {
    e.preventDefault();
    navigate('../live-orders/orderdetails');
  };

  return (
    <>
      <div>
        <h1 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Live orders</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Live Orders" {...a11yProps(0)} />
            <Tab label="Confirm Orders" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {view && (
            <div className='live-ordersCards-container' > 
           
           
              {view === 'liveOrders' && liveOrders.map((order) => (
                <div className='live-ordersCards-all' key={order.id} >
                  <div  onClick={() => handleCardClick(order.id)} 
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
                    <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
                  </div>
                  <hr />
                  <div className='live-orderCards-btns' >
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
              ))}
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='confirmOrdersCards-container'  >
            {confirmOrders.map((order) => (
              <div className='confirmOrdersCards-all' key={order.id}  >
                <div onClick={handleCardClickNavigate} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR: {order.or}</p></div>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party: {order.party}</p></div>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality: {order.quality}</p></div>
                </div>
                <hr />
                <div className='cnfm-order-btn' style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                  <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
                </div>
              </div>
            ))}
          </div>
        </CustomTabPanel>
      </Box>
    </>
  );
}