import React, { useEffect, useState, Fragment, useContext } from 'react';

// importar cliente axios
import clienteAxios from '../../config/axios.js'
// Componentes
import Cliente from './Cliente.js';

import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner.js';

// imporar el context
import { CRMContext } from '../../context/CRMContext.js';

function Clientes() {

  const navigate = useNavigate()

  // Trabajar con el state
  // clientes = state, guardar clientes = funcion para guardar el state
  const [clientes, guardarClientes] = useState([])

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext)

  useEffect(() => {
    if (auth.token !== '') {
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clienteAxios.get('/clientes', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          })
  
          // resultado en el state
          guardarClientes(clientesConsulta.data)
        }
        catch (error) {
          // error con autorizacion
          if (error.response.status === 500) {
            navigate('/iniciar-sesion')
          }
        }
      }
      consultarAPI();
    } else {
      navigate('/iniciar-sesion')
    }
  }, [auth.token, clientes]);


  if (!clientes.length) {
    return <Spinner />
  }

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