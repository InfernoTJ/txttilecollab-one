import React, { useEffect, useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { FaInfoCircle } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import "../common/static/css/checkresponse.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const CheckResponse = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newTableData, setNewTableData] = useState([]);
  const [showNewTable, setShowNewTable] = useState();
  const [data, setdata] = useState([]);
  const [looominfo, setlooominfo] = useState([]);
  const [showDetail, setshowDetail] = useState(null);
  const [fabricqual, setfabricqual] = useState("");
  const [emailsending, setemailsending] = useState("");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const navigate = useNavigate();
  const handleBiSolidUserDetailClick = (showDetail) => {
    const reqop = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue=" +
        showDetail.LoomTraderId,
      reqop
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        const name = result[0];

        setemailsending(name.AppUserId);
        
        setlooominfo(result);
      })
      .catch((error) => console.error(error));

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

    setShowNewTable(enquiry);
    setfabricqual(enquiry.FabricQuality);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=EnquiryConfirm&Colname=EnquiryId&Colvalue=" +
        enquiry.EnquiryId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setNewTableData(result);
      })
      .catch((error) => console.error(error));
  };

  const closeOverlay = () => {
    setSelectedEnquiry(null);
  };
  const OverlayClose = () => {
    setlooominfo([]);
  };
  const OverlayCloseconfirm = () => {
    setConfirmDetail(null);
  };

  const ConfirmDetailOverlayClose = () => {
    const formdata = new FormData();
    formdata.append("Id", showDetail.Id);
    formdata.append("Status", "true");

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/updateenquiryconfirm.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => console.error(error));
    const restfdata = new FormData();
    restfdata.append("EnquiryConfirmId", showDetail.Id);
    restfdata.append("PartyName", user.Name);
    restfdata.append("JobRate", showDetail.JobRateExp);
    restfdata.append("Quality", fabricqual);
    restfdata.append("Orderdate", formattedDate);
    restfdata.append(
      "BookedDateFrom",
      showDetail.DatePossibleFrom.date.substring(0, 10)
    );
    restfdata.append(
      "BookedDateTo",
      showDetail.DatePossibleTo.date.substring(0, 10)
    );

    const requestOptio = {
      method: "POST",
      body: restfdata,
      redirect: "follow",
    };

    const sendmail = new FormData();
    sendmail.append("AppUserId", emailsending);
    sendmail.append("Body", `Your response was confirmed by ${user.Name} for enquiry ${showNewTable.EnquiryNo}`);
    
    const senemailconnection = {
      method: "POST",
      body: sendmail,
      redirect: "follow"
    };
    const sendmailtrader = new FormData();
sendmailtrader.append("AppUserId", user.AppUserId );
sendmailtrader.append("Body",  `You  confirmed response for enquiry ${showNewTable.EnquiryNo}`);

const senemailtraderconnection = {
  method: "POST",
  body: sendmailtrader,
  redirect: "follow"
};

fetch("https://textileapp.microtechsolutions.co.in/php/sendemail.php", senemailtraderconnection)
  .then((response) => response.text())
  // .then((result) => console.log(result))
  .catch((error) => console.error(error));
   
    toast.info("Sending your response please wait")
    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postloomorder.php",
      requestOptio
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        fetch("https://textileapp.microtechsolutions.co.in/php/sendemail.php", senemailconnection)
        .then((response) => response.text())
        .then((result) => {//console.log(result)
          toast.success("Live Order has Created successfully");
          setConfirmDetail(null);
          setlooominfo([]);
          setShowNewTable("");
          navigate("../check-response");
        })
        .catch((error) => console.error(error));
       
      })
      .catch((error) => console.error(error));
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "EnquiryNo",
        header: "EnquiryNo",
        size: 10,
        Cell: ({ cell, row }) => (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span>{cell.getValue()}</span>
            <FaInfoCircle
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                color: "var(--complementary-color)",
                fontSize: "18px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleInfoIconClick(row.original);
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "CheckResponse",
        header: "CheckResponse",
        size: 150,
        Cell: ({ row }) => (
          <button
            style={{ width: "70%", margin: "0 auto", display: "block" }}
            className="btn2"
            onClick={() => handleCheckResponseClick(row.original)}
          >
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
        accessorKey: "EnquiryId",
        header: "EN NO",
        size: 10,
      },

      {
        accessorKey: "DatePossibleFrom.date",
        header: "From Date",
        size: 10,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          return formattedDate;
        },
      },

      {
        accessorKey: "DatePossibleTo.date",
        header: "To Date",
        size: 10,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          return formattedDate;
        },
      },

      {
        accessorKey: "LoomPossible",
        header: "Loom Assign",
        size: 10,
      },
      {
        accessorKey: "JobRateExp",
        header: "Job Rate",
        size: 10,
      },
      {
        accessorKey: "Status",
        header: "Status",
        size: 10,
        Cell: ({ cell, row }) => (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <SiTicktick
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                color: !cell.getValue() ? "var(--complementary-color" : "green",
                fontSize: "25px",
              }}
              onClick={(e) => {if (cell.getValue()===0) {
                e.stopPropagation();
                handleBiSolidUserDetailClick(row.original);
              } else {
                toast.info('Already Confirmed')
              }
              
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
    data: data,
    muiTableBodyRowProps: () => ({
      style: { cursor: "pointer" },
    }),
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "var(--color)",
        color: "var(--primary-color)",
        fontSize: "17px",
        fontWeight: "bold",
      },
    },
  });

  const newTable = useMaterialReactTable({
    columns: newTableColumns,
    data: newTableData,
    muiTableBodyRowProps: () => ({
      style: { cursor: "pointer" },
    }),
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "var(--color)",
        color: "var(--primary-color)",
        fontSize: "17px",
        fontWeight: "bold",
      },
    },
  });

  const getenquiries = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getjoin.php?TraderId="+user.Id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setdata(result);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getenquiries();
  }, []);
  return (
    <>
      {/* <div>
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Check Response</h1>
      </div> */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ width: "35%" }}>
            <MaterialReactTable table={table} />
            {selectedEnquiry && (
              <div className="T-enquieryDetail-overlay">
                <div className="T-enquieryDetail-overlay-container">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--secondary-color)",
                        fontSize: "22px",
                      }}
                    >
                      Enquiry Details:
                    </h3>
                    <IoClose
                      style={{
                        cursor: "pointer",
                        color: "var(--secondary-color)",
                        fontSize: "22px",
                      }}
                      onClick={closeOverlay}
                    />
                  </div>

                  {/* Details */}

                  <div
                    style={{ display: "grid", gridTemplateColumns: " 1fr 1fr" }}
                  >
                    <div>
                      <p>
                        <strong>Enquiry No: </strong>{" "}
                        {selectedEnquiry.EnquiryId}
                      </p>
                      <p>
                        <strong>From Date : </strong>{" "}
                        {selectedEnquiry.BookingFrom.date.substring(0, 10)}{" "}
                      </p>
                      <p>
                        <strong>Machine Type: </strong>{" "}
                        {selectedEnquiry.MachineType}
                      </p>
                      <p>
                        <strong>No Of Feeders:</strong>{" "}
                        {selectedEnquiry.NoofFeedero}
                      </p>
                      <p>
                        <strong>Enquiry Date: </strong>{" "}
                        {selectedEnquiry.CreatedOn.date.substring(0, 10)}
                      </p>
                      <p>
                        <strong>Dalal/AgentName: </strong>{" "}
                        {selectedEnquiry.AgentName}
                      </p>
                      <p>
                        <strong>Shedding Type: </strong>{" "}
                        {selectedEnquiry.SheddingType}
                      </p>
                      <p>
                        <strong> RPM: </strong> {selectedEnquiry.RPM}
                      </p>
                    </div>

                    <div>
                      <p>
                        <strong>Fabric Quality: </strong>{" "}
                        {selectedEnquiry.FabricQuality}{" "}
                      </p>
                      <p>
                        <strong>From To: </strong>{" "}
                        {selectedEnquiry.BookingTo.date.substring(0, 10)}{" "}
                      </p>
                      <p>
                        <strong>Total Fabric length:</strong>{" "}
                        {selectedEnquiry.FabricLength}
                      </p>
                      <p>
                        <strong> Machine Width:</strong> {selectedEnquiry.Width}
                      </p>
                      <p>
                        <strong> No Of Loom Required:</strong>{" "}
                        {selectedEnquiry.LoomRequired}
                      </p>
                      <p>
                        <strong>Trader Name:</strong> {selectedEnquiry.Name}
                      </p>

                      <p>
                        <strong> No Of frames:</strong>{" "}
                        {selectedEnquiry.NoofFrame}
                      </p>
                      <p>
                        <strong>Job Rate Offered:</strong>{" "}
                        {selectedEnquiry.OfferedJobRate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ width: "70%" }}>
            <div>
              <h1
                style={{ color: "var(--primary-color)", textAlign: "center" }}
              >
                Check Response
              </h1>
            </div>
            {showNewTable && (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--background-color)",
                    padding: "5px",
                    margin: "10px",
                  }}
                >
                  <div>
                    {" "}
                    <b>Enquiry No:</b> {showNewTable.EnquiryNo}
                  </div>
                  <div>
                    {" "}
                    <b> Enquiry Date:</b>
                    {showNewTable.CreatedOn.date.substring(0, 10)}
                  </div>
                  <div>
                    {" "}
                    <b> Fabric Quality:</b> {showNewTable.FabricQuality}
                  </div>
                </div>
                <MaterialReactTable table={newTable} />
              </div>
            )}

            {looominfo.map((looominfo) => (
              <div className="T-profile-status-overlay">
                <div className="T-profile-status-overlay-container">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--secondary-color)",
                        fontSize: "22px",
                      }}
                    >
                      Loom Details :
                    </h3>
                    <IoClose
                      style={{
                        cursor: "pointer",
                        color: "var(--secondary-color)",
                        fontSize: "22px",
                      }}
                      onClick={OverlayClose}
                    />
                  </div>

                  <p>
                    <strong>Company Name : </strong>
                    {looominfo.Name}
                  </p>
                  <p>
                    <strong> Email : </strong> {looominfo.AppUserId}
                  </p>
                  <p>
                    <strong> Address : </strong> {looominfo.Address}
                  </p>
                  <p>
                    <strong> Contact No : </strong> {looominfo.PrimaryContact}
                  </p>

                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={handleComfirmDetailClick}
                      className="btn2"
                      style={{ width: "200px", margin: "10px 0" }}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {confirmDetail &&
            looominfo.map((confirmloom) => (
              <div className="T-profile-confirm-overlay">
                
                <div className="T-profile-confirm-overlay-container">
                <IoClose
                      style={{
                        cursor: "pointer",
                        color: "var(--secondary-color)",
                        fontSize: "22px",
                        float:'right'
                      }}
                      onClick={OverlayCloseconfirm}
                    />
                  <p>
                    Your Enquiry No. <b> EN{showDetail.EnquiryId} </b> is
                    confirmed <br />
                    <br /> Booked <b>{showDetail.LoomPossible}</b> Looms <br />
                    <br />
                    Job rate of <b>{showDetail.JobRateExp} paisa </b>
                    <br />
                    <br />
                    Booked from{" "}
                    <b>
                      {" "}
                      {showDetail.DatePossibleFrom.date.substring(0, 10)}{" "}
                    </b>{" "}
                    To <b>{showDetail.DatePossibleTo.date.substring(0, 10)} </b>
                  </p>
                  <div>Please Proceed for contract Formation:</div>
                  <p> Contact details are:</p>

                  <p>
                    <strong>Company Name:</strong> {confirmloom.Name}
                  </p>
                  <p>
                    <strong>Loom Email:</strong> {confirmloom.AppUserId}
                  </p>
                  <p>
                    <strong>Loom Address:</strong> {confirmloom.Address}
                  </p>
                  <p>
                    <strong>Loom Contact No:</strong>{" "}
                    {confirmloom.PrimaryContact}
                  </p>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={ConfirmDetailOverlayClose}
                      className="btn1"
                      style={{ width: "200px" }}
                    >
                      Confirm{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
