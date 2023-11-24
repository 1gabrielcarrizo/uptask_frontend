import React, { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'
import Spinner2 from './Spinner2'

const FormularioProyecto = () => {

    const [id, setId] = useState(null) // cuando sea un proyecto nuevo tendra null
    // en el backend el modelo de proyectos necesita "nombre, presupuesto, descripcion, fecha y cliente"
    const [nombre, setNombre] = useState('')
    const [presupuesto, setPresupuesto] = useState('')
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
            setPresupuesto(proyecto.presupuesto)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if ([nombre, presupuesto, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setLoading(false)
            return
        }
        /*
        // pasar los datos al provider
        await submitProyecto({ id, nombre, presupuesto, descripcion, fechaEntrega, cliente })
        // reiniciamos el formulario
        setId(null)
        setNombre('')
        setPresupuesto('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        // focus()
        setLoading(false)
        */
        try {
            // pasar los datos al provider
            await submitProyecto({ id, nombre, presupuesto, descripcion, fechaEntrega, cliente })
            // reiniciamos el formulario
            setId(null)
            setNombre('')
            setPresupuesto('')
            setDescripcion('')
            setFechaEntrega('')
            setCliente('')
            // focus()

            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
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
                    Nombre
                </label>
                <input
                    id='nombre'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
                    placeholder='Nombre del Proyecto'
                    type="text"
                    maxLength={100}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="presupuesto">
                    Presupuesto
                </label>
                {/* <input
                    id='presupuesto'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
                    placeholder='Presupuesto del Proyecto'
                    type="number"
                    min={1}
                    max={1000000}
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(e.target.value)}
                /> */}
                <input
                    id='presupuesto'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
                    placeholder='Presupuesto del Proyecto'
                    type="number"
                    min={1}
                    max={9999999}
                    value={presupuesto}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 7) { // Limitar a 7 dígitos
                            setPresupuesto(inputValue);
                        }
                    }}
                />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="descripcion">
                    Descripción
                </label>
                <textarea
                    id='descripcion'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
                    placeholder='Descripción del Proyecto'
                    maxLength={300}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="fecha-entrega">
                    Fecha de Entrega
                </label>
                <input
                    id='fecha-entrega'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
                    type="date"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="cliente">
                    Nombre
                </label>
                <input
                    id='cliente'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50'
                    placeholder='Nombre del Cliente'
                    type="text"
                    maxLength={50}
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