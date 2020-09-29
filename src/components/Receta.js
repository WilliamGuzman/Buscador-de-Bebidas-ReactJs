import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

//Importamos el componente de MODAL de Material UI
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


//Esta seccion es para definir la ubicacion en pantalla del modal
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%,-${left}%)`
    }
}

//Esta seccion es para darle estilos al modal
const useStyles = makeStyles( theme => ({

    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3)
    }
}))

const Receta = ({receta}) => {

    // Configuracion del modal de Material-UI
    const [ modalStyle ] = useState(getModalStyle);
    //Este estate es para mostrar u ocultar el modal
    const [ open, setOpen ] = useState(false);

    const clases = useStyles();

    //Funciones que manejaran los eventos de mostrar u ocultar el modal
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const { informacion , guardarIdReceta, guardarReceta } = useContext(ModalContext);
    
      // Muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if( informacion[`strIngredient${i}`] ) {
                ingredientes.push(
                    <li> { informacion[`strIngredient${i}`] }  { informacion[`strMeasure${i}`] }</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        
        <div className="col-md-4 mb-3">

            <div className="card">

                <h2 className="card-header">{receta.strDrink}</h2>

                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de: ${receta.strDrink}`} />

                <div className="card-body">

                    <button 
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() =>{
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div
                            style={modalStyle}
                            className={clases.paper}
                        >
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img  className="img-fluid my-4" src={informacion.strDrinkThumb} alt={receta.strDrink}/>

                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                { mostrarIngredientes(informacion) }
                            </ul>

                        </div>
                    </Modal>

                </div>

            </div>

        </div>

     );
}
 
export default Receta;