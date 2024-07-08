// import React from 'react'
// import '../common/static/css/myloomdetails.css'
// import Select from "react-select";
// import  { useState } from 'react';
// import { BiEditAlt } from "react-icons/bi";

// const MyLoomDetails = () => {
//   const MachineTypeoptions = [
//     { value: 'Airjet', label: 'Airjet' },
//     { value: 'Rapier', label: 'Rapier' },
//     { value: 'Projectile', label: 'Projectile' },
//     { value: 'Shuttle loom', label: 'Shuttle loom' },
//     { value: 'Sampling loom', label: 'Sampling loom' },
//   ];


//   const SheddingTypeoptions = [
//     { value: 'CAM', label: 'CAM' },
//     { value: 'E-Shedding', label: 'E-Shedding' },
//     { value: 'Full Jacquard', label: 'Full Jacquard' },
   
//   ];

//   const Feedersoptions = [
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
//     { value: '6', label: '6' },
//     { value: '7', label: '7' },
//     { value: '8', label: '8' },
//   ];

//   const Framessoptions = [
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
//     { value: '6', label: '6' },
//     { value: '7', label: '7' },
//     { value: '8', label: '8' },
//     { value: '9', label: '9' },
//     { value: '10', label: '10' },
//     { value: '11', label: '11' },
//     { value: '12', label: '12' },
//     { value: '13', label: '13' },
//     { value: '14', label: '14' },
//     { value: '15', label: '15' },
//     { value: '16', label: '16' },
//     { value: '17', label: '17' },
//     { value: '18', label: '18' },
//     { value: '19', label: '19' },
//     { value: '20', label: '20' },
//     { value: '21', label: '21' },
//     { value: '22', label: '22' },
//     { value: '23', label: '23' },
//     { value: '24', label: '24' },
//     { value: '25', label: '25' },
//     { value: '26', label: '26' },
//     { value: '27', label: '27' },
//     { value: '28', label: '28' },
//     { value: '29', label: '29' },
//     { value: '30', label: '30' },
   
//   ];


//   const [machineType, setMachineType] = useState(MachineTypeoptions[0]);

//   const [sheddingType, setSheddingType] = useState(SheddingTypeoptions[2]);
//   const [Feeders, setFeeders] = useState(Feedersoptions[2]);
//   const [Frames, setFrames] = useState(Framessoptions[5]);
//   const [attachments, setAttachments] = useState({
//     selvadgeJacquard: false,
//     lenoDesignEquipment: false,
//     topBeam: false,
//     cramming: false,
// });

//   const [width, setWidth] = useState('300.00');
//   const [RPM, setRPM] = useState('600.00');

//   const [editable, setEditable] = useState(false);
//   const toggleEdit = () => {
//     setEditable(!editable);
//   };
//   const handleSubmit = () => {

//     setRPM('');
//     setMachineType(null);
//     setFeeders(null);
//     setSheddingType(null);
//     setFrames(null);
//     setWidth('');
   
//     setAttachments({
//         selvadgeJacquard: false,
//         lenoDesignEquipment: false,
//         topBeam: false,
//         cramming: false,
//     });
// };

//   return (
//     <div className='MyLoom-Details-container'>
//       <div className='MyLoom-Details-hedding' >
//         <h2 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>My Loom Details</h2>
//         <BiEditAlt style={{fontSize:'23px',cursor:'pointer',}}  onClick={toggleEdit} />
//       </div>


//       <div style={{ padding: '10px', }} className='myloom-detail-form' >
//         <div className='loomform-container'>
//           <div style={{ padding: '10px', }}>
//             <div >
//               <div className='label-container'>
//                 <label style={{ fontWeight: 'bold' }}>Machine Type</label>
//               </div>
//               <Select
//                 className='MachineType-select-dropdown'
//                 placeholder="Enter Machine Type"
//                 isSearchable
//                 options={MachineTypeoptions}
//                value={machineType}
//                onChange={(selectedOption) => setMachineType(selectedOption)}
//                isDisabled={!editable}
//               />
//             </div>

//             <div style={{ marginTop: '28px' }}>
//               <label style={{ fontWeight: 'bold' }}>RPM</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 placeholder='Enter RPM'
//                 type='text'
//                value={RPM}
//                disabled={!editable}
//               onChange={(e) => setRPM(e.target.value)}
//               />
//             </div>


//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
//             <div style={{ marginTop: '10px' }}>
//               <div className='label-container'>
//                 <label style={{ fontWeight: 'bold' }}>Shedding Type</label>
//               </div>
//               <Select
//                 className='MachineType-select-dropdown'
//                 placeholder="Shedding Type"
//                 options={SheddingTypeoptions}
//                 isSearchable
//              value={sheddingType}
//              isDisabled={!editable}
//                onChange={(selectedOption) => setSheddingType(selectedOption)}
//               />
//             </div>

//             <div >
//               <label style={{ fontWeight: 'bold' }}>Width</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '13px' }}
//                 placeholder='Enter Width'
//                 type='text'
//                value={width}
//                disabled={!editable}
//                onChange={(e) => setWidth(e.target.value)}
//               />
//             </div>



//           </div>

//           <div style={{ marginTop: '10px' }}>
//             <div className='label-container'>
//               <label style={{ fontWeight: 'bold' }}>No of Feeders</label>
//             </div>
//             <Select
//               className='select-dropdown'
//               placeholder="No of Feeders"
//               isSearchable
//               options={Feedersoptions}
//              value={Feeders}
//              isDisabled={!editable}
           
//            onChange={(selectedOption) => setFeeders(selectedOption)}
//             />


          
//           </div>




//           <div style={{ marginTop: "10px" }}>
//             <div className='label-container'>
//               <label style={{ fontWeight: 'bold' }}>No of Frames </label>
//             </div>
//             <Select
//               className='select-dropdown'
//               placeholder="No of Frames"
//               isSearchable
//               options={Framessoptions}
//              value={Frames}
//              isDisabled={!editable}
//              onChange={(selectedOption) => setFrames(selectedOption)}
//             />
//           </div>

//         </div>

//         <div style={{ width: '65%', marginBottom: '3%', marginLeft: '2%', marginTop: '2%' }}>
//           <div>
//             <h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Other Loom Attachments </h3>
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', border: '1px solid var(--primary-color)', padding: '40px', borderRadius: '10px', marginTop: '30px' }}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '20px' }}>
//               <div style={{ fontWeight: 'bold' }}>
//                 Selvadge Jacquard
//               </div>
//               <div style={{ fontWeight: 'bold' }}>
//                 LenoDesignEquipment
//               </div>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'center', }}>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.selvadgeJacquard}
//                  onChange={() => setAttachments({ ...attachments, selvadgeJacquard: !attachments.selvadgeJacquard })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.lenoDesignEquipment}
//                  onChange={() => setAttachments({ ...attachments, lenoDesignEquipment: !attachments.lenoDesignEquipment })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '10%' }}>
//               <div style={{ fontWeight: 'bold' }}>
//                 Top Beam
//               </div>
//               <div style={{ fontWeight: 'bold' }}>
//                 Cramming
//               </div>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.topBeam}
//                  onChange={() => setAttachments({ ...attachments, topBeam: !attachments.topBeam })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.cramming}
//                  onChange={() => setAttachments({ ...attachments, cramming: !attachments.cramming })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <button onClick={handleSubmit} style={{ width: '10%', fontSize: 18 }} className='btn2' disabled={!editable} >
//             Submit
//           </button>
//         </div>
//       </div>


//       cvcbvbbnbn

//     </div>
//   )
// }

// export default MyLoomDetails


//ss
// import React, { useState } from 'react';
// import '../common/static/css/myloomdetails.css';
// import Select from 'react-select';
// import { BiEditAlt } from 'react-icons/bi';
// import { useMemo } from 'react'; 
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'; 

// const MyLoomDetails = () => {
//   const MachineTypeoptions = [
//     { value: 'Airjet', label: 'Airjet' },
//     { value: 'Rapier', label: 'Rapier' },
//     { value: 'Projectile', label: 'Projectile' },
//     { value: 'Shuttle loom', label: 'Shuttle loom' },
//     { value: 'Sampling loom', label: 'Sampling loom' },
//   ];

//   const SheddingTypeoptions = [
//     { value: 'CAM', label: 'CAM' },
//     { value: 'E-Shedding', label: 'E-Shedding' },
//     { value: 'Full Jacquard', label: 'Full Jacquard' },
//   ];

//   const Feedersoptions = [
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
//     { value: '6', label: '6' },
//     { value: '7', label: '7' },
//     { value: '8', label: '8' },
//   ];

//   const Framessoptions = Array.from({ length: 30 }, (_, index) => ({
//     value: (index + 1).toString(),
//     label: (index + 1).toString(),
//   }));

//   const [machineType, setMachineType] = useState(MachineTypeoptions[0]);
//   const [sheddingType, setSheddingType] = useState(SheddingTypeoptions[2]);
//   const [Feeders, setFeeders] = useState(Feedersoptions[2]);
//   const [Frames, setFrames] = useState(Framessoptions[5]);
//   const [attachments, setAttachments] = useState({
//     selvadgeJacquard: false,
//     lenoDesignEquipment: false,
//     topBeam: false,
//     cramming: false,
//   });

//   const [width, setWidth] = useState('300.00');
//   const [RPM, setRPM] = useState('600.00');

//   const [editable, setEditable] = useState(false);
//   const toggleEdit = () => {
//     setEditable(prev => !prev);
//   };


//   // const toggleEdit = () => {
//   //   setEditable(!editable);
//   // };

//   const handleSubmit = () => {
//     setRPM('');
//     setMachineType(null);
//     setFeeders(null);
//     setSheddingType(null);
//     setFrames(null);
//     setWidth('');

//     setAttachments({
//       selvadgeJacquard: false,
//       lenoDesignEquipment: false,
//       topBeam: false,
//       cramming: false,
//     });
//   };

//   // Define columns and data for your MaterialReactTable
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'ORNum',
//         header: 'OR',
//         size: 150,
//       },
//       {
//         accessorKey: 'DateFrom',
//         header: 'Date From',
//         size: 150,
//       },
//       {
//         accessorKey: 'DateTo',
//         header: 'Date To',
//         size: 200,
//       },
      
//     ],
//     []
//   );

//   // Example data
//   const data = [
  
   
  
//     {
//       ORNum:'012211',
//       DateFrom: '29/06/2024',
//       DateTo: '29/07/2024',
      
//     },

//     {
//       ORNum:'012211',
//       DateFrom: '29/06/2024',
//       DateTo: '29/07/2024',
      
//     },

//     {
//       ORNum:'012211',
//       DateFrom: '29/06/2024',
//       DateTo: '29/07/2024',
      
//     },


//   ];

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     muiTableHeadCellProps: {
//       style: {
//         backgroundColor: 'var(--color)',
//         color: 'var(--primary-color)',
//         fontSize: '17px',
//         fontWeight: 'bold',
//       },
//     },
//   });

 

//   return (
//     <div className='MyLoom-Details-container'>
//       <div className='MyLoom-Details-hedding'>
//         <h2 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>My Loom Details</h2>
//         <BiEditAlt style={{ fontSize: '23px', cursor: 'pointer' }} onClick={toggleEdit} />
//       </div>

//       <div style={{ padding: '10px' }} className='myloom-detail-form'>
//         <div className='loomform-container'>
//           <div style={{ padding: '10px' }}>
//             <div>
//               <div className='label-container'>
//                 <label style={{ fontWeight: 'bold' }}>Machine Type</label>
//               </div>
//               <Select
//                 className='MachineType-select-dropdown'
//                 placeholder='Enter Machine Type'
//                 isSearchable
//                 options={MachineTypeoptions}
//                 value={machineType}
//                 onChange={(selectedOption) => setMachineType(selectedOption)}
//                 isDisabled={!editable}
//               />
//             </div>

//             <div style={{ marginTop: '28px' }}>
//               <label style={{ fontWeight: 'bold' }}>RPM</label>
//               <input
//                 style={{
//                   width: '90%',
//                   margin: '10px',
//                   border: '1px solid var(--primary-color)',
//                 }}
//                 placeholder='Enter RPM'
//                 type='text'
//                 value={RPM}
//                 disabled={!editable}
//                 onChange={(e) => setRPM(e.target.value)}
//               />
//             </div>
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
//             <div style={{ marginTop: '10px' }}>
//               <div className='label-container'>
//                 <label style={{ fontWeight: 'bold' }}>Shedding Type</label>
//               </div>
//               <Select
//                 className='MachineType-select-dropdown'
//                 placeholder='Shedding Type'
//                 options={SheddingTypeoptions}
//                 isSearchable
//                 value={sheddingType}
//                 isDisabled={!editable}
//                 onChange={(selectedOption) => setSheddingType(selectedOption)}
//               />
//             </div>

//             <div>
//               <label style={{ fontWeight: 'bold' }}>Width</label>
//               <input
//                 style={{
//                   width: '90%',
//                   margin: '10px',
//                   border: '1px solid var(--primary-color)',
//                   marginTop: '13px',
//                 }}
//                 placeholder='Enter Width'
//                 type='text'
//                 value={width}
//                 disabled={!editable}
//                 onChange={(e) => setWidth(e.target.value)}
//               />
//             </div>
//           </div>

//           <div style={{ marginTop: '10px' }}>
//             <div className='label-container'>
//               <label style={{ fontWeight: 'bold' }}>No of Feeders</label>
//             </div>
//             <Select
//               className='select-dropdown'
//               placeholder='No of Feeders'
//               isSearchable
//               options={Feedersoptions}
//               value={Feeders}
//               isDisabled={!editable}
//               onChange={(selectedOption) => setFeeders(selectedOption)}
//             />
//           </div>

//           <div style={{ marginTop: '10px' }}>
//             <div className='label-container'>
//               <label style={{ fontWeight: 'bold' }}>No of Frames</label>
//             </div>
//             <Select
//               className='select-dropdown'
//               placeholder='No of Frames'
//               isSearchable
//               options={Framessoptions}
//               value={Frames}
//               isDisabled={!editable}
//               onChange={(selectedOption) => setFrames(selectedOption)}
//             />
//           </div>
//         </div>

//         <div style={{ width: '65%', marginBottom: '3%', marginLeft: '2%', marginTop: '2%' }}>
//           <div>      
//                   <h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Other Loom Attachments </h3>
//            </div>

//            <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', border: '1px solid var(--primary-color)', padding: '40px', borderRadius: '10px', marginTop: '30px' }}>
//              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '20px' }}>
//                <div style={{ fontWeight: 'bold' }}>
//                 Selvadge Jacquard
//               </div>
//               <div style={{ fontWeight: 'bold' }}>
//                 LenoDesignEquipment
//               </div>
//              </div>

//              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'center', }}>
//                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                  <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.selvadgeJacquard}
//                  onChange={() => setAttachments({ ...attachments, selvadgeJacquard: !attachments.selvadgeJacquard })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.lenoDesignEquipment}
//                  onChange={() => setAttachments({ ...attachments, lenoDesignEquipment: !attachments.lenoDesignEquipment })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '10%' }}>
//               <div style={{ fontWeight: 'bold' }}>
//                 Top Beam
//               </div>
//               <div style={{ fontWeight: 'bold' }}>
//                 Cramming
//               </div>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.topBeam}
//                  onChange={() => setAttachments({ ...attachments, topBeam: !attachments.topBeam })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                 <div><input
//                   style={{ width: '20px' }}
//                   type='checkbox'
//                  checked={attachments.cramming}
//                  onChange={() => setAttachments({ ...attachments, cramming: !attachments.cramming })}
//                 /></div>
//                 <div>Available</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <button onClick={handleSubmit} style={{ width: '10%', fontSize: 18 }} className='btn2' disabled={!editable}>
//             Submit
//           </button>
//         </div>

//         <MaterialReactTable table={table} />
//       </div>
//     </div>
//   );
// };

// export default MyLoomDetails;


// with normal table
import React from 'react'
import '../common/static/css/myloomdetails.css'
import Select from "react-select";
import { useState } from 'react';
import { BiEditAlt } from "react-icons/bi";

const MyLoomDetails = () => {
  const MachineTypeoptions = [
    { value: 'Airjet', label: 'Airjet' },
    { value: 'Rapier', label: 'Rapier' },
    { value: 'Projectile', label: 'Projectile' },
    { value: 'Shuttle loom', label: 'Shuttle loom' },
    { value: 'Sampling loom', label: 'Sampling loom' },
  ];

  const SheddingTypeoptions = [
    { value: 'CAM', label: 'CAM' },
    { value: 'E-Shedding', label: 'E-Shedding' },
    { value: 'Full Jacquard', label: 'Full Jacquard' },
  ];

  const Feedersoptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
  ];

  const Framessoptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
  ];

  const [machineType, setMachineType] = useState(MachineTypeoptions[0]);
  const [sheddingType, setSheddingType] = useState(SheddingTypeoptions[2]);
  const [Feeders, setFeeders] = useState(Feedersoptions[2]);
  const [Frames, setFrames] = useState(Framessoptions[5]);
  const [attachments, setAttachments] = useState({
    selvadgeJacquard: false,
    lenoDesignEquipment: false,
    topBeam: false,
    cramming: false,
  });
  const [width, setWidth] = useState('300.00');
  const [RPM, setRPM] = useState('600.00');
  const [editable, setEditable] = useState(false);

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleSubmit = () => {
    setRPM('');
    setMachineType(null);
    setFeeders(null);
    setSheddingType(null);
    setFrames(null);
    setWidth('');
    setAttachments({
      selvadgeJacquard: false,
      lenoDesignEquipment: false,
      topBeam: false,
      cramming: false,
    });
  };

  return (
    <div className='MyLoom-Details-container'>
      <div className='MyLoom-Details-hedding' >
        <h2 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>My Loom Details</h2>
        <BiEditAlt style={{fontSize:'23px',cursor:'pointer',}}  onClick={toggleEdit} />
      </div>

      <div style={{ padding: '10px', }} className='myloom-detail-form' >
        <div className='loomform-container'>
          <div style={{ padding: '10px', }}>
            <div >
              <div className='label-container'>
                <label style={{ fontWeight: 'bold' }}>Machine Type</label>
              </div>
              <Select
                className='MachineType-select-dropdown'
                placeholder="Enter Machine Type"
                isSearchable
                options={MachineTypeoptions}
                value={machineType}
                onChange={(selectedOption) => setMachineType(selectedOption)}
                isDisabled={!editable}
              />
            </div>

            <div style={{ marginTop: '28px' }}>
              <label style={{ fontWeight: 'bold' }}>RPM</label>
              <input
                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                placeholder='Enter RPM'
                type='text'
                value={RPM}
                disabled={!editable}
                onChange={(e) => setRPM(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ marginTop: '10px' }}>
              <div className='label-container'>
                <label style={{ fontWeight: 'bold' }}>Shedding Type</label>
              </div>
              <Select
                className='MachineType-select-dropdown'
                placeholder="Shedding Type"
                options={SheddingTypeoptions}
                isSearchable
                value={sheddingType}
                isDisabled={!editable}
                onChange={(selectedOption) => setSheddingType(selectedOption)}
              />
            </div>

            <div >
              <label style={{ fontWeight: 'bold' }}>Width</label>
              <input
                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '13px' }}
                placeholder='Enter Width'
                type='text'
                value={width}
                disabled={!editable}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <div className='label-container'>
              <label style={{ fontWeight: 'bold' }}>No of Feeders</label>
            </div>
            <Select
              className='select-dropdown'
              placeholder="No of Feeders"
              isSearchable
              options={Feedersoptions}
              value={Feeders}
              isDisabled={!editable}
              onChange={(selectedOption) => setFeeders(selectedOption)}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <div className='label-container'>
              <label style={{ fontWeight: 'bold' }}>No of Frames </label>
            </div>
            <Select
              className='select-dropdown'
              placeholder="No of Frames"
              isSearchable
              options={Framessoptions}
              value={Frames}
              isDisabled={!editable}
              onChange={(selectedOption) => setFrames(selectedOption)}
            />
          </div>
        </div>

        <div style={{ width: '65%', marginBottom: '3%', marginLeft: '2%', marginTop: '2%' }}>
          <div>
            <h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Other Loom Attachments </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', border: '1px solid var(--primary-color)', padding: '40px', borderRadius: '10px', marginTop: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '20px' }}>
              <div style={{ fontWeight: 'bold' }}>
                Selvadge Jacquard
              </div>
              <div style={{ fontWeight: 'bold' }}>
                LenoDesignEquipment
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'center', }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                <div><input
                  style={{ width: '20px' }}
                  type='checkbox'
                  checked={attachments.selvadgeJacquard}
                  onChange={() => setAttachments({ ...attachments, selvadgeJacquard: !attachments.selvadgeJacquard })}
                /></div>
                <div>Available</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                <div><input
                  style={{ width: '20px' }}
                  type='checkbox'
                  checked={attachments.lenoDesignEquipment}
                  onChange={() => setAttachments({ ...attachments, lenoDesignEquipment: !attachments.lenoDesignEquipment })}
                /></div>
                <div>Available</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '10%' }}>
              <div style={{ fontWeight: 'bold' }}>
                Top Beam
              </div>
              <div style={{ fontWeight: 'bold' }}>
                Cramming
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                <div><input
                  style={{ width: '20px' }}
                  type='checkbox'
                  checked={attachments.topBeam}
                  onChange={() => setAttachments({ ...attachments, topBeam: !attachments.topBeam })}
                /></div>
                <div>Available</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                <div><input
                  style={{ width: '20px' }}
                  type='checkbox'
                  checked={attachments.cramming}
                  onChange={() => setAttachments({ ...attachments, cramming: !attachments.cramming })}
                /></div>
                <div>Available</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={handleSubmit} style={{ width: '10%', fontSize: 18 }} className='btn2' disabled={!editable} >
            Submit
          </button>
        </div>
        
        <div className="myloom-table-container" style={{ marginTop: '20px' }}>
          <table>
            <thead>
              <tr>
                <th>OR</th>
                <th>From Date</th>
                <th> To Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>012345</td>
                <td>1/7/2024</td>
                <td>2/8/2024</td>
              </tr>

              <tr>
                <td>012345</td>
                <td>1/7/2024</td>
                <td>2/8/2024</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyLoomDetails



