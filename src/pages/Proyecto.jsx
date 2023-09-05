import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'

const Proyecto = () => {

    const { id } = useParams() // obtenemos el "id" de la URL
    const { obtenerProyecto, proyecto, cargando } = useProyectos()
    console.log(proyecto)

    useEffect(() => {
        obtenerProyecto(id)
    }, [])

    const { nombre } = proyecto

    return (
        cargando ? 'Cargando...' : (
            <div>
                <h1 className='font-black text-4xl'>{nombre}</h1>
            </div>
        )
    )
}

export default Proyecto