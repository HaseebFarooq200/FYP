import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './App.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home';
import DoctorsList from './Components/DoctorsList';
import SpecialityDoctors from './Components/SpecialityDoctors';
import DoctorProfile from './Components/DoctorProfile';
import PatientProfile from './Components/PatientProfile';
import HospitalList from "./Components/HospitalList";
import HealthBlogs from "./Components/HealthBlogs";
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
