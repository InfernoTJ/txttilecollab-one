import React, { useState, useEffect } from "react";
import "../../src/common/static/css/generateenquiry.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateGenerateEnquiry = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [cansetlooms, setcansetlooms] = useState("");
  const [counteroffer, setcounteroffer] = useState("");

  const navigate = useNavigate();
  const [machineType, setMachineType] = useState("");
  const [machineWidth, setMachineWidth] = useState("");
  const [Rpm, setRpm] = useState("");
  const [sheddingType, setSheddingType] = useState("");
  const [frames, setFrames] = useState("");
  const [numOfFeeders, setNumOfFeeders] = useState("");
  const [SelvadgeJacquard, setSelvadgeJacquard] = useState("");
  const [TopBeam, setTopBeam] = useState("");
  const [Cramming, setCramming] = useState("");
  const [LenoDesignEquipment, setLenoDesignEquipment] = useState("");
  const [checkavaliabilityee, setcheckavaliabilityee] = useState(false);
  const { enquiryNo } = useParams();
  const [data, setData] = useState([]);
  const [checkdata, setcheckdata] = useState([]);

  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");

  const getEnquiry = () => {
    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getjoin.php?EnquiryId=" +
        enquiryNo
    )
      .then((response) => response.json())
      .then((jsonData) => {
        //console.log(jsonData);
        setData(jsonData);
        if (jsonData.length > 0) {
          const enquiry = jsonData[0];
          setMachineType(enquiry.MachineType);
          setMachineWidth(enquiry.Width);
          setRpm(enquiry.RPM);
          setSheddingType(enquiry.SheddingType);
          setFrames(enquiry.NoofFrame);
          setNumOfFeeders(enquiry.NoofFeedero);
          setSelvadgeJacquard(enquiry.SelvageJacquard);
          setTopBeam(enquiry.TopBeam);
          setCramming(enquiry.Cramming);
          setLenoDesignEquipment(enquiry.LenoDesignEquipment);
          setfromdate(enquiry.BookingFrom?.date?.substring(0, 10) || "");
          settodate(enquiry.BookingTo?.date?.substring(0, 10) || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const checkavaliability = () => {
    if (!fromdate || !todate) {
      toast.error("Enter from date and to date.");
      return;
    } 
    if (fromdate>todate) {
      toast.error("Invalid checking dates");
      return;
    } 
    const formdata = new FormData();
    formdata.append("LoomDetailId", user.Id);
    formdata.append("MachineType", machineType);
    formdata.append("Width", machineWidth);
    formdata.append("RPM", Rpm);
    formdata.append("SheddingType", sheddingType);
    formdata.append("NoofFrames", frames);
    formdata.append("NoofFeeders", numOfFeeders);
    formdata.append("SelvageJacquard", SelvadgeJacquard);
    formdata.append("TopBeam", TopBeam);
    formdata.append("Cramming", Cramming);
    formdata.append("LenoDesignEquipment", LenoDesignEquipment);
    formdata.append("FromDate", fromdate);
    formdata.append("ToDate", todate);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postloom.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setcheckdata(result);
        setcheckavaliabilityee(true);
        if (result.length === 0) {
          toast.error("No Looms Found");
        } else {
          toast.success("Looms Found");
        }
      })
      .catch((error) => console.error(error));
  };
  const sendreq = () => {
    if (!cansetlooms && !counteroffer) {
      toast.error("Fill Loom to assign and Counter Offer");
      return;
    } else {
      if (!cansetlooms) {
        toast.error("Fill Loom to assign ");
        return;
      }
      if (!counteroffer) {
        toast.error("Fill Counter Offer");
        return;
      }
    }
    const formdata = new FormData();
    formdata.append("EnquiryId", enquiryNo);
    formdata.append("LoomTraderId", user.Id);
    formdata.append("DatePossibleFrom", fromdate);
    formdata.append("DatePossibleTo", todate);
    formdata.append("JobRateExp", counteroffer);
    formdata.append("Status", "");
    formdata.append("LoomPossible", cansetlooms);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postenquiryconfirm.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        //console.log(result);
        toast.success("Response Sent");
      })
      .catch((error) => console.error(error));

    navigate("../jobwork-enquiry");
  };
  const back = () => {
    toast.info("Not Interested");
    navigate("../jobwork-enquiry");
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "20px",
        background: "var(  --background-color)",
      }}
      className="generate_enquiry_container"
    >
      {data &&
        data.map((data) => (
          <>
            <div>
              <h1
                style={{ color: "var(--primary-color)", textAlign: "center" }}
              >
                Enquiry Details{" "}
              </h1>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              }}
            >
              <div style={{ marginLeft: "40px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <b>Enquiry No</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.EnquiryNo}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Date From </b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.BookingFrom.date.substring(0, 10)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b> Machine Width</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.Width}
                  </div>
                  <b>
                    <p>cm</p>
                  </b>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>No of Looms Required</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.LoomRequired}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "25px",
                  }}
                >
                  <b>On Table Fabric Width:</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.FabricWidth}
                  </div>
                  <b>
                    <p>in</p>
                  </b>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <b>Traders Name </b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "50%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.Name}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Date To</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.BookingTo.date.substring(0, 10)}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>RPM </b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.RPM}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Job Rate Offered</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.OfferedJobRate}
                  </div>
                  <b>
                    <p>paisa</p>
                  </b>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <b>Fabric Quality</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "59%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.FabricQuality}''
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Machine Type</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.MachineType}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>No of Frames</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.NoofFrame}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Total Fabric Length</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.FabricLength}
                  </div>
                  <b>m</b>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <b>Dalal/Agent Name</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.AgentName}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Shedding Type</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.SheddingType}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>No of Feeders</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "30%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.NoofFeedero}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <b>Description</b>
                  <div
                    style={{
                      background: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      width: "80%",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    {data.Description}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "83px", marginTop: "30px" }}>
              <div
                style={{
                  width: "48%",
                  border: "1px solid var(--primary-color)",
                  borderRadius: "10px",
                  height: "15vh",
                  marginLeft: "35px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h3 style={{ color: "var(--primary-color)" }}>
                    {" "}
                    Other Loom Attachments{" "}
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    padding:'0 7%'
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" ,gap:'10px'}}>
                    <div>
                      {" "}
                      {data.SelvageJacquard === 1 && (
                        <>
                          <b>SelvadgeJacquard</b>  :  <b>Required</b>
                        </>
                      )}
                    </div>
                    <div>
                      {" "}
                      {data.TopBeam === 1 && (
                        <>
                          <b>TopBeam</b>  :  <b>Required</b>
                        </>
                      )}
                    </div>{" "}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" ,gap:'10px'}}>
                    <div>
                      {" "}
                      {data.Cramming === 1 && (
                        <>
                          <b>Cramming</b>  :  <b>Required</b>
                        </>
                      )}
                    </div>
                    <div>
                      {" "}
                      {data.LenoDesignEquipment === 1 && (
                        <>
                          <b>LenoDesignEquipment</b>  :  <b>Required</b>
                        </>
                      )}{" "}
                    </div>{" "}
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid var(--primary-color)",
                  height: "10vh",
                  width: "120px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={data.Photopath}
                  height="100%"
                  width="100%"
                  alt="photo"
                />
              </div>
            </div>
          </>
        ))}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ marginTop: "13px", marginLeft: "25px" }}>
          <label style={{ fontWeight: "bold", margin: "10px" }}>
            {" "}
            From Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={fromdate}
            onChange={(e) => setfromdate(e.target.value)}
            style={{
              width: "100%",
              margin: "10px",
              border: "1px solid var(--primary-color)",
            }}
            type="date"
          />
        </div>

        <div style={{ marginTop: "13px", marginLeft: "25px" }}>
          <label style={{ fontWeight: "bold", margin: "10px" }}>
            {" "}
            To Date{" "} <span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={todate}
            onChange={(e) => settodate(e.target.value)}
            style={{
              width: "100%",
              margin: "10px",
              border: "1px solid var(--primary-color)",
            }}
            type="date"
          />
        </div>

        <div style={{ marginTop: "35px", marginLeft: "15px" }}>
          <button
            style={{ padding: "5px 8px" }}
            className="btn1"
            onClick={checkavaliability}
          >
            Check Loom Availability
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          marginLeft: "35px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Available Loom Numbers :</span>
        {checkavaliabilityee &&
          (checkdata.length === 0 ? (
            <span
              style={{
                fontWeight: "bold",
                color: "var(--complementary-color)",
                marginLeft: "5px",
                background: "#fff",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              No Looms Found
            </span>
          ) : (
            checkdata.map((item, index) => (
              <span
                key={index}
                style={{
                  fontWeight: "bold",
                  color: "var(--complementary-color)",
                  marginLeft: "5px",
                  background: "#fff",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                {item.LoomNo},
              </span>
            ))
          ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          gap: "40px",
        }}
      >
        <div style={{ width: "22%", marginLeft: "30px" }}>
          <label style={{ fontWeight: "bold" }}>Looms Possible to Assign <span style={{ color: "red" }}>*</span></label>
          <input
            style={{ border: "1px solid var(--primary-color)" }}
            value={cansetlooms}
            onChange={(e) => setcansetlooms(e.target.value)}
            type="text"
            placeholder="Looms Possible to Assign"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <label style={{ fontWeight: "bold" }}>Send Counter Offer <span style={{ color: "red" }}>*</span></label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "330px",
                gap: "10px",
              }}
            >
              <input
                style={{
                  border: "1px solid var(--primary-color)",
                  width: "95%",
                }}
                value={counteroffer}
                onChange={(e) => setcounteroffer(e.target.value)}
                type="text"
                placeholder="Send Counter Offer"
              />

              <p
                style={{ fontWeight: "bold", color: "var(--secondary-color)" }}
              >
                Paisa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            gap: "20px",
            display: "flex",
          }}
        >
          <button className="btn2" onClick={sendreq}>
            Submit
          </button>
          <button className="btn1" onClick={back}>
            Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateGenerateEnquiry;
