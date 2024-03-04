import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
// import { BSInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import AdminDoctor from "./admin/AdminDoctor"
import AuthContext from "../../context/authProvider"; 
import NavbarMio from "../components/NavbarMio";
import Table from "../components/Table"


const AdminDashboard = () => {

    const navigate = useNavigate()

    const { accessToken } = useContext(AuthContext)

    const [dottori, setDottori] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!accessToken) {
            navigate("/");
        } else {
            setLoading(true);
            const getDottori = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/admin/doctors", {
                        headers: {
                            Authorization: `Bearer ${accessToken.split("\t")[0]}`
                        }
                    });
                    setDottori(response.data);
                } catch (error) {
                    console.error("Error fetching doctors:", error);
                } finally {
                    setLoading(false);
                }
            };
            getDottori();
        }
    }, []);


    return <>
    <NavbarMio />
    <div className="min-h-full h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[#F6F3F9]">
        <h1 className="text-center text-3xl">Dottori</h1>
        {loading ? (
            <Spinner />
        
        ) : (
            <Table data={dottori} />
        )}
    </div>
</>
}

export default AdminDashboard;
