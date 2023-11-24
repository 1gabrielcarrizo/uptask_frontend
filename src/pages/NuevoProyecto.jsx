import React, { useEffect } from 'react'
import FormularioProyecto from '../components/FormularioProyecto'

const NuevoProyecto = () => {

  useEffect(() => {
    window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
      })
  }, [])
  
  return (
    <>
    <h1 className='text-4xl font-black'>Crear Proyecto</h1>

    <div className='mt-10 flex justify-center'>
        <FormularioProyecto/>
    </div>
    </>
  )
}

export default NuevoProyecto