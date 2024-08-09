import React, { useEffect, useState } from 'react'
import './../common/static/css/y_loom.css'
const Y_loom = () => {

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [loomIds, setLoomIds] = useState([]);
 const[looms,setlooms]=useState([]);



const getlooms =()=>{
  const getlooms = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=YarnRate &Colname=YarnId&Colvalue="+user.Id, getlooms)
    .then((response) => response.json())
    .then((result) => {console.log(result.filter((looms)=>looms.LoomId!=null && looms.TraderId===null))
      setlooms(result.filter((looms)=>looms.LoomId!=null && looms.TraderId===null))
      getLoomComponents()
    })
    .catch((error) => console.error(error));
}

const getnames =(id)=>{

  const getdetails = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail &Colname=Id&Colvalue="+id, getdetails)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      const data = result[0]
      return data.OwnerName
    })
    .catch((error) => console.error(error));

}

const getLoomComponents = () => {
  const uniqueLooms = [...new Map(looms.map(loom => [loom.LoomId, loom])).values()];
  
  uniqueLooms.map((loom) =>setLoomIds(prevLoomIds => [...prevLoomIds, loom.LoomId]));
 

};
  useEffect(()=>{

    getlooms()
  },[]) 

  return (
    <div style={{height:'100vh'}} className='y-loomcontainer'>
    <div className='Y-loom_cards-container' style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)',gridTemplateRows:'repeat(10 ,1fr)'}}>

    {loomIds && loomIds
    .map((loom) => (
      <div key={loom.LoomId} style={{border: '2px solid blue'}}>
        <p>
          Loom: {loom.LoomId}
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
