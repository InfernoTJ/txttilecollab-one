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

  const [nouser, setnouser] = useState();
  const [loomownerc, setloomownerc] = useState();
  const [tradercount, settradercount] = useState();
  const [totalenquires, settotalenquires] = useState();

  useEffect(() => {
    const calculateuser = () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://textileapp.microtechsolutions.co.in/php/getappuser.php",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          //console.log("got user");

          setnouser(result.length);
          // setnouser(result.AppUserId.length)
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
    caculatequiries();
    calculatetraders();
    calculateloom();
    calculateuser();
  }, []);

  return (
    <div>
      <div  className="Home_container">
        <div  className="background-image-container">
          <img className="background-image" src={img12} alt="" />
        </div>
      </div>

      <div  className="profileUser-card">
        <img src={user.Profilepic} alt="User" className="profile-image" />
        <div className="profile-content">
          <div className="profile-details">
            <h2>{user.Name}</h2>
            <h3>Registration Num: {user.RegistrationNumber}</h3>
            <h3>Owner Name: {user.OwnerName}</h3>
          </div>

          {/* <div className="dashboardd-cards" style={{marginTop:'50px'}}>
            <div className="profilecards">
         
              <div
                className="company-card"
                style={{
                  background: "#ff9363",
                  padding: "5px",
                  margin:'0',
                  color: "white",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Number of Users
                </p>
              </div>
  
              <p className="numberinhomecount"
                style={{color:'#ff9363'
                }}
              >
                {nouser} 
              </p><FaUsers style={{ position:'absolute' , bottom:'30px' ,right:'30px',height:'27px',width:'27px',color:'#ff9363' }}/>
            </div>

            <div className="profilecards">
              <div
                className="company-card"
                style={{
                  background: "#08c27f",
                  padding: "5px",
                  color: "white",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Number of Loom owner
                </p>
              </div>

              <p className="numberinhomecount"
                style={{color:'#08c27f'
                }}
              >
                {loomownerc}
              </p><SiLoom style={{ position:'absolute' , bottom:'30px' ,right:'30px',height:'27px',width:'27px',color:'#08c27f' }}/>
            </div>

            <div className="profilecards">
              <div
                className="company-card"
                style={{
                  background: "#fb606e",
                  padding: "5px",
                  color: "white",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Number of Fabric trader
                </p>
              </div>
     
              <p className="numberinhomecount"
                style={{color:'#fb606e'
                }}
              >
                {tradercount}
              </p><GiRolledCloth style={{ position:'absolute' , bottom:'30px' ,right:'30px',height:'27px',width:'27px',color:'#fb606e' }}/>
            </div>

            <div className="profilecards">
              <div
                className="company-card"
                style={{
                  background: "#0facb0",
                  padding: "5px",
                  color: "white",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                   Enquiries Generated
                </p>
              </div>
             
              <p className="numberinhomecount"
                style={{color:'#0facb0'
                }}
              >
                {totalenquires}
              </p><BsFillCollectionFill  style={{ position:'absolute' , bottom:'30px' ,right:'30px',height:'27px',width:'27px',color:'#0facb0' }}/>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
