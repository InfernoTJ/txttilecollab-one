import React, { useEffect, useState } from 'react'

const Y_trader = () => {


  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

 const[trader,settrader]=useState([]);



const gettrader =()=>{
  const gettrader = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=YarnRate &Colname=YarnId&Colvalue="+user.Id, gettrader)
    .then((response) => response.json())
    .then((result) => {console.log(result.filter((trader)=>trader.LoomId!=null && trader.TraderId===null))
      settrader(result.filter((trader)=>trader.LoomId===null && trader.TraderId!=null))
    })
    .catch((error) => console.error(error));
}

  useEffect(()=>{

    gettrader()
  },[])





  return (
    <div style={{height:'100vh'}} className='y-loomcontainer'>
    <div className='Y-loom_cards-container' style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)',gridTemplateRows:'repeat(10 ,1fr)'}}>


    {[...new Map(trader.map(trader => [trader.TraderId, trader])).values()]
    .map((trader) => (
      <div key={trader.TraderId} style={{border: '2px solid blue'}}>
        <p>
        Trader: {trader.TraderId}
        </p>
      </div>
  ))}

    </div>
    </div>
  )
}

export default Y_trader
