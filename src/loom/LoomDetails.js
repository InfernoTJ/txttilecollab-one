
import React, { useEffect, useState } from "react";
import Select from "react-select";
import '../common/static/css/loomdetails.css';
import { toast } from "react-toastify";

const LoomDetails = () => {
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

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

    const [machineTypeoption, setMachineTypeoption] = useState(null);
    const [shreddingtypeoptions, setshreddingtypeoptions] = useState(null);
    const [nooffeedersoptions, setnooffeedersoptions] = useState(null);
    const [noofframesoptions, setnoofframesoptions] = useState(null);


    const today = new Date();

    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + 6);

    // Handle year change if necessary
    if (futureDate.getMonth() !== (today.getMonth() + 6) % 12) {
        futureDate.setDate(0); // Set date to the last day of the previous month
    }

    // Format date to yyyy-mm-dd
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Format today and future dates
    const formattedToday = formatDate(today);
    const formattedFutureDate = formatDate(futureDate);

    const handleSubmit = async() => {
        
       if(!loomNumber || !machineType || !width ||
        !rpm||
        !sheddingType||
        !numFrames||
        !numFeeders||
        !numLooms )
       {
        toast.error('Fill * Fields') 
        return;
       }
        const formdata = new FormData();
        formdata.append("LoomTraderId", user.Id);
        formdata.append("LoomNo", loomNumber);
        formdata.append("MachineType", machineType.value);
        formdata.append("Width", width);
        formdata.append("RPM", rpm);
        formdata.append("SheddingType", sheddingType.value);
        formdata.append("NoofFrames", numFrames.value);
        formdata.append("NoofFeeders", numFeeders.value);
        formdata.append("SelvageJacquard", attachments.selvadgeJacquard);
        formdata.append("TopBeam", attachments.topBeam);
        formdata.append("Cramming", attachments.cramming);
        formdata.append("LenoDesignEquipment", attachments.lenoDesignEquipment);
        formdata.append("Available", true);
        formdata.append("LoomAvailableFrom", formattedToday);
        formdata.append("LoomAvailableTo", formattedFutureDate);
        formdata.append("NoOfLooms", numLooms);

        try {
            // console.log("Data = ", user.Id, loomNumber, machineType.value, width, rpm, sheddingType.value, numFrames.value, numFeeders.value, attachments.selvadgeJacquard, attachments.topBeam, attachments.cramming, attachments.lenoDesignEquipment, formattedToday, formattedFutureDate, numLooms)
            const response = await fetch("https://textileapp.microtechsolutions.co.in/php/postloomdetail.php", {
                method: "POST",
                body: formdata,
                redirect: "follow"
            })



            if (!response.ok) {

                toast.error("Error While Sending Data")
            }
            if (response.ok) {



                toast.success('Loom Created')


            }
        } catch (error) {
            alert(user.Id)
            toast.error('Error While Sending Data')
        }

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
    const fetchMachineTypes = async () => {
        try {
            const response = await fetch('https://textileapp.microtechsolutions.co.in/php/gettable.php?table=MachineType');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const options = data.map((item) => ({
                value: item.Name, // Use a unique identifier if available, otherwise use Name as value
                label: item.Name // Use the "Name" field for the label
            }));
            setMachineType(options.value)
            setMachineTypeoption(options);

        } catch (error) {
            toast.error(error)
        }
    };
    const fetchshreddingTypes = async () => {
        try {
            const response = await fetch('https://textileapp.microtechsolutions.co.in/php/gettable.php?table=SheddingType');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const options = data.map((item) => ({
                value: item.Name, // Use a unique identifier if available, otherwise use Name as value
                label: item.Name // Use the "Name" field for the label
            }));
            setSheddingType(options.value)
            setshreddingtypeoptions(options);

        } catch (error) {
            toast.error(error)
        }
    };
    const fetchnooffeederTypes = async () => {
        try {
            const response = await fetch('https://textileapp.microtechsolutions.co.in/php/gettable.php?table=NoOfFeeders');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const options = data.map((item) => ({
                value: item.Range, // Use a unique identifier if available, otherwise use Name as value
                label: item.Range // Use the "Name" field for the label
            }));
            setNumFeeders(options.value)
            setnooffeedersoptions(options);

        } catch (error) {
            toast.error(error)
        }
    };
    const fetchnoofframesTypes = async () => {
        try {
            const response = await fetch('https://textileapp.microtechsolutions.co.in/php/gettable.php?table=NoOfFrame');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const options = data.map((item) => ({
                value: item.Range, // Use a unique identifier if available, otherwise use Name as value
                label: item.Range // Use the "Name" field for the label
            }));
            setNumFrames(options.value)
            setnoofframesoptions(options);

        } catch (error) {
            toast.error(error)
        }
    };
    useEffect(() => {

        fetchMachineTypes();
        fetchshreddingTypes();
        fetchnooffeederTypes();
        fetchnoofframesTypes();
    }, []);

    return (
        <div className='loom_details-container'>
            <div style={{ borderRadius: '10px',backgroundColor:'var(--background-color)' }} className='loom_details'>
                <div>
                    <h1 style={{ color: 'var(--primary-color)', margin: '30px' }}>Loom Details</h1>
                </div>
                <div style={{ padding: '10px', }} className='loom-detail-form' >
                    <div className='loomform-container'>
                        <div style={{ padding: '10px', }}>
                            <label style={{ fontWeight: 'bold' }} >Loom Number <span style={{ color: "red" }}>*</span></label>
                            <input
                                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '20px' }}
                                placeholder='Enter Loom Number'
                                type='text'
                                value={loomNumber}
                                onChange={(e) => setLoomNumber(e.target.value)}
                            />

                            <div style={{ marginTop: '13px' }}>
                                <label style={{ fontWeight: 'bold' }}>RPM <span style={{ color: "red" }}>*</span></label>
                                <input
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    placeholder='Enter RPM'
                                    type='number'
                                    value={rpm}
                                    onChange={(e) => setRpm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ marginTop: '14px' }}>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>Machine Type <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <Select
                                    className='MachineType-select-dropdown'
                                    placeholder="Enter Machine Type"
                                    isSearchable
                                    value={machineType}
                                    onChange={(selectedOption) => setMachineType(selectedOption)}
                                    options={machineTypeoption}
                                />
                            </div>

                            <div>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>No of Feeders <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <Select
                                    className='select-dropdown'
                                    placeholder="No of Feeders"
                                    isSearchable
                                    value={numFeeders}
                                    onChange={(selectedOption) => setNumFeeders(selectedOption)} options={nooffeedersoptions}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ marginTop: '14px' }}>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>Shedding Type <span style={{ color: "red" }}>*</span></label>
                                </div>
                                <Select
                                    className='MachineType-select-dropdown'
                                    placeholder="Shedding Type"
                                    isSearchable
                                    value={sheddingType}
                                    onChange={(selectedOption) => setSheddingType(selectedOption)}
                                    options={shreddingtypeoptions}
                                />
                            </div>

                            <div>
                                <div className='label-container'>
                                    <label style={{ fontWeight: 'bold' }}>No of Frames <span style={{ color: "red" }}>*</span> </label>
                                </div>
                                <Select
                                    className='select-dropdown'
                                    placeholder="No of Frames"
                                    isSearchable
                                    value={numFrames}
                                    onChange={(selectedOption) => setNumFrames(selectedOption)}
                                    options={noofframesoptions}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <label style={{ fontWeight: 'bold' }}>Width <span style={{ color: "red" }}>*</span></label>
                            <input
                                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)', marginTop: '13px' }}
                                placeholder='Enter Width'
                                type='number'
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />

                            <div style={{ marginTop: '20px' }}>
                                <label style={{ fontWeight: 'bold' }}>No of Looms <span style={{ color: "red" }}>*</span></label>
                                <input
                                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                                    placeholder='Enter No of Looms'
                                    type='number'
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

                        <div className="loomattachments" style={{ display: 'flex', gap: '30px',   borderRadius: '10px', marginTop: '30px',}}>
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
                            <div className="available-attachments" style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                <div  style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                    <div><input
                                        style={{ width: '20px' }}
                                        type='checkbox'
                                        checked={attachments.topBeam}
                                        onChange={() => setAttachments({ ...attachments, topBeam: !attachments.topBeam })}
                                    /></div>
                                    <div>Available</div>
                                </div>
                                <div  style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
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

                    <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button style={{  fontSize: 18 }} className='btn2' onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoomDetails;





