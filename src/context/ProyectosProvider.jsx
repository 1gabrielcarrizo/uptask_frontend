import React, { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import {useNavigate} from 'react-router-dom'

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate()

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    // interactua con nuestra API
    const submitProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token') // obtener token
            if(!token) return // es poco probable que no haya un token pero por las dudas...
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // en el back la funcion es "nuevoProyecto"
            const {data} = await clienteAxios.post('/proyectos', proyecto, config)
            console.log(data)
            console.table(data)

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
            console.log(error)
        }
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto
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