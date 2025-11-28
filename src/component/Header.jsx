import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from '../auth/ThemeContext';

export default function Header() {

    // const { theme, toggleTheme } = useContext(ThemeContext)

    const navigate = useNavigate();
    const UserName = localStorage.getItem("username");
    const location = useLocation();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isLoginPage = location.pathname === '/'

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        navigate('/')
    }
    return (
        <div>
            <header className=" fixed bg-white top-0 left-0 w-full shadow-lg px-3 py-2">
                <nav className="flex justify-between">
                    <div className="w-[130px] md:w-[200px] flex items-center">
                        {/* <img src="https://i.postimg.cc/MZCBXb1K/logo.png" alt="LOGO" srcset="" /> */}
                        <Link to='/dashboard' className='font-bold'>My Dasboard !    </Link>
                    </div>
                    {/* <div>  <button onClick={toggleTheme}>
                        🌙 Toggle Theme
                    </button></div> */}
                    <div className="flex items-center gap-3">
                        <div className="navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh]  flex md:items-center gap-[1.5vw] top-[100%]   px-5 md:py-0 py-5 ">
                            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
                                <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"><Link to='/home' >Home</Link></li>
                                <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"><Link to='/Table' >Table</Link></li>
                                <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"><Link to='/TaskManagement' >Task Management</Link></li>
                                <li className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"><Link to='/about'>About</Link></li>
                            </ul>
                        </div>
                        <div className="flex items-center gap-2">
                            {!isLoggedIn && (
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-green-500 text-white px-4 py-1 rounded"
                                >
                                    login
                                </button>
                            )}
                            {isLoggedIn && (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                >
                                    logout
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
