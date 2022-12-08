import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../../features/authSlice";
import About from "../about/About";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import Filtering from "../filtering/Filtering";
import Questionnaire from "../questionnaire/Questionnaire";

interface LoginProps {
  auth: Auth;
}

export default function ComponentRoutes({ auth }: LoginProps) {
  return (
    <Routes>
      <Route path="/" element={<Dashboard {...{
        auth: auth
      }}/>} />
      <Route path="/about" element={<About />} />
      <Route path="/filtering" element={<Filtering auth={auth} />} />
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/register" element={<Register auth={auth} />} />
      <Route path="/questionnaire" element={<Questionnaire auth={auth} />} />
      <Route path="/dashboard" element={<Navigate to="/" />}/>
    </Routes>
  );
}