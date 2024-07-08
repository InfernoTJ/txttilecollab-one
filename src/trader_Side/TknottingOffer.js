// import React, { useMemo, } from 'react';

// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table';


// const transformedData = [
//   {
//     OfferNo: '1',
//     LoomUnit: 'A',
//     Reed: '100',
//     Draft: 'Draft 1',
//     ReedSpace: 'RS 1',
//     NumberofLooms: '5',
//     Availablefrom: "25-06-2024",
   
//   },
//   {
//     OfferNo: '2',
//     LoomUnit: 'B',
//     Reed: '120',
//     Draft: 'Draft 2',
//     ReedSpace: 'RS 2',
//     NumberofLooms: '2',
//     Availablefrom: "25-06-2024",

//   },
//   {
//     OfferNo: '3',
//     LoomUnit: 'C',
//     Reed: '160',
//     Draft: 'Draft 3',
//     ReedSpace: 'RS 3',
//     NumberofLooms: '3',
//     Availablefrom: "25-06-2024",
//   },
//   {OfferNo: '4',
//     LoomUnit: 'D',
//     Reed: '110',
//     Draft: 'Draft 4',
//     ReedSpace: 'RS 4',
//     NumberofLooms: '4',
//     Availablefrom: "25-06-2024",
//   },
//   {

//     OfferNo: '5',
//     LoomUnit: 'E',
//     Reed: '200',
//     Draft: 'Draft 5',
//     ReedSpace: 'RS 5',
//     NumberofLooms: '5',
//     Availablefrom: "25-06-2024",
//   },

// ];
// const TknottingOffer = () => {

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'OfferNo', 
//         header: 'Offer No ',
//         size: 50,
//       },
//       {
//         accessorKey: 'LoomUnit',  
//         header: 'Loom Unit',
//         size: 150,
//       },
//       {
//         accessorKey: 'Reed', 
//         header: 'Reed',
//         size: 150,
      
//       },
//       {
//         accessorKey: 'Draft', 
//         header: 'Draft',
//         size: 150,
      
//       },

//       {
//         accessorKey: 'ReedSpace', 
//         header: 'Reed Space(RS)',
//         size: 150,
    
//       },
//       {
//         accessorKey: 'NumberofLooms', 
//         header: 'Number of Looms',
//         size: 150,
//       },
//       {
//         accessorKey: 'Availablefrom', 
//         header: 'Available from',
//         size: 150,
 
//       },
//     ],
//     [],
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: transformedData, 
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
//     <>
//     <div className='tknotting-offer-container'> 
//       <div >
//         <h1 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Knotting Offer </h1>
//       </div>
//       <MaterialReactTable table={table} />

//       </div>
//     </>
//   );
// };

// export default  TknottingOffer;



import React, { useMemo, useState } from 'react';
import '../../src/common/static/css/tknottingoffer.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MdClose } from "react-icons/md";
const transformedData = [
  {
    OfferNo: '1',
    LoomUnit: 'A',
    Reed: '100',
    Draft: 'Draft 1',
    ReedSpace: 'RS 1',
    NumberofLooms: '5',
    Availablefrom: "25-06-2024",
  },
  {
    OfferNo: '2',
    LoomUnit: 'B',
    Reed: '120',
    Draft: 'Draft 2',
    ReedSpace: 'RS 2',
    NumberofLooms: '2',
    Availablefrom: "25-06-2024",
  },
  {
    OfferNo: '3',
    LoomUnit: 'C',
    Reed: '160',
    Draft: 'Draft 3',
    ReedSpace: 'RS 3',
    NumberofLooms: '3',
    Availablefrom: "25-06-2024",
  },
  {
    OfferNo: '4',
    LoomUnit: 'D',
    Reed: '110',
    Draft: 'Draft 4',
    ReedSpace: 'RS 4',
    NumberofLooms: '4',
    Availablefrom: "25-06-2024",
  },
  {
    OfferNo: '5',
    LoomUnit: 'E',
    Reed: '200',
    Draft: 'Draft 5',
    ReedSpace: 'RS 5',
    NumberofLooms: '5',
    Availablefrom: "25-06-2024",
  },
];

const TknottingOffer = () => {
  const [selectedrow, setSelectedRow] = useState(null);


  const closeknottingOverlay = () => {
    setSelectedRow(null);
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'OfferNo',
        header: 'Offer No',
        size: 50,
      },
      {
        accessorKey: 'LoomUnit',
        header: 'Loom Unit',
        size: 150,
      },
      {
        accessorKey: 'Reed',
        header: 'Reed',
        size: 150,
      },
      {
        accessorKey: 'Draft',
        header: 'Draft',
        size: 150,
      },
      {
        accessorKey: 'ReedSpace',
        header: 'Reed Space(RS)',
        size: 150,
      },
      {
        accessorKey: 'NumberofLooms',
        header: 'Number of Looms',
        size: 150,
      },
      {
        accessorKey: 'Availablefrom',
        header: 'Available from',
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
    muiTableHeadCellProps: {
      style: {
        backgroundColor: 'var(--color)',
        color: 'var(--primary-color)',
        fontSize: '17px',
        fontWeight: 'bold',
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => setSelectedRow(row.original),
      style: { cursor: 'pointer' },
    }),
    
  });

  return (
    <>
      <div className='tknotting-offer-container'>
        <div>
          <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Knotting Offer</h1>
        </div>
        <MaterialReactTable table={table} />
      </div>
      {selectedrow && (
        <div className="TknottingOffer-overlay">

        <div className='TknottingOffer-overlay-container' >
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'30px'}}>
          <h2 >Offer Details</h2>
          <MdClose onClick={closeknottingOverlay} style={{fontWeight:'bold',fontSize:'25px',cursor:'pointer'}} />
          </div>
         
          <p><strong>Offer No:</strong> {selectedrow.OfferNo}</p>
          <p><strong>Loom Unit:</strong> {selectedrow.LoomUnit}</p>
          <p><strong>Reed:</strong> {selectedrow.Reed}</p>
          <p><strong>Draft:</strong> {selectedrow.Draft}</p>
          <p><strong>Reed Space:</strong> {selectedrow.ReedSpace}</p>
          <p><strong>Number of Looms:</strong> {selectedrow.NumberofLooms}</p>
          <p><strong>Available from:</strong> {selectedrow.Availablefrom}</p>
          <button className='btn1' onClick={closeknottingOverlay}>Confirm</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TknottingOffer;
