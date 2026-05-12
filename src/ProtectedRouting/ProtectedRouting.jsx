import React from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';


export default function ProtectedRouting({ children  }) {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) {
        return children ;
    } else {
        return <Navigate to="/Login" />;
    }
}
