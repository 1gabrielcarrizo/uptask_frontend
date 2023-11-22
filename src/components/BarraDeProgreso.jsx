import React from 'react'
import '../styles/BarraDeProgreso.css'

const BarraDeProgreso = ({ progreso }) => {
    return (
        <div className="barra-de-progreso-container">
            <div className="progreso" style={{ width: `${progreso}%` }}>
                <span className='font-bold'>{progreso}%</span>
            </div>
        </div>
    );
}

export default BarraDeProgreso