import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import clientesAxios from '../../config/axios.js';
import Swal from 'sweetalert2';

import FormBuscarProducto from './FormBuscarProducto.js';
import FormCantidadProcuto from './FormCantidadProducto.js';

function NuevoPedido() {

    const navigate = useNavigate();

    // extraer el id del cliente
    const { id } = useParams();

    // state
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([])
    const [total, guardarTotal] = useState(0)

    useEffect( () => {
        //obtener cliente
        const consultarAPI = async () => {
            const consultaCliente = await clientesAxios.get(`/clientes/${id}`)
            guardarCliente(consultaCliente.data)
        }
        consultarAPI()
    
        //actualizar el total
        calcularTotal();

    }, [productos]);

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

    // actualizar la cantidad de productos
    const restarProductos = (i)=>{
        // copiar el arrglo original
        const todosProductos = [...productos];

        // validar si esta en 0 no puede bajar mas
        if(todosProductos[i].cantidad === 0) return

        // decremento
        todosProductos[i].cantidad--;

        // almacenar en el state
        guardarProductos(todosProductos);

    }
    
    const aumentarProductos = (i) =>{
        // copiar el arreglo
        const todosProductos = [...productos];

        // incremento
        todosProductos[i].cantidad++;

        // almacenar en el state
        guardarProductos(todosProductos);
        
    }
    
    // elimina un producto del state
    const eliminarProducto = (id) => {
        const todosProductos = productos.filter(producto => producto.producto !== id)
        guardarProductos(todosProductos);
    }


    // actualizar el total a pagar
    const calcularTotal = () => {
        // arreglo de productos es igual a 0 el total el 0
        if(productos.length === 0){
            guardarTotal(0)
            return;
        }

        // calcular nuevo total
        let nuevoTotal = 0;

        // recorrer los productos y sus cantidades
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))

        guardarTotal(nuevoTotal)
        
    }    

    // almacena el pedido en la BD
    const realizarPedido = async (e) => {
        e.preventDefault();

        // construit el objeto
        const pedido = {
            "cliente": id, /* const {id} = useParams() extraido al principip */
            "pedido": productos,
            "total": total
        }

        // almacenar en la base de datos
        const resultado = await clientesAxios.post(`/pedidos/nuevo/${id}`, pedido)

        if( resultado.status === 200){
            // alerta, todo bien
           Swal.fire({
            icon: 'success',
            title: "Pedido Exitoso!",
            text: resultado.data.mensaje
           }) 
            
        } else{
            // alerta, error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'No se pudo registrar el pedido',
            })
        }
    
        navigate('/pedidos')

    }

    return (

        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
            </div>

            <FormBuscarProducto
              buscarProducto={buscarProducto}
              leerDatosBusqueda={leerDatosBusqueda}
            />

                <ul className="resumen">
                
                    {productos.map((producto, index)=>(
                        <FormCantidadProcuto
                           key={producto.producto}
                           index={index}
                           producto={producto}
                           restarProductos={restarProductos}
                           aumentarProductos={aumentarProductos}
                           eliminarProducto={eliminarProducto}
                        />
                    ))}
                
                </ul>
                
                <p className='total'>Total a Pagar: <span>$ {total} </span></p>

                {total > 0 ? (
                    <form
                      onSubmit={realizarPedido}
                    >
                      <input 
                      type='submit'
                      className='btn btn-verde btn-block'
                      value='Realizar Pedido'
                      />
                    </form>
                ): null}
        </Fragment>
    )
}

export default NuevoPedido;