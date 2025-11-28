import React, { createContext, useState, useEffect } from "react";

export const TableContext = createContext();
//TableContext is like a shared storage that any component in your app can
//  read or update — without passing props manually.

export function TableProvider({ children }) {
    // TableProvider is a wrapper that gives components access to the shared data (tableData).
    const [tableData, setTableData] = useState([])

    // useEffect(() => {
    //     localStorage.setItem("tableData", JSON.stringify(tableData));
    //     // Save changes to localStorage
    // }, [tableData]);

    return (
        <TableContext.Provider value={{ tableData, setTableData }}>
            {/* Provide the data to all child components */}
            {/* tableData → the list  */}
            {/* setTable Data → a function to update the list */}
            {children}
        </TableContext.Provider>
    );
}
