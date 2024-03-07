import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import FormDoctor from "./FormDoctor";
import FormPatient from "./FormPatient";
import FormReport from "./FormReport";
import FormExam from "./FormExam";

function FormCRUD({ url, accessToken, closeModal, element, mode = "edit" }) {
    const [dottori, setDottori] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(
        element?.doctor?.split(" ").pop()
    );

    const [pazienti, setPazienti] = useState([]);


    const [selectedPatient, setSelectedPatient] = useState(
        element?.patient?.split(" ").pop()
    );

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(
        element?.report?.split(" ").pop()
    );

    const [fieldExam, setFieldExam] = useState("")

    const [updateState, setUpdateState] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "doctor") {
            setSelectedDoctor(value);
        }
        if (name === "patient") {
            setSelectedPatient(value);
        }
        if (name === "report") {
            setSelectedReport(value);
        }
        if (name === "report") {
            setFieldExam(value);
        } else {
            setUpdateState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    //update dei miei model, alla fine di tutto resetto tutti i miei state
    const handleUpdate = async () => {
        if (mode === "add") {
            if (url === "doctors") {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/admin/doctors",
                        {
                            name: updateState.name,
                            surname: updateState.surname,
                            email: updateState.email,
                            password: updateState.password,
                            telefono: updateState.telefono,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    closeModal();
                    setUpdateState({});
                } catch (err) {
                    console.error("Error fetching doctors:", err);
                    closeModal();
                    setUpdateState({});
                }
            }
            if (url === "patients") {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/admin/patients",
                        {
                            name: updateState.name,
                            surname: updateState.surname,
                            email: updateState.email,
                            password: updateState.password,
                            telefono: updateState.telefono,
                            doctor: selectedDoctor,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    closeModal();
                    setSelectedDoctor("");
                    setUpdateState({});
                    setDottori([]);
                } catch (err) {
                    console.error("Error fetching doctors:", err);
                    setSelectedDoctor("");
                    setUpdateState({});
                    setDottori([]);
                    closeModal();
                }
            }
            if (url === "reports") {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/admin/reports",
                        {
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
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    closeModal();
                } catch (err) {
                    console.error("Error fetching reports:", err);
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    closeModal();
                }
            }
            if (url === "exams") {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/admin/exams",
                        {
                            content: updateState?.content,
                            field: fieldExam,
                            patient: selectedPatient,
                            doctor: selectedDoctor,
                            report: selectedReport,
                            completed: updateState?.completed,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setSelectedReport("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    setReports([]);
                    setFieldExam("")
                    closeModal();
                } catch (err) {
                    console.error("Error fetching reports:", err);
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setSelectedReport("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    setReports([]);
                    setFieldExam("")
                    closeModal();
                }
            }
        } else {
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
                    closeModal();
                    setUpdateState({});
                } catch (err) {
                    console.error("Error fetching doctors:", err);
                    closeModal();
                    setUpdateState({});
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
                    setSelectedDoctor("");
                    setUpdateState({});
                    setDottori([]);
                    closeModal();
                } catch (err) {
                    console.error("Error fetching patients:", err);
                    setSelectedDoctor("");
                    setUpdateState({});
                    setDottori([]);
                    closeModal();
                }
            }
            if (url === "exams") {
                try {
                    const response = await axios.put(
                        "http://localhost:8080/admin/exams",
                        {
                            id: element._id,
                            content: updateState?.content,
                            field: updateState?.field,
                            patient: selectedPatient,
                            doctor: selectedDoctor,
                            report: selectedReport,
                            completed: updateState?.completed,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setSelectedReport("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    setReports([]);
                    closeModal();
                } catch (err) {
                    console.error("Error fetching reports:", err);
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setSelectedReport("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    setReports([]);
                    closeModal();
                }
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
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    closeModal();
                } catch (err) {
                    console.error("Error fetching reports:", err);
                    setSelectedDoctor("");
                    setSelectedPatient("");
                    setUpdateState("");
                    setDottori([]);
                    setPazienti([]);
                    closeModal();
                }
            }
        }
    };
    //serve per report ed exam e patient
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

    //serve per report ed exam
    const getPatient = async () => {
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
    };

    //serve per exam
    const getReport = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:8080/admin/reports",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setReports(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pazienti:", error);
        } finally {
            setLoading(false);
        }
    };

    return url === "doctors" ? (
        <FormDoctor
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
            mode={mode}
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
            pazienti={pazienti}
            mode={mode}
        />
    ) : url === "exams" ? (
        <FormExam
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
            selectedDoctor={selectedDoctor}
            getDoctor={getDoctor}
            dottori={dottori}
            selectedPatient={selectedPatient}
            getPatient={getPatient}
            pazienti={pazienti}
            selectedReport={selectedReport}
            getReport={getReport}
            reports={reports}
            mode={mode}
            setSelectedPatient={setSelectedPatient}
            setSelectedReport={setSelectedReport}
            setFieldExam={setFieldExam}
            fieldExam = {fieldExam}
        />
    ) : (
        <FormPatient
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
            SelectedDoctor={selectedDoctor}
            getDoctor={getDoctor}
            dottori={dottori}
            mode={mode}
        />
    );
}

export default FormCRUD;
