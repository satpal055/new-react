import React, { useState, useContext } from "react";
import { TableContext } from "../context/TableContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

export default function List() {

    const [user, setUser] = useState("");
    const [item, setItem] = useState("");
    const [editIndex, setEditIndex] = useState(null)

    const { tableData, setTableData } = useContext(TableContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user || !item) return;

        const newEntry = { user, item };
        const updatedData = [...tableData];

        if (editIndex !== null) {
            updatedData[editIndex] = { user, item }
            setEditIndex(null)
        }
        else {
            updatedData.push({ user, item })
        }

        setTableData(updatedData); // context updates
        localStorage.setItem("tableData", JSON.stringify(updatedData));

        setUser("");
        setItem("");
    };
    const handleDelete = (index) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
        localStorage.setItem("tableData", JSON.stringify(updatedData));
    };
    const handleEdit = (index) => {
        setEditIndex(index);
        setUser(tableData[index].user)
        setItem(tableData[index].item)
    }

    return (
        <>
            <div>
                <div className="flex items-center justify-center p-5">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-700 border border-white/20 shadow-2xl rounded-2xl w-full max-w-lg p-8 text-white">

                        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
                            Item's List ✨
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>

                            {/* Name */}
                            <div>
                                <label className="text-left block mb-1 font-semibold">Full Name</label>
                                <input
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>

                            {/* Item */}
                            <div>
                                <label className="text-left block mb-1 font-semibold">Item</label>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                    placeholder="Enter your item"
                                    className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full py-3 mt-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                {editIndex !== null ? "Update Item ✏️" : "Add Item 🚀"}
                            </button>

                        </form>
                    </div>
                </div>

                {/* Table Display */}
                <div className="tabledata p-5">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Item</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="even:bg-gray-50">
                                    <td className="border p-2">{row.user}</td>
                                    <td className="border p-2">{row.item}</td>
                                    <td className="border p-2">
                                        <div className="flex justify-around">
                                            <button onClick={() => handleDelete(index)}>
                                                <FontAwesomeIcon icon={faTrash} className="text-lg text-red-700" />
                                            </button>
                                            <button onClick={() => handleEdit(index)}>
                                                <FontAwesomeIcon icon={faPen} className="text-lg text-gray-500" />
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
