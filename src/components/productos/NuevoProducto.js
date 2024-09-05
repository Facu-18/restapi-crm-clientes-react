import React, {useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import clientesAxios from '../../config/axios.js';
import {Navigate, useNavigate} from 'react-router-dom'

function NuevoProducto() {
    
    // ROUTE
    const navigate = useNavigate()

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: null
      });
      
      const leerInfoProducto = (e) => {
        guardarProducto({
          ...producto,
          [e.target.name]: e.target.value
        });
      };
      
      const leerArchivo = (e) => {
        guardarProducto({
          ...producto,
          imagen: e.target.files[0]
        });
      };
      
      const agregarProducto = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', producto.imagen);
      
        try {
          const res = await clientesAxios.post('/productos', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          // lanzar aletra
          if(res.status === 200){
            Swal.fire(
                'Agregado correctamente',
                res.data.mensaje,
                'success'
            )
          }

          navigate('/productos')
      
        } catch (error) {
          console.log(error);
          console.log(error.response);
          // lanzar alerta
          Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: 'Intentalo nuevamente'
          });
        }
      };
    
    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
              onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                    type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    onChange={leerInfoProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                    type="number" 
                    name="precio" 
                    min="0.00" 
                    step="0.01" 
                    placeholder="Precio" 
                    onChange={leerInfoProducto}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                    type="file" 
                    name="imagen" 
                    onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoProducto