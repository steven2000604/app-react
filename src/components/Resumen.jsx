import React from "react";
import  axios  from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


class Resumen extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <p>Componente Resumen</p>
            </div>
        );
    }
}
function ContenedorNavegacion(props) {
    let navigate = useNavigate();
    return <Resumen navigate={navigate} />
}
export default ContenedorNavegacion;