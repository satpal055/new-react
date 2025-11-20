import React from 'react'

export default function Home() {
    return (
        <div>
            <div className="w-full h-100 bg-gradient-to-r from-blue-600 to-indigo-300 flex items-center justify-center text-center px-6">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Welcome to Our Website
                    </h1>
                    <p className="text-white text-lg opacity-90">
                        We help you grow your business with innovative solutions.
                    </p>

                    <button className="mt-5 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-100">
                        Get Started
                    </button>
                </div>
            </div>

        </div>
    )
}
