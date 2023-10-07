import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const Sidebar = () => {
  
  const {auth} = useAuth()
  const emojis = ['🖐️', '👋', '✌️', '👍', '🤟', '✋', '🤲', '👌']
  const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)]
  const emojiAleatorioRef = useRef(emojiAleatorio)
  
  
  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
      <p className='text-xl font-bold'>{emojiAleatorioRef.current} Hola: {auth.nombre}</p>
      <Link
      to="crear-proyecto"
      className='bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'>
      Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar