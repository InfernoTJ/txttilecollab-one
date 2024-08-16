import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import norboadcast from "../common/static/image/nobroadcast.jpg";
import nochat from "../common/static/image/nochat.jpg";
const YarnRateT = () => { 
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [uniqueyarn, setuniqueyarn] = useState([]);
  const navigate = useNavigate();
  const [view, setView] = useState("broadcast");
  const [broadcast, setbroadcast] = useState([]);

  const getbroadcasts = () => {
    const getbroadcasts = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getyarnrate.php?YarnId=&TraderId=&LoomId=",
      getbroadcasts
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setbroadcast(result.filter((data) => data.TraderId === user.Id));
      })
      .catch((error) => console.error(error));
  };
  const gotochat = (yarn) => {
    const dataToSend = {
      chatingid: yarn.Id,
      receivername: yarn.YarnName,
      roleofreceiver: "Y",
    };
    navigate("../notifications", { state: dataToSend });
  };

  const handlebroadcastClick = () => {
    setView("broadcast");
  };

  const handleyarnchattingClick = () => {
    setView("yarnchatting");
  };
  const getyarn = () => {
    const getyarncon = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getyarnrate.php?YarnId=&LoomId=&TraderId=" +
        user.Id,
      getyarncon
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setuniqueyarn(result.filter((yarn) => yarn.Id != null));
        // getnames()
      })
      .catch((error) => console.error(error));
  };
  const [broadcastmessage, setbroadcastmessage] = useState("");

  const sendbroadcast = () => {
    const broadcastmsgform = new FormData();
    broadcastmsgform.append("YarnId", "");
    broadcastmsgform.append("LoomId", "");
    broadcastmsgform.append("TraderId", user.Id);
    broadcastmsgform.append("Message", broadcastmessage);
    broadcastmsgform.append("DesignPaper", "");
    broadcastmsgform.append("Sender", user.LoomOrTrader);
    broadcastmsgform.append("Reply", "");

    const broadcastmsgconnection = {
      method: "POST",
      body: broadcastmsgform,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postyarnrate.php",
      broadcastmsgconnection
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setbroadcastmessage('')
        toast.success("Broadcast Sent")
        getbroadcasts();
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getyarn();
    getbroadcasts();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "30px",
        }}
      >
        <div
          style={{
            height: "5vh",
            width: "50%",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            background: "#e4f5f7",
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          <div onClick={handlebroadcastClick} style={{ flex: 1 }}>
            <button
              className={`livebtn ${view === "broadcast" ? "active" : ""}`}
            >
              Broadcast
            </button>
          </div>
          <div className="vl"></div>
          <div onClick={handleyarnchattingClick} style={{ flex: 1 }}>
            <button
              className={`livebtn ${view === "yarnchatting" ? "active" : ""}`}
            >
              Response
            </button>
          </div>
        </div>
      </div>

      {view && (
        <div>
          {view === "broadcast" && (
            <>
              <div style={{ padding: "3% 2%" }}>
                {/* <h5
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    color: "#fff",
                    backgroundColor: "var(--primary-color)",
                    padding: "7px",
                    margin: 0,
                    marginBottom: "3%",
                    width: "15vw",
                    borderRadius: "5px",
                  }}
                >
                  My Broadcasted Messages
                </h5> */}
                <div style={{width:'80%'}}>
                  <h3 >Create Broadcast</h3>
                  <textarea
                    type="text"
                    placeholder="Enter broadcast message..."
                    style={{ width:'100%',border:'1.5px solid var(--primary-color)',borderRadius:'10px'}}
                    value={broadcastmessage}
                    onChange={(e) => setbroadcastmessage(e.target.value)}
                  />
                  <br/>
                  <button className="btn2" style={{backgroundColor:'var(--secondary-color)', margin:'3% 0'}} onClick={sendbroadcast}>Send</button>
                </div>
                {broadcast.length <= 0 && (
        <div
          style={{
            // backgroundColor:'red',
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img src={norboadcast} style={{ width: "25%" }} alt="" />
          <h2 style={{ color: "#9c9c9c", fontSize: "35px" }}>
            No Broadcasts Yet
          </h2>
        </div>
      )}
                <div
                  style={{
                    display: "grid",
                    gap: "30px",
                    padding: "10px",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(4,1fr)",
                    maxHeight: "46vh",
                    overflow: "auto",
                  }}
                  className="broadcast"
                >
                  {broadcast.map((broadcast) => (
                    <div
                      style={{
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                        borderRadius: "10px",
                        padding: "10px 30px",
                      }}
                    >
                      <h3>
                        {broadcast.TraderOrLoomName} -{" "}
                        {broadcast.Sender === "L"
                          ? "Loom"
                          : broadcast.Sender === "T"
                          ? "Trader"
                          : "Yarn"}
                      </h3>
                      <p>{broadcast.Message}</p>
                    </div>
                  ))}



                </div>
              </div>
            </>
          )}
          {view === "yarnchatting" && (
            <>
              <div style={{ padding: "3% 2%" }}>
                <h5
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    color: "#fff",
                    backgroundColor: "var(--primary-color)",
                    padding: "7px",
                    margin: 0,
                    marginBottom: "3%",
                    width: "15vw",
                    borderRadius: "5px",
                  }}
                >
                  Yarns
                </h5>
                {uniqueyarn.length <= 0 && (
        <div 
          style={{
            // backgroundColor:'red',
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img src={nochat} style={{ width: "30%" }} alt="" />
          <h2 style={{ color: "#9c9c9c", fontSize: "35px" }}>
            No Chats Yet
          </h2>
        </div>
      )}
                <div style={{ height: "70vh" }} className="y-loomcontainer">
                  <div
                    className="Y-loom_cards-container" 
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(10,1fr)",
                      gridTemplateRows: "repeat(10 ,1fr)",
                    }}
                  >
                    {uniqueyarn &&
                      uniqueyarn.map((yarn) => (
                        <div
                          style={{
                            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                            borderRadius: "15px",
                            textAlign: "center",
                            alignContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => gotochat(yarn)}
                        >
                          <p>Yarn: {yarn.YarnName}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default YarnRateT;
