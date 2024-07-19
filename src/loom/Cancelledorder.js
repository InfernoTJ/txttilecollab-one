import React, { useEffect, useState } from 'react';
import '../common/static/css/cancel.css';

import { toast } from 'react-toastify';

function Cancelledorder() {
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const [cancelledorder , setcancelledorder] = useState([]);



    const handleStartOrderClick=(oid) =>{
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          }; 
          
          fetch(`https://textileapp.microtechsolutions.co.in/php/updateloomorder.php?LoomOrderId=${oid}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {console.log(result)
                loadcancelledorder();
                toast.success('Restarted ON'+ oid)
            })
            .catch((error) => console.error(error));

       
      
  
  };

  const handleCancelOrderClick = (orderId) => {
    setcancelledorder(cancelledorder.filter((order) => order.id !== orderId));
  };

  const loadcancelledorder = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      " https://textileapp.microtechsolutions.co.in/php/loomliveorder.php?LoomTraderId=" +
        user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setcancelledorder(Array.isArray(result) ? result : []);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {

    loadcancelledorder();
  }, []);
    return (
        <>
            <div className='cancel-container'>
                <div className='subcancel-container'>
                <div  style={{padding:50, height:'auto' ,width:'100%'}}>

                <div className='cancel-title'>
                            <h5>Cancelled Order</h5>
                        </div>
                <div className='live-ordersCards-container'>
                    {cancelledorder
                .filter((order) => order.Confirmed === 0 && order.Completed===null)
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
                        style={{ backgroundColor: 'var(--tershary-color)', borderRadius: '10px', color: 'var(--main)', border: 'none', cursor: 'pointer', padding: '10px 15px', margin: '5px', width: '80%',margin:'0 auto' ,marginBottom:"5px" }}
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                ))}
                    </div>
                </div>

                </div>


            </div>

        </>
    )
}

export default Cancelledorder
