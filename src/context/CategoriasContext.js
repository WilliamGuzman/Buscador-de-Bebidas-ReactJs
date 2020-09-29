import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Crear Context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    //Crear el state del context
    const [ categorias, guardarCategorias ] = useState([]);

    //Ejecutar el llamado a la API
    useEffect (() =>{

        //Obtenemos las categorias desde la API
        const obtenerCategorias = async () => {

            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios(url);

            guardarCategorias(categorias.data.drinks);
        }

        obtenerCategorias();

    }, [] );

    return (

        <CategoriasContext.Provider
            value={{
                //Una vez obtenida las categorias procedemos a pasarlas por el value para tenerlas disponibles en todos los
                //componentes
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

}
export default CategoriasProvider;