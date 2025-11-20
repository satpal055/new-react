import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Table from "../page/Table";
// import About from "../page/About";
import { TableContext } from "../context/TableContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function DashboardLayout() {

    const { tableData } = useContext(TableContext)


    const navigate = useNavigate();
    const UserName = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div className="flex h-screen bg-gray-100 mt-13">

            {/* ---------------- Sidebar ---------------- */}
            <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
                <h2 className="text-2xl font-bold mb-6"> 👋 {UserName}</h2>

                <nav className="space-y-3">
                    <Link
                        to="/dashboard/Setting"
                        className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Setting
                    </Link>
                    <Link
                        to="/dashboard/User"
                        className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Users
                    </Link>
                    <Link
                        to="/dashboard/List"
                        className="relative block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Lists
                        {Array.isArray(tableData) && tableData.length > 0 && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
                         w-6 h-6 flex items-center justify-center 
                         text-xs font-bold text-white bg-red-500 
                         rounded-full">
                                {tableData.length}
                            </span>
                        )}
                    </Link>


                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
                    >
                        Products
                    </button>
                </nav>
            </aside>

            {/* ---------------- Main Content ---------------- */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <header className="bg-white shadow px-5 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Welcome to Dashboard</h1>
                    {/* <p className="text-gray-600">
                        👋 {localStorage.getItem("username") || "User"}
                    </p> */}

                </header>


                {/* Page Content From Routes */}
                <main className="p-5 overflow-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}
