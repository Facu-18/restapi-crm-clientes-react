import React, {Fragment} from "react";

//Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layout
import Header from "./components/layout/Header.js";
import Navegacion from "./components/layout/Navegacion.js";

// Componentes
import Clientes from "./components/clientes/Clientes.js";
import Pedidos from "./components/pedidos/Pedidos.js";
import Productos from "./components/productos/Productos.js";

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
              
              <Route exact path="/productos" Component={Productos} />
              
              <Route exact path="/pedidos" Component={Pedidos} />
            </Routes>
          </main>
      </div>
    </Fragment>
   </Router> 
  )
}

export default App;
