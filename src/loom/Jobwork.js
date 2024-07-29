
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../common/static/css/jobWork.css';
import { IoClose } from "react-icons/io5";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { FaInfoCircle } from "react-icons/fa";

 const Jobwork = () => {
 const userString = sessionStorage.getItem('user');
 const user = userString ? JSON.parse(userString) : null;
 const [data, setData] = useState([]);
 const navigate = useNavigate();
 const [selectedEnquiry, setSelectedEnquiry] = useState(null);

 const handleEnquiryNoClick = (enquiryNo) => {
    navigate(`../updateenquiry/${enquiryNo}`);
  };

 const getEnquiry = () => {
    fetch('https://textileapp.microtechsolutions.co.in/php/getenquirybymachine.php?LoomTraderId='+user.Id)
        .then(response => response.json())
        .then(jsonData => {
            //console.log(jsonData);
            setData(jsonData); // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};
useEffect(() => {
  getEnquiry();

}, []);

 const handleInfoIconClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

 const closeOverlay = () => {
    setSelectedEnquiry(null);
  };

 const columns = useMemo(
    () => [
      {
        accessorKey: 'srNo',
        header: 'Sr. No.',
        size: 50,
        Cell: ({ row }) => row.index + 1, // This will display the row index + 1
        enableSorting: true,
        sortingFn: (rowA, rowB) => rowA.index - rowB.index,
      },
      {
        accessorKey: 'EnquiryNo',  // EnquiryNo column
        header: 'EnquiryNo',
        size: 150,
        
      },
      {
        accessorKey: 'EnquiryDate.date', // Enquiry Date column
        header: 'Enquiry Date',
        size: 150,
        Cell: ({ cell }) => {
         const date = new Date(cell.getValue());
         const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          return formattedDate;
        },
      },
      {
        accessorKey: 'Name', // Trader Name column
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
    data: data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleEnquiryNoClick(row.original.EnquiryId),
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
      {data && <MaterialReactTable table={table} />}
      {selectedEnquiry && (

        <div className="jobwork-overlay">
          <div className="jobwork-overlay-login-container">
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'var(--secondary-color)', fontSize: '22px' }} >Trader Details:</h3>
              <IoClose style={{ cursor: 'pointer', color: 'var(--secondary-color)', fontSize: '22px' }} onClick={closeOverlay} />
            </div>
            <p><strong>Company Name:</strong> {selectedEnquiry.Name}</p>
            <p><strong>Owner Name:</strong> {selectedEnquiry.OwnerName}</p>
            <p><strong>Address:</strong> {selectedEnquiry.Address}</p>
            <p><strong>City:</strong> {selectedEnquiry.City}</p>
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

//  const transformedData = [
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

//  const Jobwork = () => {
//    const navigate = useNavigate();

//    const handleEnquiryNoClick = (enquiryNo) => {
//     navigate(`/updateenquiry/${enquiryNo}`); // Assuming you want to pass enquiryNo in the path
//   };

//    const columns = useMemo(
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

//    const table = useMaterialReactTable({
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

