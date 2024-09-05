import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientesAxios from '../../config/axios.js';

function Producto({ producto }) {

    // elmimina un producto
    const eliminarProducto = (id) => {
        Swal.fire({
            title: "¿Estas Seguro?",
            text: "Un producto eliminado no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                // elminar en la API
                clientesAxios.delete(`/productos/${producto._id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                title: "Eliminado",
                                text: res.data.mensaje,
                                icon: "success"
                            });
                    }
                })
            }
        });
    }


    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">$ {producto.precio}</p>
                {producto.imagen ? (
                    <img src={`http://localhost:5000/imagen-productos/${producto.imagen}`} alt="Imagen-Producto" />
                ) : null

                }
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${producto._id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(producto._id)}
                >

                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Producto