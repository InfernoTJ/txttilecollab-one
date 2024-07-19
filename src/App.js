import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Sidebar from './component/Sidebar';
import Home from '../src/loom/Home';

import Dashboard from '../src/component/Dashboard';
import LoomDetails from './loom/LoomDetails';
import LoomsBooking from './loom/LoomBooking';
import Jobwork from './loom/Jobwork';
import Liveorder from './loom/Liveorder';
import Cancelledorder from './loom/Cancelledorder';
import GetYarn from './loom/GetYarn';
import Calculation from './loom/Calculation';
import CompletedOrder from './loom/CompletedOrder';
import LoomRegister from './component/LoomRegister';
import Loom_registerform from './component/Loom_registerForm';
import Loomotp from './component/Loomotp';
import Forgotpassword from './component/Pages/Forgot_password';
import LoomForgot_otp from './component/Pages/LoomForgot_otp';
import GenerateEnquiry from './trader_Side/GenerateEnquiry';
import LoomBooking from './loom/Loom_booking.js';
import UpdateGenerateEnquiry from './loom/UpdateGenerateEnquiry';
import LoomOrderDetails from './loom/LoomOrderDetails'
import CheckResponse from './trader_Side/CheckResponse';
import Trliveorder from './trader_Side/Trliveorder';
import YarnRateT from './trader_Side/YarnRateT';
import Tdashboard from './trader_Side/Tdashboard';
import Tcalculations from './trader_Side/Tcalculations';

import TorderCompleted from './trader_Side/TorderCompleted';
import IncompleteTask from './trader_Side/IncompleteTask';
import Trorderdetails from './trader_Side/Trorderdetails.js';
import Users from '../src/Admin _side/Users.js'
import Admin_trader from './Admin _side/Admin_trader.js';
import Addmin_loom from './Admin _side/Addmin_loom.js';
import Admin_yarn from './Admin _side/Admin_yarn.js';
import Profile from './loom/Profile.js';
import Tprofile from './trader_Side/Tprofile.js';

import MyLoom from './loom/Myloom.js';
import MyLoomDetails from './loom/MyLoomDetails.js';
import Compltedorderdetails from './loom/CompletedordersDetails.js'

import TknottingOffer from './trader_Side/TknottingOffer.js';
import MyEnquiries from './trader_Side/MyEnquiries.js';
import Notification from '../src/YarnSide/Notification';
import Y_loom from './YarnSide/Y_loom.js';
import Y_trader from './YarnSide/Y_trader.js';

import GenerateknottingOffer from '../src/loom/GenerateknottingOffer.js';
import KnottingResponse from './loom/KnottingResponse.js';

import Update_myenquiries from './trader_Side/Update_myenquiries.js';
import UpdateMyEnquiry_form from './trader_Side/UpdateMyEnquiry_form.js';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sidebar' element={<Sidebar />}>
            <Route path='home' element={<Home />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='tdashboard' element={<Tdashboard />} />
            <Route path='loomdetails' element={<LoomDetails />} />
            <Route path='loom/LoomBooking/:oid' element={<LoomsBooking />} />
            <Route path='loombookDetails' element={<LoomBooking />} />
            <Route path='jobwork-enquiry' element={<Jobwork />} />
            <Route path='live-orders' element={<Liveorder />} />
            <Route path='my-loom' element={<MyLoom />} />
            <Route path='cancelled-order' element={<Cancelledorder />} />
            {/* <Route path='knotting-offers' element={<Knotting_Offer/>}/> */}
            <Route path='generateknottingOffer' element={<GenerateknottingOffer/>}/>
            <Route path='knottingResponse' element={<KnottingResponse/>}/>

            <Route path='trader-knotting-offers' element={<TknottingOffer/>}/>
            <Route path='get-yarn' element={<GetYarn />} />
            <Route path='trader-get-yarn' element={<YarnRateT />} />
            <Route path='calculation' element={<Calculation />} />
            <Route path='Tcalculation' element={<Tcalculations />} />
            <Route path='completed-orders' element={<CompletedOrder />} />
            <Route path='T-completed-orders' element={<TorderCompleted />} />
            <Route path='plan-loom' element={<GenerateEnquiry />} />
            {/* trader side */}
            <Route path='check-response' element={<CheckResponse />} />
            <Route path='L-Profile' element={<Profile />} />
             <Route path='myloomdetails/:loomid' element={<MyLoomDetails/>}/>
            <Route path='T-Profile' element={<Tprofile />} />
            <Route path='myenquiries'element={<MyEnquiries/>}/>
            <Route path='updatemyenquiries' element={<Update_myenquiries/>}/>
            <Route path='updatemyenquiriesform/:enquiryid' element={<UpdateMyEnquiry_form/>}/>

            {/* <Route  path='human-resource' element={<HumanResource/>}/> */}
            <Route path="updateenquiry/:enquiryNo" element={<UpdateGenerateEnquiry />} />
            <Route path='live-orders/orderdetails/:orderid' element={<LoomOrderDetails />} />
  <Route path='completed-orders/loom-completed-orders/:orderid' element={<Compltedorderdetails />} />
            <Route path='trader-live-orders' element={<Trliveorder />} />
            <Route path='trader-live-orders/trorderdetails/:orderid' element={<Trorderdetails />} />
            <Route path='incomplete-task' element={<IncompleteTask />} />

            <Route path='users' element={<Users />} />
            <Route path='trader' element={<Admin_trader />} />
            <Route path='loom' element={<Addmin_loom />} />
            <Route path='yarn' element={<Admin_yarn />} />

            <Route path='notifications' element={<Notification />} />
            <Route path='yarn-loom' element={<Y_loom/>} />
            <Route path='yarn-Trader' element={<Y_trader/>} />
          </Route>

          {/* <Route path='/loom_register' element={<LoomRegister />} /> */}
          {/* <Route path='/loom-register/otp' element={<Loomotp />} /> */}
          <Route path='/loom-register/otp/resgistrationform' element={<Loom_registerform />} />

          <Route path='/forgot-password' element={<LoomForgot_otp />} />
          <Route path='/forgot-password/otp' element={<Forgotpassword />} />

          {/* routes for admin */}


        </Routes>
      </Router>
    </>
  );
}

export default App;
