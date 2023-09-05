import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()
    if(cargando) return 'Cargando...' // se puede colocar un spinner

    return (
        <>
        {/* si no existe auth._id, lo redirecciona al inicio/login */}
            {auth._id ? <Outlet/> : <Navigate to="/"/>}
        </>
    )
}

export default RutaProtegida