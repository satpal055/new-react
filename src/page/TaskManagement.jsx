import React, { useState, useEffect, useContext, useMemo, useCallback, useRef } from "react";
import { ThemeContext } from "../auth/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "../context/TaskContext";



export default function TaskManagement() {

    const { state, dispatch } = useTasks();
    const [filter, setFilter] = useState("all");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext)
    const inputRef = useRef(null);




    useEffect(() => {

        // Ensure every task has status
        state.forEach((task) => {
            if (!task.status) {
                dispatch({
                    type: "UPDATE_TASK",
                    payload: { ...task, status: "not-complete" },
                });
            }
        });
    }, []);


    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log({ title, description });
            inputRef.current.focus();


            // Empty validation
            if (!title.trim() || !description.trim()) return;

            if (editId) {
                console.log("edit render")
                dispatch({
                    type: "UPDATE_TASK",
                    payload: { id: editId, title, description },
                });
                setEditId(null);

            }
            else {
                dispatch({
                    type: "ADD_TASK",
                    payload: {
                        id: Date.now(),
                        title,
                        description,
                        status: "not-complete",
                    },
                });
            }


            setTitle("");
            setDescription("");
            inputRef.current.focus();
        }, [title, description, editId])


    const handleEdit = useCallback(
        (task) => {

            setTitle(task.title);
            setDescription(task.description);
            setEditId(task.id); // ⭐ store id for update

        }, [])

    const filteredTasks = useMemo(() => {
        // console.log("Filtering tasks...");   helps you see when it runs

        return state.filter((task) => {
            if (filter === "all") return true;
            if (filter === "complete") return task.status === "complete";
            if (filter === "not-complete") return task.status === "not-complete";
            return true;

        });




    }, [state, filter]); // recompute ONLY when state or filter changes


    return (
        <>
            <div className='main_div m-6 '>


                <div className='flex justify-between mt-10'>
                    <div className=' w-[35%] flex justify-center mt-10'>
                        <div className="w-full max-w-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-8 border border-white/30">


                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Title */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Title
                                    </label>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter title"
                                        className="
                w-full px-4 py-3 rounded-xl border border-white/40
                bg-white/10 text-white placeholder-white/70
                focus:outline-none focus:ring-2 focus:ring-pink-300
                shadow-lg
              "
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter Description"
                                        rows="4"
                                        className="
                w-full px-4 py-3 rounded-xl border border-white/40
                bg-white/10 text-white placeholder-white/70
                focus:outline-none focus:ring-2 focus:ring-purple-300
                shadow-lg
              "
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="
              w-full py-3 rounded-xl text-lg font-semibold
              bg-gradient-to-r from-pink-500 to-purple-600
              text-white shadow-xl hover:opacity-90 transition
            "
                                >
                                    {editId ? "Update Task" : "Add Task"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className='main_table w-[60%] mt-10'>
                        <div className='flex items-center justify-between mb-10'>
                            <div>
                                <h2 className="text-3xl font-extrabold text-black text-center">
                                    Task List
                                </h2>
                            </div>
                            <div>
                                <select
                                    className="border px-3 py-1 rounded"
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="complete">Completed</option>
                                    <option value="not-complete">Not Completed</option>
                                </select>

                            </div>
                            <div>
                                <button onClick={toggleTheme}>
                                    {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
                                </button>
                            </div>
                        </div>
                        <div className={`max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden transition-all duration-500
                            ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}
                        `}>
                            <table className="w-full text-center border-collapse">

                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                                            Title
                                        </th>
                                        <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                                            Description
                                        </th>
                                        <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                                            Status
                                        </th>
                                        <th className="py-3 px-4 font-semibold text-gray-700 border-b">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredTasks.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="p-3 text-gray-700">{item.title}</td>
                                            <td className="p-3 text-gray-600">{item.description}</td>
                                            <td className='p-3 text-gray-600'> {/* Toggle Status */}
                                                <button
                                                    onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: item.id })}
                                                    className={`px-2 py-1 rounded text-sm ${item.status === "complete"
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-300 text-black"
                                                        }`}
                                                >
                                                    {item.status === "complete" ? "Completed" : "Not Completed"}
                                                </button></td>
                                            <td className="p-3">

                                                <div className="flex justify-around gap-3">



                                                    {/* Edit */}
                                                    <button onClick={() => handleEdit(item)}>
                                                        <FontAwesomeIcon icon={faPen} className="text-lg text-blue-500" />
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() => dispatch({ type: "REMOVE_TASK", payload: item.id })}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-lg text-red-500" />
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}
