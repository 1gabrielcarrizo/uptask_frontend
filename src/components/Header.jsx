import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const { handleBuscador, cerrarSesionProyectos } = useProyectos()
  const { cerrarSesionAuth } = useAuth()

  // cerrar la sesion del uusario
  const handleCerrarSesion = () => {
    cerrarSesionProyectos()
    cerrarSesionAuth()
    localStorage.removeItem('token')
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
      {/* se dividura en 3 el header */}
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
          ProjectMaster
        </h2>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button
            onClick={handleBuscador}
            className='font-bold uppercase'
            type="button">
            Buscar Proyecto
          </button>
          <Link
            to="/proyectos"
            className='font-bold uppercase'
          >
            Proyectos</Link>
          <button
          onClick={handleCerrarSesion}
            type="button"
            className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
          >
            Cerrar Sesión</button>

          <Busqueda />
        </div>
      </div>
    </header>
  )
}

export default Header