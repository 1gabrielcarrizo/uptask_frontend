import React, { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

let socket

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(true)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [tarea, setTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const navigate = useNavigate()

    // una vez que el componente este listo, hacemos la consulta a nustra API
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token') // obtener token
                if (!token) return // es poco probable que no haya un token pero por las dudas...
                // esta configuracion tiene que estar en todos los proyectos
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                // en el back la funcion es "obtenerProyectos"
                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])

    // conexion con socket io
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])




    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    // interactua con nuestra API
    const submitProyecto = async (proyecto) => {
        // console.log("Desde la funcion submitProyecto")
        // console.log("Tiene id el proyecto")    
        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
    }
    // interactua con nuestra API
    const editarProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el back la funcion es "editarProyecto"
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            // sincronizar el state
            const proyectosActualizados = proyectos.map((proyectoState) => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)
            // mostrar alerta
            setAlerta({
                msg: 'Proyecto actualizado correctamente',
                error: false
            })
            // luego de actualizar el proyecto, eliminar la alerta y redirigir a "/proyectos"
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.error(error)
        }
    }
    // interactua con nuestra API
    const nuevoProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el back la funcion es "nuevoProyecto"
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)

            // para mostrar el ultimo proyecto se escribe lo siguiente..
            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto creado correctamente',
                error: false
            })
            // luego de crear el proyecto, eliminar la alerta y redirigir a "/proyectos"
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.error(error)
        }
    }
    // interactua con nuestra API
    const obtenerProyecto = async (id) => {
        try {
            setCargando(true)
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el back la funcion es "obtenerProyecto"
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }
    // interactua con nuestra API
    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el back la funcion es "eliminarProyecto"
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            // sincronizar el state
            const proyectosActualizados = proyectos.filter((proyectoState => proyectoState._id !== id))
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })
            // luego de eliminar el proyecto, eliminar la alerta y redirigir a "/proyectos"
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.error(error)
        }
    }
    // modal
    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }
    // interactua con nuestra API
    const submitTarea = async (tarea) => {

        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            delete tarea.id
            await crearTarea(tarea)
        }
    }
    // 
    const crearTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el backend es la funcion "agregarTarea"
            const { data } = await clienteAxios.post('/tareas', tarea, config)

            setAlerta({})
            setModalFormularioTarea(false)

            // SOCKET IO
            socket.emit('nueva tarea', data)
        } catch (error) {
            console.error(error)
        }
    }
    //
    const editarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el backend es la funcion "actualizarTarea"
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

            setAlerta({})
            setModalFormularioTarea(false)

            // SOCKET
            socket.emit('actualizar tarea', data)

        } catch (error) {
            console.error(error)
        }
    }
    // 
    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }
    // 
    const handleModalEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    // interactua con nuestra API
    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el backend es la funcion "actualizarTarea"
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setModalEliminarTarea(false)

            // SOCKET
            socket.emit('eliminar tarea', tarea)

            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.error(error)
        }
    }
    // interactua con nuestra API
    const submitColaborador = async (email) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }
    // 
    const agregarColaborador = async (email) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    // 
    const handleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }
    // 
    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter((colaboradorState) => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (error) {
            console.error(error)
        }
    }
    // interactua con nuestra API
    const completarTarea = async (id) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if (!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)

            setTarea({})
            setAlerta({})

            // SOCKET
            socket.emit('cambiar estado', data)

        } catch (error) {
            console.error(error)
        }
    }
    // buscador de proyectos
    const handleBuscador = () => {
        setBuscador(!buscador)
    }
    // socket io
    const submitTareasProyecto = (tarea) => {
        // agregar la tarea al state
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }
    // socket io
    const eliminarTareaProyecto = (tarea) => {
        // actualiza el DOM
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter((tareaState) => tareaState._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }
    // socket io
    const actualizarTareaProyecto = (tarea) => {
        // actualiza el DOM
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }
    // socket io
    const cambiarEstadoTarea = (tarea) => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                actualizarTareaProyecto,
                cambiarEstadoTarea
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext