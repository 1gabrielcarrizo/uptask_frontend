import React from 'react'
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {

    const {handleModalEliminarColaborador} = useProyectos()

    const {nombre, email} = colaborador

  return (
    <div className='border-b p-5 sm:flex justify-between items-center'>

        <div className='flex flex-col items-start'>
            <p>{nombre}</p>
            <p className='text-sm text-gray-700'>{email}</p>
        </div>

        <div className='flex flex-col lg:flex-row mt-3 sm:mt-0'>
            <button
            onClick={() => handleModalEliminarColaborador(colaborador)}
            className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
            type="button">
                Eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador