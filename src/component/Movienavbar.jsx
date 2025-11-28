import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Movienavbar() {

    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path ? "text-yellow-400 font-semibold" : "text-gray-300";

    return (
        <nav className="bg-gray-900 shadow-lg px-6 py-4 flex items-center justify-between">

            {/* Brand */}
            <Link
                to="/dashboard/demo"
                className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition"
            >
                🎬 Movie App
            </Link>

            {/* Links */}
            <div className="flex space-x-6">

                <Link
                    to="/dashboard/demo"
                    className={`${isActive("/dashboard/demo")} hover:text-yellow-300 text-lg transition`}
                >
                    Home
                </Link>

                <Link
                    to="/dashboard/demo/favorites"
                    className={`${isActive("/dashboard/demo/favorites")} hover:text-yellow-300 text-lg transition`}
                >
                    Favorites
                </Link>

            </div>
        </nav>
    );
}
