
import React, { useState, useEffect } from "react";
import "../common/static/css/loomBooking.css";

import { IoClose } from "react-icons/io5";
import { HiMiniInformationCircle } from "react-icons/hi2";
import "../common/static/css/loom_booking.css";

function Loom_booking() {
    const [isBooked, setIsBooked] = useState(true);
    const [isLoomBooked, setLoomIsBooked] = useState(false);
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const [data, setData] = useState();

    const [orderNum, setOrderNum] = useState(null);
    const [bookedDate, setBookedDate] = useState(null);

    const getloom = () => {
        fetch('https://textileapp.microtechsolutions.co.in/php/bookingjoin.php?LoomTraderId='+user.Id)
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);
                setData(jsonData); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        getloom();
    }, []);

    const toggleBookingStatus = () => {
        setIsBooked(!isBooked);
        if (!isBooked) {
            // Simulating booking data, replace with actual data
            setOrderNum('OR1234');
            setBookedDate('2024-06-05');
        } else {
            setOrderNum(null);
            setBookedDate(null);
        }
    };

    const [orderId, setOrderId] = useState(null);
    const [toDate, setToDate] = useState(null);
    const loomBookingStatus = () => {
        setLoomIsBooked(!isLoomBooked);
        if (!isLoomBooked) {
            // Simulating booking data, replace with actual data
            setOrderId('OR65123');
            setToDate('2024-06-05');
        } else {
            setOrderId(null);
            setToDate(null);
        }
    };

    const [selectedLoom, setSelectedLoom] = useState(null);

    const handleLoomSelection = (loomNumber) => {
        setSelectedLoom(loomNumber); // Update selected loom number when a loom is clicked
    };

    //   const for right side form
    const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
    const handleInfoBtnClick = () => {
        setisInfoFormOpen(!isInfoFormOpen);
    };
    const handleFormClose = () => {
        setisInfoFormOpen(false);
    };
    // const loomTraderId = 493;

    // //
    const [loomNo, setLoomNo] = useState('2');
    const [machineType, setMachineType] = useState('Airjet');
    const [sheddingType, setSheddingType] = useState('E-Shedding');
    const [width, setWidth] = useState(250.000);
    const [rpm, setRpm] = useState(500.00);
    const [noOfFrames, setNoOfFrames] = useState(10);
    const [noOfFeeders, setNoOfFeeders] = useState(6);
    const [selvageJacquard, setSelvageJacquard] = useState(1);
    const [topBeam, setTopBeam] = useState(0);
    const [cramming, setCramming] = useState(1);
    const [lenoDesignEquipment, setLenoDesignEquipment] = useState(0);
    const [loomAvailableFrom, setLoomAvailableFrom] = useState('2024-06-05');
    const [loomAvailableTo, setLoomAvailableTo] = useState('2024-12-05');


   
        // Add more looms as needed
    return (
        <>
            <div style={{border:'3px solid red'}}  className='loom_booking-container'>
                <div className='loom_booking-left'>
                    <div>
                        <h1 style={{ textAlign: 'center', color: 'var( --primary-color)' }}>Loom Booking panel</h1>
                    </div>
                    <div className='loom_booking_allcards'>
                    
                        {/* <div className='loom_booking_card1' onClick={() => handleLoomSelection('L-1')} >
                     
                     
                            <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer', fontSize: '30px' }}>
                                <HiMiniInformationCircle onClick={handleInfoBtnClick} style={{ color: "white",fontSize: '25px',marginRight:'3px'}} />
                            </div>
                            <div>
                                <div className='loom_number' style={{background:'var(--secondary-color)',color: 'white', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>

                                
                                    <p style={{ cursor: 'pointer', fontSize: '20px' }} onClick={toggleBookingStatus}> L-1 </p>
                                </div>
                                <hr />
                                
                                    <>
                                        <p style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '10px', color: 'var(--primary-color)' }}>OR: <span>{orderNum}</span></p>
                                        <p style={{ fontSize: '13px', marginLeft: '10px' }}>To: <span>{bookedDate}</span></p>
                                        <p style={{ fontSize: '13px', marginLeft: '10px' }}>Party: </p>
                                    </>
                             
                            </div>
                        </div> */}

{data && data.map((data) => (   
                            <div className='loom_booking_card1' onClick={() => handleLoomSelection(data)} >
                     
                     
                            <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer', fontSize: '30px' }}>
                                <HiMiniInformationCircle onClick={handleInfoBtnClick} style={{ color: "white",fontSize: '25px',marginRight:'3px'}} />
                            </div>
                            <div>
                                <div className='loom_number' style={{background:'var(--secondary-color)',color: 'white', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>

                                
                                    <p style={{ cursor: 'pointer', fontSize: '20px' }} onClick={toggleBookingStatus}>{data.LoomNo} </p>
                                </div>
                                <hr />
                                
                                    <>
                                    {(data.Available===0) && <><p style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '10px', color: 'var(--primary-color)' }}>OR: <span>{data.OrderNo}</span></p>
                                        <p style={{ fontSize: '13px', marginLeft: '10px' }}>To: <span>{data.BookedDateTo && data.BookedDateTo.date.substring(0,10)}</span></p>
                                        <p style={{ fontSize: '13px', marginLeft: '10px' }}>Party: {data.PartyName} </p></>}
                                        {(data.Available===1) && <> <p>Available from {data.LoomAvailableFrom.date.substring(0,10)}</p>
                                        </>
                                        }
                                    </>
                             
                            </div>
                        </div>
                        ))} 
                    </div>
                </div>
                {selectedLoom && (
                    <div className='loom_booking-right' style={{ margin: '10px' }}>
                        <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>
                            {selectedLoom ? `Selected Loom: ${selectedLoom.LoomNo}` : "Select Loom No"}
                        </h2>
                        <div 
                        // style={{ border: "1px solid var(--secondary-color)", background: 'var(--background-color)', borderRadius: '10px', padding: '10px' }} 
                        className='loom_booking-form-container'>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'center' }}>
                                <label style={{ fontWeight: 'bold', padding: '10px', fontSize: 18 }}>Order No</label>
                                <input style={{ width: '40%', margin: '10px', border: '1px solid var(--primary-color)' }} type="text" placeholder='Order No' />
                            </div>
                            <div style={{ height: '40vh', marginTop: '20px', }} className='loom_booking_form'>
                                <div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', padding: '10px' }}>Quality</label>
                                        <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }} type="text" placeholder='Quality' />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold', padding: '10px' }}>Job Rate Exp</label>
                                        <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }} type="text" placeholder='Enter Job Rate' />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold', padding: '10px' }}>Party Name</label>
                                        <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }} type="text" placeholder='Enter Party Name' />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label style={{ fontWeight: 'bold', padding: '10px' }}>Order Date</label>
                                        <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '8px' }} type="date" />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold', padding: '10px' }}>From Date</label>
                                        <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '7px' }} type="date" />
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold', padding: '10px' }}>To Date</label>
                                        <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '7px' }} type="date" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="loom_booking_btn-container"
                            //  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                             >
                                <button style={{ width: '30%', marginTop: '20px', margin: '10px' }} className='btn1'>Submit</button>
                            </div>

                            <div className={`loom_booking_infoform-container ${isInfoFormOpen ? "form-open" : ""}`}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h2 style={{ color: 'var(--primary-color)', padding: '20px' }}>Loom Information</h2>
                                    <IoClose style={{ fontSize: '30px', color: 'var(--primary-color)' }} onClick={handleFormClose} />
                                </div>
                                <div style={{ marginLeft: '50px' }}>
                                      <div><h3>Loom No: {selectedLoom.LoomNo}</h3></div>
                                    <div><h3>Machine Type: {selectedLoom.MachineType}</h3></div>
                                    <div><h3>Shedding Type: {selectedLoom.SheddingType}</h3></div>
                                    <div><h3>Width: {selectedLoom.Width}</h3></div>
                                    <div><h3>RPM: {selectedLoom.RPM}</h3></div>
                                    <div><h3>No of Frames: {selectedLoom.NoofFrames}</h3></div>
                                    <div><h3>No of Feeders: {selectedLoom.NoofFeeders}</h3></div>
                                    { (selectedLoom.SelvageJacquard===1) && <div><h3>Selvage Jacquard: Available </h3></div>}
                                    {selectedLoom.TopBeam===1 && <div><h3>Top Beam: Available</h3></div>}
                                    {selectedLoom.Cramming===1 && <div><h3>Cramming: Available </h3></div>}
                                    {selectedLoom.LenoDesignEquipment===1 && <div><h3>Leno Design Equipment: Available </h3></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Loom_booking;


















































































































// main code
// import React from 'react';
// import { useState, useEffect } from "react";
// import '../common/static/css/loomBooking.css'
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
// import '../common/static/css/loom_booking.css';

// function Loom_booking() {
//     const [isBooked, setIsBooked] = useState(true);
//     const [isLoomBooked, setLoomIsBooked] = useState(false);
//     const [id, setId] = useState(493);
//     const [data, setData] = useState();

//     const [orderNum, setOrderNum] = useState(null);
//     const [bookedDate, setBookedDate] = useState(null);

//     // const toggleBookingStatus = () => {
//     //     setIsBooked(!isBooked);
//     // };




//     const getloom = () => {
//         fetch('https://textileapp.microtechsolutions.co.in/php/bookingjoin.php?LoomTraderId=493')
//             .then(response => response.json())
//             .then(jsonData => {
//                 console.log(jsonData);
//                 setData(jsonData); // Update state with fetched data

//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);

//             });
//     }

//     useEffect(() => {
//         getloom()
//     }, []);


//     const toggleBookingStatus = () => {
//         setIsBooked(!isBooked);
//         if (!isBooked) {
//             // Simulating booking data, replace with actual data
//             setOrderNum('OR1234');
//             setBookedDate('2024-06-05');
//         } else {
//             setOrderNum(null);
//             setBookedDate(null);
//         }
//     };

//     const [orderId, setOrderId] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const loomBookingStatus = () => {
//         setLoomIsBooked(!isLoomBooked);
//         if (!isLoomBooked) {
//             // Simulating booking data, replace with actual data
//             setOrderId('OR65123');
//             setToDate('2024-06-05');
//         } else {
//             setOrderId(null);
//             setToDate(null);
//         }
//     };

//     const [selectedLoom, setSelectedLoom] = useState(null);

//     const handleLoomSelection = (loomNumber) => {
//         setSelectedLoom(loomNumber); // Update selected loom number when a loom is clicked
//     };

//     //   const for right side form
//     const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
//     const handleInfoBtnClick = () => {
//         setisInfoFormOpen(!isInfoFormOpen);
//     };
//     const handleFormClose = () => {
//         setisInfoFormOpen(false);
//     };
//     const loomTraderId = 493;

//     // //
//     const [loomNo, setLoomNo] = useState('2');
//     const [machineType, setMachineType] = useState('Airjet');
//     const [sheddingType, setSheddingType] = useState('E-Shedding');
//     const [width, setWidth] = useState(250.000);
//     const [rpm, setRpm] = useState(500.00);
//     const [noOfFrames, setNoOfFrames] = useState(10);
//     const [noOfFeeders, setNoOfFeeders] = useState(6);
//     const [selvageJacquard, setSelvageJacquard] = useState(1);
//     const [topBeam, setTopBeam] = useState(0);
//     const [cramming, setCramming] = useState(1);
//     const [lenoDesignEquipment, setLenoDesignEquipment] = useState(0);
//     const [loomAvailableFrom, setLoomAvailableFrom] = useState('2024-06-05');
//     const [loomAvailableTo, setLoomAvailableTo] = useState('2024-12-05');

//     return (
//         <>
//             <div className='loom_booking-container'>
//                 <div className='loom_booking-left'
//                 //style={{ border: '2px solid green', }}
//                 >
//                     <div>
//                         <h1 style={{ textAlign: 'center', color: 'var( --primary-color)' }}>Loom Booking panel  </h1>

//                     </div>
//                     <div
//                         style={{
//                             //  border: '3px solid blue', 
//                             padding: '20px', margin: '10px', display: 'grid', height: '88vh', gridTemplateColumns: 'repeat(5, 0.3fr)', gridTemplateRows: 'repeat(4,0.3fr)', gap: '30px'
//                         }}
//                         className='loom_booking_allcards' >

//                         <div className='loom_booking_card1' onClick={() => handleLoomSelection('L-1')} style={{ border: '2px solid var(--secondary-color)', borderRadius: "8px", position: 'relative' }} >
//                             <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer', fontSize: '30px' }}>
//                                 <IoMdInformationCircleOutline onClick={handleInfoBtnClick} style={{ color: "white" }} />
//                             </div>
//                             <div style={{}}>
//                                 <div className='loomnumber' style={{ background: isBooked ? 'var(--complementary-color)' : 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
//                                     <p style={{ cursor: 'pointer', fontSize: '20px' }} onClick={toggleBookingStatus}> L-1 </p>
//                                 </div>
//                                 <hr />
//                                 {orderNum !== null ? (
//                                     <>
//                                         <p style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '10px' }} >OR : <span>{orderNum}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>To : <span>{bookedDate}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>Party : </p>
//                                     </>
//                                 ) : (
//                                     <p></p>
//                                 )}
//                             </div>
//                         </div>


//                         <div className='loom_booking_card1' onClick={() => handleLoomSelection('L-2')} style={{ border: '2px solid var(--secondary-color)', borderRadius: "8px", position: 'relative' }}>
//                             <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer', fontSize: '30px' }}>
//                                 <IoMdInformationCircleOutline onClick={handleInfoBtnClick} style={{ color: "white" }} />
//                             </div>
//                             <div style={{ textAlign: 'center' }}>
//                                 <div className='loomnumber' style={{ background: isLoomBooked ? 'var(--complementary-color)' : 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
//                                     <p style={{ cursor: 'pointer', fontSize: '20px' }} onClick={loomBookingStatus}> L-2 </p>
//                                 </div>
//                                 <hr />

//                                 {orderId !== null ? (
//                                     <>
//                                         <p style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '10px' }} >OR : <span>{orderNum}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>To : <span>{bookedDate}</span></p>
//                                         <p style={{ fontSize: '13px', marginLeft: '10px' }}>Party : </p>

//                                     </>
//                                 ) : (
//                                     <h3> Available</h3>
//                                 )}
//                             </div>
//                         </div>
// {/* 
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div>
//                         <div style={{ border: '1px solid red' }} classname="box"></div> */}
//                     </div>



//                 </div>
//                 {selectedLoom && (
//                 <div
//                     className='loombooking-right'
//                     style={{

//                         // border: '2px solid blue',
//                         margin: '10px',
//                     }}>
//                     <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>
//                         {selectedLoom ? `Selected Loom :  ${selectedLoom} ` : "Select Loom No"}
//                     </h2>


//                     <div style={{ border: "1px solid  var( --secondary-color)", background: 'var(--background-color)', borderRadius: '10px', padding: '10px' }} className='loom_booking-form-container'>

//                         <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'center' }}>
//                             <label style={{ fontWeight: 'bold', padding: '10px', fontSize: 18 }}>Order No</label>
//                             <input style={{ width: '40%', margin: '10px', border: '1px solid var(--primary-color)' }}
//                                 type="text" placeholder='Order No' />
//                         </div>

//                         <div style={{ height: '40vh', marginTop: '20px' }} className='loom_booking_container'>
//                             <div  >
//                                 {/* <div>
//                                     <label style={{ fontWeight: 'bold',padding:'10px' }}>Order No</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                         type="text" placeholder='Order No' />
//                                 </div> */}

//                                 <div >
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Quality</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', }} type="text" placeholder='Quality' />
//                                 </div>



//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Job Rate Exp</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', }} type="text" placeholder='Enter Job Rate ' />
//                                 </div>
//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Party Name</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', }} type="text" placeholder='Enter Party Name' />
//                                 </div>

//                             </div>
//                             <div >
//                                 <div>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>Order Date</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '8px' }} type="date" />
//                                 </div>

//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>From Date</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '7px' }} type="date" />
//                                 </div>

//                                 <div style={{ marginTop: '10px' }}>
//                                     <label style={{ fontWeight: 'bold', padding: '10px' }}>To Date</label>
//                                     <input style={{ width: '85%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '7px' }} type="date" readonly />
//                                 </div>



//                             </div>
//                         </div>

//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                             <button style={{ width: '30%', marginTop: '20px', margin: '10px' }} className='btn1'>Submit</button>
//                         </div>


//                         {/*  */}

//                         <div className={`infoform-container ${isInfoFormOpen ? "form-open" : ""}`}>
//                             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                 <h2 style={{ color: 'var(--primary-color)', padding: '20px' }}>Loom Information</h2>
//                                 <IoClose style={{ fontSize: '30px', color: 'var(--primary-color)' }} onClick={handleFormClose} />
//                             </div>

//                             <div style={{ marginLeft: '50px' }}>
//                                 <div><h3>Loom No :  {loomNo}</h3></div>
//                                 <div><h3>Machine Type : {machineType}</h3></div>
//                                 <div><h3>Shedding Type : {sheddingType}</h3></div>
//                                 <div><h3>Width : {width}</h3></div>
//                                 <div><h3>RPM : {rpm}</h3></div>
//                                 <div><h3>No of Frames : {noOfFrames}</h3></div>
//                                 <div><h3>No of Feeders : {noOfFeeders}</h3></div>
//                                 <div><h3>Selvage Jacquard : {selvageJacquard}</h3></div>
//                                 <div><h3>Top Beam : {topBeam}</h3></div>
//                                 <div><h3>Cramming : {cramming}</h3></div>
//                                 <div><h3>Leno Design Equipment : {lenoDesignEquipment}</h3></div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                  )}
//             </div>

//         </>
//     )
// }
    
// export default Loom_booking;