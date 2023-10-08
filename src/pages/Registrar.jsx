import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import Spinner2 from '../components/Spinner2'

const Registrar = () => {
  // creamos 4 state para los 4 campos
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // convertirmos las variables normales con string a un arreglo
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      setLoading(false)
      return
    }
    // comparar si los passwords son iguales
    if(password !== repetirPassword){
      setAlerta({
        msg: "Los password no son iguales",
        error: true
      })
      setLoading(false)
      return
    }
    // el password debe contener minimo 6 caracteres
    if(password.length < 6){
      setAlerta({
        msg: "El password es muy corto, debe contener como mínimo 6 caracteres",
        error: true
      })
      setLoading(false)
      return
    }
    setAlerta({})
    // crear el usuario en la API (funcion registrar en nuestro backend)
    try {
      // usamos "await" porque en el back la funcion "registrar" usa "async"
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg, // data.msg muestra el mensaje del backend
        error: false
      })
      // reiniciar los campos del formulario
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        // para acceder a los mensajes de error del back, se usa el "response"
        msg: error.response.data.msg,
        error: true
      })
    } finally {
      setLoading(false)
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  // extramemos msg de alerta en caso de que exista
  const {msg} = alerta

  return (
    <>
      <h1 className='text-transparent bg-clip-text font-black text-4xl sm:text-6xl capitalize bg-gradient-to-br from-cyan-500 to-blue-500'>Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span></h1>

      {msg && <Alerta alerta={alerta}/>}

      <form
      onSubmit={handleSubmit}
      className='my-10 bg-white shadow rounded-lg p-10'>

        <div className='my-5'>
          <label
            htmlFor="nombre"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Nombre
          </label>
          <input
          maxLength={50}
            type="text"
            id='nombre'
            placeholder='Tu Nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
        </div>

        <div className='my-5'>
          <label
            htmlFor="email"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Email
          </label>
          <input
          maxLength={50}
            type="email"
            id='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className='my-5'>
          <label
            htmlFor="password"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Password
          </label>
          <input
          maxLength={200}
            type="password"
            id='password'
            placeholder='Password de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className='my-5'>
          <label
            htmlFor="password2"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Repetir Password
          </label>
          <input
          maxLength={200}
            type="password"
            id='password2'
            placeholder='Repetir tu Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            />
        </div>

        {/* <input
          type="submit"
          value="Crear Cuenta"
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5' /> */}

          <button
          type="submit"
          disabled={loading}
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition-colors mb-5 disabled:opacity-75 hover:disabled:opacity-75 hover:disabled:bg-sky-700'
          >
            {loading ? <Spinner2/> : 'Crear Cuenta'}
          </button>
      </form>

      <nav className='xl:flex xl:justify-between'>
        <Link
          to="/"
          className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <Link
          to="/olvide-password"
          className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Olvide Mi Password
        </Link>
      </nav>
    </>
  )
}

export default Registrar