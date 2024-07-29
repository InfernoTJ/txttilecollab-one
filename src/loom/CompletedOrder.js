import React, { useEffect, useState } from 'react';
import '../common/static/css/completedOrder.css'
import { useNavigate } from 'react-router-dom';
import add from '../common/static/image/emptybox1.jpg'

function CompletedOrder() {
    const [completedorder, setcompletedorder] = useState([]);
    const[knottingcompletedorder,setknottingcompletedorder]=useState([])
    const userString = sessionStorage.getItem("user");
    const navigate=useNavigate()
  const user = userString ? JSON.parse(userString) : null;

  const handlecardclick = (orderid) => {
 
    navigate('loom-completed-orders/'+orderid);
  };
    const loadcompletedorder = () => {

        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
    
        fetch("https://textileapp.microtechsolutions.co.in/php/loomliveorder.php?LoomTraderId="+user.Id, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            //console.log(result.filter((order) =>order.Completed===1))
            setcompletedorder(result.filter((order) =>order.Completed===1))
          })
          .catch((error) => console.error(error)); 
      }
      const getknottingcompletedorders = () => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
    
        fetch(
          "https://textileapp.microtechsolutions.co.in/php/getknottingoffer.php?LoomId=" +
            user.Id,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            //console.log(result);
    
            setknottingcompletedorder(
              result.filter(
                (order) => order.ConfirmLoom === 1 && order.Orderfinish === 1
              )
            );
          })
          .catch((error) => console.error(error));
      };
      useEffect(() => {
    
       
        getknottingcompletedorders()
        loadcompletedorder()
      }, [])
    return (
        <>
                    <div 
                    // className='completed-title'
                     style={{marginTop:'30px', marginLeft:'20px',display:'flex',justifyContent:'center',}}> 
                        <h3 style={{color:'white',backgroundColor:'var(--primary-color)', padding:'15px 50px',borderRadius:"5px"}}>Completed Order</h3>  
                    </div>
                    {completedorder.length===0 && <div>   
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'70vh'}}> <img src={add} style={{width:'30%',}} alt="add" /> 
                        <h2 style={{color:'#dda960',fontSize:'35px'}}>No order yet</h2></div></div>

                    }
        <div className='completedOrder-container'>
            <div className='suborder-container' style={{marginTop:'30px', marginLeft:'30px'}}>
               
                    <div className='live-ordersCards-container'>
                {completedorder.map((order) => (
                  <div onClick={ ()=>handlecardclick(order.LoomOrderId)} className='live-ordersCards-all' key={order.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px',cursor:'pointer' }}>
                    <div >
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>OR: {order.OrderNo}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>Party: {order.PartyName}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px',fontSize:'13px'}}><p>Qlt: {order.Quality}</p></div>
                    </div>
               
                  </div>
                ))}
                {knottingcompletedorder.map((knottingcompleted) => (
                  <div className='live-ordersCards-all' key={knottingcompleted.id} style={{ border: '3px solid var(--tershary-color)', borderRadius: '10px', }}>
              
                <div >
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>OR: {knottingcompleted.OfferNo}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px' }}><p>Party: {knottingcompleted.Name}</p></div>
                      <div style={{ color: 'var(--secondary-color)', fontWeight: 'bold',margin:'10px'}}><p>Reed: {knottingcompleted.Reed}</p><p>ReedSpace: {knottingcompleted.ReedSpace}</p></div>
                    </div>
               
                  </div>
                
                ))}
              </div>
             
            </div>
            
        </div>
        </>
    )
}

export default CompletedOrder
