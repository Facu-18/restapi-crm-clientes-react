import React, {Fragment, useContext} from "react";

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
import NuevoPedido from "./components/pedidos/NuevoPedido.js";

import Login from "./components/auth/Login.js";

import { CRMContext, CRMProvider } from "./context/CRMContext.js";

function App(){
  
  // utilizar context en el componente
  const {auth, guardarAuth} = useContext(CRMContext);

  return(
   <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
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
              <Route exact path="/pedidos/nuevo/:id" Component={NuevoPedido} />

              <Route exact path="/iniciar-sesion" Component={Login}/>
            </Routes>
          </main>
      </div>
      </CRMProvider>
    </Fragment>
   </Router> 
  )
}

export default App;
