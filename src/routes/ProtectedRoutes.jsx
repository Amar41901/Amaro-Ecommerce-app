import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoutes({children, allowedRoles}) {
    const navigate = useNavigate();
    const role = localStorage.getItem('user-role');
    console.log("role", role)
    if(!role){
        alert("No role found, you have to register first!!");
        return <Navigate to='/login' replace/>
    }

    if(!allowedRoles.includes(role)){
        return <Navigate to='/signin' replace/>
    }

    return children
}

export default ProtectedRoutes;