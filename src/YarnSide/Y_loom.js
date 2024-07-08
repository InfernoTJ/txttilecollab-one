import React from 'react'
import './../common/static/css/y_loom.css'
const Y_loom = () => {
 

  return (
    <div style={{height:'100vh'}} className='y-loomcontainer'>
    <div className='Y-loom_cards-container' style={{display:'grid',gridTemplateColumns:'repeat(10,1fr)',gridTemplateRows:'repeat(10 ,1fr)'}}>
<div style={{border:'2px solid blue'}}>
  <p>
    Loom:-LU00529
  </p>
</div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>


<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
<div style={{border:'2px solid blue'}}></div>
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
