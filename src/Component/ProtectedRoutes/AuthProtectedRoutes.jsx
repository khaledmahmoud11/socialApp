

import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'

export default function AuthProtectedRoutes({ children }) {

    const { token } = useContext(AuthContext);

    if (token) {
        return <Navigate to="/" />;
    }

    return children;
}