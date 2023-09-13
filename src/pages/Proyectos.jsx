import React, { useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto'
import Alerta from '../components/Alerta'
import io from 'socket.io-client'

// se va a ir llenando segun se ejecute el codigo
let socket

const Proyectos = () => {
  
  const { proyectos, alerta } = useProyectos()

  useEffect(() => {
    // "io" se conecta con la URL del backend
    socket = io(import.meta.env.VITE_BACKEND_URL)
    // "emit" crea un evento, le damos un nombre al evento, por ejemplo "prueba", como segundo valor podemos pasarle un nombre
    socket.emit('prueba', proyectos)
  }, [])
  
  
  const {msg} = alerta

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      {msg && <Alerta alerta={alerta}/>}

      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyectos.length ? 
        proyectos.map(proyecto => (
          <PreviewProyecto
          key={proyecto._id}
          proyecto={proyecto}
          />
        ))
        : <p className='text-center text-gray-600 uppercase p-5'>No hay projectos todavia</p>}
      </div>
    </>
  )
}

export default Proyectos