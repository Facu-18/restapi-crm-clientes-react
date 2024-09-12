import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner.js'
import { CRMContext } from '../../context/CRMContext.js';

// importar cliente axios
import clienteAxios from '../../config/axios.js'

// Componentes
import Producto from './Producto.js';

function Productos() {

  const navigate = useNavigate()

   // productos = state, guardarProductos = funcion para guardar el state
   const [productos, guardarProductos] = useState([]);

   const [auth, guardarAuth] = useContext(CRMContext)

   //useEffect para consultar API
   useEffect(() => {

      if (auth.token !== '') {



         // Query a la API
         const consultarAPI = async () => {
            try {
               const productosConsulta = await clienteAxios.get('/productos', {
                  headers: {
                     Authorization: `Bearer ${auth.token}`
                  }
               });
               guardarProductos(productosConsulta.data)
            }
            catch (error) {
               // error con authorizacion
               if(error.response.status = 500){
                  navigate('/iniciar-sesion')
               }
            }
         }
         // llamar API
         consultarAPI()
      } else {
         navigate('/iniciar-sesion')
      }
   }, [productos])

   // spinner de carga

   if(!auth.auth){
      navigate('/iniciar-sesion')
   }

   if (!productos.length) {
      return <Spinner />
   }

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