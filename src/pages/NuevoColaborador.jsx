import React, { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import Spinner from '../components/Spinner'
import Spinner2 from '../components/Spinner2'

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta, loading, setColaborador } = useProyectos()
    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(() => {
        setColaborador({})
    }, [])
    

    // console.log(colaborador)

    // if (cargando) return 'Cargando...'

    if (!proyecto?._id) return <Alerta alerta={alerta} /> // eliminar posiblemente?

    return (
        <>
            <h1 className='text-3xl sm:text-4xl font-black'>Añadir Colaborador(a) al Proyecto: <span className='text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500'>{proyecto.nombre}</span></h1>

            <div className='mt-10 flex justify-center'>
                <FormularioColaborador />
            </div>

            {cargando ? <Spinner /> : colaborador?._id && (
                <div className='flex justify-center mt-10'>
                    <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
                        <h2 className='text-center mb-10 text-2xl font-bold'>
                            Resultado:
                        </h2>
                        <div className='sm:flex justify-between items-center'>
                            <p className='text-center sm:mr-4 mb-3 sm:mb-0'>{colaborador.nombre}</p>

                            <button
                                onClick={() => agregarColaborador({
                                    email: colaborador.email
                                })}
                                type='button'
                                className='bg-sky-600 hover:bg-sky-700 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm text-center mx-auto sm:mx-0 flex transition-colors disabled:opacity-75 hover:disabled:opacity-75 hover:disabled:bg-sky-700'
                                disabled={loading}
                            >
                                {loading ? <Spinner2 /> : 'Agregar al Proyecto'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NuevoColaborador