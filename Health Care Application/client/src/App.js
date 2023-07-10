import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './App.css';
import Navbar from './Components/UserPanel/Navbar'
import Footer from './Components/UserPanel/Footer'
import Login from './Components/UserPanel/Login'
import Register from './Components/UserPanel/Register'
import Home from './Components/UserPanel/Home';
import DoctorsList from './Components/UserPanel/DoctorsList';
import SpecialityDoctors from './Components/UserPanel/SpecialityDoctors';
import DoctorProfile from './Components/UserPanel/DoctorProfile';
import PatientProfile from './Components/UserPanel/PatientProfile';
import HospitalList from "./Components/UserPanel/HospitalList";
import HealthBlogs from "./Components/UserPanel/HealthBlogs";
import FindDisease from "./Components/UserPanel/FindDisease";
import Appointments from "./Components/UserPanel/Appointments";
import MyDoctorProfile from './Components/DoctorPanel/DoctorProfile.jsx'
// import Admin from "./Components/Admin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/admin' element={<Admin />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/alldocs' element={<DoctorsList />} />
          <Route path='/specdocs' element={<SpecialityDoctors />} />
          <Route path='/docprofile' element={<DoctorProfile />} />
          <Route path='/patprofile' element={<PatientProfile />} />
          <Route path='/hoslist' element={<HospitalList />} />
          <Route path='/healthblog' element={<HealthBlogs />} />
          <Route path='/disease' element={<FindDisease />} />
          <Route path='/myappointment' element={<Appointments />} />
          <Route path='/myprofile' element={<MyDoctorProfile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
