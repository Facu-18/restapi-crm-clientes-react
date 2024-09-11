import React, { useEffect, useState, Fragment } from 'react';
import clientesAxios from '../../config/axios.js';
import DetallesPedidos from './DetallesPedidos.js';
import Swal from 'sweetalert2';


function Pedidos() {

  const [pedidos, guardarPedidos] = useState([]);

  // elmimina un pedido
  const eliminarPedido = (id) => {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Un pedido eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        // elminar en la API
        clientesAxios.delete(`/pedidos/${id}`)
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

  useEffect(() => {

    const consultatAPI = async () => {
      // obtener los pedidos
      const resultado = await clientesAxios.get('/pedidos')
      guardarPedidos(resultado.data)
    }
    consultatAPI();
  }, [pedidos])

  return (
    <Fragment>
      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedidos
            key={pedido._id}
            pedido={pedido}
            eliminarPedido={eliminarPedido}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default Pedidos