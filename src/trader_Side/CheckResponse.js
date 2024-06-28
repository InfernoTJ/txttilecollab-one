
import React, { useMemo, useState } from 'react';
import { IoClose } from "react-icons/io5";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { FaInfoCircle } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import '../common/static/css/checkresponse.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const transformedData = [
  {
    srNo: 1,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    TotalFabriclength: 10000.000,
    DateFrom: '2024-06-20',

    DateTo: '2024-06-30',
    FabricQuality: '70/5*110/80*80:68',
    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
  },
  {
    srNo: 2,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-01-20',

    DateTo: '2024-04-30',
    FabricQuality: '70/5*110/80*8:68',

  },
  {
    srNo: 3,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-04-20',

    DateTo: '2024-03-30',
    FabricQuality: '70/5*110/80*68',
  },
  {
    srNo: 4,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-06-20',

    DateTo: '2024-06-30',
    FabricQuality: '70/5*110/80*80:8',
  },
  {
    srNo: 5,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-06-20',

    DateTo: '2024-06-30',
    FabricQuality: '70/5*110/80*80:68',
  },
  {
    srNo: 6,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    TotalFabriclength: 10000.000,
    DateFrom: '2024-06-20',

    DateTo: '2024-06-30',
    FabricQuality: '70/5*110/80*80:68',
    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
  },
  {
    srNo: 7,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-01-20',

    DateTo: '2024-04-30',
    FabricQuality: '70/5*110/80*8:68',

  },
  {
    srNo: 8,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-04-20',

    DateTo: '2024-03-30',
    FabricQuality: '70/5*110/80*68',
  },
  {
    srNo: 9,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-06-20',

    DateTo: '2024-06-30',
    FabricQuality: '70/5*110/80*80:8',
  },
  {
    srNo: 10,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    TotalFabriclength: 10000.000,

    DalalAgentName: 'Hariprasad',

    MachineType: 'Airjet',

    MachineWidth: 190.000,

    SheddingType: 'CAM',

    NoOfframes: 7,

    NoOfFeeders: 2,

    RPM: 1100.00,

    NoOfLoomRequired: 10,

    JobRateOffered: 15.000,
    DateFrom: '2024-06-20',

    DateTo: '2024-06-30',
    FabricQuality: '70/5*110/80*80:68',
  },

  // ... other data entries
];

const CheckResponse = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newTableData, setNewTableData] = useState([]);
  const [showNewTable, setShowNewTable] = useState(false);

  const [showDetail, setshowDetail] = useState(null);
  const handleBiSolidUserDetailClick = (showDetail) => {
    setshowDetail(showDetail);
  };

  const handleInfoIconClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  const [confirmDetail, setConfirmDetail] = useState(null);
  const handleComfirmDetailClick = (confirmDetail) => {
    setConfirmDetail(confirmDetail);


  };

  const handleCheckResponseClick = (enquiry) => {
    // Example data for the new table, replace with real data as needed



    const newData = [
      {
        "EN NO": enquiry.enquiryNo,
        "From Date": "2023-01-01",
        "To Date": "2023-03-02",
        "Loom Assign": 5,
        "JobRate": '23.00',
        // "Status": 'Active',

        'LoomsPossible': 1,
        'LoomUnitName': 'Airjet1',


        'LoomEmail': 'airjet1@gmail.com',
        'LoomAddress': 'kabnoor',
        'LoomContactNo': '5588446624'
      },

      {
        "EN NO": enquiry.enquiryNo,
        "From Date": "2024-01-01",
        "To Date": "2024-03-02",
        "Loom Assign": 8,
        "JobRate": '25.00',
        'LoomsPossible': 3,
        'LoomUnitName': 'Airjet1',
        'LoomEmail': 'airjet5@gmail.com',
        'LoomAddress': 'kabnoor',
        'LoomContactNo': '5588446624'
      },
    ];
    setNewTableData(newData);
    setShowNewTable(true);
  };

  const closeOverlay = () => {
    setSelectedEnquiry(null);
  };
  const OverlayClose = () => {
    setshowDetail(null);
  };

  const ConfirmDetailOverlayClose = () => {
    setConfirmDetail(null);
    setshowDetail(null)
    toast.success('Live Order has Created successfully')
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: 'enquiryNo',
        header: 'EnquiryNo',
        size: 10,
        Cell: ({ cell, row }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>{cell.getValue()}</span>
            <FaInfoCircle
              style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--complementary-color)', fontSize: '18px' }}
              onClick={(e) => {
                e.stopPropagation();
                handleInfoIconClick(row.original);
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: 'CheckResponse',
        header: 'CheckResponse',
        size: 150,
        Cell: ({ row }) => (
          <button style={{ width: '70%', margin: '0 auto', display: 'block' }} className='btn2' onClick={() => handleCheckResponseClick(row.original)}>
            Check
          </button>
        ),
      },
    ],
    []
  );

  const newTableColumns = useMemo(
    () => [
      {
        accessorKey: 'EN NO',
        header: 'EN NO',
        size: 10,
      },


      {
        accessorKey: 'From Date',
        header: 'From Date',
        size: 10,
      },

      {
        accessorKey: 'To Date',
        header: 'To Date',
        size: 10,
      },

      {
        accessorKey: 'Loom Assign',
        header: 'Loom Assign',
        size: 10,
      },
      {
        accessorKey: 'JobRate',
        header: 'Job Rate',
        size: 10,
      },
      {
        accessorKey: 'Status',
        header: 'Status',
        size: 10,
        Cell: ({ cell, row }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>{cell.getValue()}</span>
            <BiSolidUserDetail
              style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--complementary-color)', fontSize: '28px' }}
              onClick={(e) => {
                e.stopPropagation();
                handleBiSolidUserDetailClick(row.original);
              }}
            />
          </div>
        ),
      },

    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
    muiTableBodyRowProps: () => ({
      style: { cursor: 'pointer' },
    }),
    muiTableHeadCellProps: {
      style: {
        backgroundColor: 'var(--color)',
        color: 'var(--primary-color)',
        fontSize: '17px',
        fontWeight: 'bold',
      },
    },
  });

  const newTable = useMaterialReactTable({
    columns: newTableColumns,
    data: newTableData,
    muiTableBodyRowProps: () => ({
      style: { cursor: 'pointer' },
    }),
    muiTableHeadCellProps: {
      style: {
        backgroundColor: 'var(--color)',
        color: 'var(--primary-color)',
        fontSize: '17px',
        fontWeight: 'bold',
      },
    },
  });

  return (
    <>

      {/* <div>
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Check Response</h1>
      </div> */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: "35%", }}>
     
            <MaterialReactTable table={table} />
            {selectedEnquiry && (
              <div className="T-enquieryDetail-overlay">
                <div className="T-enquieryDetail-overlay-container">
                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ color: 'var(--secondary-color)', fontSize: '22px' }}>Enquiry Details:</h3>
                    <IoClose style={{ cursor: 'pointer', color: 'var(--secondary-color)', fontSize: '22px' }} onClick={closeOverlay} />
                  </div>


                  {/* Details */}

                  <div style={{ display: 'grid', gridTemplateColumns: ' 1fr 1fr', }}>
                    <div>

                      <p><strong>Enquiry No: </strong> {selectedEnquiry.enquiryNo}</p>
                      <p><strong>From Date : </strong> {selectedEnquiry.DateFrom} </p>
                      <p><strong>Machine Type: </strong> {selectedEnquiry.MachineType}</p>
                      <p><strong>No Of Feeders:</strong> {selectedEnquiry.NoOfFeeders}</p>
                      <p><strong>Enquiry Date: </strong> {selectedEnquiry.enquiryDate}</p>
                      <p><strong>Dalal/AgentName: </strong> {selectedEnquiry.DalalAgentName}</p>
                      <p><strong>Shedding Type: </strong> {selectedEnquiry.SheddingType}</p>
                      <p><strong>  RPM: </strong> {selectedEnquiry.RPM}</p>
                    </div>

                    <div >
                      <p><strong>Fabric Quality: </strong> {selectedEnquiry.FabricQuality} </p>
                      <p><strong>From To: </strong> {selectedEnquiry.DateTo} </p>
                      <p><strong>Total Fabric length:</strong> {selectedEnquiry.TotalFabriclength}</p>
                      <p><strong> Machine Width:</strong> {selectedEnquiry.MachineWidth}</p>
                      <p><strong> No Of Loom Required:</strong> {selectedEnquiry.NoOfLoomRequired}</p>
                      <p><strong>Trader Name:</strong> {selectedEnquiry.traderName}</p>

                      <p><strong> No Of frames:</strong> {selectedEnquiry.NoOfframes}</p>
                      <p><strong>Job Rate Offered:</strong> {selectedEnquiry.JobRateOffered}</p>
                    </div>

                  </div>

                </div>
              </div>
            )}
          </div>
          <div style={{ width: "70%", }}>
          <div>
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Check Response</h1>
      </div>
            {showNewTable && (
              <div>

                <div style={{ display: 'flex', gap: '20px',alignItems:'center',justifyContent:'center' }}>


                  <div> <b>Enquiry No:</b>10</div>
                  <div> <b> Enquiry Date:</b>2024-10-16</div>
                  <div> <b>  Fabric Quality:</b> 20/85: 255/:100</div>

                </div>
                <MaterialReactTable table={newTable} />
              </div>
            )}



            {showDetail && (
              <div className="T-profile-status-overlay">
                <div className="T-profile-status-overlay-container">
                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', }}>
                    <h3 style={{ color: 'var(--secondary-color)', fontSize: '22px' }}>Loom Details:</h3>
                    <IoClose style={{ cursor: 'pointer', color: 'var(--secondary-color)', fontSize: '22px' }} onClick={OverlayClose} />
                  </div>



                  <p><strong>Looms Possible:</strong> {showDetail.LoomsPossible}</p>
                  <p><strong>Company Name:</strong> {showDetail.LoomUnitName}</p>
                  <p><strong>Loom Email:</strong> {showDetail.LoomEmail}</p>
                  <p><strong>Loom Address:</strong> {showDetail.LoomAddress}</p>
                  <p><strong>Loom Contact No:</strong> {showDetail.LoomContactNo}</p>

                  <div>
                    <button onClick={handleComfirmDetailClick} className='btn2'>Confirm</button>


                  </div>

                </div>

              </div>

            )}


          </div>
          <ToastContainer />
          {confirmDetail && (
            <div className="T-profile-confirm-overlay">
              <div className="T-profile-confirm-overlay-container">

                <p>
                  Your Enquiry Number <b>EN427</b> of <b>5</b> Looms is Confirmed with <b>Job rate of 900.00 paisa  </b> 
                <b>From 2024-06-06 To 2024-06-08 </b>
                </p>
                <div>Please Proceed for contract Formation:</div>
                <p> Contact details are:</p>
               
           
                <p><strong>Company Name:</strong> {showDetail.LoomUnitName}</p>
                <p><strong>Loom Email:</strong> {showDetail.LoomEmail}</p>
                <p><strong>Loom Address:</strong> {showDetail.LoomAddress}</p>
                <p><strong>Loom Contact No:</strong> {showDetail.LoomContactNo}</p>
                <div >
                <button onClick={ConfirmDetailOverlayClose} className='btn1'>Okay </button>
                </div>
              </div>
             
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CheckResponse;









// import React, { useMemo, useState } from 'react';

// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { FaInfoCircle } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// const transformedData = [
//   {
//     srNo: 1,
//     enquiryNo: 'ENQ001',
//     enquiryDate: '2023-01-01',
//     traderName: 'John Doe',
//     TotalFabriclength: 10000.000,
//     DalalAgentName: 'Hariprasad',
//     MachineType: 'Airjet',
//     MachineWidth: 190.000,
//     SheddingType: 'CAM',
//     NoOfframes: 7,
//     NoOfFeeders: 2,
//     RPM: 1100.00,
//     NoOfLoomRequired: 10,
//     JobRateOffered: 15.000,
//   },
//   // other enquiry data...
// ];

// const responseTableData = [
//   {
//     responseId: 1,
//     responseText: 'Response 1 for ENQ001',
//   },
//   // other response data...
// ];

// const CheckResponse = () => {
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);
//   const [showResponseTable, setShowResponseTable] = useState(false);

//   const handleInfoIconClick = (enquiry) => {
//     setSelectedEnquiry(enquiry);
//   };

//   const handleCheckResponseClick = (enquiry) => {
//     setSelectedEnquiry(enquiry);
//     setShowResponseTable(true);
//   };

//   const closeResponseTable = () => {
//     setSelectedEnquiry(null);
//     setShowResponseTable(false);
//   };

//   const closeOverlay = () => {
//     setSelectedEnquiry(null);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'enquiryNo',  // EnquiryNo column
//         header: 'EnquiryNo',
//         size: 10,
//       },
//       {
//         accessorKey: 'CheckResponse', // Check Response column
//         header: 'CheckResponse',
//         size: 100,
//         Cell: ({ row }) => (
//           <button  className='btn1' onClick={() => handleCheckResponseClick(row.original)}>
//             Check Response
//           </button>
//         ),
//       },
//       {
//         accessorKey: 'Details',
//         header: 'Details',
//         size: 150,
//         Cell: ({ cell, row }) => (
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//             <span>{cell.getValue()}</span>
//             <FaInfoCircle
//               style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--complementary-color)', fontSize: '18px' }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleInfoIconClick(row.original);
//               }}
//             />
//           </div>
//         ),
//       },
//     ],
//     [],
//   );

//   const responseColumns = useMemo(
//     () => [
//       {
//         accessorKey: 'EN NO',
//         header: 'EN NO',
//         size: 10,
//       },
//       {
//         accessorKey: 'From Date',
//         header: 'From Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'To Date',
//         header: 'To Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'Loom Assign',
//         header: 'Loom Assign',
//         size: 150,
//       },
//       {
//         accessorKey: 'JobRate',
//         header: 'JobRate',
//         size: 150,
//       },
//       {
//         accessorKey: 'Status',
//         header: 'Status',
//         size: 150,
//       },
//     ],
//     [],
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: transformedData,
//     muiTableBodyRowProps: ({ row }) => ({
//       style: { cursor: 'pointer' },
//     }),
//     muiTableHeadCellProps: {
//       style: {
//         backgroundColor: 'var(--color)',
//         color: 'var(--primary-color)',
//         fontSize: '17px',
//         fontWeight: 'bold',
//       },
//     },
//   });

//   const responseTable = useMaterialReactTable({
//     columns: responseColumns,
//     data: responseTableData,
//     muiTableBodyRowProps: ({ row }) => ({
//       style: { cursor: 'pointer' },
//     }),
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
//       <div style={{ flex: 1,}}>
//         <div style={{ display: 'flex', }}>
//           <div style={{height:"10vh", width:"40%" ,border: '1px solid red' }}>
//           <MaterialReactTable table={table} />
//         {selectedEnquiry && (
//           <div className="jobwork-overlay">
//             <div className="jobwork-overlay-login-container">
//               <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
//                 <h3 style={{ color: 'var(--secondary-color)', fontSize: '22px' }}>Details:</h3>
//                 <IoClose style={{ cursor: 'pointer', color: 'var(--secondary-color)', fontSize: '22px' }} onClick={closeOverlay} />
//               </div>
//               <p><strong>Enquiry No:</strong> {selectedEnquiry.enquiryNo}</p>
//               <p><strong>Enquiry Date:</strong> {selectedEnquiry.enquiryDate}</p>
//               <p><strong>Trader Name:</strong> {selectedEnquiry.traderName}</p>
//               <p><strong>Total Fabric Length:</strong> {selectedEnquiry.TotalFabriclength}</p>
//               <p><strong>Dalal Agent Name:</strong> {selectedEnquiry.DalalAgentName}</p>
//               <p><strong>Machine Type:</strong> {selectedEnquiry.MachineType}</p>
//               <p><strong>Machine Width:</strong> {selectedEnquiry.MachineWidth}</p>
//               <p><strong>Shedding Type:</strong> {selectedEnquiry.SheddingType}</p>
//               <p><strong>No Of Frames:</strong> {selectedEnquiry.NoOfframes}</p>
//               <p><strong>No Of Feeders:</strong> {selectedEnquiry.NoOfFeeders}</p>
//               <p><strong>RPM:</strong> {selectedEnquiry.RPM}</p>
//               <p><strong>No Of Loom Required:</strong> {selectedEnquiry.NoOfLoomRequired}</p>
//               <p><strong>Job Rate Offered:</strong> {selectedEnquiry.JobRateOffered}</p>
//             </div>
//           </div>
//         )}

//              </div>
//           <div style={{height:"10vh",width:"60%" , border: '1px solid blue' }}>
//           {selectedEnquiry && showResponseTable && (
//           <div style={{ marginTop: '20px' }}>
//             <h3>Response Table for {selectedEnquiry.enquiryNo}</h3>
//             <MaterialReactTable table={responseTable} />
//             <button onClick={closeResponseTable}>Close Response Table</button>
//           </div>
//         )}

//           </div>
//         </div>
//  </div>
//     </>
//   );
// };

// export default CheckResponse;
















// import React, { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

// const transformedData = [
//   {
//     srNo: 1,
//     enquiryNo: 'ENQ001',
//     enquiryDate: '2023-01-01',
//     traderName: 'John Doe',
//     address: '261 Erdman Ford',
//     city: 'East Daphne',
//     state: 'Kentucky',
//   },
//   {
//     srNo: 2,
//     enquiryNo: 'ENQ002',
//     enquiryDate: '2023-01-02',
//     traderName: 'Jane Doe',
//     address: '769 Dominic Grove',
//     city: 'Columbus',
//     state: 'Ohio',
//   },
//   {
//     srNo: 3,
//     enquiryNo: 'ENQ003',
//     enquiryDate: '2023-01-03',
//     traderName: 'Joe Doe',
//     address: '566 Brakus Inlet',
//     city: 'South Linda',
//     state: 'West Virginia',
//   },
//   {
//     srNo: 4,
//     enquiryNo: 'ENQ004',
//     enquiryDate: '2023-01-04',
//     traderName: 'Kevin Vandy',
//     address: '722 Emie Stream',
//     city: 'Lincoln',
//     state: 'Nebraska',
//   },
//   {
//     srNo: 5,
//     enquiryNo: 'ENQ005',
//     enquiryDate: '2023-01-05',
//     traderName: 'Joshua Rolluffs',
//     address: '32188 Larkin Turnpike',
//     city: 'Charleston',
//     state: 'South Carolina',
//   },
// ];

// const Jobwork = () => {
//   const navigate = useNavigate();

//   const handleEnquiryNoClick = (enquiryNo) => {
//     navigate(`/updateenquiry/${enquiryNo}`); // Assuming you want to pass enquiryNo in the path
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'srNo', // Sr.No column
//         header: 'Sr.No',
//         size: 50,
//       },
//       {
//         accessorKey: 'enquiryNo',  // EnquiryNo column
//         header: 'EnquiryNo',
//         size: 150,
//         Cell: ({ cell }) => (
//           <span
//             style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
//             onClick={handleEnquiryNoClick}
//           >
//             {cell.getValue()}
//           </span>
//         ),
//       },
//       {
//         accessorKey: 'enquiryDate', // Enquiry Date column
//         header: 'Enquiry Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'traderName', // Trader Name column
//         header: 'Trader Name',
//         size: 150,
//       },
//     ],
//     [],
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: transformedData, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
//     muiTableHeadCellProps: {
//       style: {
//         backgroundColor: 'var(--color)',
//         color: 'var(--primary-color)',
//         fontSize: '17px',
//         fontWeight: 'bold'
//       },
//     },
//   });

//   return <MaterialReactTable {...table} />;
// };

// export default Jobwork;

