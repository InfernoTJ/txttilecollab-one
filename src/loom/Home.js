import React, { useEffect, useState } from "react";
import "../common/static/css/home.css";
// import userr from "../common/static/image/user.jpg";
// import img9 from '../common/static/image/img9.webp';
import img12 from "../common/static/image/img12.png";
import { FaUsers } from "react-icons/fa6";
import { SiLoom } from "react-icons/si";
import { GiRolledCloth } from "react-icons/gi";
// import { PiFoldersFill } from "react-icons/pi";
import { BsFillCollectionFill } from "react-icons/bs";


function Home() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const authorization = new Headers();
  authorization.append("x-api-key", "yZiloFufnrsaWI_SRfNjZHoPkdUAJOTnVVeC3");

  const [userinfo, setuserinfo] = useState(null);

  const [totalnolooms, settotalnolooms] = useState();
  const [loomownerc, setloomownerc] = useState();
  const [tradercount, settradercount] = useState();
  const [totalenquires, settotalenquires] = useState();



  
  



  const calculateuser = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/gettable.php?table=LoomsDetails",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log("got user");

        settotalnolooms(result.length);
        // settotalnolooms(result.AppUserId.length)
      })
      .catch((error) => console.error(error));
  };
  const calculateloom = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=LoomOrTrader&Colvalue=L",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log("got looms");
        setloomownerc(result.length);
      })
      .catch((error) => console.error(error));
  };
  const calculatetraders = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=LoomOrTrader&Colvalue=T",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log("got traders");
        settradercount(result.length);
      })
      .catch((error) => console.error(error));
  };
  const caculatequiries = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/gettable.php?table=Enquiry",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log("got quires");
        settotalenquires(result.length);
      })
      .catch((error) => console.error(error));
  };
  const getuserinfo = () => {
    const getuserinfocon = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue=" +
        user.Id,
      getuserinfocon
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setuserinfo(result[0]);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getuserinfo();
    caculatequiries();
    calculatetraders();
    calculateloom();
    calculateuser();
  }, []);

  return (
    <div>
      <div className="Home_container">
        <div className="background-image-container">
          <img className="background-image" src={img12} alt="" />
        </div>
      </div>

      {userinfo && (
        <div className="profileUser-card">
          <img src={userinfo.Profilepic} alt="User" className="profile-image" />
          <div className="profile-content">
            <div className="profile-details">
              <h2>{userinfo.Name}</h2>
              <h3>Registration Num: {userinfo.RegistrationNumber}</h3>
              <h3>Owner Name: {userinfo.OwnerName}</h3>
            </div>
          </div>
        </div>
      )}
      <div className="dashboardd-cards" style={{ marginTop: "50px" }}>
        
      <div className="profilecards">
          <div
            className="company-card"
            style={{
              background: "#fb606e",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              Number of Fabric trader
            </p>
          </div>
          <div className="aligndataicons">
            <p className="numberinhomecount" style={{ color: "#fb606e" }}>
              {tradercount}
            </p>
            <GiRolledCloth className="homeicons" style={{ color: "#fb606e" }} />
          </div>
        </div>

        <div className="profilecards">
          <div
            className="company-card"
            style={{
              background: "#08c27f",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              Number of Loom owner
            </p>
          </div>
          <div className="aligndataicons">
            <p className="numberinhomecount" style={{ color: "#08c27f" }}>
              {loomownerc}
            </p>
            <FaUsers className="homeicons" style={{ color: "#08c27f" }} />
          </div>{" "}
        </div>

        <div className="profilecards">
          <div
            className="company-card"
            style={{
              background: "#0facb0",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              Enquiries Generated
            </p>
          </div>
          <div className="aligndataicons">
            <p className="numberinhomecount" style={{ color: "#0facb0" }}>
              {totalenquires}
            </p>
            <BsFillCollectionFill
              className="homeicons"
              style={{ color: "#0facb0" }}
            />
          </div>
        </div>

        <div className="profilecards">
          <div
            className="company-card"
            style={{
              background: "#ff9363",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              Number of Looms
            </p>
          </div>
          <div className="aligndataicons">
            <p className="numberinhomecount" style={{ color: "#ff9363" }}>
              {totalnolooms}
            </p>
            <SiLoom className="homeicons" style={{ color: "#ff9363" }} />
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Home;
