import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
// import { BSInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import AdminDoctor from "./admin/AdminDoctor"
import AuthContext from "../../context/authProvider"; 

const AdminDashboard = () => {

    const navigate = useNavigate()

    const { accessToken } = useContext(AuthContext)

    useEffect(()=>{
        if(!accessToken)
            navigate("/")
    },[])


    console.log(accessToken)
    return <>dentro admin</>
}

export default AdminDashboard;
