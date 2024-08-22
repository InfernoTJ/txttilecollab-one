import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import "../common/static/css/Liveorder.css";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

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
  const navigate = useNavigate();

  const location = useLocation();
  const { enquiryid, orderno } = location.state || {};

  const [checkbeamgetting, setcheckbeamgetting] = useState();
  const [checkdrawingin, setcheckdrawingin] = useState();
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
  const [data, setdata] = useState([]);
  const { orderid } = useParams();
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [tableRows, setTableRows] = React.useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  const todaysdate = `${year}-${month}-${day}`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const beamaddrow = () => {
    setTableRows([...tableRows, { date: "", tippanNumber: "" }]);
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
    setWeftRow([...weftRow, { date: "", gatepassno: "", photo: "" }]);
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
    setFabricRow([
      ...fabricRow,
      { date: "", gatepassno: "", photopath: "", meter: "", weight: "" },
    ]);
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
    setReturnRow([
      ...returnRow,
      {
        date: "",
        gatepassno: "",
        photopath: "",
        meter: "",
        cutpiece: "",
        weigth: "",
        yarncount: "",
        gpno: "",
      },
    ]);
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
  const [inputText, setInputText] = useState("");

  const handleSendClick = () => {
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
        //console.log(result);
        toast.success("Message Sent");
        setInputText("");
        firstpicedetails();
      })
      .catch((error) => console.error(error));
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
        ////console.log(result);
        setdata(result);
      })
      .catch((error) => console.error(error));
  };

  const beaminsubmit = () => {
    const formdata = new FormData();
    tableRows.map((tableRows) => {
      const date = tableRows.date;
      const tippanNumber = tableRows.tippanNumber;
      const photo = tableRows.photo;

      formdata.append("OrderNoId", orderid);
      formdata.append("Date", date ? date : todaysdate);
      formdata.append("SizingTippanNo", tippanNumber);
      formdata.append("PhotoPath", photo);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/postorderbeam.php",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          //console.log(result);
          beamindetails();
          setTableRows([]);
          toast.success("Response submitted");
        })
        .catch((error) => console.error(error));
    });
  };
  const weftyarmsubmit = () => {
    const formdata = new FormData();
    weftRow.map((weftRow) => {
      const date = weftRow.date;
      const gatepassno = weftRow.gatepassno;
      const photo = weftRow.photo;

      formdata.append("OrderNoId", orderid);
      formdata.append("Date", date ? date : todaysdate);
      formdata.append("GatePassNo", gatepassno);
      formdata.append("PhotoPath", photo);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/postorderyarn.php",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          //console.log(result);
          toast.success("Response submitted");
          setWeftRow([]);
          weftyarndetails();
        })
        .catch((error) => console.error(error));
    });
  };

  const drawinginsubmit = () => {
    const formdata = new FormData();

    formdata.append("OrderNoId", orderid);
    formdata.append("Status", checkdrawingin);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postorderdrawingin.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        toast.success("Response submitted");
        drawingindetails();
      })
      .catch((error) => console.error(error));
  };
  const beamgettingsubmit = () => {
    const formdata = new FormData();

    formdata.append("OrderNoId", orderid);
    formdata.append("Status", checkbeamgetting);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postorderbeamgetting.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        toast.success("Response submitted");
        beamgettingdetails();
      })
      .catch((error) => console.error(error));
  };

  const fabricdispatchsubmit = () => {
    const formdata = new FormData();
    fabricRow.map((fabricRow) => {
      const date = fabricRow.date;
      const gatepassno = fabricRow.gatepassno;
      const meter = fabricRow.meter;
      const weight = fabricRow.weight;
      const photo = fabricRow.photo;

      formdata.append("OrderNoId", orderid);
      formdata.append("Date", date ? date : todaysdate);
      formdata.append("Meter", meter);
      formdata.append("Weight", weight);
      formdata.append("PhotoPath", photo);
      formdata.append("GatePassNo", gatepassno);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/postorderfabric.php",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          //console.log(result);
          toast.success("Response submitted");
          setFabricRow([]);
          fabricdispatchdetails();
        })
        .catch((error) => console.error(error));
    });
  };
  const goodreturnsubmit = () => {
    const formdata = new FormData();
    returnRow.map((returnRow) => {
      const gnpno = returnRow.gpno;
      const yarncount = returnRow.yarncount;
      const weight = returnRow.weigth;
      const cutpiece = returnRow.cutpiece;
      const meter = returnRow.meter;
      const photoo = returnRow.photo;
      formdata.append("OrderNoId", orderid);
      formdata.append("GpNo", gnpno);
      formdata.append("YarnCount", yarncount);
      formdata.append("Weight", weight);
      formdata.append("CutPiece", cutpiece);
      formdata.append("Meter", meter);
      formdata.append("Photopath", photoo);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/postorderreturn.php",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          //console.log(result);
          toast.success("Response submitted");
          goodsreturnsdetails();
          setReturnRow([]);
        })
        .catch((error) => console.error(error));
    });
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
        //console.log(result);
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
        //console.log(result);
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
        //console.log(result);
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
        //console.log(result);
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
        //console.log(result);
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
        //console.log(result);
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
        //console.log(result);
        setgoodsreturnsdata(result);
      })
      .catch((error) => console.error(error));
  };

  const [isInfoFormOpen, setisInfoFormOpen] = useState(false);
  const handleInfoBtnClick = () => {

    setisInfoFormOpen(!isInfoFormOpen);
    handletraderformclose()
  };
  const handleFormClose = () => {
    setisInfoFormOpen(false);
  };

  const [traderinfoform, settraderinfoform] = useState(false);
  const handletraderformopen = () => {
    settraderinfoform(!traderinfoform);
    handleFormClose()
  };
  const handletraderformclose = () => {
    settraderinfoform(false);
  };
  const [selectedLoom, setSelectedLoom] = useState([]);
  const getenquirydetails = () => {
    const getenquirydetails = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getjoin.php?EnquiryId=" +
        enquiryid,
      getenquirydetails
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log("tttttt", result);
        const data=result[0]
        setSelectedLoom(result[0]);
        gettraderinfo(data.Id)
      })
      .catch((error) => console.error(error));
  };
  
  const [loomhistory, setloomhistory] = useState([]);
  const getloombookedhistory = () => {
    const getloombookedhistory = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomBooking&Colname=OrderNoId&Colvalue=" +
        orderid,
      getloombookedhistory
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result)
        setloomhistory(result.length);
      })
      .catch((error) => console.error(error));
  };
  const[traderinfo,settraderinfo]=useState([])

  const gettraderinfo=(traderid)=>{
    const gettraderinfo = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue="+traderid, gettraderinfo)
      .then((response) => response.json())
      .then((result) => {//console.log('the trader infoo',result)
        settraderinfo(result[0])
      })
      .catch((error) => console.error(error));
  }
  React.useEffect(() => {
    gettraderinfo();
    getloombookedhistory();
    getenquirydetails();
    getorderdetailss();
    beamindetails();
    weftyarndetails();
    drawingindetails();
    beamgettingdetails();
    firstpicedetails();
    fabricdispatchdetails();
    goodsreturnsdetails();
    //console.log("this is the main", tableRows.photo);
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

  const completeorder = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/finishloomorder.php?LoomOrderId=" +
        orderid,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        toast.success("Order Completed");
        navigate("../completed-orders");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ flex: "1" }}>
      <div
        style={{
          borderRadius: "20px",
          backgroundColor: "var(  --background-color)",
          margin: "10px",
          position: "relative",
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
              {" "}
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <p style={{ color: "var(--text-color )", fontWeight: "bold" }}>
                  {" "}
                  Order Number : {orderinfo.OrderNo}{" "}
                </p>
              </div>
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <p style={{ color: "var(--text-color )", fontWeight: "bold" }}>
                  {" "}
                  Booked upto : {orderinfo.BookedDateTo.date.substring(
                    0,
                    10
                  )}{" "}
                </p>
              </div>
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <p style={{ color: "var(--text-color )", fontWeight: "bold",alignItems:'center' }}>
                  {" "}
                  Party Name : {orderinfo.PartyName}{" "} <FaCircleInfo onClick={handletraderformopen} style={{color: "var(--text-color)",cursor:'pointer'}} />
                </p>
              </div>
            </>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            // backgroundColor: "red",
            padding: "1% 2%",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <button
              className="btn2"
              style={{ backgroundColor: "var(--secondary-color)" ,height:'5vh' }}
              onClick={handleInfoBtnClick}
            >
              Enquiry Details
            </button> 
          </div>
          <div style={{ display: "flex", width: "30% ",alignItems:'center' }}>
          <p style={{ color: "var(--text-color )", fontWeight: "bold",marginRight: "5%" }}> 
              Looms Booked : {loomhistory}
            </p>
            <button
              className="btn2"
              style={{ backgroundColor: "var(--secondary-color)", height:'5vh' }} 
              onClick={() => navigate(`../loom/LoomBooking/${orderid}`)}
            >
              Book more Looms
            </button>
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
                    <th>Upload Image</th>
                    <th>Action</th>
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
                      <td>Sent</td>
                    </tr>
                  ))}
                  {tableRows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          style={{
                            width: "80%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="date"
                          value={row.date}
                          onChange={(e) => beamdate(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.tippanNumber}
                          onChange={(e) => beamtippan(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="file"
                          onChange={(e) => beamphoto(index, e.target.files[0])}
                        />
                      </td>

                      <td
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => beamrowdel(index)}
                      >
                        <RiDeleteBinLine />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ margin: "10px", display: "flex", gap: "20px" }}>
              <button className="btn4" onClick={beamaddrow}>
                + Add Row
              </button>
              <button
                onClick={beaminsubmit}
                className="btn1"
                style={{ height: "40px", padding: "7px 10px" }}
              >
                Submit
              </button>
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
                    <th>Action</th>
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
                        <td>Sent</td>
                      </tr>
                    ))}
                  {weftRow.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          style={{
                            width: "80%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="date"
                          value={row.date}
                          onChange={(e) => weftdate(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.gatepassno}
                          onChange={(e) => weftgatepass(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="file"
                          onChange={(e) => weftphoto(index, e.target.files[0])}
                        />
                      </td>
                      <td
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => weftrowdel(index)}
                      >
                        <RiDeleteBinLine />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ margin: "10px", display: "flex", gap: "20px" }}>
              <button className="btn4" onClick={weftaddrow}>
                + Add Row
              </button>
              <button
                className="btn1"
                style={{ height: "40px", padding: "7px 10px" }}
                onClick={weftyarmsubmit}
              >
                Submit
              </button>
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
                  checked={drawingindata ? drawingindata : checkdrawingin}
                  onChange={
                    drawingindata
                      ? () => {}
                      : () => setcheckdrawingin(!checkdrawingin)
                  }
                  type="checkbox"
                />{" "}
              </div>
              <div>
                <p style={{ fontSize: 18 }}> Done </p>
              </div>
              <div style={{ marginLeft: "50px" }}>{drawingindate}</div>
            </div>
            <div
              style={{
                margin: "10px",
                display: "flex",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {!drawingindata && (
                <button
                  className="btn1"
                  style={{ height: "40px", padding: "7px 10px" }}
                  onClick={drawinginsubmit}
                >
                  Submit
                </button>
              )}
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
                  checked={beamgettingdata ? beamgettingdata : checkbeamgetting}
                  onChange={
                    beamgettingdata
                      ? () => {}
                      : () => setcheckbeamgetting(!checkbeamgetting)
                  }
                  type="checkbox"
                />{" "}
              </div>
              <div>
                <p style={{ fontSize: 18 }}> Done </p>
              </div>
              <div style={{ marginLeft: "50px" }}>{beamgettingdate}</div>
            </div>
            <div
              style={{
                margin: "10px",
                display: "flex",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {!beamgettingdata && (
                <button
                  className="btn1"
                  style={{ height: "40px", padding: "7px 10px" }}
                  onClick={beamgettingsubmit}
                >
                  Submit
                </button>
              )}
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
              {" "}
              <button
                className="btn2"
                onClick={() => {
                  firstpicedetails();
                  toast.success("Refreshed chat");
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "18px",
                  }}
                >
                  Refresh chat{" "}
                  <IoMdRefresh style={{ color: "white", fontSize: "25px" }} />
                </span>
              </button>
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
                              ? "#E4F6FF"
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
                <div style={{ display: "flex", alignItems: "center" }}>
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
                </div>
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
                    <th> Action </th>
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
                      <td>Sent</td>
                    </tr>
                  ))}
                  {fabricRow.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          style={{
                            width: "80%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="date"
                          value={row.date}
                          onChange={(e) => fabricdate(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.gatepassno}
                          onChange={(e) =>
                            fabricgatepass(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "80%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.meter}
                          onChange={(e) => fabricmeter(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.weight}
                          onChange={(e) => fabricweight(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "90%",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="file"
                          onChange={(e) =>
                            fabricphoto(index, e.target.files[0])
                          }
                        />
                      </td>
                      <td
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => fabricrowdel(index)}
                      >
                        <RiDeleteBinLine />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ margin: "10px", display: "flex", gap: "20px" }}>
              <button className="btn4" onClick={fabricaddrow}>
                + Add Row
              </button>

              <button
                className="btn1"
                style={{ height: "40px", padding: "7px 10px" }}
                onClick={fabricdispatchsubmit}
              >
                Submit
              </button>
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
                    <th> Action </th>
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
                      <td>Sent</td>
                    </tr>
                  ))}
                  {returnRow.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.gpno}
                          onChange={(e) => returngpno(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.yarncount}
                          onChange={(e) =>
                            returnyarncount(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.weight}
                          onChange={(e) => returnweight(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.cutpiece}
                          onChange={(e) =>
                            returncutpiece(index, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            width: "70%",
                            margin: "8px",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="text"
                          value={row.meter}
                          onChange={(e) => returnmeter(index, e.target.value)}
                        />
                      </td>

                      <td>
                        <input
                          style={{
                            width: "90%",
                            border: "1px solid var(--primary-color)",
                          }}
                          type="file"
                          onChange={(e) =>
                            returnphoto(index, e.target.files[0])
                          }
                        />
                      </td>
                      <td
                        style={{
                          color: "red",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => returnrowdel(index)}
                      >
                        <RiDeleteBinLine />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ margin: "10px", display: "flex", gap: "20px" }}>
              <button className="btn4" onClick={returnaddrow}>
                + Add Row
              </button>

              <button
                className="btn1"
                style={{ height: "40px", padding: "7px 10px" }}
                onClick={goodreturnsubmit}
              >
                Submit
              </button>
            </div>
          </TabPanel>
        </Box>
      </div>
      <div style={{ display: "flex", marginTop: "5%", marginLeft: "5%" }}>
        <button
          className="btn1"
          style={{ height: "60px", width: "21%", fontSize: 18 }}
          onClick={completeorder}
        >
          Order Completed
        </button>
      </div>
      <div
        className={`loom_booking_infoform-container ${
          isInfoFormOpen ? "form-open" : ""
        }`}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "var(--primary-color)", padding: "20px" }}>
            {orderno} Information
          </h2>
          <IoClose
            style={{
              fontSize: "30px",
              color: "var(--primary-color)",
              marginRight: "20%",
            }}
            onClick={handleFormClose}
          />
        </div>
        {selectedLoom && (
          <div style={{ marginLeft: "50px" }}>
            <div>
              <h3>Enquiry No: {selectedLoom.EnquiryNo}</h3>
            </div>
            <div>
              <h3>Agent Name: {selectedLoom.AgentName}</h3>
            </div>
            <div>
              <h3>Fabric Length: {selectedLoom.FabricLength}</h3>
            </div>
            <div>
              <h3>Fabric Quality: {selectedLoom.FabricQuality}</h3>
            </div>
            <div>
              <h3>Fabric Width: {selectedLoom.FabricWidth}</h3>
            </div>
            <div>
              <h3>Machine Type: {selectedLoom.MachineType}</h3>
            </div>
            <div>
              <h3>Shedding Type: {selectedLoom.SheddingType}</h3>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10% 0 0",
              }}
            >
              <div>
                <div>
                  <h3>Width: {selectedLoom.Width}</h3>
                </div>
                <div>
                  <h3>RPM: {selectedLoom.RPM}</h3>
                </div>
              </div>
              <div>
                <div>
                  <h3>No of Frames: {selectedLoom.NoofFrame}</h3>
                </div>
                <div>
                  <h3>No of Feeders: {selectedLoom.NoofFeedero}</h3>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 5% 0 0",
              }}
            >
              {" "}
              <div>
                {selectedLoom.SelvageJacquard === 1 && (
                  <div>
                    <h3>Selvage Jacquard: Available </h3>
                  </div>
                )}
                {selectedLoom.TopBeam === 1 && (
                  <div>
                    <h3>Top Beam: Available</h3>
                  </div>
                )}
              </div>{" "}
              <div>
                {" "}
                {selectedLoom.Cramming === 1 && (
                  <div>
                    <h3>Cramming: Available </h3>
                  </div>
                )}
                {selectedLoom.LenoDesignEquipment === 1 && (
                  <div>
                    <h3>Leno Design Equipment: Available </h3>
                  </div>
                )}
              </div>
            </div>
            {selectedLoom.Photopath && (
              <div>
                <img
                  src={selectedLoom.Photopath}
                  style={{
                    width: "50%",
                    maxHeight: "25vh",
                    borderRadius: "5px",
                    border: "1px solid black",
                  }}
                  alt="designpaper"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`loom_booking_infoform-container ${
          traderinfoform ? "form-open" : ""
        }`}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ color: "var(--primary-color)", padding: "20px" }}>
            {traderinfo && traderinfo.Name} Information
          </h2>
          <IoClose
            style={{
              fontSize: "30px",
              color: "var(--primary-color)",
              marginRight: "20%",
            }}
            onClick={handletraderformclose}
          />
        </div>
        {traderinfo && (
          <div style={{ marginLeft: "50px" }}>
            <div>
              <h3>Email: {traderinfo.AppUserId}</h3>
            </div>
            <div>
              <h3>Company Name: {traderinfo.Name}</h3>
            </div>
            <div>
              <h3>Owner Name: {traderinfo.OwnerName}</h3>
            </div>
            <div>
              <h3>Primary Contact: {traderinfo.PrimaryContact}</h3>
            </div>
            <div>
              <h3>City: {traderinfo.City}</h3>
            </div>
            <div>
              <h3>Pincode: {traderinfo.Pincode}</h3>
            </div>
          
            {traderinfo.Profilepic && (
              <div>
                <img
                  src={traderinfo.Profilepic}
                  style={{
                    width: "50%",
                    maxHeight: "25vh",
                    borderRadius: "5px",
                    border: "1px solid black",
                  }}
                  alt="designpaper"
                />
              </div>
            )}
          </div>
        )}
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
