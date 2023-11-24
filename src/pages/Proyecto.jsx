import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import Tarea from '../components/Tarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Alerta from '../components/Alerta'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'
import Spinner from '../components/Spinner'
import BarraDeProgreso from '../components/BarraDeProgreso'

let socket

const Proyecto = () => {
    const [progreso, setProgreso] = useState(0);

    const params = useParams() // obtenemos el "id" de la URL
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useProyectos()

    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])
    // useEffect para conectarse al socket.io
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        // en que proyecto esta el usuario actualmente
        socket.emit('abrir proyecto', params.id)
    }, [])
    //
    useEffect(() => {
        // poder ver las tareas agregadas
        socket.on('tarea agregada', tareaNueva => {
            if (tareaNueva.proyecto === proyecto._id) {
                submitTareasProyecto(tareaNueva)
            }
        })
        // poder ver las tareas eliminadas
        socket.on('tarea eliminada', tareaEliminada => {
            if (tareaEliminada.proyecto === proyecto._id) {
                eliminarTareaProyecto(tareaEliminada)
            }
        })
        // poder ver las tareas actualizadas
        socket.on('tarea actualizada', tareaActualizada => {
            if (tareaActualizada.proyecto._id === proyecto._id) {
                actualizarTareaProyecto(tareaActualizada)
            }
        })
        // poder ver las tareas que se completan
        socket.on('nuevo estado', nuevoEstadoTarea => {
            if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
                cambiarEstadoTarea(nuevoEstadoTarea)
            }
        })
    })
    // Lógica para calcular el progreso en base a las tareas completadas
    useEffect(() => {
        if (proyecto.tareas && proyecto.tareas.length > 0) {
            const tareasCompletadas = proyecto.tareas.filter(tarea => tarea.estado).length;
            const porcentaje = parseFloat(((tareasCompletadas / proyecto.tareas.length) * 100).toFixed(2));
            setProgreso(porcentaje);
        } else {
            setProgreso(0);
        }
    }, [proyecto.tareas]);



    const { nombre } = proyecto

    if (cargando) return <Spinner />

    // const { msg } = alerta

    return (
        <>
            <div className='sm:flex justify-between'>
                <h1 className='font-black text-4xl'>{nombre}</h1>

                {admin && (
                    <div className='flex items-center gap-2 text-gray-400 hover:text-black mt-3 sm:mt-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <Link
                            className='uppercase font-bold'
                            to={`/proyectos/editar/${params.id}`}
                        >Editar</Link>
                    </div>
                )}
            </div>

            {proyecto?.tareas?.length > 0 && (
                <div>
                    <BarraDeProgreso progreso={progreso} />
                </div>
            )}

            {admin && (
                <button
                    onClick={handleModalTarea}
                    className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                    Nueva Tarea
                </button>
            )}


            <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

            <div className='bg-white shadow mt-10 rounded-lg'>
                {proyecto.tareas?.length ?
                    proyecto.tareas?.map(tarea => (
                        <Tarea
                            key={tarea._id}
                            tarea={tarea}
                        />
                    ))
                    :
                    <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}
            </div>

            {admin && (
                <>
                    <div className='sm:flex items-center justify-between mt-10'>
                        <p className='font-bold text-xl'>Colaboradores</p>
                        <Link
                            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                            className='text-gray-400 hover:text-black uppercase font-bold'
                        >
                            Añadir</Link>
                    </div>

                    <div className='bg-white shadow mt-10 rounded-lg'>
                        {proyecto.colaboradores?.length ?
                            proyecto.colaboradores?.map(colaborador => (
                                <Colaborador
                                    key={colaborador._id}
                                    colaborador={colaborador}
                                />
                            ))
                            :
                            <p className='text-center my-5 p-10'>No hay colaboradores en este proyecto</p>}
                    </div>
                </>
            )}

            <ModalFormularioTarea />
            <ModalEliminarTarea />
            <ModalEliminarColaborador />
        </>
    )
}

export default Proyecto