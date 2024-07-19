import React, { useEffect, useState } from 'react'
import '../common/static/css/myloom.css'
import { useNavigate } from 'react-router-dom';

const Myloom = () => {
    const navigate = useNavigate();

    const handleMyloomcardClick = (data) => {
      navigate(`../myloomdetails/`+data.Id);
    };
    const[data,setdata]=useState([])

    const getlooms= ()=>{
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomsDetails&Colname=LoomTraderId&Colvalue=529", requestOptions)
            .then((response) => response.json())
            .then((result) => {console.log(result)
                setdata(result)
            })
            .catch((error) => console.error(error));
    }
    useEffect(()=>{
        getlooms()
    },[])
    return (
        <div className='profile-my_loom'>
            <div>
                <h2 style={{ color: 'var(--primary-color)',textAlign:'center' }}>List of My Looms</h2>
            </div>
            <div className='my_loom-container' style={{ height: '80vh', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(5,1fr)', gap: '20px' , }}>
              {data && data.map((data)=>(
                <div onClick={()=>handleMyloomcardClick(data)} style={{textAlign:'center',
                   
                }}  className='myloom-card' >
                    <p>Loom No: <br/> {data.LoomNo}</p>
                    
                </div>))}
               
              
             
         

            </div>
        </div>
    )
}

export default Myloom



