import React, { useState } from 'react';
import '../common/static/css/myenquiries.css'
const MyEnquiries = () => {

    const enquiries = [
        {
            id: 1, number: 'EN428', date: '2024-06-06', BookingFrom: '2024-06-06', BookingTo: '2024-06-21', FabricQuality: '64/5*98/50*50:68', FabricLength: '500000.000', LoomRequired: 50, AgentName: 'Kedar',
            MachineType: 'Airjet', SheddingType: 'CAM', Width: '210.000', RPM: '1200.00', NoOfFrames: '5', NoOfFeeders: '3', SelvedgeJacquard: 'Required'
        },
        { id: 2, number: 'EN429', date: '2024-06-07' },
        { id: 3, number: 'EN430', date: '2024-06-08' },
      ];

      const [enquiryoverlayVisible, setEnquiryOverlayVisible] = useState(false);
      const [selectedEnquiry, setSelectedEnquiry] = useState(null);

      const handleCardClick = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setEnquiryOverlayVisible(true);
      };
    
      const closeOverlay = () => {
        setEnquiryOverlayVisible(false);
        setSelectedEnquiry(null);
      };
    
  return (
    <div className='profile-my_enquiries'>
    <div>
        <h2 style={{ color: 'var(--primary-color)',textAlign:'center' }}>List of My Enquiries</h2>
    </div>
    <div className='my_enquiries-container' style={{ height: '80vh', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(5,1fr)', gap: '20px'}}>
    {enquiries.map((enquiry) => (
        <div  className='my_enquiries-card'onClick={() => handleCardClick(enquiry)}>
        {enquiry.id}
        <p>Enquiry: {enquiry.number}</p> 
            

        </div>
          ))}
        <div className='my_enquiries-card' >2</div>
        <div className='my_enquiries-card' >3</div>
        <div className='my_enquiries-card' >4</div>
        <div className='my_enquiries-card' >5</div>
        <div className='my_enquiries-card' >6</div>
        <div className='my_enquiries-card' >7</div>
        <div className='my_enquiries-card' >8</div>
        <div className='my_enquiries-card' >9</div>
     
     
 

    </div>

    {enquiryoverlayVisible && selectedEnquiry && (
        <div className='myenquiryoverlay'>
          <div className='myenquiryoverlay-container'>
            <h3>Enquiry Details</h3>
            <hr/>
            <p><b>Enquiry Number:  </b>{selectedEnquiry.number}</p>
            <p> <b>Enquiry Date:</b> {selectedEnquiry.date}</p>
            <p> <b>Booking From:</b> {selectedEnquiry.BookingFrom}</p>
            <p><b>Booking To:</b> {selectedEnquiry.BookingTo}</p>

            <p><b>Fabric Quality: </b>{selectedEnquiry.FabricQuality}</p>
            <p> <b>Fabric Length:</b> {selectedEnquiry.FabricLength}</p>
            <p> <b>Loom Required:</b> {selectedEnquiry.LoomRequired}</p>
            <p><b>Agent Name:</b> {selectedEnquiry.AgentName}</p>
            <p><b>Machine Type:  </b>{selectedEnquiry.MachineType}</p>
            <p> <b>Shedding Type:</b> {selectedEnquiry.SheddingType}</p>
            <p> <b>Width:</b> {selectedEnquiry.Width}</p>
            <p><b>RPM:</b> {selectedEnquiry.RPM}</p>
            <p><b>No of Frames:</b> {selectedEnquiry.NoOfFrames}</p>
            <p><b>No of Feeders::  </b>{selectedEnquiry.NoOfFeeders}</p>
            <p> <b>Selvedge Jacquard:</b> {selectedEnquiry.SelvedgeJacquard}</p>
           
            <button className='btn2' onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
</div>
  )
}

export default MyEnquiries



