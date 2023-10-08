import React, { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
import Spinner2 from './Spinner2'

const FormularioProyecto = () => {

    const [id, setId] = useState(null) // cuando sea un proyecto nuevo tendra null
    // en el backend el modelo de proyectos necesita "nombre, descripcion, fecha y cliente"
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    const [loading, setLoading] = useState(false)

    const params = useParams()

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        // console.log(params)
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setLoading(false)
            return
        }
        /*
        // pasar los datos al provider
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })
        // reiniciamos el formulario
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        // focus()
        setLoading(false)
        */
        try {
            // pasar los datos al provider
            await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })
            // reiniciamos el formulario
            setId(null)
            setNombre('')
            setDescripcion('')
            setFechaEntrega('')
            setCliente('')
            // focus()

            // window.scroll({
            //     top: 0,
            //     left: 0,
            //     behavior: 'smooth'
            // })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const { msg } = alerta

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>

            {msg && <Alerta alerta={alerta} />}

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

            {/* <input
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                type="submit"
                value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'} /> */}

            <button
                type="submit"
                disabled={loading}
                className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:bg-sky-800 transition-colors mb-5 disabled:opacity-75 hover:disabled:opacity-75 hover:disabled:bg-sky-700'
            >
                {loading ? <Spinner2 /> : (id ? 'Actualizar Proyecto' : 'Crear Proyecto')}
            </button>
        </form>
    )
}

export default FormularioProyecto