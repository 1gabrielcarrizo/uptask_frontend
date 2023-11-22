import React from 'react'
import '../styles/BarraDeProgreso.css'

const BarraDeProgreso = ({ progress }) => {
    return (
        <div className="barra-de-progreso-container">
            <div className="progreso" style={{ width: `${progress}%` }}></div>
        </div>
    );
}

export default BarraDeProgreso