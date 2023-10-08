import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const firstMount = useRef(true)

  const params = useParams()
  // identificamos el token/id
  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)
        // const {data} = await clienteAxios.get(url)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    // escribimos esto porque cuando el token es valido solo se muestra un segundo en pantalla..
    if(firstMount.current){
      confirmarCuenta()
      firstMount.current = false
    }
  }, [])

  const {msg} = alerta
  
  return (
    <>
      <h1 className='text-transparent bg-clip-text font-black text-4xl sm:text-6xl capitalize bg-gradient-to-br from-cyan-500 to-blue-500'>Confirma tu cuenta y comienza a crear tus <span className='text-slate-700'>proyectos</span></h1>

      <div className='mt-10 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta}/>}
        {cuentaConfirmada && (
          <Link
          to="/"
          className='block text-center text-white uppercase text-sm from-green-400 to-green-600 bg-gradient-to-br p-3 rounded-xl font-bold my-10'>
          Inicia sesión
        </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta