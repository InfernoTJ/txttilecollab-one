import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Trliveorder = () => {
  const navigate = useNavigate();

  const handlecardclick = (e) => {
    e.preventDefault();
    navigate('../trader-live-orders/trorderdetails');
  };
  const [orderno, setOrderno] = useState('12345'); 
  const [dateto, setDateto] = useState('2024-12-31'); 
  const [party, setParty] = useState('John Doe'); 
  return (
<div className='Trliveorder-container'>
  <div> 
  <h1 style={{ color: 'var(--primary-color)',textAlign:"center" }}>Live orders </h1>
  </div>

  <div style={{ padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(4,1fr)', gap: '30px' }} className='trlive-Order-cards'>

  <div style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px' }} className="trlive-order-box">
                <div onClick={handlecardclick}  style={{ marginLeft: '10px', cursor: 'pointer' }} >
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>OR :<b>{orderno}</b> </p></div>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Party :<b>{party} </b> </p></div>
                  <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}><p>Quality :</p></div>
                </div>
                <hr />
                <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                  <p style={{ color: 'var(--complementary-color)' }}>Cancel Order</p>
                </div>
              </div>
  </div>
  

</div>

  )
}

export default Trliveorder

