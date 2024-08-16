import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import norboadcast from "../common/static/image/nobroadcast.jpg";

function Broadcast() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [broadcast, setbroadcast] = useState([]);
  const navigate = useNavigate();
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
        setbroadcast(result);
      })
      .catch((error) => console.error(error));
  };

  const replytouser = (data) => {
    const dataToSend = {
      chatingid: data.LoomId === null ? data.TraderId : data.LoomId,
      receivername: data.TraderOrLoomName,
      roleofreceiver: data.Sender,
      replyingto: data.Message,
    };
    navigate("../notifications", { state: dataToSend });

    // const replyform = new FormData();

    // replyform.append("YarnId", user.Id);
    // replyform.append("LoomId", data.LoomId);
    // replyform.append("TraderId",data.TraderId);
    // replyform.append("Message", '');
    // replyform.append("DesignPaper", "");
    // replyform.append("Sender", "Y");
    // replyform.append("Reply", data.Message);

    // const replyconnection = {
    //   method: "POST",
    //   body: replyform,
    //   redirect: "follow",
    // };

    // fetch(
    //   "https://textileapp.microtechsolutions.co.in/php/postyarnrate.php",
    //   replyconnection
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
  };
  useEffect(() => {
    getbroadcasts();
  }, []);
  return (
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
        Broadcasted Messages
      </h5>

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
          <img src={norboadcast} style={{ width: "30%" }} alt="" />
          <h2 style={{ color: "#666666", fontSize: "35px" }}>
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
          maxHeight: "75vh",
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
            <button className="btn2" onClick={() => replytouser(broadcast)}>
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Broadcast;
