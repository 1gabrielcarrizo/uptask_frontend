import React, { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioProyecto = () => {

    // en el backend el modelo de proyectos necesita "nombre, descripcion, fecha y cliente"
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const {mostrarAlerta, alerta, submitProyecto} = useProyectos()

    const handleSubmit = (e) => {
        e.preventDefault()
        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        // pasar los datos al provider
        submitProyecto({nombre, descripcion, fechaEntrega, cliente})
    }

    const {msg} = alerta

    return (
        <form
        onSubmit={handleSubmit}
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>

            {msg && <Alerta alerta={alerta}/>}

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="nombre">
                    Nombre Proyecto
                </label>
                <input
                    id='nombre'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Nombre del Proyecto'
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="descripcion">
                    Descripcion
                </label>
                <textarea
                    id='descripcion'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Descripcion del Proyecto'
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="fecha-entrega">
                    Fecha Entrega
                </label>
                <input
                    id='fecha-entrega'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    type="date"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                    />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="cliente">
                    Nombre Cliente
                </label>
                <input
                    id='cliente'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Nombre del Cliente'
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    />
            </div>

            <input
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
            type="submit"
            value="Crear Poryecto" />
        </form>
    )
}

export default FormularioProyecto