import React, {useEffect, useState, Fragment} from 'react';

// importar cliente axios
import clienteAxios from '../../config/axios.js'
// Componentes
import Cliente from './Cliente.js';

import { Link } from 'react-router-dom';

function Clientes()  {
   
   // Trabajar con el state
   // clientes = state, guardar clientes = funcion para guardar el state
   const [clientes, guardarClientes] = useState([])

   // query a la api
   const consultarAPI = async ()=>{
      const clientesConsulta = await clienteAxios.get('/clientes')
   
      // resultado en el state
      guardarClientes(clientesConsulta.data)
   }

   // use effect
   useEffect( () => {
       consultarAPI();
   }, [clientes]);

   return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
      <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
      </Link>

      
      <ul className='listado-cliente'>
      {clientes.map((cliente) => (
          <Cliente
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>
    
    </Fragment>
    
   )
}

export default Clientes