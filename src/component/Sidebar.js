
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import '../common/static/css/sidebar.css';
import { menuItems } from './menuItems';
import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import logo2 from  "../../src/common/static/image/logo1.png";
import img11 from '../../src/common/static/image/bg13.jpg';
function Sidebar() {


  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSubsubMenu, setOpenSubsubMenu] = useState(null);
  const [userRole, setUserRole] = useState(user.LoomOrTrader); // "L", "T", "Y", or "A"
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setOpenSubMenu(null);
    setOpenSubsubMenu(null);
  };

  const toggleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (index, event) => {
    event.preventDefault();
    const menuItem = filteredMenuItems[index];
    if (menuItem.submenus) {
      setOpenSubMenu(openSubMenu === index ? null : index);
      setOpenSubsubMenu(null);
    } else {
      navigate(menuItem.path);
    }
  };

  const [themeMode, setThemeMode] = useState("light");
  const [userName, setUserName] = useState('ABC');


  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

   



  const handleLogOut = (e) => {
    e.preventDefault() 
    sessionStorage.removeItem('user')
    navigate('/');
};
const getuserinfo=()=>{
  const getuserinfocon = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://textileapp.microtechsolutions.co.in/php/getbyid.php?Table=LoomTraderDetail&Colname=Id&Colvalue="+user.Id, getuserinfocon)
    .then((response) => response.json())
    .then((result) => {console.log(result)
      setUserName(result[0])
    })
    .catch((error) => console.error(error));
} 
useEffect(()=>{
  getuserinfo()
},[])
  return (
    <div className={`grid-container ${themeMode === "dark" ? "dark-theme" : ""}`}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary-color)', padding: '20px', fontWeight: '800' }} className="header">
       
        <div style={{ display: "flex", flex: "1", gap: '50px' }}>
          <div>Welcome to Kapada Banao !!</div>
          <div style={{ flex: '1', display: "flex", flexDirection: "row", gap: '50px', justifyContent: "flex-end", marginRight: '35px' }}>
          {userName && <><div>{userName.Name}</div>
          <div>{userName.RegistrationNumber}</div></>}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
            fontWeight: '800',
            marginRight: '40px' 
          }}>
            {userRole[0].toUpperCase()}
          </div>
        </div>
      </header>

      <section className={`sidebar ${collapsed ? "collapsed" : ""} ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="toggle">
            <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
          </div>
        </div>

        <div className="sidebar-content-items">
        {/* <div style={{ height: '15vh', width: '250px' }}>
            <div className="logo-container"
              style={{ flex: '1', justifyContent: "center", alignItems: 'center', display: "flex", backgroundImage: `url(${img11})`, backgroundSize: 'cover', }}>
                <div style={{flex:'1',backgroundColor: 'rgba(0, 0, 0, 0.4)',alignItems:'center',justifyContent:'center'}}> 
              <img style={{ height: "15vh", width: '150px', }} src={logo2} alt="Logo" />
            </div>
            </div>
          </div> */}
          <div style={{ height: '15vh', width: '250px' }}>
            <div
              className="logo-container"
              style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${img11})`,
                backgroundSize: 'cover',
              }}
            >
              <div
                style={{
                  flex: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  maxHeight:'15vh',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              >
                <img
                  style={{ height: '17.5vh', width: '190px' }}
                  src={logo2}
                  alt="Logo"
                />
              </div>
            </div>
          </div>


          <div className="sidebar-items">
            <div className="menu-bar">
              <div className="menus">
                <ul  className="menu">
                  {filteredMenuItems.map((item, index) => (
                    <li className="main-link" key={index}>
                      <div className="menu-item">
                        <Link to={item.path} className="menu-link" onClick={(event) => toggleSubMenu(index, event)}>
                          <i className="menu-icon">{item.icon}</i>
                          <span className="hidden-text">{item.title}</span>
                          {item.submenus && (openSubMenu === index ? <FaAngleUp /> : <FaAngleDown />)}
                        </Link>
                        {item.submenus && openSubMenu === index && (
                          <ul className="submenu">
                            {item.submenus.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link to={subItem.path} className="submenu-link">
                                  <span>{subItem.icon}</span>
                                  <span className="hidden-text">{subItem.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bottom-content">
              <ul>
                <li>
                  <Link to="#" onClick={handleLogOut}   className="logout-link">
                    <HiOutlineLogout className="logout-icon" />
                    <span className="hidden-text">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sidebar-toggle-btn" onClick={toggleSidebarOpen}>
          <FaBars />
        </div>
      </section>
      <main className="main">
        <Outlet />
      </main>
      {sidebarOpen && <div className="backdrop open" onClick={toggleSidebarOpen}></div>}
    </div>
  )
}

export default Sidebar;














// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import '../common/static/css/sidebar.css';
// import { menuItems } from './menuItems';
// import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";
// import { HiOutlineLogout } from "react-icons/hi";
// import logo2 from  "../../src/common/static/image/logo1.png"

// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const [openSubsubMenu, setOpenSubsubMenu] = useState(null);
//   const [userRole, setUserRole] = useState("T"); // "L", "T", "Y", or "A"
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     setOpenSubMenu(null);
//     setOpenSubsubMenu(null);
//   };

//   const toggleSubMenu = (index) => {
//     const menuItem = filteredMenuItems[index];
//     if (menuItem.submenus) {
//       setOpenSubMenu(openSubMenu === index ? null : index);
//       setOpenSubsubMenu(null);
//     } else {
//       navigate(menuItem.path); // Use navigate instead of window.location.href
//     }
//   };

//   const toggleSubsubMenu = (index) => {
//     setOpenSubsubMenu(openSubsubMenu === index ? null : index);
//   };

//   const [themeMode, setThemeMode] = useState("light");
// const [userName,setUserName]=useState('ABC')
//   // Filter menu items based on user role
//   const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));
// //
// const[loomnum,setLoomNum]=useState('LU00529 ')
//   return (
//     <div className={`grid-container ${themeMode === "dark" ? "dark-theme" : ""}`}>
//       <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary-color)', padding: '20px', fontWeight: '800' , }} className="header">
//         <div style={{ display: "flex",flex:"1",gap:'50px',}}>
//           <div>Welcome to Kapada Banao !!</div>
//           <div style={{flex:'1', display: "flex", flexDirection: "row", gap:'50px',justifyContent: "flex-end",marginRight:'35px' }}>
            
//             <div> {userName}</div>
//             <div>{loomnum}</div>
//           </div>
         
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//           <div style={{ 
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '40px',
//             height: '40px',
//             borderRadius: '50%',
//             backgroundColor: 'var(--secondary-color)',
//             color: 'white',
//             fontWeight: '800'
//           }}>
//             {userRole[0].toUpperCase()}
//           </div>
//         </div>
//       </header>

//       <section className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <div className="sidebar-content">
//           <div className="toggle">
//             <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
//           </div>
//         </div>

//         <div className="sidebar-content-items">
        
//         <div style={{height:'15vh',width:'250px',}}>
//           <div className="logo-container" 
//             style={{flex:'1',justifyContent:"center",alignItems:'center',display:"flex",background:'var( --primary-color)'}}>        
//                        <img  style={{height:"15vh",width:'150px'}}  src={logo2} alt="Logo" />
//           </div>
//        </div>
         
//           <div className="sidebar-items">
//             <div className="menu-bar">
//               <div className="menus">
//                 <ul className="menu">
//                   {filteredMenuItems.map((item, index) => (
//                     <li className="main-link" key={index}>
//                       <div className="menu-item" onClick={() => toggleSubMenu(index)}>
//                         <Link to={item.path} className="menu-link">
//                           <i className="menu-icon">{item.icon}</i>
//                           <span className="hidden-text">{item.title}</span>
//                           {item.submenus && (openSubMenu === index ? <FaAngleUp /> : <FaAngleDown />)}
//                         </Link>
//                         {item.submenus && openSubMenu === index && (
//                           <ul className="submenu">
//                             {item.submenus.map((subItem, subIndex) => (
//                               <li key={subIndex}>
//                                 <Link to={subItem.path} className="submenu-link">
//                                   <span>{subItem.icon}</span>
//                                   <span className="hidden-text">{subItem.title}</span>
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="bottom-content">
//               <ul>
//                 <li>
//                   <Link to="#" className="logout-link">
//                     <HiOutlineLogout className="logout-icon" />
//                     <span className="hidden-text">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="sidebar-toggle-btn">
//           <FaBars onClick={toggleSidebar} />
//         </div>
//       </section>
//       <main className="main">
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// export default Sidebar;



// sidebar without toggle logo
// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import '../common/static/css/sidebar.css';
// import { menuItems } from './menuItems';
// import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";
// import { HiOutlineLogout } from "react-icons/hi";
// import logo1 from  "../../src/common/static/image/logo1.png"
// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const [openSubsubMenu, setOpenSubsubMenu] = useState(null);
//   const [userRole, setUserRole] = useState("L"); // "L", "T", "Y", or "A"
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     setOpenSubMenu(null);
//     setOpenSubsubMenu(null);
//   };

//   const toggleSubMenu = (index) => {
//     const menuItem = filteredMenuItems[index];
//     if (menuItem.submenus) {
//       setOpenSubMenu(openSubMenu === index ? null : index);
//       setOpenSubsubMenu(null);
//     } else {
//       navigate(menuItem.path); // Use navigate instead of window.location.href
//     }
//   };

//   const toggleSubsubMenu = (index) => {
//     setOpenSubsubMenu(openSubsubMenu === index ? null : index);
//   };

//   const [themeMode, setThemeMode] = useState("light");

//   // Filter menu items based on user role
//   const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));


//   //const for header for role
 

    
//   return (
//     <div className={`grid-container ${themeMode === "dark" ? "dark-theme" : ""}`}>
      
//  <header style={{ display: 'flex',justifyContent:'space-between' ,alignItems: 'center', color: 'var(--primary-color)', padding: '20px', fontWeight: '800' }} className="header">

//   <div style={{  }}>Welcome to Kapada Banao !!</div>

//   <div style={{   display: 'flex', justifyContent:'flex-end', alignItems: 'center' }}>
//     <div style={{ 
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       backgroundColor: 'var(--secondary-color)',
//       color: 'white',
//       fontWeight: '800'
//     }}>
//       {userRole[0].toUpperCase()}
//     </div>



  


//   </div>
// </header>

//       <section className={`sidebar  ${collapsed ? "collapsed" : ""}`}>
//         <div className="sidebar-content" style={{ width: "250px" }}>
//           <div className="toggle">
//             <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
//           </div>
//         </div>

//         <div className="sidebar-content-items">
//           <div className="logo-container" style={{background:'var(--tershary-color)',display:'flex',alignItems:'center',justifyContent: 'center',height:'15vh',width:'100%'}}>        
//             <img style={{ height:'250px',}}   src={logo1} alt="Logo" />
//           </div>
//           <div className="sidebar-items">
//             <div className="menu-bar">
//               <div className="menus">
//                 <ul className="menu">
//                   {filteredMenuItems.map((item, index) => (
//                     <li className="main-link" key={index}>
//                       <div className="menu-item" onClick={() => toggleSubMenu(index)}>
//                         <Link to={item.path} className="menu-link">
//                           <i className="menu-icon">{item.icon}</i>
//                           <span className="hidden-text">{item.title}</span>
//                           {item.submenus && (openSubMenu === index ? <FaAngleUp /> : <FaAngleDown />)}
//                         </Link>
//                         {item.submenus && openSubMenu === index && (
//                           <ul className="submenu">
//                             {item.submenus.map((subItem, subIndex) => (
//                               <li key={subIndex}>
//                                 <Link to={subItem.path} className="submenu-link">
//                                   <span>{subItem.icon}</span>
//                                   <span className="hidden-text">{subItem.title}</span>
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="bottom-content">
//               <ul>
//                 <li>
//                   <Link to="#" className="logout-link">
//                     <HiOutlineLogout className="logout-icon" />
//                     <span className="hidden-text">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="sidebar-toggle-btn">
//           <FaBars onClick={toggleSidebar} />
//         </div>
//       </section>
//       <main className="main">
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// export default Sidebar;


//code from radhika
// import React, { useState } from 'react';
// import { Link, Outlet } from "react-router-dom";
// import '../common/static/css/sidebar.css';
// import { menuItems } from './menuItems';
// import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";
// import { HiOutlineLogout } from "react-icons/hi";


// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const [openSubsubMenu, setOpenSubsubMenu] = useState(null);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//     setOpenSubMenu(null);
//     setOpenSubsubMenu(null);
//   };

//   const toggleSubMenu = (index) => {
//     const menuItem = menuItems[index];
//     if (menuItem.submenus) {
//       setOpenSubMenu(openSubMenu === index ? null : index);
//       setOpenSubsubMenu(null);
//     } else {
//       window.location.href = menuItem.path;
//     }
//   };

//   const toggleSubsubMenu = (index) => {
//     setOpenSubsubMenu(openSubsubMenu === index ? null : index);
//   };

//   const [themeMode, setThemeMode] = useState("light");

//   return (
//     <div className={`grid-container ${themeMode === "dark" ? "dark-theme" : ""}`}>
//       <header className="header"></header>
//       <section className={`sidebar  ${collapsed ? "collapsed" : ""}`}>
//         <div className="sidebar-content" style={{ width: "250px" }}>
//           <div className="toggle">
//             <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
//           </div>
//         </div>
//         <div className="sidebar-content-items">
//           <div className="logo-container" style={{ display: "flex", gap: "20px", margin: "25px 0 0 10px", alignItems: "center" }}>
            
//             <div className="text hidden-text">
//               <span className="name" style={{fontWeight:'800', color:'#135D66', marginBottom:'20px'}}>WEAVEIT APP</span>
//             </div>
//           </div>
//           <div className="sidebar-items">
//             <div className="menu-bar">
//               <div className="menus">
//                 <ul className="menu">
//                   {menuItems.map((item, index) => (
//                     <li className="main-link" key={index}>
//                       <div className="menu-item">
//                         <Link to={item.path} className="menu-link">
//                           <i className="menu-icon">{item.icon}</i>
//                           <span className="hidden-text">{item.title}</span>
//                           {item.submenus && (
//                             <span className="submenu-toggle" style={{ marginLeft: 'auto' }}>
//                               {openSubMenu === index ? <FaAngleUp /> : <FaAngleDown />}
//                             </span>
//                           )}
//                         </Link>
//                         {item.submenus && openSubMenu === index && (
//                           <ul className="submenu">
//                             {item.submenus.map((subItem, subIndex) => (
//                               <li key={subIndex}>
//                                 <Link to={subItem.path} className="submenu-link">
//                                   <span>{subItem.icon}</span>
//                                   <span className="hidden-text">{subItem.title}</span>
//                                   {subItem.submenus && (
//                                     <span className="subsubmenu-toggle" style={{ marginLeft: 'auto' }} onClick={() => toggleSubsubMenu(subIndex)}>
//                                       {openSubsubMenu === subIndex ? <FaAngleUp /> : <FaAngleDown />}
//                                     </span>
//                                   )}
//                                 </Link>
//                                 {subItem.submenus && openSubsubMenu === subIndex && (
//                                   <ul className="subsubmenu">
//                                     {subItem.submenus.map((subSubMenu, subSubIndex) => (
//                                       <li key={subSubIndex}>
//                                         <Link to={subSubMenu.path} className="subsubmenu-link">
//                                           <span>{subSubMenu.icon}</span>
//                                           <span className="hidden-text">{subSubMenu.title}</span>
//                                         </Link>
//                                       </li>
//                                     ))}
//                                   </ul>
//                                 )}
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="bottom-content">
//               <ul>
//                 <li>
//                   <Link to="#" className="logout-link">
//                     <HiOutlineLogout className="logout-icon" />
//                     <span className="hidden-text">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="sidebar-toggle-btn">
//           <FaBars onClick={toggleSidebar} />
//         </div>
//       </section>
//       <main className="main">
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// export default Sidebar;