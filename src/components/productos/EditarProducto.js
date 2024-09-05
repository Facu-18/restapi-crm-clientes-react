import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import clientesAxios from '../../config/axios.js';
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner.js'

function EditarProductos() {

   const navigate = useNavigate();

   // obtener el id del producto
   const { id } = useParams();

   // producto = state y funcion para actualizar

   const [producto, guardarProducto] = useState({
      nombre: '',
      precio: '',
      imagen: ''
   })


   // cuando el componente carga
   useEffect(() => {
      // consultar la API
      const consultarAPI = async () => {
         const productosConsulta = await clientesAxios.get(`/productos/${id}`)

         guardarProducto(productosConsulta.data)
      }


      consultarAPI()
   }, [])

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
    
    const editarProducto = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('precio', producto.precio);
      formData.append('imagen', producto.imagen);
    
      try {
        const res = await clientesAxios.put(`/productos/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        // lanzar aletra
        if(res.status === 200){
          Swal.fire(
              'Editado correctamente',
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


   if(!producto.nombre) return <Spinner/>
   
   return (
      <Fragment>
         <h2>Editar Producto</h2>

         <form
            onSubmit={editarProducto}
         >
            <legend>Llena todos los campos</legend>

            <div className="campo">
               <label>Nombre:</label>
               <input
                  type="text"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={producto.nombre}
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
                  value={producto.precio}
                  onChange={leerInfoProducto}
               />
            </div>

            <div className="campo">
               <label>Imagen:</label>
               {producto.imagen ? (
                  <img src={`http://localhost:5000/imagen-productos/${producto.imagen}`}/>
               ): null}
               
               <input
                  type="file"
                  name="imagen"
                  onChange={leerArchivo}
               />
            </div>

            <div className="enviar">
               <input type="submit" className="btn btn-azul" value="Editar Producto" />
            </div>
         </form>
      </Fragment>
   )
}

export default EditarProductos