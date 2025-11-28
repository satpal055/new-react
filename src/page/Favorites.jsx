import React from 'react'
import Movienavbar from '../component/Movienavbar'
import { FaRegHeart } from "react-icons/fa";

export default function Favorites() {

    return (
        <>
            <Movienavbar />
            <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gray-100 min-h-[80vh]">

                {/* Icon */}
                <div className="bg-white shadow-lg p-6 rounded-full mb-6">
                    <FaRegHeart className="text-red-500 text-5xl" />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    No Favorites Yet
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 text-lg max-w-xl">
                    Start adding movies to your favorites, and they will appear here.
                </p>

            </div>

        </>
    )
}
