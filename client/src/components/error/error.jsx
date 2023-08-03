import React from 'react';
import './error.css';
import error404 from '../../imag/Loading/77facec150c4d97d93ca8c95a910ace7.gif'

function Error() {
    return (
        <div className="not-found-container">
        <h1 className="not-found-title">Error 404</h1>
        <p className="not-found-message">Disculpa, no pudimos encontrar lo que estas buscando.</p>
        <img src={error404} alt="Imagen de Product no encontrada" className="not-found-image" />
        <a href="/home" className="not-found-link">Volver al inicio</a>
        </div>
    );
}

export default Error;

