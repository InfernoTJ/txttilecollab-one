
import React, { useState, useEffect } from 'react';
import '../../src/common/static/css/generateenquiry.css'



const UpdateGenerateEnquiry = () => {
    const [enquiryNum, setEnquiryNum] = useState('EN438');
    const [tradersName, setTradersName] = useState('Kalashree textiles ');
    const [dateFrom, setDateFrom] = useState('02-06-2024');
    const [dateTo, setDateTo] = useState('22-06-2024');
    const [fabricQuality, setFabricQuality] = useState(' 68/5 * 100 / 60 * 60:68  ');
    const [fabricLength, setFabricLenth] = useState(10000.000);

    const [agentName, setAgentName] = useState('Hujur');
    const [machineWidth, setMachineWidth] = useState(210);
    const [Rpm, setRpm] = useState(1000);

    const [numOfLooms, setNumOfLooms] = useState(10)
    const [jobRate, setjobRate] = useState(20);
    const [machineType, setMachineType] = useState('Rapier ');
    const [numoFFeeders, setNumOfFeeders] = useState(8);
    const [sheddingType, setSheddingType] = useState('CAM');
    const [frames, setFrames] = useState(10)

    const [description, setDescription] = useState('zxczcxcxzcvcvxcvcvcxvc hfsfhsdhfo asdf ;lkj asdfg ;lkjh qwert ;poiuy zxcv b,.,m  v')
    const [loomAttachments, setLoomAttachments] = useState('Selvadge Jacquard')
    const [loomNumber, setLoomNumber] = useState('L-1');
    
    const [SelvadgeJacquard,setSelvadgeJacquard]= useState('SelvadgeJacquard')

     const [Required ,setRequired]=useState('Required')
    
       

    return (

        <div style={{ borderRadius: '10px', padding: '20px', background: 'var(  --background-color)' }} className='generate_enquiry_container'>
            <div >
                <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Enquiry Details </h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr 1fr 1fr', }}>
                <div style={{ marginLeft: '40px' }} >
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <b>Enquiry No</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {enquiryNum}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Date From </b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {dateFrom}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Width</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {machineWidth}
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>No of Looms Required</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {numOfLooms}
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <b>Traders Name </b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '50%', textAlign: 'center', marginLeft: '20px' }}>
                            {tradersName}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Date To</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {dateTo}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>RPM </b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {Rpm}
                        </div>
                    </div>


                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Job Rate Offered</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {jobRate}
                        </div>
                    </div>
                </div>


                <div >
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <b>Fabric Quality</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '59%', textAlign: 'center', marginLeft: '20px' }}>
                            {fabricQuality}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Machine Type</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {machineType}
                        </div>
                    </div>


                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>No of Frames</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {frames}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Total Fabric Length</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {fabricLength}
                        </div>
                    </div>
                </div>



                <div >
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <b>Dalal/Agent Name</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {agentName}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Shedding Type</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {sheddingType}
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>No of Feeders</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '30%', textAlign: 'center', marginLeft: '20px' }}>
                            {numoFFeeders}
                        </div>
                    </div>


                    <div style={{ display: "flex", alignItems: 'center', marginTop: '20px' }}>
                        <b>Description</b>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '10px', width: '80%', textAlign: 'center', marginLeft: '20px' }}>
                            {description}
                        </div>
                    </div>

                </div>

            </div>

            <div style={{ display: 'flex', gap: '83px', marginTop: '30px' }}>
                <div style={{ width: '48%', border: "1px solid var(--primary-color)", borderRadius: '10px', height: "10vh", marginLeft: '35px', }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3 style={{ color: 'var(--primary-color)', }}> Other Loom Attachments </h3>
                    </div>

                    <div style={{display:"flex",gap:"10px"}}>
                        <b>{loomAttachments}</b>:
                          <b>{Required}</b>    
                    </div>


                </div>

                <div style={{ border: '1px solid var(--primary-color)', height: '10vh', width: '120px', borderRadius: '10px', }}>
                    img
                </div>
            </div>



            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: '20px', }} >
                <div style={{ marginTop: '13px', marginLeft: '25px' }}>
                    <label style={{ fontWeight: 'bold', margin: '10px' }}> From Date</label>
                    <input
                        style={{ width: '100%', margin: "10px", border: '1px solid var(--primary-color)' }}
                        type='date'
                    />
                </div>


                <div style={{ marginTop: '13px', marginLeft: '25px' }}>
                    <label style={{ fontWeight: 'bold', margin: '10px' }}> To Date </label>
                    <input
                        style={{ width: '100%', margin: "10px", border: '1px solid var(--primary-color)' }}
                        type='date'
                    />
                </div>

                <div style={{ marginTop: '35px', marginLeft: '15px' }}>
                    <button style={{ padding: '5px 8px' }} className='btn1'>Check Loom Availability</button>
                </div>




            </div>


            <div style={{ marginTop: '20px', marginLeft: '35px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Available Loom Numbers :</span>
                <span style={{ fontWeight: 'bold', color: 'var(--complementary-color)', marginLeft: '5px', background: "#fff", borderRadius: '5px', padding: '5px' }}>{loomNumber}, </span>

            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', gap: '40px' }}>
                <div style={{ width: '22%', marginLeft: '30px' }}>
                    <label style={{ fontWeight: 'bold' }}>Looms Possible to Assign</label>
                    <input
                        style={{ border: '1px solid var(--primary-color)' }}
                        type="text"
                        placeholder="Looms Possible to Assign"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label style={{ fontWeight: 'bold' }}>Send Counter Offer</label>
                        <div style={{ display: 'flex', alignItems: 'center', width: '330px', gap: '10px' }}>
                            <input
                                style={{ border: '1px solid var(--primary-color)', width: '95%' }}
                                type="text"
                                placeholder="Send Counter Offer"
                            />

                            <p style={{ fontWeight: 'bold', color: 'var(--secondary-color)' }} >Paisa</p>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div style={{ marginTop: '20px', marginLeft: '20px', gap: "20px", display: 'flex' }}>
                    <button className='btn2'  >Submit</button>
                    <button className='btn1'  >Not Interested</button>
                </div>
            </div>

        </div>
    )
}

export default UpdateGenerateEnquiry;





