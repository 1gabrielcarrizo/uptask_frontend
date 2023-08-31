import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {token} = params
  
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password.length <6){
      setAlerta({
        msg: "El password debe contener al menos 6 caracteres",
        error: true
      })
      return
    }
    // si el password nuevo es correcto...
    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Reestablece tu password y no pierdas acceso a tus <span className='text-slate-700'>proyectos</span></h1>
      {msg && <Alerta alerta={alerta}/>}
      {/* si el token es valido, muestra el formulario */}
      {tokenValido && (
        <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'>
        <div className='my-5'>
          <label
            htmlFor="password"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Nuevo Password
          </label>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            id='password'
            placeholder='Escribe tu Nuevo Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input
          type="submit"
          value="Guardar Nuevo Password"
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5' />
      </form>
      )}
      {passwordModificado && (
          <Link
          to="/"
          className='block text-center text-white uppercase text-sm from-green-400 to-green-600 bg-gradient-to-br p-3 rounded-xl font-bold my-10'>
          Inicia sesión
        </Link>
        )}
    </>
  )
}

export default NuevoPassword