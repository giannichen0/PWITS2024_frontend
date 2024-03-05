import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";

const AdminPatient = ({accessToken, role}) => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!accessToken || role !== "admin") {
            navigate("/");
        } else {
            setLoading(true);
            const getPatients = async () => {
                try {
                    const response = await axios.get(
                        "http://localhost:8080/admin/patients",
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setPatient(response.data);
                } catch (error) {
                    console.error("Error fetching Patients:", error);
                } finally {
                    setLoading(false);
                }
            };
            getPatients();
        }
    }, []);

    return (
      <div className="min-h-full h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[#F6F3F9]">
            {loading ? <Spinner /> : <Table data={patient} accessToken={accessToken}/>}
        </div>
    )
};

export default AdminPatient;
