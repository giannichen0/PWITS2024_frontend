import React, {useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import FormDoctor from "./FormDoctor";
import FormPatient from "./FormPatient";

function FormCRUD({ url, accessToken, closeModal, id }) {
    const [dottori, setDottori] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(id);

    const [updateState, setUpdateState] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "doctor") {
            setSelectedDoctor(value);
        } else {
            setUpdateState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        console.log(updateState);
        console.log(selectedDoctor);
    };

    const handleUpdate = ()=>{
        
    }

    
    const getDoctor = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:8080/admin/doctors",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDottori(response.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    return url === "doctors" ? (
        <FormDoctor handleChange={handleChange} handleUpdate={handleUpdate} closeModal={closeModal}></FormDoctor>
    ) : (
        <FormPatient handleChange={handleChange} handleUpdate={handleUpdate} closeModal={closeModal} selectedDoctor={selectedDoctor} getDoctor={getDoctor} dottori={dottori}></FormPatient>
    );
}

export default FormCRUD;
