import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Modal from "./Modal";

function Table({ data, accessToken }) {
    const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    

    const [mode, setMode] = useState("");

    const formatDate = (dateString) => {
        if (typeof dateString === "boolean") {
            return dateString ? "Completato" : "Non completato";
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }

        // Format the date using toLocaleDateString with Italian locale settings
        return date.toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleEditClick = (item) => {
        // Set the selected item for editing
        setSelectedItem(item);
        setMode("edit");
        // Open the modal
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        // Set the selected item for deletion
        setSelectedItem(id);
        setMode("delete");
        // Open the modal for confirmation
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // Close the modal
        setIsModalOpen(false);
        // Reset the selected item
        setSelectedItem("");
        setMode("")
    };

    return (
        <>
        {columnHeaders.length>0 ?
            <table className="w-full border-separate border-spacing-2">
                <thead>
                    <tr>
                        {/* Dynamically create th elements based on the properties of the data */}
                        {columnHeaders.map((header, index) => (
                            <th
                                key={index}
                                className="border border-slate-600 rounded-md"
                            >
                                {header}
                            </th>
                        ))}
                        <th className="border border-slate-600 rounded-md">
                            Operations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="h-14">
                            {/* Render td elements for each property in the item */}
                            {columnHeaders.map((header, idx) => (
                                <td
                                    key={idx}
                                    className="border border-slate-700 rounded-md text-center max-w-14"
                                >
                                    {new Date(item[header]).toString() !==
                                    "Invalid Date" ? (
                                        formatDate(item[header])
                                    ) : (
                                        <div className="overflow-x-auto whitespace-nowrap">
                                            {item[header]}
                                        </div>
                                    )}
                                </td>
                            ))}
                            <td className="border border-slate-700 rounded-md text-center">
                                <div className="flex justify-center gap-x-4">
                                    <button
                                        onClick={() =>
                                            handleEditClick(item)
                                        }
                                        className="text-2xl text-yellow-600"
                                    >
                                        <AiOutlineEdit />
                                    </button>
                                    {/* Button to open delete modal */}
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(item._id)
                                        }
                                        className="text-2xl text-red-600"
                                    >
                                        <MdOutlineDelete />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    : <h1>No data</h1>    
    }
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                selectedItem={selectedItem}
                mode={mode}
                accessToken={accessToken}
            />
                                                           
        </>
    
    );
}

export default Table;
