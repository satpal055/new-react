import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Login() {

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username)
        localStorage.setItem('pass', pass)
        localStorage.setItem("isLoggedIn", 'true')


        console.log(' ', username)
        console.log(' ', pass)

        setUsername('')
        setPass('')

        navigate("/Home");


    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit}

                    className="bg-white shadow-lg rounded-2xl p-8 w-96"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                        Login
                    </h2>

                    {/* Username */}
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>

        </>
    )
}
