
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useState } from "react";
import '../common/static/css/Liveorder.css'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const [tableRows, setTableRows] = React.useState([]);
    const [orderno, setOrderno] = useState("OR123");
    const [dateto, setDateto] = useState("12-06-2024");
    const [party, setParty] = useState("ABC company");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const beamaddrow = () => {
        setTableRows([...tableRows, { date: '', tippanNumber: '' }]);
    };

    const beamdate = (index, date) => {
        const updatedRows = [...tableRows];
        updatedRows[index].date = date;
        setTableRows(updatedRows);
    };

    const beamtippan = (index, tippanNumber) => {
        const updatedRows = [...tableRows];
        updatedRows[index].tippanNumber = tippanNumber;
        setTableRows(updatedRows);
    };

    const beamrowdel = (index) => {
        const updatedRows = tableRows.filter((_, i) => i !== index);
        setTableRows(updatedRows);
    };


    const beamphoto = (index, photo) => {
        const updatedRows = [...tableRows];
        updatedRows[index].photo = photo;
        setTableRows(updatedRows);
    };
    const [weftRow, setWeftRow] = React.useState([]);

    const weftaddrow = () => {
        setWeftRow([...weftRow, { date: '', gatepassno: '', photo: '' }]);
    };

    const weftdate = (index, date) => {
        const updatedRows = [...weftRow];
        updatedRows[index].date = date;
        setWeftRow(updatedRows);
    };

    const weftgatepass = (index, gatepassno) => {
        const updatedRows = [...weftRow];
        updatedRows[index].gatepassno = gatepassno;
        setWeftRow(updatedRows);
    };

    const weftphoto = (index, photo) => {
        const updatedRows = [...weftRow];
        updatedRows[index].photo = photo;
        setWeftRow(updatedRows);
    };

    const weftrowdel = (index) => {
        const updatedRows = weftRow.filter((_, i) => i !== index);
        setWeftRow(updatedRows);
    };


    const [fabricRow, setFabricRow] = React.useState([]);


    const fabricaddrow = () => {
        setFabricRow([...fabricRow, { date: '', gatepassno: '', photopath: '', meter: '', weight: '', }]);
    };

    const fabricdate = (index, date) => {
        const updatedRows = [...fabricRow];
        updatedRows[index].date = date;
        setFabricRow(updatedRows);
    };

    const fabricgatepass = (index, gatepassno) => {
        const updatedRows = [...fabricRow];
        updatedRows[index].gatepassno = gatepassno;
        setFabricRow(updatedRows);
    };

    const fabricmeter = (index, meter) => {
        const updatedRows = [...fabricRow];
        updatedRows[index].meter = meter;
        setFabricRow(updatedRows);
    };

    const fabricweight = (index, weight) => {
        const updatedRows = [...fabricRow];
        updatedRows[index].weight = weight;
        setFabricRow(updatedRows);
    };

    const fabricphoto = (index, photo) => {
        const updatedRows = [...fabricRow];
        updatedRows[index].photo = photo;
        setFabricRow(updatedRows);
    };


    const fabricrowdel = (index) => {
        const updatedRows = fabricRow.filter((_, i) => i !== index);
        setFabricRow(updatedRows);
    };


    const [returnRow, setReturnRow] = React.useState([]);

    const returnaddrow = () => {
        setReturnRow([...returnRow, { date: '', gatepassno: '', photopath: '', meter: '', cutpiece: '', weigth: '', yarncount: '', gpno: '' }]);
    };

    const returngpno = (index, gpno) => {
        const updatedRows = [...returnRow];
        updatedRows[index].gpno = gpno;
        setReturnRow(updatedRows);
    };

    const returnyarncount = (index, yarncount) => {
        const updatedRows = [...returnRow];
        updatedRows[index].yarncount = yarncount;
        setReturnRow(updatedRows);
    };

    const returnweight = (index, weigth) => {
        const updatedRows = [...returnRow];
        updatedRows[index].weigth = weigth;
        setReturnRow(updatedRows);
    };

    const returncutpiece = (index, cutpiece) => {
        const updatedRows = [...returnRow];
        updatedRows[index].cutpiece = cutpiece;
        setReturnRow(updatedRows);
    };

    const returnmeter = (index, meter) => {
        const updatedRows = [...returnRow];
        updatedRows[index].meter = meter;
        setReturnRow(updatedRows);
    };





    const returnphoto = (index, photo) => {
        const updatedRows = [...returnRow];
        updatedRows[index].photo = photo;
        setReturnRow(updatedRows);
    };


    const returnrowdel = (index) => {
        const updatedRows = returnRow.filter((_, i) => i !== index);
        setReturnRow(updatedRows);
    };

    //for First Piece Approval
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('user1');
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };
    const handleSendClick = () => {
        if (inputText.trim() !== '') {
            const newMessage = {
                name: username,
                date: new Date().toLocaleString(),
                message: inputText
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    return (
        <div style={{ flex: '1',}}>
            <div style={{ borderRadius: '20px', backgroundColor: 'var(  --background-color)', margin: '10px' }}>
                <h3 style={{ color: 'var(--primary-color)', marginLeft: '50px', paddingTop: '20px' }}> Order Details </h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-17px', margin: '10px' }}>
                    <div style={{ flex: '1', marginLeft: '20px', }}>
                        <p style={{ color: 'var(--text-color )', fontWeight: 'bold', }}> Order Number :  {orderno} </p>
                    </div>
                    <div style={{ flex: '1', marginLeft: '20px', }}>
                        <p style={{ color: 'var(--text-color )', fontWeight: 'bold' }}> Booked upto :  {dateto} </p>
                    </div>
                    <div style={{ flex: '1', marginLeft: '20px', }}>
                        <p style={{ color: 'var(--text-color )', fontWeight: 'bold' }}> Party Name :  {party} </p>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '2.5%', }}>
                <Box sx={{ bgcolor: 'background.paper', display: 'flex', }}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: '26%', }}
                    >
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="Beam In" {...a11yProps(0)}
                        />
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="Weft Yarn In" {...a11yProps(1)} />
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="Drawing In" {...a11yProps(2)} />
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="Beam Getting" {...a11yProps(3)} />
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="First Piece Approval" {...a11yProps(4)} />
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="Fabric Dispatch" {...a11yProps(5)} />
                        <Tab
                            style={{ fontWeight: 'bold', fontSize: '18px', height: "7vh", }}
                            label="Remaining Goods Return" {...a11yProps(6)} />
                    </Tabs>
                    <TabPanel style={{ flex: '1' }}
                        value={value} index={0}>
                        <div style={{ flex: "1" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Sizing Tippan Number</th>
                                        <th>Upload Image</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    style={{ width: '80%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='date'
                                                    value={row.date}
                                                    onChange={(e) => beamdate(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.tippanNumber}
                                                    onChange={(e) => beamtippan(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='file'
                                                    onChange={(e) => beamphoto(index, e.target.files[0])}
                                                />
                                            </td>
                                          
                                            <td style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }} onClick={() => beamrowdel(index)}>
                                                <RiDeleteBinLine />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ margin: '10px', display: 'flex', gap: '20px' }}>
                            <button className='btn4' onClick={beamaddrow}>
                                + Add Row
                            </button>
                            <button className='btn1' style={{ height: '40px', padding: '7px 10px' }}>
                                Submit
                            </button>
                        </div>
                    </TabPanel>

                    <TabPanel style={{ flex: '1' }} value={value} index={1}>
                        <div style={{ flex: "1" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Gate Pass Number</th>
                                        <th>Upload Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weftRow.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    style={{ width: '80%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='date'
                                                    value={row.date}
                                                    onChange={(e) => weftdate(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.gatepassno}
                                                    onChange={(e) => weftgatepass(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='file'
                                                    onChange={(e) => weftphoto(index, e.target.files[0])}
                                                />
                                            </td>
                                            <td style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }} onClick={() => weftrowdel(index)}>
                                                <RiDeleteBinLine />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ margin: '10px', display: 'flex', gap: '20px' }}>
                            <button className='btn4' onClick={weftaddrow}>
                                + Add Row
                            </button>
                            <button className='btn1' style={{ height: '40px', padding: '7px 10px' }}>
                                Submit
                            </button>
                        </div>
                    </TabPanel>

                    <TabPanel style={{ flex: '1' }} value={value} index={2}>

                        <h3 style={{ color: 'var(--primary-color)', paddingTop: '20px' }}> Drawing In </h3>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                            <div> <input style={{ width: '30px', height: '25px' }} type='checkbox' /> </div>
                            <div >
                                <p style={{ fontSize: 18 }}> Done </p>
                            </div>

                        </div>
                        <div style={{ margin: '10px', display: 'flex', gap: '20px', marginTop: '20px' }}>
                            <button className='btn1'
                                style={{ height: '40px', padding: '7px 10px' }}
                            >
                                Submit
                            </button>
                        </div>
                    </TabPanel>

                    <TabPanel style={{ flex: '1' }} value={value} index={3}>

                        <h3 style={{ color: 'var(--primary-color)', paddingTop: '20px' }}>  Beam Getting </h3>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                            <div> <input style={{ width: '30px', height: '25px' }} type='checkbox' /> </div>
                            <div >
                                <p style={{ fontSize: 18 }}> Done </p>
                            </div>

                        </div>
                        <div style={{ margin: '10px', display: 'flex', gap: '20px', marginTop: '20px' }}>
                            <button className='btn1'
                                style={{ height: '40px', padding: '7px 10px' }}
                            >
                                Submit
                            </button>
                        </div>
                    </TabPanel>






                    <TabPanel style={{ flex: '1' }} value={value} index={4}>
                        <div style={{ border: '2px solid var( --complementary-color)', borderRadius: '10px', padding: '20px' }}>
                            <div >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <textarea
                                        style={{
                                            width: '89%',
                                            margin: '8px',
                                            border: '1px solid var(--primary-color)',
                                            padding: '5px',
                                            resize: 'vertical'
                                        }}
                                        rows={4}
                                        value={inputText}
                                        onChange={handleInputChange}
                                        placeholder="Type your message here..."
                                    />
                                    <div>
                                        <button style={{ width: '100%' }} className='btn2' onClick={handleSendClick}>Send</button>
                                    </div>
                                </div>
                            </div>

                            <div className="msgs-container">
                                {messages.slice().reverse().map((msg, index) => ( // Reverse the array before mapping
                                    <div key={index} className="message">
                                        <p><strong>{msg.name}</strong> - <span>{msg.date}</span></p>
                                        <p>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </TabPanel>



                    <TabPanel style={{ flex: '1' }} value={value} index={5}>
                        <div style={{ flex: "1" }}>
                            <table  >
                                <thead>
                                    <tr>
                                        <th> Date </th>
                                        <th> Gate Pass Number </th>
                                        <th> Meter </th>
                                        <th> Weight </th>
                                        <th> Upload Image </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fabricRow.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    style={{ width: '80%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='date'
                                                    value={row.date}
                                                    onChange={(e) => fabricdate(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.gatepassno}
                                                    onChange={(e) => fabricgatepass(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '80%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.meter}
                                                    onChange={(e) => fabricmeter(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.weight}
                                                    onChange={(e) => fabricweight(index, e.target.value)}
                                                />
                                            </td>
                                            <td>

                                                <input
                                                    style={{ width: '90%', border: '1px solid var(--primary-color)' }}
                                                    type='file'
                                                    onChange={(e) => fabricphoto(index, e.target.files[0])}
                                                />

                                            </td>
                                            <td style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }} onClick={() => fabricrowdel(index)}>
                                                <RiDeleteBinLine />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div style={{ margin: '10px', display: 'flex', gap: '20px' }}>
                            <button className='btn4'

                                onClick={fabricaddrow}>
                                + Add Row
                            </button>

                            <button className='btn1'
                                style={{ height: '40px', padding: '7px 10px' }}
                            >
                                Submit
                            </button>

                        </div>
                    </TabPanel>

                    <TabPanel style={{ flex: '1' }} value={value} index={6}>
                        <div style={{ flex: "1" }}>
                            <table  >
                                <thead>
                                    <tr>
                                        <th> GP No </th>
                                        <th> Yarn Count </th>
                                        <th> Weight </th>
                                        <th> Cut piece </th>
                                        <th> Meter </th>
                                        <th> Upload Image </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returnRow.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.gpno}
                                                    onChange={(e) => returngpno(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.yarncount}
                                                    onChange={(e) => returnyarncount(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.weight}
                                                    onChange={(e) => returnweight(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.cutpiece}
                                                    onChange={(e) => returncutpiece(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    style={{ width: '70%', margin: '8px', border: '1px solid var(--primary-color)' }}
                                                    type='text'
                                                    value={row.meter}
                                                    onChange={(e) => returnmeter(index, e.target.value)}
                                                />
                                            </td>

                                            <td>
                                               

                                                <input
                                                    style={{ width: '90%', border: '1px solid var(--primary-color)' }}
                                                    type='file'
                                                    onChange={(e) => returnphoto(index, e.target.files[0])}
                                                />
                                            </td>
                                            <td style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }} onClick={() => returnrowdel(index)}>
                                                <RiDeleteBinLine />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div style={{ margin: '10px', display: 'flex', gap: '20px' }}>
                            <button className='btn4'

                                onClick={returnaddrow}>
                                + Add Row
                            </button>

                            <button className='btn1'
                                style={{ height: '40px', padding: '7px 10px' }}
                            >
                                Submit
                            </button>

                        </div>
                    </TabPanel>
















                </Box>
            </div>
            <div style={{ display: 'flex', marginTop: '5%', marginLeft: '5%' }}>
                <button
                    className='btn1'
                    style={{ height: '60px', width: '21%', fontSize: 18 }}
                // onClick={handleAddRow}
                >
                    Order Completed
                </button>

            </div>
        </div>
    );
}










// import React, { useState } from 'react';

// const MessageApp = () => {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSendClick = () => {
//     if (inputText.trim() !== '') {
//       const role = messages.length % 2 === 0 ? 'Loom' : 'Trader'; // Alternates between 'Loom' and 'Trader'
//       const newMessage = {
//         name: role,
//         role: role.toLowerCase(), // Store role in lowercase for easier filtering/display
//         date: new Date().toLocaleString(),
//         message: inputText
//       };
//       setMessages([...messages, newMessage]);
//       setInputText('');
//     }
//   };

//   return (
//     <div>
//       <div style={{ border: '1px solid red' }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <textarea
//             style={{
//               width: '89%',
//               margin: '8px',
//               border: '1px solid var(--primary-color)',
//               padding: '5px',
//               resize: 'vertical'
//             }}
//             rows={4}
//             value={inputText}
//             onChange={handleInputChange}
//             placeholder="Type your message here..."
//           />
//           <div>
//             <button style={{ width: '100%' }} className='btn1' onClick={handleSendClick}>Send as {messages.length % 2 === 0 ? 'Loom' : 'Trader'}</button>
//           </div>
//         </div>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ marginBottom: '10px' ,border:'1px solid red',background:'#fff'}}>
//             <p><strong>{msg.name}</strong> - {msg.date}</p>
//             <p>{msg.message}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MessageApp;










