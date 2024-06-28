// import React from 'react'

// const Admin_yarn = () => {
//   return (
//     <div>
//     This service is temporarily Not Available!!
//     </div>
//   )
// }

// export default Admin_yarn


import React, { useMemo, useEffect, useState } from 'react';
import '../common/static/css/jobWork.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const Admin_yarn = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://textileapp.microtechsolutions.co.in/php/getdetail.php');
        const result = await response.json();

        
        const filteredData = result.filter(item => item.LoomOrTrader === 'Y');

       
        const dataWithSrNo = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1, // Auto-incrementing srNo
        }));

        setData(dataWithSrNo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'srNo', 
        header: 'Sr.No',
        size: 50,
      },
      {
        accessorKey: 'OwnerName', 
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'AppUserId', 
        header: 'Email Address',
        size: 150,
      },
      {
        accessorKey: 'OwnerName', 
        header: 'Name of Company',
        size: 150,
      },
      {
        accessorKey: 'PrimaryContact', 
        header: 'Contact Number',
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, 
    muiTableBodyRowProps: () => ({}),
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
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>
          Registered  Yarn
        </h1>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );
};

export default Admin_yarn;