import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "../../features/authSlice";
import About from "../about/About";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import Filtering from "../filtering/Filtering";
import Home from "../home/Home";

interface ComponentRoutesProps {
    auth: Auth;
}

export default function ComponentRoutes({ auth }: ComponentRoutesProps) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/filtering" element={<Filtering />} />
            <Route path="/login" element={<Login auth={auth} />} />
            <Route path="/register" element={<Register auth={auth} />} />
        </Routes>
    );
}