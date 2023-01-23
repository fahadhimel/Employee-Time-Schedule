import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Components/Home';
import PresentTime from './Components/All-Input/PresentTime';
import OutTime from './Components/All-Input/OutTime';
import LeaveDay from './Components/All-Input/LeaveDay';
import PageNotFound from './Components/PageNotFound';
import Registration from './Components/Log_or_Reg/Registration';
import Login from './Components/Log_or_Reg/Login';
import About from './Components/About';
import Protected from './Components/Protected';
import Contract from './Components/Contract';
import View from './Components/HomeElement/View';
import Admin from './Components/Admin/Admin';
import Admin_Protected from './Components/Admin-Protected';
import Admin_Login from './Components/Log_or_Reg/Admin_Login';
import Admin_Home from './Components/Admin/Admin Components/Admin_Home';
import Admin_Details_Home from './Components/Admin/Admin Components/Admin  details Home/Admin_Details_Home';
import Admin_Edit_Details_Home from './Components/Admin/Admin Components/Admin  details Home/Admin_Edit_Details_Home';
import Details_present from './Components/Admin/Admin Components/Admin  details Home/Admin_Employee_Details/Details_present';
import Details_Out from './Components/Admin/Admin Components/Admin  details Home/Admin_Employee_Details/Details_Out';
import Details_Leave from './Components/Admin/Admin Components/Admin  details Home/Admin_Employee_Details/Details_Leave';
import Admin_View from './Components/Admin/Admin Components/Admin  details Home/Admin_Employee_Details/Adnin_view_Page/Admin_View';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route exact path='/Registration' element={<Registration />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Admin_Login' element={<Admin_Login />} />

          <Route element={<Admin_Protected />}>
            <Route exact path='/Admin' element={<Admin />} />
            <Route exact path='/Admin_Home' element={<Admin_Home />} />
            <Route exact path='/Admin_details_Home/:id' element={<Admin_Details_Home />} />
            <Route exact path='/Admin_Edit_Details_Home/:id' element={<Admin_Edit_Details_Home />} />
            <Route exact path='/Details_Present/:id' element={<Details_present />} />
            <Route exact path='/Details_Out/:id' element={<Details_Out />} />
            <Route exact path='/Details_Leave/:type/:id' element={<Details_Leave />} />
            <Route exact path='/Admin_View/:type/:id' element={<Admin_View />} />
          </Route>

          <Route element={<Protected />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contract />} />
            <Route exact path='/PresentTime' element={<PresentTime />} />
            <Route exact path='/Outtime' element={<OutTime />} />
            <Route exact path='/LeaveDay' element={<LeaveDay />} />
            <Route exact path='View/:type/:id' element={<View />} />
            <Route exact path='*' element={<PageNotFound />} />
          </Route>

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
