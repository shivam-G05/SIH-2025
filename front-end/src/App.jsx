import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import Weather from "./components/Weather.jsx";
import Vision from "./components/Vision.jsx";
import Upload from "./components/Upload.jsx";
import SoilEnquiry from "./components/SoilEnquiry.jsx";
import Dashboard from "./components/Dashboard";
import OurTeam from "./components/OurTeam.jsx"

function App() {
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token && window.location.pathname !== "/register") {
    navigate("/login");
  }
}, [navigate]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/soil-enquiry" element={<SoilEnquiry />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ourteam" element={<OurTeam />} />
      </Routes>
    </>
  );
}

export default App;
