import { useState } from 'react'
import React from 'react'
import ChildMemo from './ChildMemo'


export default function ParentMemo() {

    const [count, setCount] = useState(0);

    return (
        <>
            <div className="pt-[100px] pb-3 flex flex-col justify-center items-center bg-gray-900 text-white">
                <h1 className="text-5xl font-bold mb-4">UseMemoHook</h1>

                <h1 className="text-5xl font-bold mb-4">Count: {count}</h1>

                <h2 className="text-xl mb-10">
                    {/* Expensive Value: {expensiveCalculation} */}
                </h2>

                <div className="space-x-4">
                    <button
                        onClick={() => setCount(count + 1)}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold"
                    >
                        Increase
                    </button>

                    <button
                        onClick={() => setCount(count - 1)}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-lg font-semibold"
                    >
                        Decrease
                    </button>

                    <button
                        onClick={() => setCount(0)}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold"
                    >
                        Reset
                    </button>
                </div>

                <ChildMemo />
            </div>


        </>
    )
}
