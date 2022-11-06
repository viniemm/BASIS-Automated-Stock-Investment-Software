import React from 'react';
import { Route, Routes } from "react-router";
import { About, Dashboard, Filtering, Questionnaire } from '..';
import Questionnaire2 from '../../questionnaire/Questionnaire2';
import Questionnaire3 from '../../questionnaire/Questionnaire3';
import Questionnaire4 from '../../questionnaire/Questionnaire4';
import Questionnaire5 from '../../questionnaire/Questionnaire5';
import Home from '../home/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { Auth } from '../../../features/authSlice';

interface RouteProps {
    authState: Auth;
}

export default function BasisRoutes({ authState }: RouteProps) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/filtering" element={<Filtering />} />
            <Route path="/login" element={<Login authState={authState} />} />
            <Route path="/register" element={<Register authState={authState} />} />
        </Routes>
    )
}

//            <Route path="/questionnaire" element={<Questionnaire />} />
//            <Route path="/questionnaire2" element={<Questionnaire2 answers={{}} />} />
//            <Route path="/questionnaire3" element={<Questionnaire3 answers={{}} />} />
//            <Route path="/questionnaire4" element={<Questionnaire4 answers={{}} />} />
//            <Route path="/questionnaire5" element={<Questionnaire5 answers={{}} />} />