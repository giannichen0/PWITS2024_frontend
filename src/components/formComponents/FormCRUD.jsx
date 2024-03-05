import React, { useEffect, useState } from "react";
import { doctorFields, patientFields } from "../../../constants/FormFields";
import axios from "axios";
import Spinner from "../Spinner";

function FormCRUD({ url, accessToken, closeModal, id }) {
    const [dottori, setDottori] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(id);

    let fieldState = {};

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

    const handleUpdate = ()=>{}

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
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    const doctorForm = (
        <form className="bg-[#F6F3F9] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {doctorFields.map((field) => (
                <div key={field.id}>
                    <label
                        htmlFor={field.labelFor}
                        className="block text-sm pt-2 font-medium text-gray-700"
                    >
                        {field.labelText}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        id={field.id}
                        autoComplete="off"
                        required={field.isRequired}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder={field.placeholder}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <div className="bg-[#F6F3F9] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto"
                >
                    Modifica
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Annulla
                </button>
            </div>
        </form>
    );

    const patientForm = (
        <form className="bg-[#F6F3F9] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {patientFields.map((field) => (
                <div key={field.id}>
                    <label
                        htmlFor={field.labelFor}
                        className="block text-sm pt-2 font-medium text-gray-700"
                    >
                        {field.labelText}
                    </label>
                    {field.name === "doctor" ? (
                        <select
                            name={field.name}
                            id={field.id}
                            autoComplete="off"
                            required={field.isRequired}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={selectedDoctor}
                            onChange={handleChange}
                        >
                            <option value="">Select a doctor</option>
                            {/* Map over the list of doctors and create an option for each one */}
                            {dottori.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            id={field.id}
                            autoComplete="off"
                            required={field.isRequired}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <div className="bg-[#F6F3F9] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto"
                >
                    Modifica
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Annulla
                </button>
            </div>
        </form>
    );

    useEffect(() => {
        getDoctor();
        
    }, []);

    return loading ? (
        <Spinner></Spinner>
    ) : url === "doctors" ? (
        doctorForm
    ) : (
        patientForm
    );
}

export default FormCRUD;