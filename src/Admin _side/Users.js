

import React, { useMemo, useEffect, useState } from 'react';
import '../common/static/css/jobWork.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { FaRegEye } from "react-icons/fa";
import { toast } from 'react-toastify';

const Users = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [decryptedCell, setDecryptedCell] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const handleViewClick = (rowIndex) => {
    setActiveRowIndex(rowIndex);
    setIsModalOpen(true);
  };

  const handlePasswordSubmit =  () => {
    checkpassword(enteredPassword);
  
  };

  const checkpassword =(password)=>{
    const checkpassword = new FormData();
checkpassword.append("AppUserId", user.AppUserId);
checkpassword.append("Password", password);

const checkpasswordconnection = {
  method: "POST",
  body: checkpassword,
  redirect: "follow"
};

fetch("https://textileapp.microtechsolutions.co.in/php/postlogin.php", checkpasswordconnection)
  .then((response) => response.json())
  .then((result) => {console.log('result')
    setDecryptedCell(activeRowIndex);
      setEnteredPassword('')
      setIsModalOpen(false);
      toast.success('Correct Password')
  })
  .catch((error) => {console.error('error')
    toast.error('Incorrect Password')
  });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://textileapp.microtechsolutions.co.in/php/getappuser.php');
        const result = await response.json();

        // Add srNo to each item in the result array
        const dataWithSrNo = result.map((item, index) => ({
          ...item,
          srNo: index + 1,
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
        Cell: ({ cell, row }) => {
          const encryptedPassword = btoa(cell.getValue()); // Base64 encryption
          const rowIndex = row.index;

          return (
            <div>
              {decryptedCell === rowIndex ? (
                <span>{atob(encryptedPassword)}</span> // Decrypted password
              ) : (
                <span>
                  ••••••••••••••••••
                  <FaRegEye 
                    onClick={() => handleViewClick(rowIndex)}
                    style={{ marginLeft: '20px' ,fontSize:'18px', cursor:'pointer' }}
                    />
                </span> // Hidden password with a button to view
              )}
            </div>
          );
        },
      },
    ],
    [decryptedCell]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableBodyRowProps: ({}) => ({}),
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
        {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Enter Password to View</h3>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              style={styles.input}
            />
            <div>
              <button onClick={handlePasswordSubmit} style={styles.submitButton}>
                Submit
              </button>
              <button onClick={() => {setIsModalOpen(false);setEnteredPassword('');}} style={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <MaterialReactTable table={table} />
    </>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px 50px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    border:'1px black solid',
    
    margin: '30px 0',
    width: '80%',
  },
  submitButton: {
    padding: '10px 20px',
    marginRight: '30px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: 'var(--complementary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
export default Users;
