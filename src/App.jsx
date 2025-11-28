
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './auth/Login';
import Home from './component/Home';
import About from './page/About';
import TaskManagement from './page/TaskManagement';
import Header from './component/Header';
import Footer from './component/Footer';
import ProtectedRoute from './auth/ProtectedRoute';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import Table from './page/Table';
import { ThemeContext } from './auth/ThemeContext';
import React, { useState } from 'react';
import User from './page/User';
import List from './page/List';
import Setting from './page/Setting';
import Demo from "./page/Demo";
import { TaskProvider } from "./context/TaskContext";
import Favorites from "./page/Favorites";
import Movienavbar from "./component/Movienavbar";

import './App.css'

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TaskProvider>

        <div className={theme === "light" ? "light-mode" : "dark-mode"}>
          <Router>

            {/* Header always visible */}
            <Header />

            <Routes>

              {/* -------- Public Routes -------- */}
              <Route path="/" element={<Login />} />


              {/* -------- Protected Single Pages -------- */}
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/table" element={<ProtectedRoute><Table /></ProtectedRoute>} />
              <Route path="/TaskManagement" element={<ProtectedRoute><TaskManagement /></ProtectedRoute>} />


              {/* -------- Dashboard Layout (with children) -------- */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                {/* Outlet Children */}
                <Route index element={<Setting />} />
                <Route path="user" element={<User />} />
                <Route path="list" element={<List />} />
                <Route path="setting" element={<Setting />} />

                <Route path="Demo" element={<Demo />} />
                <Route path="Demo/Favorites" element={<Favorites />} />
              </Route>

            </Routes>

            {/* Footer always visible */}
            <Footer />

          </Router>
        </div>
      </TaskProvider >

    </ThemeContext.Provider>
  );
}

export default App
