

// with normal table
import React, { useEffect } from "react";
import "../common/static/css/myloomdetails.css";
import Select from "react-select";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const MyLoomDetails = () => {
  const navigate = useNavigate()
  const [MachineTypeoptions, setMachineTypeoptions] = useState();
  const [SheddingTypeoptions, setSheddingTypeoptions] = useState();
  const [Feedersoptions, seFeedersoptions] = useState();
  const [Framessoptions, setFramessoptions] = useState();

  const[bookingdata,setbookingdata]=useState([])
  const { loomid } = useParams();
  const [machineType, setMachineType] = useState();
  const [sheddingType, setSheddingType] = useState();
  const [Feeders, setFeeders] = useState();
  const [Frames, setFrames] = useState();
  const [SelvadgeJacquard, setSelvedgeJacquard] = useState("");
  const [TopBeam, setTopBeam] = useState("");
  const [Cramming, setCramming] = useState("");
  const [LenoDesignEquipment, setLenoDesignEquipment] = useState("");
  const [width, setWidth] = useState();
  const [RPM, setRPM] = useState();
  const [editable, setEditable] = useState(false);
  const[loomnumber,setloomnumber]=useState()
const[isavailable,setisavailable]=useState()

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleSubmit = () => {
    // toast.success('donee')
    const formdata = new FormData();
    formdata.append("Id", loomid);
    formdata.append("LoomNo", loomnumber);
    formdata.append("MachineType", machineType);
    formdata.append("Width", width);
    formdata.append("RPM", RPM);
    formdata.append("SheddingType", sheddingType);
    formdata.append("NoofFrames",Frames);
    formdata.append("NoofFeeders", Feeders);
    formdata.append("SelvageJacquard", SelvadgeJacquard);
    formdata.append("TopBeam", TopBeam);
    formdata.append("Cramming", Cramming);
    formdata.append("LenoDesignEquipment", LenoDesignEquipment);
    formdata.append("Available", isavailable);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/updateloomdetail.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        toast.success("Loom details updated");
      })
      .catch((error) => console.error(error));
  };

  const handledelete =()=>{
    const loomdelteform = new FormData();
loomdelteform.append("Id", loomid);

const loomdeleteconnection = {
  method: "POST",
  body: loomdelteform,
  redirect: "follow"
};

fetch("https://textileapp.microtechsolutions.co.in/php/delloom.php", loomdeleteconnection)
  .then((response) => response.text())
  .then((result) => {//console.log(result)
    toast.success(`Loom ${loomnumber} deleted.`);
    navigate('../my-loom')
    
  })
  .catch((error) => console.error(error));
  }
  const getloomdetails = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomsDetails&Colname=Id&Colvalue=" +
        loomid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        getdata(result);
      })
      .catch((error) => console.error(error));
  };
  const getdata = (result) => {
    if (result.length > 0) {
      const enquiry = result[0];
      setloomnumber(enquiry.LoomNo)
      setisavailable(enquiry.Available)
      setWidth(enquiry.Width);
      setRPM(enquiry.RPM);
      setMachineType(enquiry.MachineType);
      setSheddingType(enquiry.SheddingType);
      setFeeders(enquiry.NoofFeeders);
      setFrames(enquiry.NoofFrames);
      setCramming(enquiry.Cramming);
      setLenoDesignEquipment(enquiry.LenoDesignEquipment);
      setTopBeam(enquiry.TopBeam);
      setSelvedgeJacquard(enquiry.SelvageJacquard);
    }
  };
  const fetchMachineTypes = async () => {
    try {
      const response = await fetch(
        "https://textileapp.microtechsolutions.co.in/php/gettable.php?table=MachineType"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const options = data.map((item) => ({
        value: item.Name, // Use a unique identifier if available, otherwise use Name as value
        label: item.Name, // Use the "Name" field for the label
      }));

      setMachineTypeoptions(options);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchshreddingTypes = async () => {
    try {
      const response = await fetch(
        "https://textileapp.microtechsolutions.co.in/php/gettable.php?table=SheddingType"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const options = data.map((item) => ({
        value: item.Name, // Use a unique identifier if available, otherwise use Name as value
        label: item.Name, // Use the "Name" field for the label
      }));

      setSheddingTypeoptions(options);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchnooffeederTypes = async () => {
    try {
      const response = await fetch(
        "https://textileapp.microtechsolutions.co.in/php/gettable.php?table=NoOfFeeders"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const options = data.map((item) => ({
        value: item.Range, // Use a unique identifier if available, otherwise use Name as value
        label: item.Range, // Use the "Name" field for the label
      }));

      seFeedersoptions(options);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchnoofframesTypes = async () => {
    try {
      const response = await fetch(
        "https://textileapp.microtechsolutions.co.in/php/gettable.php?table=NoOfFrame"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const options = data.map((item) => ({
        value: item.Range, // Use a unique identifier if available, otherwise use Name as value
        label: item.Range, // Use the "Name" field for the label
      }));

      setFramessoptions(options);
    } catch (error) {
      toast.error(error);
    }
  };
  const getloombookings=()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomBooking&Colname=LoomDetailId&Colvalue="+loomid, requestOptions)
      .then((response) => response.json())
      .then((result) => {//console.log(result)
        setbookingdata(result)
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchMachineTypes();
    fetchshreddingTypes();
    fetchnooffeederTypes();
    fetchnoofframesTypes();
    getloomdetails();
    getloombookings()
  }, []);
  return (
    <div className="MyLoom-Details-container">
      <div className="MyLoom-Details-hedding" style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>  
        <h2 style={{ color: "var(--primary-color)", textAlign: "center" }}>
         {loomnumber} Details
        </h2>
        <BiEditAlt
          style={{ fontSize: "23px", cursor: "pointer" }}
          onClick={toggleEdit}
        />
      </div>

      <div style={{ padding: "10px" }} className="myloom-detail-form">
        <div className="loomform-container">
          <div style={{ padding: "10px" }}>
            <div>
              <div className="label-container">
                <label style={{ fontWeight: "bold" }}>Machine Type</label>
              </div>
              <Select
                className="MachineType-select-dropdown"
                placeholder={machineType}
                isSearchable
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: "1px solid black",
                    ...(state.isDisabled && {
                      backgroundColor: "rgba(240, 240, 240, 0.1)",
                      border: "1px solid black",

                      cursor: "not-allowed",
                    }),
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: !editable ? "#5E5E5E  " : "black",
                  }),
                }}
                options={MachineTypeoptions}
                value={machineType}
                onChange={(selectedOption) =>
                  setMachineType(selectedOption.value)
                }
                isDisabled={!editable}
              />
            </div>

            <div style={{ marginTop: "28px" }}>
              <label style={{ fontWeight: "bold" }}>RPM</label>
              <input
                style={{
                  width: "90%",
                  margin: "10px",
                  border: "1px solid var(--primary-color)",
                }}
                placeholder="Enter RPM"
                type="text"
                value={RPM}
                disabled={!editable}
                onChange={(e) => setRPM(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <div style={{ marginTop: "10px" }}>
              <div className="label-container">
                <label style={{ fontWeight: "bold" }}>Shedding Type</label>
              </div>
              <Select
                className="MachineType-select-dropdown"
                placeholder={sheddingType}
                options={SheddingTypeoptions}
                isSearchable
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: "1px solid black",
                    ...(state.isDisabled && {
                      backgroundColor: "rgba(240, 240, 240, 0.1)",
                      border: "1px solid black",

                      cursor: "not-allowed",
                    }),
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: !editable ? "#5E5E5E  " : "black",
                  }),
                }}
                value={sheddingType}
                isDisabled={!editable}
                onChange={(selectedOption) =>
                  setSheddingType(selectedOption.value)
                }
              />
            </div>

            <div>
              <label style={{ fontWeight: "bold" }}>Width</label>
              <input
                style={{
                  width: "90%",
                  margin: "10px",
                  border: "1px solid var(--primary-color)",
                  marginTop: "13px",
                }}
                placeholder="Enter Width"
                type="text"
                value={width}
                disabled={!editable}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div className="label-container">
              <label style={{ fontWeight: "bold" }}>No of Feeders</label>
            </div>
            <Select
              className="select-dropdown"
              placeholder={Feeders}
              isSearchable
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  border: "1px solid black",
                  ...(state.isDisabled && {
                    backgroundColor: "rgba(240, 240, 240, 0.1)",
                    border: "1px solid black",

                    cursor: "not-allowed",
                  }),
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: !editable ? "#5E5E5E  " : "black",
                }),
              }}
              options={Feedersoptions}
              value={Feeders}
              isDisabled={!editable}
              onChange={(selectedOption) => setFeeders(selectedOption.value)}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <div className="label-container">
              <label style={{ fontWeight: "bold" }}>No of Frames </label>
            </div>
            <Select
              className="select-dropdown"
              placeholder={Frames}
              isSearchable
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  border: "1px solid black",
                  ...(state.isDisabled && {
                    backgroundColor: "rgba(240, 240, 240, 0.1)",
                    border: "1px solid black",

                    cursor: "not-allowed",
                  }),
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: !editable ? "#5E5E5E  " : "black",
                }),
              }}
              options={Framessoptions}
              value={Frames}
              isDisabled={!editable}
              onChange={(selectedOption) => setFrames(selectedOption.value)}
            />
          </div>
        </div>

        <div
          style={{
            width: "65%",
            marginBottom: "3%",
            marginLeft: "2%",
            marginTop: "2%",
          }}
        >
          <div>
            <h3 style={{ color: "var(--primary-color)", textAlign: "center" }}>
              Other Loom Attachments{" "}
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              // border: "1px solid var(--primary-color)",
              borderTop:'1px solid var(--primary-color)',
              borderLeft:'1px solid var(--primary-color)',
              padding: "40px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Selvadge Jacquard</div>
              <div style={{ fontWeight: "bold" }}>LenoDesignEquipment</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    style={{ width: "20px" }}
                    type="checkbox"
                    checked={SelvadgeJacquard}
                    disabled={!editable}
                    onChange={() => setSelvedgeJacquard(!SelvadgeJacquard)}
                  />
                </div>
                <div>Available</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    style={{ width: "20px" }}
                    type="checkbox"
                    checked={LenoDesignEquipment}
                    disabled={!editable}
                    onChange={() =>
                      setLenoDesignEquipment(!LenoDesignEquipment)
                    }
                  />
                </div>
                <div>Available</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Top Beam</div>
              <div style={{ fontWeight: "bold" }}>Cramming</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    style={{ width: "20px" }}
                    type="checkbox"
                    checked={TopBeam}
                    disabled={!editable}
                    onChange={() => setTopBeam(!TopBeam)}
                  />
                </div>
                <div>Available</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    style={{ width: "20px" }}
                    type="checkbox"
                    checked={Cramming}
                    disabled={!editable}
                    onChange={() => setCramming(!Cramming)}
                  />
                </div>
                <div>Available</div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {editable && <button
            onClick={handleSubmit}
            style={{  fontSize: 18 }}
            className="btn2"
           
          >
            Submit
          </button>}
          <button
            onClick={handledelete}
            style={{  fontSize: 18, backgroundColor:'var(--complementary-color)',marginLeft:'10%' }}
            className="btn2"
           
          >
            Delete
          </button>
        </div>

        <div className="myloom-table-container" style={{ marginTop: "20px" }}>
          <table>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>From Date</th>
                <th> To Date</th>
              </tr>
            </thead>
            <tbody>

             {bookingdata
              .filter((order)=> order.BookedFromDate)
             .map((order)=> <tr>
                <td>{order.OrderNoId?'OR'+order.OrderNoId : order.KnottingOrderId?'OR'+order.KnottingOrderId :'Other'}</td> 
                <td>{order.BookedFromDate.date.substring(0,10)}</td>
                <td>{order.BookedToDate.date.substring(0,10)}</td> 
              </tr>
)}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLoomDetails;
