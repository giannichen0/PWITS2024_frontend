import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import FormDoctor from "./FormDoctor";
import FormPatient from "./FormPatient";
import FormReport from "./FormReport";

function FormCRUD({ url, accessToken, closeModal, element }) {
    const [dottori, setDottori] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(element?.doctor?.split(" ").pop());

    const [pazienti, setPazienti] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(element?.patient?.split(" ").pop())
    

    const [updateState, setUpdateState] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "doctor") {
            setSelectedDoctor(value);
        }
        if (name === "patient"){
            setSelectedPatient(value)
        } else {
            setUpdateState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleUpdate = async () => {
        if (url === "doctors") {
            try {
                const response = await axios.put(
                    "http://localhost:8080/admin/doctors",
                    {
                        id: element._id,
                        name: updateState?.name,
                        surname: updateState?.surname,
                        email: updateState?.email,
                        password: updateState?.password,
                        telefono: updateState?.telefono,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                closeModal()
                setUpdateState({})
            } catch (err) {
                console.error("Error fetching doctors:", err);
            }
        }
        if (url === "patients") {
            try {
                const response = await axios.put(
                    "http://localhost:8080/admin/patients",
                    {
                        id: element._id,
                        name: updateState?.name,
                        surname: updateState?.surname,
                        email: updateState?.email,
                        password: updateState?.password,
                        telefono: updateState?.telefono,
                        doctor: selectedDoctor,

                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setSelectedDoctor("")
                setUpdateState({})
                closeModal()
            } catch (err) {
                console.error("Error fetching patients:", err);
            }
        }
        if (url === "exams") {
            try {
            } catch (err) {}
        }
        if (url === "reports") {
            try {
                const response = await axios.put(
                    "http://localhost:8080/admin/reports",
                    {
                        id: element._id,
                        content: updateState?.content,
                        field: updateState?.field,
                        patient: selectedPatient,
                        doctor: selectedDoctor,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setSelectedDoctor("")
                setSelectedPatient("")
                setUpdateState("")
                closeModal()
            } catch (err) {
                console.error("Error fetching reports:", err);
            }
        }
    };

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
            setLoading(false);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    const getPatient = async () =>{
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:8080/admin/patients",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setPazienti(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pazienti:", error);
        } finally {
            setLoading(false);
        }
        
    }

    return url === "doctors" ? (
        <FormDoctor
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
        />
    ) : url === "reports" ? (
        <FormReport
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
            selectedDoctor={selectedDoctor}
            getDoctor={getDoctor}
            dottori={dottori}
            selectedPatient={selectedPatient}
            getPatient={getPatient}
            pazienti = {pazienti}

        />
    ) : (
        <FormPatient
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
            SelectedDoctor={selectedDoctor}
            getDoctor={getDoctor}
            dottori={dottori}
            
        />
    );
}



export default FormCRUD;
