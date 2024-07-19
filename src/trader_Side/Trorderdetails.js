import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../common/static/css/Liveorder.css";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
export default function VerticalTabs() {

  const location = useLocation();
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { Name, Completed } = location.state || {}; 
  const [beamindata, setbeamindata] = useState([]);
  const [weftyarnindata, setweftyarnindata] = useState([]);
  const [drawingindata, setdrawingindata] = useState();
  const [drawingindate, setdrawingindate] = useState(false);
  const [beamgettingdata, setbeamgettingdata] = useState(false);
  const [beamgettingdate, setbeamgettingdate] = useState();
  const [firstpiecechatdata, setfirstpiecechatdata] = useState([]);
  const [fabricdispatchdata, setfabricdispatchdata] = useState([]);
  const [goodsreturnsdata, setgoodsreturnsdata] = useState([]);
  const [value, setValue] = React.useState(0);
  const { orderid } = useParams();
  const [tableRows, setTableRows] = React.useState([]);
  const [data, setdata] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const beamaddrow = () => {
    setTableRows([...tableRows, { date: "", tippanNumber: "" }]);
  };
  // const beamaddrow = () => {
  //     const lastRow = tableRows[tableRows.length - 1];
  //     if (!lastRow || (lastRow.date !== '' && lastRow.tippanNumber !== '')) {
  //         setTableRows([...tableRows, { date: '', tippanNumber: '' }]);
  //     }
  // };

 
  //for First Piece Approval
  const [inputText, setInputText] = useState("");

  const handleSendClick = () => {
    // if (inputText.trim() !== "") {
    //   const newMessage = {
    //     name: username,
    //     date: new Date().toLocaleString(),
    //     message: inputText,
    //   };
    //   setMessages([...messages, newMessage]);
    //   setInputText("");
    // }
    const formdata = new FormData();
    formdata.append("OrderNoId", orderid);
    formdata.append("LoomTraderId", user.Id);
    formdata.append("Comment", inputText);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postorderfirstpiece.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success("Message Sent");
        setInputText("");
        firstpicedetails();
      })
      .catch((error) => console.error(error));
  };

  const navigatee = useNavigate();
  const handleOrderConfirm = (e) => {
    toast.success("OrderDetails Submitted Successfully");
    setTimeout(() => {
      navigatee("../trader-live-orders");
    }, 1000);
    e.preventDefault();
  };

  const getorderdetailss = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getidloomorder.php?LoomOrderId=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setdata(result);
      })
      .catch((error) => console.error(error));
  };
  const beamindetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=OrderBeam&Colname=OrderNoId&Colvalue=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setbeamindata(result);
      })
      .catch((error) => console.error(error));
  };

  const weftyarndetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=OrderWeftYarn&Colname=OrderNoId&Colvalue=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setweftyarnindata(result);
      })
      .catch((error) => console.error(error));
  };
  const drawingindetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=OrderDrawingIn&Colname=OrderNoId&Colvalue=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const enq = result[0];
        setdrawingindata(enq.Status);
        setdrawingindate(enq.CreatedOn.date.substring(0, 10));
      })
      .catch((error) => console.error(error));
  };
  const beamgettingdetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=OrderBeamGetting&Colname=OrderNoId&Colvalue=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const enq = result[0];
        setbeamgettingdata(enq.Status);
        setbeamgettingdate(enq.CreatedOn.date.substring(0, 10));
      })
      .catch((error) => console.error(error));
  };
  const firstpicedetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getname.php?OrderNoId=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setfirstpiecechatdata(result);
      })
      .catch((error) => console.error(error));
  };
  const fabricdispatchdetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=OrderFabric&Colname=OrderNoId&Colvalue=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setfabricdispatchdata(result);
      })
      .catch((error) => console.error(error));
  };
  const goodsreturnsdetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=OrderGoodRemain&Colname=OrderNoId&Colvalue=" +
        orderid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setgoodsreturnsdata(result);
     
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getorderdetailss();
    beamindetails();
    weftyarndetails();
    drawingindetails();
    beamgettingdetails();
    firstpicedetails();
    fabricdispatchdetails();
    goodsreturnsdetails();
  }, []);

  const convertDateFormat = (dateString) => {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Define options for toLocaleString to get the desired format
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    // Convert the date to the desired format
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };

  return (
    <div style={{ flex: "1" }}>
      <div
        style={{
          borderRadius: "20px",
          backgroundColor: "var(  --background-color)",
          margin: "10px",
        }}
      >
        <h3
          style={{
            color: "var(--primary-color)",
            marginLeft: "50px",
            paddingTop: "20px",
          }}
        >
          {" "}
          Order Details{" "}
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "-17px",
            margin: "10px",
          }}
        >
          {data.map((orderinfo) => (
            <>
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <p style={{ color: "var(--text-color)", fontWeight: "bold" }}>
                  {" "}
                  OR : {orderinfo.OrderNo}{" "}
                </p>
              </div>
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <p style={{ color: "var(--text-color)", fontWeight: "bold" }}>
                  {" "}
                  Booked upto : {orderinfo.BookedDateTo.date.substring(
                    0,
                    10
                  )}{" "}
                </p>
              </div>    </>))}
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <p style={{ color: "var(--text-color)", fontWeight: "bold" }}>
                  {" "}
                  Party : {Name}{" "} 
                </p> 
              </div>
          
        
        </div>
      </div>
      <div style={{ marginTop: "2.5%" }}>
        <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", width: "26%" }}
          >
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="Beam In"
              {...a11yProps(0)}
            />
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="Weft Yarn In"
              {...a11yProps(1)}
            />
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="Drawing In"
              {...a11yProps(2)}
            />
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="Beam Getting"
              {...a11yProps(3)}
            />
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="First Piece Approval"
              {...a11yProps(4)}
            />
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="Fabric Dispatch"
              {...a11yProps(5)}
            />
            <Tab
              style={{ fontWeight: "bold", fontSize: "18px", height: "7vh" }}
              label="Remaining Goods Return"
              {...a11yProps(6)}
            />
          </Tabs>
          <TabPanel style={{ flex: "1" }} value={value} index={0}>
            <div style={{ flex: "1" }}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Sizing Tippan Number</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {beamindata.map((beamdata, index) => (
                    <tr key={index}>
                      <td>
                        <p>{beamdata.Date.date.substring(0, 10)}</p>
                      </td>
                      <td>
                        <p>{beamdata.SizingTippanNo}</p>
                      </td>

                      <td
                        style={{ padding: "0", height: "90px", width: "auto" }}
                      >
                        <img
                          src={beamdata.PhotoPath}
                          alt="Preview"
                          style={{
                            width: "100%",
                            margin: "0",
                            height: "100%",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel style={{ flex: "1" }} value={value} index={1}>
            <div style={{ flex: "1" }}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Gate Pass Number</th>
                    <th>Upload Image</th>
                  </tr>
                </thead>
                <tbody>
                  {weftyarnindata &&
                    weftyarnindata.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <p>{row.Date.date.substring(0, 10)}</p>
                        </td>
                        <td>
                          <p>{row.GatePassNo}</p>
                        </td>
                        <td
                          style={{
                            padding: "0",
                            height: "90px",
                            width: "auto",
                          }}
                        >
                          <img
                            src={row.PhotoPath}
                            alt="Preview"
                            style={{
                              width: "100%",
                              margin: "0",
                              height: "100%",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel style={{ flex: "1" }} value={value} index={2}>
            <h3 style={{ color: "var(--primary-color)", paddingTop: "20px" }}>
              {" "}
              Drawing In{" "}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <input
                  style={{ width: "30px", height: "25px" }}
                  checked={drawingindata}
                  type="checkbox"
                />{" "}
              </div>
              <div>
                <p style={{ fontSize: 18 }}> Done</p>
              </div>
              <div style={{ marginLeft: "50px" }}>{drawingindate}</div>
            </div>
          </TabPanel>

          <TabPanel style={{ flex: "1" }} value={value} index={3}>
            <h3 style={{ color: "var(--primary-color)", paddingTop: "20px" }}>
              {" "}
              Beam Getting{" "}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <input
                  style={{ width: "30px", height: "25px" }}
                  checked={beamgettingdata}
                  unselectable="true"
                  type="checkbox"
                />{" "}
              </div>
              <div>
                <p style={{ fontSize: 18 }}> Done </p>
              </div>
              <div style={{ marginLeft: "50px" }}>{beamgettingdate}</div>
            </div>
          </TabPanel>

          <TabPanel style={{ flex: "1" }} value={value} index={4}>
            <div
              style={{
                border: "2px solid var( --complementary-color)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div
                className="msgs-container"
                style={{
                  maxHeight: "45vh",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                {firstpiecechatdata
                  .slice()
                  .reverse()
                  .map(
                    (
                      msg,
                      index // Reverse the array before mapping
                    ) => (
                      <div
                        key={index}
                        className="message"
                        style={{
                          float:
                            user.Id === msg.LoomTraderId ? "right" : "left",
                          backgroundColor:
                            user.Id === msg.LoomTraderId
                              ? "#E7F2F4"
                              : "#F2F2F2",
                        }}
                      >
                        <p
                          style={{
                            float:
                              user.Id === msg.LoomTraderId ? "right" : "left",
                          }}
                        >
                          <strong>{msg.Name}</strong> -{" "}
                          <span>{convertDateFormat(msg.CreatedOn.date)}</span>
                        </p>
                        <br />
                        <p
                          style={{
                            float:
                              user.Id === msg.LoomTraderId ? "right" : "left",
                          }}
                        >
                          {msg.Comment}
                        </p>
                      </div>
                    )
                  )}
              </div>
              <div>
          {Completed===null &&  <div style={{ display: "flex", alignItems: "center" }}>
                  <textarea
                    style={{
                      width: "89%",
                      margin: "8px",
                      border: "1px solid var(--primary-color)",
                      padding: "5px",
                      resize: "vertical",
                    }}
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here..."
                  />
                  <div>
                    <button
                      style={{ width: "100%" }}
                      className="btn2"
                      onClick={handleSendClick}
                    >
                      Send
                    </button>
                  </div>
                </div>}
              </div>
            </div>
          </TabPanel>

          <TabPanel style={{ flex: "1" }} value={value} index={5}>
            <div style={{ flex: "1" }}>
              <table>
                <thead>
                  <tr>
                    <th> Date </th>
                    <th> Gate Pass Number </th>
                    <th> Meter </th>
                    <th> Weight </th>
                    <th> Upload Image </th>
                  </tr>
                </thead>
                <tbody>
                  {fabricdispatchdata.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <p>{row.Date.date.substring(0, 10)}</p>
                      </td>
                      <td>
                        <p>{row.GatePassNo}</p>
                      </td>
                      <td>
                        <p>{row.Meter}</p>
                      </td>
                      <td>
                        <p>{row.Weight}</p>
                      </td>
                      <td
                        style={{
                          padding: "0",
                          height: "90px",
                          width: "auto",
                        }}
                      >
                        <img
                          src={row.Photopath}
                          alt="Preview"
                          style={{
                            width: "100%",
                            margin: "0",
                            height: "100%",
                            maxWidth: "450px",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel style={{ flex: "1" }} value={value} index={6}>
            <div style={{ flex: "1" }}>
              <table>
                <thead>
                  <tr>
                    <th> GP No </th>
                    <th> Yarn Count </th>
                    <th> Weight </th>
                    <th> Cut piece </th>
                    <th> Meter </th>
                    <th> Upload Image </th>
                  </tr>
                </thead>
                <tbody>
                  {goodsreturnsdata.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <p>{row.GpNo}</p>
                      </td>
                      <td>
                        <p>{row.YarnCount}</p>
                      </td>
                      <td>
                        <p>{row.Weight}</p>
                      </td>
                      <td>
                        <p>{row.CutPiece}</p>
                      </td>
                      <td>
                        <p>{row.Meter}</p>
                      </td>

                      <td
                        style={{
                          padding: "0",
                          height: "90px",
                          width: "auto",
                        }}
                      >
                        <img
                          src={row.Photopath}
                          alt="Preview"
                          style={{
                            width: "100%",
                            margin: "0",
                            height: "100%",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Box>
      </div>
   
      <ToastContainer />
    </div>
  );
}
