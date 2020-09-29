import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';

import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (

    //Para utilizar el context creado sustituiremos el <Fragment> por en este caso <CategoriasProvider> y todos los componentes
    //que esten dentro de ambas etiquetas podra pasarse todos los datos entre App y todos sus componentes hijos

    <CategoriasProvider>

      <RecetasProvider>

        <ModalProvider>
      
          <Header />

          <div className="container mt-5">

            <div className="row">

              <Formulario />

            </div>

            <ListaRecetas />

          </div>

        </ModalProvider>

      </RecetasProvider>

    </CategoriasProvider>

    //</Fragment>
    
  );
}

export default App;
