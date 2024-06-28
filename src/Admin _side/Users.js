

import React, { useMemo, useEffect, useState } from 'react';
import '../common/static/css/jobWork.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://textileapp.microtechsolutions.co.in/php/getappuser.php');
        const result = await response.json();

        // Add srNo to each item in the result array
        const dataWithSrNo = result.map((item, index) => ({
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
        accessorKey: 'srNo', // Sr.No column
        header: 'Sr.No',
        size: 50,
      },
      {
        accessorKey: 'Name', // Name column
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'AppUserId', // Email Address column
        header: 'Email Address',
        size: 150,
      },
      {
        accessorKey: 'Password', // Password column
        header: 'Password',
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>
          Registered Users
        </h1>
      </div>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Users;
