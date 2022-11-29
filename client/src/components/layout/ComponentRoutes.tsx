import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "../../features/authSlice";
import About from "../about/About";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import Filtering from "../filtering/Filtering";
import Home from "../home/Home";
import Questionnaire from "../questionnaire/Questionnaire";
import Questionnaire2 from "../questionnaire/Questionnaire2";
import Questionnaire3 from "../questionnaire/Questionnaire3";
import Questionnaire4 from "../questionnaire/Questionnaire4";
import Questionnaire5 from "../questionnaire/Questionnaire5";

interface LoginProps {
    auth: Auth;
}

export default function ComponentRoutes({ auth }: LoginProps) {
  console.log(auth.isAuthenticated);
  console.log(auth.user);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/filtering" element={<Filtering />} />
            <Route path="/login" element={<Login auth={auth} />} />
            <Route path="/register" element={<Register auth={auth} />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/questionnaire2" element={<Questionnaire2 answers={{}} />} />
            <Route path="/questionnaire3" element={<Questionnaire3 answers={{}} />} />
            <Route path="/questionnaire4" element={<Questionnaire4 answers={{}} />} />
            <Route path="/questionnaire5" element={<Questionnaire5  {...{
              answers: {},
              auth: auth
            }}/>} />
        </Routes>
    );
}