import React from 'react';

function FormCantidadProcuto({producto}) {
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">${producto.precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus"></i>
                    
                    <p>{producto.cantidad}</p>
                    
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