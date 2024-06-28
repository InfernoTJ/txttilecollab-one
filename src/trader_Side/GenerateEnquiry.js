





import '../../src/common/static/css/generateenquiry.css';
import Select from 'react-select';
import React, { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenerateEnquiry = () => {


    const machineTypeOptions = [
        { value: 'Airjet', label: 'Airjet' },
        { value: 'Rapier', label: 'Rapier' },
        { value: 'Projectile', label: 'Projectile' },
        { value: 'Shuttle loom', label: 'Shuttle loom' },
        { value: 'Sampling loom', label: 'Sampling loom' }
    ];

    const sheddingTypeOptions = [
        { value: 'CAM', label: 'CAM' },
        { value: 'E-Shedding', label: 'E-Shedding' },
        { value: 'Projectile', label: 'Projectile' },
        { value: 'Full Jacquard', label: 'Full Jacquard' },
        { value: 'Sampling loom', label: 'Sampling loom' }
    ];

    const feedersOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
    ];

    const framesOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '13', label: '13' },
        { value: '14', label: '14' },
        { value: '15', label: '15' },
        { value: '16', label: '16' },
        { value: '17', label: '17' },
        { value: '18', label: '18' },
        { value: '19', label: '19' },
        { value: '20', label: '20' },
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
        { value: '29', label: '29' },
        { value: '30', label: '30' },
    ];
  
    const [dateFrom, setDateFrom] = useState('');


    const [dateTo, setDateTo]=useState('');
    const [reed,setReed]=useState('');
    const[PPI, setPPI]=useState('');
    const[wrapCount, setWrapCount]=useState('');
    const[weftCount, setWeftCount]=useState('');
    const [reedSpace,setReedSpace]=useState('');

    const [fabricLength,setFabricLenth]=useState('');
    const [deliveryDate,setDeliveryDate]=useState('');
    const[fabricWidth,setFabricWidth]= useState('');
   const[agentName,setAgentName]=useState('');
   const [machineWidth,setMachineWidth]=useState('');
   const [Rpm,setRpm]=useState('');
   const [numOFFrames,setNumOfFrames]=useState('');
   const [numOfLooms,setNumOfLooms]=useState('')
   const [jobRate,setjobRate]=useState('');
   const [machineType,setMachineType]=useState(' ');
   const [numoFFeeders,setNumOfFeeders]=useState('');
   const [sheddingType,setSheddingType]=useState('');
const [frames,setFrames]=useState('')
const [SelvadgeJacquard, setSelvedgeJacquard] = useState('false');
const [TopBeam, setTopBeam] = useState('false');
const [Cramming, setCramming] = useState('false');
const [LenoDesignEquipment, setLenoDesignEquipment] = useState('false');


          
          const handleSubmit = () => {
              // Reset all fields
              setDateFrom('');
              setDateTo('');
              setReed('')
              setPPI('')
              setWrapCount('')
              setWeftCount('')
              setReedSpace('')


              setFabricLenth('')
              setDeliveryDate('');
              setFabricWidth('');
              setAgentName('');
              setMachineWidth('');
              setRpm('');
              setNumOfFrames('');
              setNumOfLooms('');
              setjobRate('');
              setMachineType('');
              setNumOfFeeders('');
              setSheddingType('');
              setFrames('');
              setCramming(false);
              setLenoDesignEquipment(false);
              setTopBeam(false);
              setSelvedgeJacquard(false);

              toast.success('Enquiry has created Successfully');
          };

          const handlenumoFFeeders = (selectedOptions) => {
            setNumOfFeeders(selectedOptions);
        };

        const handlenumOFFrames = (selectedOptions) => {
            setNumOfFrames(selectedOptions);
        };

        const handlesheddingType = (selectedOptions) => {
            setSheddingType(selectedOptions);
        };

        const handlemachineType = (selectedOptions) => {
            setMachineType(selectedOptions);
        };
    return (
        <div style={{ borderRadius: '10px', padding: '20px', background: 'var(--background-color)' }} className='generate_enquiry_container'>
            <div>
                <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Generate Enquiry</h1>
            </div>

            <div className='generate_enquiry'>
                <div className='generate_enquiry-left'>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <div style={{ margin: '5px' }}>
                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold', margin: '10px' }}>Date From</label>
                                <input   value={dateFrom}
                                           onChange={(e) => setDateFrom(e.target.value)}
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    type='date'
                                    
                                />
                            </div>

                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold', margin: '10px' }}>Total Fabric Length</label>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                    <input  value={fabricLength} onChange={(e) => setFabricLenth(e.target.value)}
                                        style={{ width: '70%', margin: "10px", marginTop: '0px', border: '1px solid var(--primary-color)' }}
                                        type="text"
                                        placeholder="Enter Fabric Length"
                                       
                                        
                                    />
                                    <button className="btn3">meter</button>
                                </div>
                            </div>

                            <div>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold', margin: '10px', fontSize: '16px' }}>Machine Type</label>
                                </div>
                                <Select
                                    className='machine-type-select-dropdown'
                                    placeholder="Machine Type"
                                    value={machineType}
                                    onChange={handlemachineType}
                                    isSearchable
                                    options={machineTypeOptions}
                                   
                                />
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                    <label style={{ fontWeight: 'bold', margin: '10px' }}>RPM</label>
                                    <input value={Rpm} onChange={(e) =>setRpm (e.target.value)}
                                        style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                        type='text'
                                        placeholder='RPM'
                                        
                                    />
                                </div>

                        </div>

                        <div style={{ margin: '5px' }}>
                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold', margin: '10px' }}>Date To</label>
                                <input value={dateTo} onChange={(e) =>setDateTo (e.target.value)}
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    type='date'
                                
                                />
                            </div>

                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold', margin: '10px' }}>Delivery Date</label>
                                <input value={deliveryDate} onChange={(e) =>setDeliveryDate (e.target.value)}
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    type='date'
                                    
                                />
                            </div>
                 
                            <div style={{marginTop:'8px'}}>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Shedding Type</label>
                                </div>
                                <Select
                                    className='machine-type-select-dropdown'
                                    placeholder="Shedding Type"
                                    value={sheddingType}
                                    onChange={handlesheddingType}
                                    isSearchable
                                    options={sheddingTypeOptions}
                                />
                            </div>
 
                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold', margin: '10px' }}>Machine Width</label>
                                <input value={machineWidth} onChange={(e) =>setMachineWidth (e.target.value)}
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    type='text'
                                    placeholder='Machine Width in CM'
                                  
                                />
                            </div> 

                        </div>
                    </div>

                    <div><h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Other Loom Attachments</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', border: '1px solid var(--primary-color)', margin: '10px', padding: '20px', borderRadius: '10px', marginTop: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 'bold' }}>Selvadge Jacquard</div>
                            <div style={{ fontWeight: 'bold' }}>LenoDesignEquipment</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                <div><input style={{ width: '20px' }} checked={SelvadgeJacquard}  type='checkbox' value={SelvadgeJacquard} onChange={(e)=> setSelvedgeJacquard(e.target.value)}/></div>
                                <div>Required</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                <div><input style={{ width: '20px' }}checked={LenoDesignEquipment} value={LenoDesignEquipment} onChange={(e)=> setLenoDesignEquipment(e.target.value)} type='checkbox' /></div>
                                <div>Required</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 'bold' }}>Top Beam</div>
                            <div style={{ fontWeight: 'bold' }}>Cramming</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                <div><input checked={TopBeam} value={TopBeam} onChange={(e)=> setTopBeam(e.target.value)} style={{ width: '20px' }} type='checkbox' /></div>
                                <div>Required</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                <div><input checked={Cramming} value={Cramming} onChange={(e)=> setCramming(e.target.value)} style={{ width: '20px' }} type='checkbox' /></div>
                                <div>Required</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='generate_enquiry-right'>
                    <div style={{marginTop:'18px'}} >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: '13px' }}>
                            <label style={{ fontWeight: 'bold', marginLeft: '10px' }}>Fabric Quality</label>
                            <div style={{ display: 'flex', marginTop: '0', alignItems: 'center' }}>
                                <input value={reed} onChange={(e) =>setReed (e.target.value)} style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='Reed'  />
                                <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>*</div>
                                <input value={PPI} onChange={(e) =>setPPI (e.target.value)}  style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='PPI' />
                                <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>/</div>
                                <input value={wrapCount} onChange={(e) =>setWrapCount (e.target.value)} style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='warp count' />
                                <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>*</div>
                                <input value={weftCount} onChange={(e) =>setWeftCount (e.target.value)} style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='weft count' />
                                <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>:</div>
                                <input value={reedSpace} onChange={(e) =>setReedSpace (e.target.value)}style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='reed space' />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '60vh' }}>
                            <div>
                                <div style={{ marginTop: '18px' }}>
                                    <label style={{ fontWeight: 'bold', margin: '10px' }}>Fabric Width</label>
                                    <input value={fabricWidth} onChange={(e) =>setFabricWidth (e.target.value)}
                                        style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                        type='text'
                                        placeholder='Fabric Width'
                                        
                                    />
                                </div>
                   
                                <div style={{marginTop:'15px'}}>
                                    <div className='Frames-label-container'>
                                        <label style={{ fontWeight: 'bold', fontSize: '16px' }}>No of Frames</label>
                                    </div>
                                    <Select
                                        className='select-dropdown'
                                        placeholder="No of Frames"
                                        value={numOFFrames}
                                        onChange={handlenumOFFrames}
                                      
                                        isSearchable
                                        options={framesOptions}

                                    />
                                </div>
                                <div style={{ marginTop: '13px' }}>
                                    <label style={{ fontWeight: 'bold', margin: '10px' }}>No of Looms Required</label>
                                    <input value={numOfLooms} onChange={(e) =>setNumOfLooms(e.target.value)}
                                        style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                        type='text'
                                        placeholder='No of Looms Required'
                                       
                                    />
                                </div>

                                <div style={{ marginTop: '13px' }}>
                                    <label style={{ fontWeight: 'bold', margin: '10px' }}>Description Details</label>
                                    <textarea
                                        style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', resize: 'vertical', borderRadius: '10px' }}
                                        placeholder='Description of fabric'
                                      
                                    />
                                </div>
                            </div>
                            <div>
                                <div style={{ marginTop: '18px' }}>
                                    <label style={{ fontWeight: 'bold', margin: '10px' }}>Dalal/Agent Name</label>
                                    <input value={agentName} onChange={(e) =>setAgentName (e.target.value)}
                                        style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                        type='text'
                                        placeholder='Dalal/Agent Name'
                                    
                                    />
                                </div>

                                <div style={{ marginTop: '13px' }}>
                                    <div className='label-container'>
                                        <label style={{ fontWeight: 'bold', margin: '10px', fontSize: '16px' }}>No. of Feeders</label>
                                    </div>
                                    <Select
                                        className='machine-type-select-dropdown'
                                        placeholder="No. of Feeders"
                                        value={numoFFeeders}
                                        onChange={handlenumoFFeeders}
                                        isSearchable
                                        options={feedersOptions}
                                    />
                                </div>


                              

                                <div style={{ marginTop: '13px' }}>
                                    <label style={{ fontWeight: 'bold', margin: '10px' }}>Job Rate Offered</label>
                                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                        <input value={jobRate} onChange={(e) =>setjobRate (e.target.value)}
                                            style={{ width: '80%', margin: "10px", marginTop: '0px', border: '2px solid var(--primary-color)' }}
                                            type="text"
                                            placeholder="Job Rate Offered"
                                            
                                        />
                                        <button className="btn3">Paisa</button>
                                    </div>
                                </div> 

                                <div>Design Paper(Optional)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={handleSubmit} style={{ width: '10%' }} className='btn2'>Submit</button>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default GenerateEnquiry;
















// import '../../src/common/static/css/generateenquiry.css';
// import Select from 'react-select';
// import React, { useState} from 'react'
// const GenerateEnquiry = () => {


//     const machineTypeOptions = [
//         { value: 'Airjet', label: 'Airjet' },
//         { value: 'Rapier', label: 'Rapier' },
//         { value: 'Projectile', label: 'Projectile' },
//         { value: 'Shuttle loom', label: 'Shuttle loom' },
//         { value: 'Sampling loom', label: 'Sampling loom' }
//     ];

//     const sheddingTypeOptions = [
//         { value: 'CAM', label: 'CAM' },
//         { value: 'E-Shedding', label: 'E-Shedding' },
//         { value: 'Projectile', label: 'Projectile' },
//         { value: 'Full Jacquard', label: 'Full Jacquard' },
//         { value: 'Sampling loom', label: 'Sampling loom' }
//     ];

//     const feedersOptions = [
//         { value: '1', label: '1' },
//         { value: '2', label: '2' },
//         { value: '3', label: '3' },
//         { value: '4', label: '4' },
//         { value: '5', label: '5' },
//         { value: '6', label: '6' },
//         { value: '7', label: '7' },
//         { value: '8', label: '8' },
//     ];

//     const framesOptions = [
//         { value: '1', label: '1' },
//         { value: '2', label: '2' },
//         { value: '3', label: '3' },
//         { value: '4', label: '4' },
//         { value: '5', label: '5' },
//         { value: '6', label: '6' },
//         { value: '7', label: '7' },
//         { value: '8', label: '8' },
//         { value: '9', label: '9' },
//         { value: '10', label: '10' },
//         { value: '11', label: '11' },
//         { value: '12', label: '12' },
//         { value: '13', label: '13' },
//         { value: '14', label: '14' },
//         { value: '15', label: '15' },
//         { value: '16', label: '16' },
//         { value: '17', label: '17' },
//         { value: '18', label: '18' },
//         { value: '19', label: '19' },
//         { value: '20', label: '20' },
//         { value: '21', label: '21' },
//         { value: '22', label: '22' },
//         { value: '23', label: '23' },
//         { value: '24', label: '24' },
//         { value: '25', label: '25' },
//         { value: '26', label: '26' },
//         { value: '27', label: '27' },
//         { value: '28', label: '28' },
//         { value: '29', label: '29' },
//         { value: '30', label: '30' },
//     ];
  
//     const [dateFrom, setDateFrom] = useState(false);


//     const [dateTo, setDateTo]=useState(false);
//     const [fabricQuality,setFabricQuality]=useState(false);
//     const [fabricLength,setFabricLenth]=useState(false);
//     const [deliveryDate,setDeliveryDate]=useState(false);
//     const[fabricWidth,setFabricWidth]= useState(false);
//    const[agentName,setAgentName]=useState(false);
//    const [machineWidth,setMachineWidth]=useState(false);
//    const [Rpm,setRpm]=useState(false);
//    const [numOFFrames,setNumOfFrames]=useState(false);
//    const [numOfLooms,setNumOfLooms]=useState(false)
//    const [jobRate,setjobRate]=useState(false);
//    const [machineType,setMachineType]=useState(' ');
//    const [numoFFeeders,setNumOfFeeders]=useState(false);
//    const [sheddingType,setSheddingType]=useState('');
//           const [frames,setFrames]=useState(false)

//     return (
//         <div style={{ borderRadius: '10px', padding: '20px', background: 'var(--background-color)' }} className='generate_enquiry_container'>
//             <div>
//                 <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Generate Enquiry</h1>
//             </div>

//             <div className='generate_enquiry'>
//                 <div className='generate_enquiry-left'>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
//                         <div style={{ margin: '5px' }}>
//                             <div style={{ marginTop: '13px' }}>
//                                 <label style={{ fontWeight: 'bold', margin: '10px' }}>Date From</label>
//                                 <input   value={dateFrom}
//                                            onChange={(e) => setDateFrom(e.target.value)}
//                                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                     type='date'
                                    
//                                 />
//                             </div>

//                             <div style={{ marginTop: '13px' }}>
//                                 <label style={{ fontWeight: 'bold', margin: '10px' }}>Total Fabric Length</label>
//                                 <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
//                                     <input value={dateTo} onChange={(e) =>setDateTo (e.target.value)}
//                                         style={{ width: '70%', margin: "10px", marginTop: '0px', border: '1px solid var(--primary-color)' }}
//                                         type="text"
//                                         placeholder="Enter Fabric Length"
                                       
                                        
//                                     />
//                                     <button className="btn3">meter</button>
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className='label-container'>
//                                     <label style={{ fontWeight: 'bold', margin: '10px', fontSize: '16px' }}>Machine Type</label>
//                                 </div>
//                                 <Select
//                                     className='machine-type-select-dropdown'
//                                     placeholder="Machine Type"
//                                     value={machineType}
//                                     onChange={(e) =>setMachineType (e.target.value)}
//                                     isSearchable
//                                     options={machineTypeOptions}
                                   
//                                 />
//                             </div>

//                             <div style={{ marginTop: '13px' }}>
//                                 <div className='label-container'>
//                                     <label style={{ fontWeight: 'bold', margin: '10px', fontSize: '16px' }}>No. of Feeders</label>
//                                 </div>
//                                 <Select
//                                     className='machine-type-select-dropdown'
//                                     placeholder="No. of Feeders"
//                              value={numoFFeeders}
//                              onChange={(e) =>setNumOfFeeders (e.target.value)}
//                                     isSearchable
//                                     options={feedersOptions}
                                    
//                                 />
//                             </div>
//                         </div>

//                         <div style={{ margin: '5px' }}>
//                             <div style={{ marginTop: '13px' }}>
//                                 <label style={{ fontWeight: 'bold', margin: '10px' }}>Date To</label>
//                                 <input value={dateTo} onChange={(e) =>setDateTo (e.target.value)}
//                                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                     type='date'
                                
//                                 />
//                             </div>

//                             <div style={{ marginTop: '13px' }}>
//                                 <label style={{ fontWeight: 'bold', margin: '10px' }}>Delivery Date</label>
//                                 <input value={deliveryDate} onChange={(e) =>setDeliveryDate (e.target.value)}
//                                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                     type='date'
                                    
//                                 />
//                             </div>

//                             <div style={{ marginTop: '13px' }}>
//                                 <label style={{ fontWeight: 'bold', margin: '10px' }}>Machine Width</label>
//                                 <input value={machineWidth} onChange={(e) =>setMachineWidth (e.target.value)}
//                                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                     type='text'
//                                     placeholder='Machine Width in CM'
                                  
//                                 />
//                             </div>

//                             <div>
//                                 <div className='Frames-label-container'>
//                                     <label style={{ fontWeight: 'bold', margin: '10px', fontSize: '16px' }}>No of Frames</label>
//                                 </div>
//                                 <Select
//                                     className='select-dropdown'
//                                     placeholder="No of Frames"
//                                      value={frames}
//                                      onChange={(e) =>setFrames (e.target.value)}
//                                     isSearchable
//                                     options={framesOptions}
                                    
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div><h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Other Loom Attachments</h3></div>
//                     <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', border: '1px solid var(--primary-color)', margin: '10px', padding: '20px', borderRadius: '10px', marginTop: '30px' }}>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
//                             <div style={{ fontWeight: 'bold' }}>Selvadge Jacquard</div>
//                             <div style={{ fontWeight: 'bold' }}>LenoDesignEquipment</div>
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
//                             <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                                 <div><input style={{ width: '20px' }} type='checkbox' /></div>
//                                 <div>Required</div>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                                 <div><input style={{ width: '20px' }} type='checkbox' /></div>
//                                 <div>Required</div>
//                             </div>
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
//                             <div style={{ fontWeight: 'bold' }}>Top Beam</div>
//                             <div style={{ fontWeight: 'bold' }}>Cramming</div>
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
//                             <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                                 <div><input style={{ width: '20px' }} type='checkbox' /></div>
//                                 <div>Required</div>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
//                                 <div><input style={{ width: '20px' }} type='checkbox' /></div>
//                                 <div>Required</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='generate_enquiry-right'>
//                     <div>
//                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: '13px' }}>
//                             <label style={{ fontWeight: 'bold', marginLeft: '10px' }}>Fabric Quality</label>
//                             <div style={{ display: 'flex', marginTop: '0', alignItems: 'center' }}>
//                                 <input style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='Reed'  />
//                                 <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>*</div>
//                                 <input style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='PPI' />
//                                 <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>/</div>
//                                 <input style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='warp count' />
//                                 <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>*</div>
//                                 <input style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='weft count' />
//                                 <div style={{ margin: "0 5px", fontWeight: 'bold',fontSize:"18px" }}>:</div>
//                                 <input style={{ width: '100%', margin: '8px', border: '1px solid var(--primary-color)' }} type="text" placeholder='reed space' />
//                             </div>
//                         </div>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '60vh' }}>
//                             <div>
//                                 <div style={{ marginTop: '12px' }}>
//                                     <label style={{ fontWeight: 'bold', margin: '10px' }}>Fabric Width</label>
//                                     <input value={fabricWidth} onChange={(e) =>setFabricWidth (e.target.value)}
//                                         style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                         type='text'
//                                         placeholder='Fabric Width'
                                        
//                                     />
//                                 </div>

//                                 <div style={{ marginTop: '16px' }}>
//                                     <label style={{ fontWeight: 'bold', margin: '10px' }}>RPM</label>
//                                     <input value={Rpm} onChange={(e) =>setRpm (e.target.value)}
//                                         style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                         type='text'
//                                         placeholder='RPM'
                                        
//                                     />
//                                 </div>

//                                 <div style={{ marginTop: '0px' }}>
//                                     <label style={{ fontWeight: 'bold', margin: '10px' }}>No of Looms Required</label>
//                                     <input value={numOfLooms} onChange={(e) =>setNumOfLooms(e.target.value)}
//                                         style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                         type='text'
//                                         placeholder='No of Looms Required'
                                       
//                                     />
//                                 </div>

//                                 <div style={{ marginTop: '13px' }}>
//                                     <label style={{ fontWeight: 'bold', margin: '10px' }}>Description Details</label>
//                                     <textarea
//                                         style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', resize: 'vertical', borderRadius: '10px' }}
//                                         placeholder='Description of fabric'
                                      
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <div style={{ marginTop: '12px' }}>
//                                     <label style={{ fontWeight: 'bold', margin: '10px' }}>Dalal/Agent Name</label>
//                                     <input value={agentName} onChange={(e) =>setAgentName (e.target.value)}
//                                         style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                                         type='text'
//                                         placeholder='Dalal/Agent Name'
                                    
//                                     />
//                                 </div>

//                                 <div style={{ marginTop: '13px' }}>
//                                     <div className='label-container'>
//                                         <label style={{ fontWeight: 'bold', margin: '10px', fontSize: '16px' }}>Shedding Type</label>
//                                     </div>
//                                     <Select
//                                         className='add-jobs-select-dropdown'
//                                         placeholder="Shedding Type"
//                                          value={sheddingType} onChange={(e) =>setSheddingType (e.target.value)}
//                                         isSearchable
//                                         options={sheddingTypeOptions}
                                       
//                                     />
//                                 </div>

//                                 <div style={{ marginTop: '8px' }}>
//                                     <label style={{ fontWeight: 'bold', margin: '10px' }}>Job Rate Offered</label>
//                                     <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
//                                         <input value={jobRate} onChange={(e) =>setjobRate (e.target.value)}
//                                             style={{ width: '80%', margin: "10px", marginTop: '0px', border: '2px solid var(--primary-color)' }}
//                                             type="text"
//                                             placeholder="Job Rate Offered"
                                            
//                                         />
//                                         <button className="btn3">Paisa</button>
//                                     </div>
//                                 </div>

//                                 <div>Design Paper(Optional)</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <button style={{ width: '10%' }} className='btn2'>Submit</button>
//             </div>
//         </div>
//     );
// };

// export default GenerateEnquiry;