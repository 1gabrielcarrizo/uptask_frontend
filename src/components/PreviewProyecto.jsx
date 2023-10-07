import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProyecto = ({ proyecto }) => {
    const {auth} = useAuth()
    // para diferenciar en donde somos colaboradores, extraemos "creador" de proyecto
    const { nombre, _id, cliente, creador } = proyecto
    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
            <div className='flex items-center gap-2'>
            {/* el nombre ocupara todo el ancho disponible con "flex-1" */}
            <p className='flex-1'>
                {nombre}
                <span className='text-sm text-gray-500 uppercase'>
                    {''} {cliente}</span>
                </p>

                {auth._id !== creador && (
                    <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>Colaborador</p>
                )}
            </div>
                
            <Link
            className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold mt-3 md:mt-0'
            to={`${_id}`}
            >
                Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto