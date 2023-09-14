import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()
    if(cargando) return 'Cargando...' // se puede colocar un spinner

    return (
        <>
        {/* si no existe auth._id, lo redirecciona al inicio/login */}
            {auth._id ? (
                <div className='bg-gray-100'>
                    <Header/>
                    <div className='md:flex md:min-h-screen'>
                        <Sidebar/>
                            {/* flex-1 toma el resto del contenido */}
                            <main className='flex-1 p-10'>
                                <Outlet/>
                            </main>
                    </div>
                </div>
            ) : <Navigate to="/"/>}
        </>
    )
}

export default RutaProtegida