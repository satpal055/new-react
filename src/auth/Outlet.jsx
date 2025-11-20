import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <>
            <h1>Dashboard outlet</h1>
            <Outlet />
        </>
    );
}
