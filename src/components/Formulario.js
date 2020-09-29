import React, { useContext, useState } from 'react'; //Importamos para poder utilizar las funciones del Context

import { CategoriasContext } from '../context/CategoriasContext';//Importamos el context creado por nosotros
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    //De esta manera podemos obtener todos los datos que tengamos en el value del Context 
    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    //Definimos State
    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });

    //Funcion para leer los datos
    const obtenerDatosReceta = e => {

        guardarBusqueda({
            ...busqueda,
            [ e.target.name ] : e.target.value
        });

    }

    return ( 

        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(categoria => (
                            <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>

     );
}
 
export default Formulario;