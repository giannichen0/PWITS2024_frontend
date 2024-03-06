import React, { useState, useEffect } from "react";
import { examFields } from "../../../constants/FormFields";

const FormExam = ({
    handleChange,
    handleUpdate,
    closeModal,
    selectedDoctor,
    getDoctor,
    dottori,
    selectedPatient,
    getPatient,
    pazienti,
    selectedReport,
    getReport,
    reports,
}) => {
    useEffect(() => {
        getDoctor();
        getPatient();
        getReport();
    },[]);

    const formExam = (
        <form className="bg-[#F6F3F9] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {examFields.map((field) => (
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
                            <option value="">
                                seleziona il dottore o lascia vuoto
                            </option>
                            {/* Map over the list of doctors and create an option for each one */}
                            {dottori.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    ) : field.name === "patient" ? (
                        <select
                            name={field.name}
                            id={field.id}
                            autoComplete="off"
                            required={field.isRequired}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={selectedPatient}
                            onChange={handleChange}
                        >
                            <option value="">
                                seleziona il paziente o lascia vuoto
                            </option>

                            {/* Map over the list of patients and create an option for each one */}
                            {pazienti.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    ) : field.name === "report" ? (
                        <select
                        name={field.name}
                        id={field.id}
                        autoComplete="off"
                        required={field.isRequired}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={selectedReport}
                        onChange={handleChange}
                    >
                        <option value="">
                            seleziona il paziente o lascia vuoto
                        </option>

                        {/* Map over the list of patients and create an option for each one */}
                        {reports.map((report) => (
                            <option key={report._id} value={report._id}>
                                {report.content}
                            </option>
                        ))}
                    </select>
                    ) : field.name === "completed" ? (
                        <select
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        name={field.name}
                        id={field.id}
                        autoComplete="off"
                        required={field.isRequired}
                        value={field.completed}
                        onChange={handleChange}
                        
                        >
                            <option value="">
                            Seleziona lo stato: default non completato
                        </option>
                            <option value={true}>
                            Completato
                        </option>
                        <option value={false} >
                            Non completato
                        </option>
                        </select>
                    ) :(
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

    return formExam;
};

export default FormExam;
