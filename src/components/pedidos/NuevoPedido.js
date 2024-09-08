import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clientesAxios from '../../config/axios.js';
import Swal from 'sweetalert2';

import FormBuscarProducto from './FormBuscarProducto.js';
import FormCantidadProcuto from './FormCantidadProducto.js';

function NuevoPedido() {

    // extraer el id del cliente
    const { id } = useParams();

    // state
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([])

    useEffect(async () => {
        //obtener cliente
        const consultarAPI = async () => {
            const consultaCliente = await clientesAxios.get(`/clientes/${id}`)
            guardarCliente(consultaCliente.data)
        }
        consultarAPI()
    }, []);

    const buscarProducto = async (e) =>{
      e.preventDefault();

      // obtener resultados de la busqueda
      const resultadoBusqueda = await clientesAxios.post(`/productos/busqueda/${busqueda}`);
      
      if(resultadoBusqueda.data[0]){
        let productoResultado = resultadoBusqueda.data[0];
        // agregar llave producto (copia id)
        productoResultado.producto = resultadoBusqueda.data[0]._id
        productoResultado.cantidad = 0;

        // ponerlo en el state
        guardarProductos([...productos, productoResultado]);

        console.log(productoResultado)

    }
      
      else{
         Swal.fire({
            icon: 'error',
            title: 'No hay resultados',
            text: 'no hay resultados, prueba con algo diferente'
        })
      }
    }

    // alamacenar busqueda en el state
    const leerDatosBusqueda = ( e ) =>{
      guardarBusqueda(e.target.value);
    }

    
    return (

        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.ap}</p>
            </div>

            <FormBuscarProducto
              buscarProducto={buscarProducto}
              leerDatosBusqueda={leerDatosBusqueda}
            />

                <ul className="resumen">
                
                    {productos.map((producto, index)=>(
                        <FormCantidadProcuto
                           key={producto.producto}
                           producto={producto}
                        />
                    ))}
                
                </ul>
                
                <div className="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
                </div>
        </Fragment>
    )
}

export default NuevoPedido;