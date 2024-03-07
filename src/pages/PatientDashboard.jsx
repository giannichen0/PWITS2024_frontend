import React, { useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import NavbarDoctor from "../components/NavbarDoctor"
import NotFound from "./NotFound";
import PatientDoctor from "./patient/PatientDoctor";
import PatientExam from "./patient/PatientExam";
import PatientReport from "./patient/patientReport";

const PatientDashboard = () => {
  return (
    <div>PatientDashboard</div>
  )
}

export default PatientDashboard