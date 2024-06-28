
import React, { useState } from "react";
import Select from "react-select";
import '../common/static/css/loomdetails.css';

const LoomDetails = () => {
 
    const [loomNumber, setLoomNumber] = useState('');
    const [rpm, setRpm] = useState('');
    const [machineType, setMachineType] = useState(null);
    const [numFeeders, setNumFeeders] = useState(null);
    const [sheddingType, setSheddingType] = useState(null);
    const [numFrames, setNumFrames] = useState(null);
    const [width, setWidth] = useState('');
    const [numLooms, setNumLooms] = useState('');
    const [attachments, setAttachments] = useState({
        selvadgeJacquard: false,
        lenoDesignEquipment: false,
        topBeam: false,
        cramming: false,
    });

 
    const handleSubmit = () => {
        setLoomNumber('');
        setRpm('');
        setMachineType(null);
        setNumFeeders(null);
        setSheddingType(null);
        setNumFrames(null);
        setWidth('');
        setNumLooms('');
        setAttachments({
            selvadgeJacquard: false,
            lenoDesignEquipment: false,
            topBeam: false,
            cramming: false,
        });
    };

    return (
        <div className='loom_details-container'>
            <div style={{ borderRadius: '10px', padding: '20px', marginTop: '30px', background: 'var(--background-color)' }} className='loom_details'>
                <div>
                    <h1 style={{ color: 'var(--primary-color)', margin: '30px' }}>Loom Details</h1>
                </div>
                <div style={{ padding: '10px', }} className='loom-detail-form' >
                    <div className='loomform-container'>
                        <div style={{ padding: '10px', }}>
                            <label style={{ fontWeight: 'bold' }} >Loom Number</label>
                            <input
                                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '20px' }}
                                placeholder='Enter Loom Number'
                                type='text'
                                value={loomNumber}
                                onChange={(e) => setLoomNumber(e.target.value)}
                            />

                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold' }}>RPM</label>
                                <input
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    placeholder='Enter RPM'
                                    type='text'
                                    value={rpm}
                                    onChange={(e) => setRpm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ marginTop: '14px' }}>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>Machine Type</label>
                                </div>
                                <Select
                                    className='MachineType-select-dropdown'
                                    placeholder="Enter Machine Type"
                                    isSearchable
                                    value={machineType}
                                    onChange={(selectedOption) => setMachineType(selectedOption)}
                                />
                            </div>

                            <div>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>No of Feeders</label>
                                </div>
                                <Select
                                    className='select-dropdown'
                                    placeholder="No of Feeders"
                                    isSearchable
                                    value={numFeeders}
                                    onChange={(selectedOption) => setNumFeeders(selectedOption)}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ marginTop: '14px' }}>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>Shedding Type</label>
                                </div>
                                <Select
                                    className='MachineType-select-dropdown'
                                    placeholder="Shedding Type"
                                    isSearchable
                                    value={sheddingType}
                                    onChange={(selectedOption) => setSheddingType(selectedOption)}
                                />
                            </div>

                            <div>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>No of Frames </label>
                                </div>
                                <Select
                                    className='select-dropdown'
                                    placeholder="No of Frames"
                                    isSearchable
                                    value={numFrames}
                                    onChange={(selectedOption) => setNumFrames(selectedOption)}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <label style={{ fontWeight: 'bold' }}>Width</label>
                            <input
                                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '13px' }}
                                placeholder='Enter Width'
                                type='text'
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />

                            <div style={{ marginTop: '20px' }}>
                                <label style={{ fontWeight: 'bold' }}>No of Looms</label>
                                <input
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    placeholder='Enter No of Looms'
                                    type='text'
                                    value={numLooms}
                                    onChange={(e) => setNumLooms(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '65%', marginBottom: '3%', marginLeft: '2%', marginTop: '2%' }}>
                        <div>
                            <h3 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Other Loom Attachments </h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', border: '1px solid var(--primary-color)', padding: '40px', borderRadius: '10px', marginTop: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '20px' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    Selvadge Jacquard
                                </div>
                                <div style={{ fontWeight: 'bold' }}>
                                    LenoDesignEquipment
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'center', }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                    <div><input
                                        style={{ width: '20px' }}
                                        type='checkbox'
                                        checked={attachments.selvadgeJacquard}
                                        onChange={() => setAttachments({ ...attachments, selvadgeJacquard: !attachments.selvadgeJacquard })}
                                    /></div>
                                    <div>Available</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                    <div><input
                                        style={{ width: '20px' }}
                                        type='checkbox'
                                        checked={attachments.lenoDesignEquipment}
                                        onChange={() => setAttachments({ ...attachments, lenoDesignEquipment: !attachments.lenoDesignEquipment })}
                                    /></div>
                                    <div>Available</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '10%' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    Top Beam
                                </div>
                                <div style={{ fontWeight: 'bold' }}>
                                    Cramming
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                    <div><input
                                        style={{ width: '20px' }}
                                        type='checkbox'
                                        checked={attachments.topBeam}
                                        onChange={() => setAttachments({ ...attachments, topBeam: !attachments.topBeam })}
                                    /></div>
                                    <div>Available</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                    <div><input
                                        style={{ width: '20px' }}
                                        type='checkbox'
                                        checked={attachments.cramming}
                                        onChange={() => setAttachments({ ...attachments, cramming: !attachments.cramming })}
                                    /></div>
                                    <div>Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button style={{ width: '10%', fontSize: 18 }} className='btn2' onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoomDetails;





