
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../common/static/css/jobWork.css';
import { IoClose } from "react-icons/io5";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { FaInfoCircle } from "react-icons/fa";

const transformedData = [
  {
    srNo: 1,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 2,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 3,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 4,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 5,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 6,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 7,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 8,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 9,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 10,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 11,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 12,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 13,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 14,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 15,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 16,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 17,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 18,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 19,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 20,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 21,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 22,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 23,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 24,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 25,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 26,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 27,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 28,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 29,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 30,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 31,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 32,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 33,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 34,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 35,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },

  {
    srNo: 36,
    enquiryNo: 'ENQ001',
    enquiryDate: '2023-01-01',
    traderName: 'John Doe',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    companyName: "A",
    Pincode: 415263
  },
  {
    srNo: 37,
    enquiryNo: 'ENQ002',
    enquiryDate: '2023-01-02',
    traderName: 'Jane Doe',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    companyName: "B",
    Pincode: 41626

  },
  {
    srNo: 38,
    enquiryNo: 'ENQ003',
    enquiryDate: '2023-01-03',
    traderName: 'Joe Doe',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
    companyName: "C",
    Pincode: 41426
  },
  {
    srNo: 39,
    enquiryNo: 'ENQ004',
    enquiryDate: '2023-01-04',
    traderName: 'Kevin Vandy',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
    companyName: "D",
    Pincode: 41326
  },
  {
    srNo: 40,
    enquiryNo: 'ENQ005',
    enquiryDate: '2023-01-05',
    traderName: 'Joshua Rolluffs',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
    companyName: "E",
    Pincode: 41226
  },
];
const Jobwork = () => {
  const navigate = useNavigate();
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const handleEnquiryNoClick = (enquiryNo) => {
    navigate(`../updateenquiry/${enquiryNo}`);
  };

  const handleInfoIconClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  const closeOverlay = () => {
    setSelectedEnquiry(null);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'srNo', // Sr.No column
        header: 'Sr.No',
        size: 50,
      },
      {
        accessorKey: 'enquiryNo',  // EnquiryNo column
        header: 'EnquiryNo',
        size: 150,
      },
      {
        accessorKey: 'enquiryDate', // Enquiry Date column
        header: 'Enquiry Date',
        size: 150,
      },
      {
        accessorKey: 'traderName', // Trader Name column
        header: 'Trader Name',
        size: 150,
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
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: transformedData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleEnquiryNoClick(row.original.enquiryNo),
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
      <div>
        <h1 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Job Work Enquiry </h1>
      </div>
      <MaterialReactTable table={table} />
      {selectedEnquiry && (

        <div className="jobwork-overlay">
          <div className="jobwork-overlay-login-container">
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'var(--secondary-color)', fontSize: '22px' }} >Trader Details:</h3>
              <IoClose style={{ cursor: 'pointer', color: 'var(--secondary-color)', fontSize: '22px' }} onClick={closeOverlay} />
            </div>
            <p><strong>Company Name:</strong> {selectedEnquiry.companyName}</p>
            <p><strong>Address:</strong> {selectedEnquiry.address}</p>
            <p><strong>City:</strong> {selectedEnquiry.city}</p>
            <p><strong>Pincode:</strong> {selectedEnquiry.Pincode}</p>
          </div>
        </div>

      )}
    </>
  );
};

export default Jobwork;


















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

