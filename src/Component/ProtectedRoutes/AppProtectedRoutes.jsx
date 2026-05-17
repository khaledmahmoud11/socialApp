import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'
import { Spinner } from '@heroui/react'; // أو أي سبينر بتستخدمه

export default function AppProtectedRoutes({ children }) {
    const { token, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Spinner size="lg" label="Loading App..." />
            </div>
        );
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}