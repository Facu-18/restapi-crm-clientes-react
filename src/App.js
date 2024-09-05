import React, {Fragment} from "react";

//Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layout
import Header from "./components/layout/Header.js";
import Navegacion from "./components/layout/Navegacion.js";

// Componentes clientes
import Clientes from "./components/clientes/Clientes.js";
import NuevoCliente from "./components/clientes/NuevoCliente.js";
import EditarCliente from "./components/clientes/EditarCliente.js";

import Pedidos from "./components/pedidos/Pedidos.js";

// Componentes Productos
import Productos from "./components/productos/Productos.js";
import NuevoProducto from "./components/productos/NuevoProducto.js";
import EditarProductos from "./components/productos/EditarProducto.js";

function App(){
  return(
   <Router>
      <Fragment>
        <Header />
        
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          
          <main className="caja-contenido col-9">
            <Routes>
              <Route exact path="/" Component={Clientes} />
              <Route exact path="/clientes/nuevo" Component={NuevoCliente}/>
              <Route exact path="/clientes/editar/:id" Component={EditarCliente}/>

              <Route exact path="/productos" Component={Productos} />
              <Route exact path="/productos/nuevo" Component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" Component={EditarProductos} />
              
              <Route exact path="/pedidos" Component={Pedidos} />
            </Routes>
          </main>
      </div>
    </Fragment>
   </Router> 
  )
}

export default App;
