import React, { useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import FormularioProyecto from '../components/FormularioProyecto'

const EditarProyecto = () => {

    const { id } = useParams() // obtenemos el "id" de la URL
    const { obtenerProyecto, proyecto, cargando } = useProyectos()
    // console.table(proyecto)

    // con el useEffect, al recargar la pagina, mantenemos los datos
    useEffect(() => {
        obtenerProyecto(id)
    }, [])

    const { nombre } = proyecto

    if (cargando) return 'Cargando...'

    return (
        <>
            <h1 className='font-black text-4xl'>
                Editar Proyecto: {nombre}
            </h1>

            <div className='mt-10 flex justify-center'>
                <FormularioProyecto />
            </div>
        </>
    )
}

export default EditarProyecto