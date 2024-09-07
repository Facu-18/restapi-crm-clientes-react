import React from 'react';

function FormCantidadProcuto() {
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">Macbook Pro</p>
                <p className="precio">$250</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus"></i>
                    <input type="text" name="cantidad" />
                    <i className="fas fa-plus"></i>
                </div>
                <button type="button" className="btn btn-rojo">
                    <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}

export default FormCantidadProcuto;