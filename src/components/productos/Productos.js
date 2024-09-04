import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';

// importar cliente axios
import clienteAxios from '../../config/axios.js'

// Componentes
import Producto from './Producto.js';

function Productos()  {
   
   // productos = state, guardarProductos = funcion para guardar el state
   const [productos, guardarProductos] = useState([]);

   //useEffect para consultar API
   useEffect( ()=>{
     
      // Query a la API
      const consultarAPI = async ()=>{
         const productosConsulta = await clienteAxios.get('/productos')
         guardarProductos(productosConsulta.data)
      }

      // llamar API
      consultarAPI()
   
   }, [])
   
   return (
    <Fragment>
      <h2>Productos</h2>

       <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                     <Producto
                        key={producto._id}
                        producto={producto}
                     />
                ))}
            </ul> 
    </Fragment>
   )
}

export default Productos