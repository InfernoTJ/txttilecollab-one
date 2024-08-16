
import React, { useMemo, useEffect, useState } from 'react';
import '../common/static/css/jobWork.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Admin_loom = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate =useNavigate() 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://textileapp.microtechsolutions.co.in/php/getdetail.php',{
          method: 'GET', // or POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',   // Specify the content type
            'x-api-key': 'yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3',     // Add your x-api-key here
            // Add any other necessary headers
          }});
        const result = await response.json();

        
        const filteredData = result.filter(item => item.LoomOrTrader === 'L');

       
        const dataWithSrNo = filteredData.map((item, index) => ({
          ...item,
          srNo: index + 1, // Auto-incrementing srNo
        }));
        console.log(dataWithSrNo)
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
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => sendingdata(row.original), // Trigger `gettingData` on row click
      style: { cursor: 'pointer' }, // Add pointer cursor to indicate clickable row
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


  const sendingdata = (row) => {
    navigate('../userinfo/'+row.Id) 
  };
  return (
    <>
      <div>
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>
          Registered Looms
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

export default Admin_loom;
