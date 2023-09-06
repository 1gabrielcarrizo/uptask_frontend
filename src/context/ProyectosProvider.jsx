import React, { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(true)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)

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
                // console.log(data)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])


    const navigate = useNavigate()

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
        if(proyecto.id){
            await editarProyecto(proyecto)
        }else{
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
            console.log(data)
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
        } catch (error) {
            console.error(error)
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
    }
    // interactua con nuestra API
    const submitTarea = async (tarea) => {
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
            const {data} = await clienteAxios.post('/tareas', tarea, config)
            // console.log(data)
            // agregar la tarea al state
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.error(error)
        }
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
                submitTarea
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