import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { IoMdRefresh } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LuReply } from "react-icons/lu";
const Notification = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const location = useLocation();
  const { chatingid, receivername, roleofreceiver , replyingto } = location.state || {};
  const[reply,setreply]=useState(replyingto?replyingto:'')
  const [inputText, setInputText] = useState("");
  const [firstpiecechatdata, setfirstpiecechatdata] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [designpaper, setDesignpaper] = useState(null);

  const getchattings = (role1, id1, role2, id2) => {
    // Base URL for the API
    const theurl =
      "https://textileapp.microtechsolutions.co.in/php/getyarnrate.php";

    // Initialize query parameters
    let params = new URLSearchParams();

    // Adjust URL parameters based on roles and IDs
    if (role1 === "L" && role2 === "Y") {
      params.append("YarnId", id2);
      params.append("LoomId", id1);
    } else if (role1 === "Y" && role2 === "L") {
      params.append("YarnId", id1);
      params.append("LoomId", id2);
    } else if (role1 === "T" && role2 === "Y") {
      params.append("YarnId", id2);
      params.append("TraderId", id1);
    } else if (role1 === "Y" && role2 === "T") {
      params.append("YarnId", id1);
      params.append("TraderId", id2);
    }

    // Construct the full URL with query parameters
    const url = `${theurl}?${params.toString()}`;

    // Fetch data from the API
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setfirstpiecechatdata(result);
      })
      .catch((error) => console.error(error));
  };

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

  const handleSendClick = (role1, id1, role2, id2) => {
    const sendmsgform = new FormData();

    if (role1 === "L" && role2 === "Y") {
      sendmsgform.append("LoomId", id1);
      sendmsgform.append("YarnId", id2);
    } else if (role1 === "Y" && role2 === "L") {
      sendmsgform.append("YarnId", id1);
      sendmsgform.append("LoomId", id2);
    } else if (role1 === "T" && role2 === "Y") {
      sendmsgform.append("YarnId", id2);
      sendmsgform.append("TraderId", id1);
    } else if (role1 === "Y" && role2 === "T") {
      sendmsgform.append("YarnId", id1);
      sendmsgform.append("TraderId", id2);
    }

    sendmsgform.append("Message", inputText);
    sendmsgform.append("DesignPaper", designpaper);
    sendmsgform.append("Sender", user.LoomOrTrader);
    sendmsgform.append("Reply", reply);

    const sendmsgconnection = {
      method: "POST",
      body: sendmsgform,
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/postyarnrate.php",
      sendmsgconnection
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success("Message sent");
        getchattings(user.LoomOrTrader, user.Id, roleofreceiver, chatingid);
        setInputText("");
        setPreviewUrl(null);
        setDesignpaper(null);
        setreply('')
      })
      .catch((error) => console.error(error));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDesignpaper(file); // Store the selected file in the state
      setPreviewUrl(URL.createObjectURL(file));
      console.log("Selected image:", file.name);
      // Further handling if needed
    }
  };
  const deselecttheimage=()=>{
    setPreviewUrl(null);
    setDesignpaper(null);
  }
  useEffect(() => {
    getchattings(user.LoomOrTrader, user.Id, roleofreceiver, chatingid);
    
  }, []);
  return (
    <div>
      <div
        style={{
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
          borderRadius: "15px",

          padding: "20px",
        }}
      >
        {" "}
       <div style={{display:'flex',}}>
       <button
          className="btn2"
          onClick={() => {
            getchattings(user.LoomOrTrader, user.Id, roleofreceiver, chatingid);
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

        <h3 style={{marginLeft:'30%'}}>{receivername}</h3>
       </div>
        <div
          className="msgs-container"
          style={{
            maxHeight: "70vh",
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
                    float: user.LoomOrTrader === msg.Sender ? "right" : "left",
                    backgroundColor:
                      user.LoomOrTrader === msg.Sender ? "#E4F6FF" : "#F2F2F2",
                  }}
                >
                  {msg.Reply && <><p style={{
                      float: 
                        user.LoomOrTrader === msg.Sender ? "right" : "left",color:'var(--primary-color)'
                    }}> {msg.Reply} <span style={{color:'grey'}}><LuReply /> Replying to</span> </p><br/>
                    <br/></>}
                     
                  <p
                    style={{
                      float:
                        user.LoomOrTrader === msg.Sender ? "right" : "left",
                    }}
                  >
                    <strong>
                      {user.LoomOrTrader === msg.Sender
                        ? user.Name
                        : receivername}
                    </strong>{" "}
                    - <span>{convertDateFormat(msg.CreatedOn.date)}</span>
                  </p>
                  
                  <br />
                  {msg.DesignPaper && (
                    <>
                      <img
                        style={{
                          float:
                            user.LoomOrTrader === msg.Sender ? "right" : "left",
                          margin: "10px",
                          borderRadius: "10px",
                        }}
                        src={msg.DesignPaper}
                        alt=""
                      />
                      <br />
                      <br />
                    </>
                  )}
                  <p
                    style={{
                      float:
                        user.LoomOrTrader === msg.Sender ? "right" : "left",
                    }}
                  >
                    {msg.Message}
                  </p>
                </div>
              )
            )}
        </div>
        <div>
          {reply && <><p style={{margin:0}} > {reply} <span style={{color:'grey'}}><LuReply /> Replying to</span> </p><br/>
                    <br/></>}
          <div style={{ display: "flex", alignItems: "center",marginTop:0 }}>
            <div style={{ margin: " 0 2% " }}> 
              <label htmlFor="imageUpload">
                <MdAddPhotoAlternate
                  style={{
                    fontSize: "50px",
                    cursor: "pointer",
                    color: "var(--primary-color)",
                  }}
                />
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            {previewUrl && (<>
              <img
                src={previewUrl}
                style={{ width: "5%", borderRadius: "5px" }}
                alt="asd"
              /><GiCancel onClick={deselecttheimage} style={{cursor:'pointer' ,margin:0,color:'var(--complementary-color)'}} />
              </>
            )}
            <textarea
              style={{ 
                width: "89%",
                margin: "8px",
                border: "1px solid var(--primary-color)",
                padding: "5px",
                borderRadius: "15px",
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
                onClick={() =>
                  handleSendClick(
                    user.LoomOrTrader,
                    user.Id,
                    roleofreceiver,
                    chatingid
                  )
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
