import React, { createContext, useReducer, useContext } from "react";

export const TaskContext = createContext();

const handlers = {
    ADD_TASK: (state, action) => [...state, action.payload],

    REMOVE_TASK: (state, action) =>
        state.filter((task) => task.id !== action.payload),

    UPDATE_TASK: (state, action) =>
        state.map((task) =>
            task.id === action.payload.id
                ? { ...task, ...action.payload }
                : task
        ),

    TOGGLE_STATUS: (state, action) =>
        state.map((task) =>
            task.id === action.payload
                ? {
                    ...task,
                    status:
                        task.status === "complete"
                            ? "not-complete"
                            : "complete",
                }
                : task
        ),
};

function reducer(state, action) {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
}


export function TaskProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}
