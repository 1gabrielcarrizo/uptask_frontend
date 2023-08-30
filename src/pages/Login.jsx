import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span></h1>

      <form className='my-10 bg-white shadow rounded-lg p-10'>

        <div className='my-5'>
          <label
            htmlFor="email"
            className='uppercase text-gray-600 block text-xl font-bold'>
            Email
          </label>
          <input
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

      <nav className='lg:flex lg:justify-between'>

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