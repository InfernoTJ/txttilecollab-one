import "../../src/common/static/css/generateenquiry.css";
import Select from "react-select";
import React, { useEffect, useRef, useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateEnquiry_form = () => {
  const { enquiryid } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);

  const [editable, setEditable] = useState(false);
  const [machineTypeOptions, setmachineTypeOptions] = useState();
  const [sheddingTypeOptions, setsheddingTypeOptions] = useState();
  const [feedersOptions, sefeedersOptions] = useState();
  const [framesOptions, setframesOptions] = useState();

  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [reed, setReed] = useState("");
  const [PPI, setPPI] = useState("");
  const [wrapCount, setWrapCount] = useState("");
  const [weftCount, setWeftCount] = useState("");
  const [reedSpace, setReedSpace] = useState("");

  const [enquiryno, setenquiryno] = useState();

  const [fabricLength, setFabricLenth] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [fabricWidth, setFabricWidth] = useState("");
  const [agentName, setAgentName] = useState("");
  const [machineWidth, setMachineWidth] = useState("");
  const [Rpm, setRpm] = useState("");
  const [numOFFrames, setNumOfFrames] = useState("");

  const [numOfLooms, setNumOfLooms] = useState("");
  const [jobRate, setjobRate] = useState("");

  const [machineType, setMachineType] = useState();
  const [numoFFeeders, setNumOfFeeders] = useState();
  const [sheddingType, setSheddingType] = useState();

  const [enquiryDate, setenquiryDate] = useState();

  const [SelvadgeJacquard, setSelvedgeJacquard] = useState("");
  const [TopBeam, setTopBeam] = useState("");
  const [Cramming, setCramming] = useState("");
  const [LenoDesignEquipment, setLenoDesignEquipment] = useState("");

  const [description, setdescription] = useState();
  const [photopath, setphotopath] = useState();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setphotopath(file);

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (
      !machineWidth||
      !Rpm||
      !numOfLooms||
      !jobRate||
      !reed ||
      !PPI ||
      !wrapCount ||
      !weftCount ||
      !reedSpace ||
      !fabricLength 
   
    ) {
      toast.error("Enter * fields");
      return;
    }
    if(dateFrom>dateTo)
      {
        toast.error('Invalid from date and to date format')
        return;
      }

    const formdata = new FormData();
    formdata.append("EnquiryId", enquiryid);
    formdata.append("EnquiryDate", enquiryDate);
    formdata.append("BookingFrom", dateFrom);
    formdata.append("BookingTo", dateTo);
    formdata.append("FabricQuality", (reed + "*" + PPI + "/" + wrapCount + "*" + weftCount + ":" + reedSpace));
    formdata.append("FabricLength", fabricLength);
    formdata.append("LoomRequired", numOfLooms);
    formdata.append("AgentName", agentName);
    formdata.append("OfferedJobRate", jobRate);
    formdata.append("FabricWidth",fabricWidth);
    formdata.append("DeliveryDate", deliveryDate);
    formdata.append("Description", description);
    formdata.append("Photopath", photopath);
    formdata.append("EnquiryNo", enquiryno);
    formdata.append("MachineType", machineType);
    formdata.append("Width", machineWidth);
    formdata.append("RPM", Rpm);
    formdata.append("SheddingType", sheddingType);
    formdata.append("NoofFrame", numOFFrames);
    formdata.append("NoofFeedero", numoFFeeders);
    formdata.append("SelvageJacquard", SelvadgeJacquard);
    formdata.append("TopBeam", TopBeam);
    formdata.append("Cramming", Cramming);
    formdata.append("LenoDesignEquipment", LenoDesignEquipment);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/editenquiry.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        setEditable(false);
        toast.success( enquiryno+" has updated successfully");
        navigate('../updatemyenquiries')
      })
      .catch((error) => console.error(error));
  };

  const handlenumoFFeeders = (selectedOptions) => {
    setNumOfFeeders(selectedOptions.value);
  };

  const handlenumOFFrames = (selectedOptions) => {
    setNumOfFrames(selectedOptions.value);
  };

  const handlesheddingType = (selectedOptions) => {
    setSheddingType(selectedOptions.value);
  };

  const handlemachineType = (selectedOptions) => {
    setMachineType(selectedOptions.value);
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handledelete = () => {
  //   const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
  //  if (confirmed) {
     const formdata = new FormData();
     formdata.append("EnquiryId", enquiryid);
     
     const requestOptions = {
       method: "POST",
       body: formdata,
       redirect: "follow"
     };
     
     fetch("https://textileapp.microtechsolutions.co.in/php/delenquiry.php", requestOptions)
       .then((response) => response.text())
       .then((result) => {//console.log(result)
         toast.success( enquiryno+" has deleted successfully");
         navigate('../updatemyenquiries');
       })
       .catch((error) => console.error(error));
  //  }
  };
const confirmDelete = () => {
    handledelete();
    setShowConfirm(false);
  };
  const parseFabricQuality = (fabricQuality) => {
    const [reedPPI, warpWeft] = fabricQuality.split("/");
    const [reed, PPI] = reedPPI.split("*");
    const [warpCount, weftReed] = warpWeft.split("*");
    const [weftCount, reedSpace] = weftReed.split(":");

    return { reed, PPI, warpCount, weftCount, reedSpace };
  };

  const getdata = (result) => {
    if (result.length > 0) {
      const enquiry = result[0];
      setDateFrom(enquiry.BookingFrom.date.substring(0, 10));
      setDateTo(enquiry.BookingTo.date.substring(0, 10));
      const { reed, PPI, warpCount, weftCount, reedSpace } = parseFabricQuality(
        enquiry.FabricQuality
      );
      setReed(reed);
      setPPI(PPI);
      setWrapCount(warpCount);
      setWeftCount(weftCount);
      setReedSpace(reedSpace);
 
      setFabricLenth(enquiry.FabricLength);
      setDeliveryDate(enquiry.DeliveryDate.date.substring(0, 10));
      setFabricWidth(enquiry.FabricWidth);
      setAgentName(enquiry.AgentName);
      setMachineWidth(enquiry.Width);
      setRpm(enquiry.RPM);
      setenquiryDate(enquiry.CreatedOn.date.substring(0, 10));
      setPreview(enquiry.Photopath);
      setphotopath(enquiry.Photopath);
      setNumOfLooms(enquiry.LoomRequired);
      setjobRate(enquiry.OfferedJobRate);
      setenquiryno(enquiry.EnquiryNo);
      setdescription(enquiry.Description);
      setMachineType(enquiry.MachineType);
      setSheddingType(enquiry.SheddingType);
      setNumOfFeeders(enquiry.NoofFeedero);
      setNumOfFrames(enquiry.NoofFrame);
      setCramming(enquiry.Cramming);
      setLenoDesignEquipment(enquiry.LenoDesignEquipment);
      setTopBeam(enquiry.TopBeam);
      setSelvedgeJacquard(enquiry.SelvageJacquard);
    }
  };
  const setenquiry = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getjoin.php?EnquiryId=" +
        enquiryid,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        getdata(result);
      })
      .catch((error) => console.error(error));
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

      setmachineTypeOptions(options);
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

      setsheddingTypeOptions(options);
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

      sefeedersOptions(options);
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

      setframesOptions(options);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
      fetchMachineTypes();
      fetchshreddingTypes();
      fetchnooffeederTypes();
      fetchnoofframesTypes();
      setenquiry();
   
  }, []);

 
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "20px",
        background: "var(--background-color)",
      }}
      className="generate_enquiry_container"
    >
      <div>
        <h1 style={{ color: "var(--primary-color)", textAlign: "center" }}>
          {enquiryno}
        </h1>
      </div>

      <div className="generate_enquiry">
        <div className="generate_enquiry-left">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ margin: "5px" }}>
              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Date From <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  disabled={!editable}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="date"
                />
              </div>

              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Total Fabric Length <span style={{ color: "red" }}>*</span> 
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0",
                  }}
                >
                  <input
                    value={fabricLength}
                    onChange={(e) => setFabricLenth(e.target.value)}
                    style={{
                      width: "70%",
                      margin: "10px",
                      marginTop: "0px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="number"
                    placeholder="Enter Fabric Length"
                    disabled={!editable}
                  />
                  <button className="btn3">meter</button>
                </div>
              </div>

              <div>
                <div className="label-container">
                  <label
                    style={{
                      fontWeight: "bold",
                      margin: "10px",
                      fontSize: "16px",
                    }}
                  >
                    Machine Type <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                  className="machine-type-select-dropdown"
                  placeholder={machineType}
                  value={machineType}
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
                  onChange={handlemachineType}
                  isSearchable
                  options={machineTypeOptions}
                  isDisabled={!editable}
                />
              </div>
              <div style={{ marginTop: "16px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  RPM <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={Rpm}
                  onChange={(e) => setRpm(e.target.value)}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="RPM"
                  disabled={!editable}
                />
              </div>
            </div>

            <div style={{ margin: "5px" }}>
              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Date To <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="date"
                  disabled={!editable}
                />
              </div>

              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Delivery Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="date"
                  disabled={!editable}
                />
              </div>

              <div style={{ marginTop: "8px" }}>
                <div className="label-container">
                  <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Shedding Type <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                  className="machine-type-select-dropdown"
                  placeholder={sheddingType}
                  value={sheddingType}
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
                  onChange={handlesheddingType}
                  isSearchable
                  options={sheddingTypeOptions}
                  isDisabled={!editable}
                />
              </div>

              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Machine Width <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  value={machineWidth}
                  onChange={(e) => setMachineWidth(e.target.value)}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="Machine Width in CM"
                  disabled={!editable}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: "var(--primary-color)", textAlign: "center" }}>
              Other Loom Attachments
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              border: "1px solid var(--primary-color)",
              margin: "10px",
              padding: "20px",
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
                    checked={SelvadgeJacquard}
                    type="checkbox"
                    value={SelvadgeJacquard}
                    onChange={() => setSelvedgeJacquard(!SelvadgeJacquard)}
                    disabled={!editable}
                  />
                </div>
                <div>Required</div>
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
                    checked={LenoDesignEquipment}
                    value={LenoDesignEquipment}
                    onChange={() =>
                      setLenoDesignEquipment(!LenoDesignEquipment)
                    }
                    type="checkbox"
                    disabled={!editable}
                  />
                </div>
                <div>Required</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
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
                    checked={TopBeam}
                    value={TopBeam}
                    onChange={(e) => setTopBeam(!TopBeam)}
                    disabled={!editable}
                    style={{ width: "20px" }}
                    type="checkbox"
                  />
                </div>
                <div>Required</div>
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
                    checked={Cramming}
                    value={Cramming}
                    onChange={(e) => setCramming(!Cramming)}
                    disabled={!editable}
                    style={{ width: "20px" }}
                    type="checkbox"
                  />
                </div>
                <div>Required</div>
              </div>
            </div>
          </div>
        </div>

        <div className="generate_enquiry-right">
          <div style={{ marginTop: "18px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: "13px",
              }}
            >
              <label style={{ fontWeight: "bold", marginLeft: "10px" }}>
                Fabric Quality <span style={{ color: "red" }}>*</span>
              </label>
              <div
                style={{
                  display: "flex",
                  marginTop: "0",
                  alignItems: "center",
                }}
              >
                <input
                  value={reed}
                  onChange={(e) => setReed(e.target.value)}
                  style={{
                    width: "100%",
                    margin: "8px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="Reed"
                  disabled={!editable}
                />
                <div
                  style={{
                    margin: "0 5px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  *
                </div>
                <input
                  value={PPI}
                  onChange={(e) => setPPI(e.target.value)}
                  style={{
                    width: "100%",
                    margin: "8px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="PPI"
                  disabled={!editable}
                />
                <div
                  style={{
                    margin: "0 5px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  /
                </div>
                <input
                  value={wrapCount}
                  onChange={(e) => setWrapCount(e.target.value)}
                  style={{
                    width: "100%",
                    margin: "8px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="warp count"
                  disabled={!editable}
                />
                <div
                  style={{
                    margin: "0 5px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  *
                </div>
                <input
                  value={weftCount}
                  onChange={(e) => setWeftCount(e.target.value)}
                  style={{
                    width: "100%",
                    margin: "8px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="weft count"
                  disabled={!editable}
                />
                <div
                  style={{
                    margin: "0 5px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  :
                </div>
                <input
                  value={reedSpace}
                  onChange={(e) => setReedSpace(e.target.value)}
                  style={{
                    width: "100%",
                    margin: "8px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="number"
                  placeholder="reed space"
                  disabled={!editable}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                height: "60vh",
              }}
            >
              <div>
                <div style={{ marginTop: "18px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    Fabric Width <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    value={fabricWidth}
                    onChange={(e) => setFabricWidth(e.target.value)}
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="number"
                    placeholder="Fabric Width"
                    disabled={!editable}
                  />
                </div>

                <div style={{ marginTop: "15px" }}>
                  <div className="Frames-label-container">
                    <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                      No of Frames <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <Select
                    className="select-dropdown"
                    placeholder={numOFFrames}
                    value={numOFFrames}
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
                    onChange={handlenumOFFrames}
                    isSearchable
                    options={framesOptions}
                    isDisabled={!editable}
                  />
                </div>
                <div style={{ marginTop: "13px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    No of Looms Required <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    value={numOfLooms}
                    onChange={(e) => setNumOfLooms(e.target.value)}
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="number"
                    placeholder="No of Looms Required"
                    disabled={!editable}
                  />
                </div>

                <div style={{ marginTop: "13px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    Description Details
                  </label>
                  <textarea
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                      resize: "vertical",
                      borderRadius: "10px",
                    }}
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder="Description of fabric"
                    disabled={!editable}
                  />
                </div>
              </div>
              <div>
                <div style={{ marginTop: "18px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    Dalal/Agent Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    placeholder="Dalal/Agent Name"
                    disabled={!editable}
                  />
                </div>

                <div style={{ marginTop: "13px" }}>
                  <div className="label-container">
                    <label
                      style={{
                        fontWeight: "bold",
                        margin: "10px",
                        fontSize: "16px",
                      }}
                    >
                      No. of Feeders <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <Select
                    className="machine-type-select-dropdown"
                    placeholder={numoFFeeders}
                    value={numoFFeeders}
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
                    onChange={handlenumoFFeeders}
                    isSearchable
                    options={feedersOptions}
                    isDisabled={!editable}
                  />
                </div>

                <div style={{ marginTop: "13px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    Job Rate Offered <span style={{ color: "red" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "10px 0",
                    }}
                  >
                    <input
                      value={jobRate}
                      onChange={(e) => setjobRate(e.target.value)}
                      style={{
                        width: "80%",
                        margin: "10px",
                        marginTop: "0px",
                        border: "2px solid var(--primary-color)",
                      }}
                      type="number"
                      placeholder="Job Rate Offered"
                      disabled={!editable}
                    />
                    <button className="btn3">Paisa</button>
                  </div>
                </div>

                <div>
                  Design Paper(Optional)
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={!editable}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "auto",
                        maxWidth: "300px",
                        height: "150px",
                        borderRadius: "10px",
                        border: "1px solid black",
                      }}
                    />
                  )}
                </div>
              </div>
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
          gap: "90px",
        }}
      >
        {editable &&  <div>
         <button
            onClick={handleSubmit}
            style={{ width: "180%" }}
            className="btn1"
            disabled={!editable}
          >
            Submit
          </button>{" "}
        </div>}
        <div>
          <button
            onClick={handleEdit}
            style={{ width: "180%" }}
            className="btn2"
          >
            Edit
          </button>{" "}
        </div>
        {!editable &&  <div>
        <button
            onClick={() => setShowConfirm(true)}
            style={{ width: "180%" ,backgroundColor:'var(--complementary-color)' }}
            className="btn2"
          >
            Delete
          </button>{" "}
        </div>}
      </div>
      {showConfirm && (
        <div className="custom-confirmation-dialog">
          <div className="dialog-content">
            <p>Are you sure you want to delete this enquiry?</p>
            <button style={{ width: "30%" ,backgroundColor:'var(--complementary-color)' }}
            className="btn2" onClick={confirmDelete}>Yes</button>
            <button   style={{ width: "30%" }}
            className="btn2" onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default UpdateEnquiry_form;
