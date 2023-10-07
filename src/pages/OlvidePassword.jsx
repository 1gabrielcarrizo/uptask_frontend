import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email === '' || email.length < 6){
      setAlerta({
        msg: "El Email es obligatorio",
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
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
      <h1 className='text-transparent bg-clip-text font-black text-6xl capitalize bg-gradient-to-br from-cyan-500 to-blue-500'>Recupera tu acceso y no pierdas tus <span className='text-slate-700'>proyectos</span></h1>

      {msg && <Alerta alerta={alerta}/>}

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

        <input
          type="submit"
          value="Enviar Email"
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5' />
      </form>

      <nav className='xl:flex xl:justify-between'>
        
        <Link
          to="/"
          className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <Link
          to="/registrar"
          className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword