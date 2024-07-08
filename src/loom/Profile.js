
import React, { useState } from 'react';
import '../common/static/css/profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [editContact,seteditContact]=useState(false);
  const [email, setEmail] = useState('diksha@gmail.com');
  const [ownerName, setOwnerName] = useState('MTS');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('Kolhapur');
  const [primaryContact, setPrimaryContact] = useState('8308058383');
  const [gst, setGst] = useState('27KLTAH14752');
  const [companyName, setCompanyName] = useState('Vivek Textiles');
  const [address, setAddress] = useState('YT park');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('123654');
  const [registrationNo, setRegistrationNo] = useState('LU00529');
  const [role, setRole] = useState('Loom');
  const [ownerContact, setOwnerContact] = useState('7410258963');
  const [managerContact, setManagerContact] = useState('9874563210');
  const [otherContact, setOtherContact] = useState('9632587410');

  const handleEdit = () => {
    setEditable(true);
  };

  const handleContactEdit= () =>{
    seteditContact (true)
  }

  const handleSave = () => {
    setEditable(false);
    toast.success('Company Details Updated Successfully');
  };

  const handleContactSave=()=>{
 seteditContact(false);
 toast.success('Contact Updated')
  }
  const navigate = useNavigate();
  const handleMyloomClick = () => {
    navigate('/sidebar/my-loom');
  };

  return (
    <div  className='loom-profile-all'>
      <div style={{ backgroundColor: 'var(  --tershary-color)', paddingBottom: '200px', position: 'relative' }}>
        <div className='Lprofile-company-info' > 
       
       
          <div  style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }}>
            <h3 className='profile-company-info-tittle' style={{ color: 'var(--primary-color)', textAlign: 'center',paddingTop:'40px'}}>Company Information</h3>
            <div className='profile-loom-compamyinfo-form'>
              <div style={{ margin: '5px' }}>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Email</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Owner Name</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Country</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>City</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>GST Num</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                    disabled={!editable}
                  />
                </div>
              </div>
              <div style={{ margin: '5px' }}>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Company Name</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Address</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>State</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>PinCode</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                    type='text'
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    disabled={!editable}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Registration Number</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)',fontWeight: 'bold', }}
                    type='text'
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    // disabled={!editable}
                    readOnly
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Role</label>
                  <input
                    style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)',fontWeight: 'bold', }}
                    type='text'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    // disabled={!editable}
                    readOnly
                  />
                </div>
              </div>
              <div className=' profile-loom-compamyinfo-form-btns'>
                <button style={{ width: '30%', margin: '10px' }} className='btn1' onClick={handleEdit}>Edit</button>
                <button style={{ width: '30%', margin: '10px' }} className='btn2' onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className='Lprofile-contact-info' >
          <div  style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }}>
            <h3 style={{ color: 'var(--primary-color)',textAlign:'center',paddingTop:'40px' }}>Contact Information</h3>
            <div style={{padding:"5px"}} className='profile-loom-contact-form'> 
            <div style={{ marginTop: '25px' }}>
              <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Primary Contact</label>
              <input
                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                type='text'
                value={primaryContact}
                onChange={(e) => setPrimaryContact(e.target.value)}
                disabled={!editContact}
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Owner Contact No</label>
              <input
                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                type='text'
                value={ownerContact}
                onChange={(e) => setOwnerContact(e.target.value)}
                disabled={!editContact}
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Manager Contact No</label>
              <input
                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                type='text'
                value={managerContact}
                onChange={(e) => setManagerContact(e.target.value)}
                disabled={!editContact}
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Other Contact No</label>
              <input
                style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
                type='text'
                value={otherContact}
                onChange={(e) => setOtherContact(e.target.value)}
                disabled={!editContact}
              />
            </div>
            <div style={{display:'flex',alignItems:'center'}} className='profile-loom-contact-form-btns'>
              <button style={{ width: '20%', margin: '10px' }} className='btn1' onClick={handleContactEdit}>Edit</button>
              <button style={{ width: '20%', margin: '10px' }} className='btn2' onClick={handleContactSave}>Save</button>
            </div>
          </div>
          </div>
        
            <div className='loom-profileMyloom-all'>
            <div  className='loom-profile-myloom'>
            <div style={{ padding: "30px",cursor:'pointer' }}>
              <span onClick={handleMyloomClick}>My Loom </span>
             
            </div>
            </div>
            <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff',width: 'calc(35%)' }} className='loom-profile-myloom'>
            <div style={{  padding: "30px"}}>
              <span>My Loom </span>
            </div>
            </div>
          </div>     
        
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;









// import React, { useState } from 'react';
// import '../common/static/css/profile.css';

// const Profile = () => {
//   const [editable, setEditable] = useState(false);

//   const [email, setEmail] = useState('diksha@gmail.com');
//   const [ownerName, setOwnerName] = useState('MTS');
//   const [country, setCountry] = useState('India');
//   const [city, setCity] = useState('Kolhapur');
//   const [primaryContact, setPrimaryContact] = useState('8308058383');
//   const [gst, setGst] = useState('27KLTAH14752');
//   const [companyName, setCompanyName] = useState('Vivek Textiles');
//   const [address, setAddress] = useState('YT park');
//   const [state, setState] = useState('Maharashtra');
//   const [pincode, setPincode] = useState('123654');
//   const [registrationNo, setRegistrationNo] = useState('LU00529');
//   const [role, setRole] = useState('Loom');
//   const [ownerContact, setOwnerContact] = useState('7410258963');
//   const [managerContact, setManagerContact] = useState('9874563210');
//   const [otherContact, setOtherContact] = useState('9632587410');

//   const handleEdit = () => {
//     setEditable(true);
//   };

//   const handleSave = () => {
//     setEditable(false);
//     setEmail('');
//     setOwnerName('');
//     setCountry('');
//     setCity('');
//     setPrimaryContact('');
//     setGst('');
//     setCompanyName('');
//     setAddress('');
//     setState('');
//     setPincode('');
//     setRegistrationNo('');
//     setRole('');
//     setOwnerContact('');
//     setManagerContact('');
//     setOtherContact('');
//   };

//   return (
//     <div className='loom-profile-all'>
//       <div style={{ backgroundColor: 'var(  --tershary-color)', paddingBottom: '200px', position: 'relative' }}>
//         <div className='profile-company-info' style={{ position: 'absolute', top: '30px', left: '30px', zIndex: '10', width: 'calc(50%)' }}>
//           <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }}>
//             <h3 className='profile-company-info-tittle' style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Company Information</h3>
//             <div className='profile-loom-compamyinfo-form'>
//               <div style={{ margin: '5px' }}>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Email</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Owner Name</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={ownerName}
//                     onChange={(e) => setOwnerName(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Country</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>City</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Primary Contact</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={primaryContact}
//                     onChange={(e) => setPrimaryContact(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>GST Num</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={gst}
//                     onChange={(e) => setGst(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//               </div>
//               <div style={{ margin: '5px' }}>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Company Name</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Address</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>State</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={state}
//                     onChange={(e) => setState(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>PinCode</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Registration Number</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={registrationNo}
//                     onChange={(e) => setRegistrationNo(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//                 <div style={{ marginTop: '10px' }}>
//                   <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Role</label>
//                   <input
//                     style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                     type='text'
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     disabled={!editable}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <button style={{ width: '30%', margin: '10px' }} className='btn1' onClick={handleEdit}>Edit</button>
//                 <button style={{ width: '30%', margin: '10px' }} className='btn2' onClick={handleSave}>Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='profile-contact-info' style={{ position: 'absolute', top: '30px', right: '30px', zIndex: '10', width: 'calc(50% - 60px)' }}>
//           <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }}>
//             <h3 style={{ color: 'var(--primary-color)',textAlign:'center' }}>Contact Information</h3>
//             <div style={{ marginTop: '25px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Primary Contact</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={primaryContact}
//                 onChange={(e) => setPrimaryContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Owner Contact No</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={ownerContact}
//                 onChange={(e) => setOwnerContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Manager Contact No</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={managerContact}
//                 onChange={(e) => setManagerContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div style={{ marginTop: '15px' }}>
//               <label style={{ fontWeight: 'bold', margin: "10px", color: 'var(--primary-color)' }}>Other Contact No</label>
//               <input
//                 style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
//                 type='text'
//                 value={otherContact}
//                 onChange={(e) => setOtherContact(e.target.value)}
//                 disabled={!editable}
//               />
//             </div>
//             <div>
//               <button style={{ width: '15%', margin: '10px' }} className='btn1' onClick={handleEdit}>Edit</button>
//               <button style={{ width: '15%', margin: '10px' }} className='btn2' onClick={handleSave}>Save</button>
//             </div>
//           </div>
//           <div style={{ margin: '30px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', background: '#fff' }} className='loom-profile-myloom'>
//             <div style={{ marginTop: '75px', padding: "30px" }}>
//               <span>My Loom </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;