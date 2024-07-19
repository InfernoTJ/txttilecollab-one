import "../../src/common/static/css/generateenquiry.css";
import Select from "react-select";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const GenerateEnquiry = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [preview, setPreview] = useState(null);
  const [machineTypeoption, setMachineTypeoption] = useState(null);
  const [shreddingtypeoptions, setshreddingtypeoptions] = useState(null);
  const [nooffeedersoptions, setnooffeedersoptions] = useState(null);
  const [noofframesoptions, setnoofframesoptions] = useState(null);

  const fileInputRef = useRef(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  const todaysdate = `${year}-${month}-${day}`;

  const [selectedFile, setSelectedFile] = useState(null);

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const [enqid, setenqid] = useState("");
  const [reed, setReed] = useState("");
  const [PPI, setPPI] = useState("");
  const [wrapCount, setWrapCount] = useState("");
  const [weftCount, setWeftCount] = useState("");
  const [reedSpace, setReedSpace] = useState("");

  const [fabricLength, setFabricLenth] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [fabricWidth, setFabricWidth] = useState("");
  const [agentName, setAgentName] = useState("");
  const [machineWidth, setMachineWidth] = useState("");
  const [Rpm, setRpm] = useState("");
  const [numOFFrames, setNumOfFrames] = useState("");
  const [numOfLooms, setNumOfLooms] = useState("");
  const [jobRate, setjobRate] = useState("");
  const [machineType, setMachineType] = useState(" ");
  const [numoFFeeders, setNumOfFeeders] = useState("");
  const [sheddingType, setSheddingType] = useState("");
  const [frames, setFrames] = useState("");
  const [SelvadgeJacquard, setSelvedgeJacquard] = useState(false);
  const [TopBeam, setTopBeam] = useState(false);
  const [Cramming, setCramming] = useState(false);
  const [LenoDesignEquipment, setLenoDesignEquipment] = useState(false);
  const [description, setdescription] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // Reset all fields

    const formdata = new FormData();
    formdata.append("EnquiryDate", todaysdate);
    formdata.append("TraderId", user.Id);
    formdata.append("BookingFrom", dateFrom);
    formdata.append("BookingTo", dateTo);
    formdata.append(
      "FabricQuality",
      reed + "*" + PPI + "/" + wrapCount + "*" + weftCount + ":" + reedSpace
    );
    formdata.append("FabricLength", fabricLength);
    formdata.append("LoomRequired", numOfLooms);
    formdata.append("AgentName", agentName);
    formdata.append("OfferedJobRate", jobRate);
    formdata.append("FabricWidth", fabricWidth);
    formdata.append("DeliveryDate", deliveryDate);
    formdata.append("Description", description);
    formdata.append("Photopath", selectedFile);
console.log('thefileeeisssssss',selectedFile);
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const newform = new FormData();

    const requestOption = {
      method: "POST",
      body: newform,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postenquiry.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setenqid(result);
    
        newform.append("EnquiryId", result);
        newform.append("LoomNo", "");
        newform.append("MachineType", machineType.value);
        newform.append("Width", machineWidth);
        newform.append("RPM", Rpm);
        newform.append("SheddingType", sheddingType.value);
        newform.append("NoofFrame", numOFFrames.value);
        newform.append("NoofFeedero", numoFFeeders.value);
        newform.append("SelvageJacquard", SelvadgeJacquard);
        newform.append("TopBeam", TopBeam);
        newform.append("Cramming", Cramming);
        newform.append("LenoDesignEquipment", LenoDesignEquipment);
        fetch(
          "https://textileapp.microtechsolutions.co.in/php/postenquirydetail.php",
          requestOption
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            setDateFrom("");
            setDateTo("");
            setReed("");
            setPPI("");
            setWrapCount("");
            setWeftCount("");
            setReedSpace("");

            setFabricLenth("");
            setDeliveryDate("");
            setFabricWidth("");
            setAgentName("");
            setMachineWidth("");
            setRpm("");
            setSelectedFile(null); 
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            
          } else { 
            console.error('File upload failed');
          }
                    setPreview(null); 
            setNumOfFrames("");
            setNumOfLooms("");
            setjobRate("");
            setMachineType("");
            setNumOfFeeders("");
            setSheddingType("");
            setFrames("");
            setdescription("");
            setCramming(false);
            setLenoDesignEquipment(false);
            setTopBeam(false);
            setSelvedgeJacquard(false);
            toast.success("Enquiry has created Successfully");
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
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

  useEffect(() => {
   
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
        setMachineType(options.value);
        setMachineTypeoption(options);
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
        setSheddingType(options.value);
        setshreddingtypeoptions(options);
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
        setNumOfFeeders(options.value);
        setnooffeedersoptions(options);
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
        setFrames(options.value);
        setnoofframesoptions(options);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchMachineTypes();
    fetchshreddingTypes();
    fetchnooffeederTypes();
    fetchnoofframesTypes();

    console.log(selectedFile);
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
          Generate Enquiry
        </h1>
      </div>

      <div className="generate_enquiry">
        <div className="generate_enquiry-left">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ margin: "5px" }}>
              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Date From
                </label>
                <input
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
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
                  Total Fabric Length
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
                    type="text"
                    placeholder="Enter Fabric Length"
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
                    Machine Type
                  </label>
                </div>
                <Select
                  className="machine-type-select-dropdown"
                  placeholder="Machine Type"
                  value={machineType}
                  onChange={handlemachineType}
                  isSearchable
                  options={machineTypeoption}
                />
              </div>
              <div style={{ marginTop: "16px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  RPM
                </label>
                <input
                  value={Rpm}
                  onChange={(e) => setRpm(e.target.value)}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="text"
                  placeholder="RPM"
                />
              </div>
            </div>

            <div style={{ margin: "5px" }}>
              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Date To
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
                />
              </div>

              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Delivery Date
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
                />
              </div>

              <div style={{ marginTop: "8px" }}>
                <div className="label-container">
                  <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Shedding Type
                  </label>
                </div>
                <Select
                  className="machine-type-select-dropdown"
                  placeholder="Shedding Type"
                  value={sheddingType}
                  onChange={handlesheddingType}
                  isSearchable
                  options={shreddingtypeoptions}
                />
              </div>

              <div style={{ marginTop: "13px" }}>
                <label style={{ fontWeight: "bold", margin: "10px" }}>
                  Machine Width
                </label>
                <input
                  value={machineWidth}
                  onChange={(e) => setMachineWidth(e.target.value)}
                  style={{
                    width: "90%",
                    margin: "10px",
                    border: "1px solid var(--primary-color)",
                  }}
                  type="text"
                  placeholder="Machine Width in CM"
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
                   
                    onChange={(e) => setSelvedgeJacquard(!SelvadgeJacquard)}
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
              
                    onChange={(e) => setLenoDesignEquipment(!LenoDesignEquipment)}
                    type="checkbox"
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
                  
                    onChange={(e) => setTopBeam(!TopBeam)}
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
  
                    onChange={(e) => setCramming(!Cramming)}
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
                Fabric Quality
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
                  type="text"
                  placeholder="Reed"
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
                  type="text"
                  placeholder="PPI"
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
                  type="text"
                  placeholder="warp count"
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
                  type="text"
                  placeholder="weft count"
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
                  type="text"
                  placeholder="reed space"
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
                    Fabric Width
                  </label>
                  <input
                    value={fabricWidth}
                    onChange={(e) => setFabricWidth(e.target.value)}
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    placeholder="Fabric Width"
                  />
                </div>

                <div style={{ marginTop: "15px" }}>
                  <div className="Frames-label-container">
                    <label style={{ fontWeight: "bold", fontSize: "16px" }}>
                      No of Frames
                    </label>
                  </div>
                  <Select
                    className="select-dropdown"
                    placeholder="No of Frames"
                    value={numOFFrames}
                    onChange={handlenumOFFrames}
                    isSearchable
                    options={noofframesoptions}
                  />
                </div>
                <div style={{ marginTop: "13px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    No of Looms Required
                  </label>
                  <input
                    value={numOfLooms}
                    onChange={(e) => setNumOfLooms(e.target.value)}
                    style={{
                      width: "90%",
                      margin: "10px",
                      border: "1px solid var(--primary-color)",
                    }}
                    type="text"
                    placeholder="No of Looms Required"
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
                  />
                </div>
              </div>
              <div>
                <div style={{ marginTop: "18px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    Dalal/Agent Name
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
                      No. of Feeders
                    </label>
                  </div>
                  <Select
                    className="machine-type-select-dropdown"
                    placeholder="No. of Feeders"
                    value={numoFFeeders}
                    onChange={handlenumoFFeeders}
                    isSearchable
                    options={nooffeedersoptions}
                  />
                </div>

                <div style={{ marginTop: "13px" }}>
                  <label style={{ fontWeight: "bold", margin: "10px" }}>
                    Job Rate Offered
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
                      type="text"
                      placeholder="Job Rate Offered"
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
        }}
      >
        <button
          onClick={handleSubmit}
          style={{ width: "10%" }}
          className="btn2"
        >
          Submit
        </button>
      </div>
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
