import React, { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {

  const [email, setEmail] = useState('')

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

  useEffect(() => {
    setEmail('')
  }, [alerta])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }
    submitColaborador(email)
  }

  const { msg } = alerta

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'>

      {msg && <Alerta alerta={alerta} />}
      <div className='mb-5'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor="email">
          Email Colaborador
        </label>
        <input
          id='email'
          type="email"
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
          value={email}
          maxLength={50}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email del usuario'
        />
      </div>

      <input
        className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
        type="submit"
        value='Buscar' />
    </form>
  )
}

export default FormularioColaborador