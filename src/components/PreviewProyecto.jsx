import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProyecto = ({ proyecto }) => {
    // console.log(proyecto)
    const {auth} = useAuth()
    // para diferenciar en donde somos colaboradores, extraemos "creador" de proyecto
    const { nombre, _id, cliente, creador, presupuesto, descripcion } = proyecto
    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col items-start'>
            {/* el nombre ocupara todo el ancho disponible con "flex-1" */}
            <p className='mb-1 text-xl'><span className='font-bold'>Nombre:</span> {nombre}</p>
            <p className='mb-1 text-sm'><span className='font-bold'>Presupuesto:</span> ${presupuesto}</p>
            <p className='mb-1 text-sm text-gray-500 break-words'><span className='font-bold'>Descripción:</span> {descripcion}</p>
            <p className='mb-1 text-sm text-gray-500 break-words'><span className='font-bold'>Cliente:</span> {cliente}</p>

                {auth._id !== creador && (
                    <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase '>Eres Colaborador/a</p>
                )}
            </div>
                <div className='flex items-center justify-center'>
            <Link
            className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold mt-3 md:mt-0'
            to={`${_id}`}
            >
                Ver Proyecto</Link>
                </div>
        </div>
    )
}

export default PreviewProyecto