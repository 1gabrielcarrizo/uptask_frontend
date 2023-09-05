import React, { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    // comprobar una vez si hay un token en el localStorage
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                // agregamos setCargando aqui porque sino seria un bucle..
                setCargando(false)
                return
            }
            // esta configuracion tiene que estar en todos los proyectos
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                // hacemos el llamado a nuestro backend
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                // la linea de abajo es opcional, es equivalente a usar "refresh token"
                // navigate('/proyectos') // si se autentico bien, lo redirige a "/proyectos"
            } catch (error) {
                // console.error(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext