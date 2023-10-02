import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([email, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    // nos comunicamos con el backend (funcion autenticar)
    try {
      // si todo esta okay...
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      // almacenamos el token en el localStorage
      localStorage.setItem('token', data.token)
      // usamos el hook
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'>

        <div className='my-5'>
          <label
            htmlFor="email"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <div className='my-5'>
          <label
            htmlFor="password"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id='password'
            placeholder='Password de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5' />
      </form>

      <nav className='xl:flex xl:justify-between'>
        <Link
          to="/registrar"
          className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿No tienes una cuenta? Regístrate
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

export default Login