import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Table() {
    const [data, setApiData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const rowPerPage = 10;
    const [filteredData, setFilteredData] = useState([]);

    const [filter, setFilter] = useState("All");

    const navigate = useNavigate();
    // const UserName = localStorage.getItem("username");
    // const pass = localStorage.getItem('pass')



    const fetchAPI = async () => {
        try {

            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

            setApiData(response.data)
            setFilteredData(response.data)
            console.log("data", response.data)

        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    const handleLogin = () => {
        navigate('/')
    }
    const indexOfLastRow = currentPage * rowPerPage
    const indexOfFirstRow = indexOfLastRow - rowPerPage
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow)
    const totalPages = Math.ceil(filteredData.length / rowPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);

        if (value === "All") {
            setFilteredData(data);
        } else if (value === "Complete") {
            const complete = data.filter((item) => item.completed === true);
            setFilteredData(complete);
        } else if (value === "Not Complete") {
            const notComplete = data.filter((item) => item.completed === false);
            setFilteredData(notComplete);
        }
        setCurrentPage(1);
    };
    return (
        <>



            <div className='myTable overflow-y-auto  m-15'>
                <div className='flex'>
                    <h2 className='text-3xl font-bold mb-8 text-center'>Data - Sheet</h2>
                    <select

                        value={filter}
                        onChange={handleFilterChange} className="ms-auto mb-5 w-64 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Complete">Complete</option>
                        <option value="Not Complete">Not Complete</option>
                    </select>
                </div>

                <table className="text-center min-w-full bg-white border border-gray-200 rounded-lg shadow-md">

                    <thead>
                        <tr className="bg-blue-600 text-white ">
                            <th className="py-3 px-4 rounded-tl-lg">UserID</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">ID</th>
                        </tr>
                    </thead>


                    <tbody>

                        {
                            currentRows.map((item, index) => (
                                <tr key={index}

                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4">{item.completed ? "True" : "False"}</td>
                                    <td className="py-3 px-4">{item.title}</td>
                                    <td className="py-3 px-4 font-medium text-gray-700">{item.id}</td>

                                </tr>
                            ))
                        }



                    </tbody>
                </table>


                <div className="flex justify-center items-center mt-4 gap-4">
                    <button disabled={currentPage === 1} onClick={prevPage} className='px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50'>
                        Prev
                    </button>
                    <span className="text-gray-700 font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button disabled={currentPage === totalPages} onClick={nextPage} className='px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50'>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}
