import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { confirm } from "./Confirmation";
import Formulario from "./Formulario";

class Clubes extends React.Component {
  state = {
    registros: [],
    mostrarModal: false,
    registroSeleccionado: null,
  };

  mostrarModalNuevo = () => {
    this.setState({
      mostrarModal: true,
      registroSeleccionado: null,
    });
  };
  mostrarModalEditar = (id) => {
    this.setState({
      mostrarModal: true,
      registroSeleccionado: id,
    });
  };
  cerrarModal = () => {
    this.setState({mostrarModal:false})
  };
  alGuardar = () =>{
    this.componentDidMount();//recargar datos
    this.cerrarModal();//cerrar ventana modal
  };

  componentDidMount() {
    //  console.log("Consultando API...");
    let url = "http://localhost:5000/clubes";
    axios
      .get(url)
      .then((response) => {
        this.setState({ registros: response.data });
      })
      .catch((error) => {
        console.log("Error de conexion" + error.error);
      });
  }
  eliminar = async (id, nombre) => {
    if (await confirm("Desea eliminar el club " + nombre + "?")) {
      axios
        .delete("http://localhost:5000/clubes/" + id)
        .then((response) => {
          const {notificacion} =  this.props;
          this.componentDidMount();
          notificacion ("Club " + nombre + " Eliminado")
        })
        .catch((error) => {
          // eslint-disable-next-line no-undef
          setNotificacion("Error al eliminar" + error.error);
        });
    }
  };

  render() {
    return (
      <div>
        <Header />

        <h1>Datos de clubes</h1>
        <input
          type="button"
          className="btn btn-secondary"
          value="+ Nuevo"
          onClick={this.mostrarModalNuevo}
        />
        <div className="col-11 position-relative top-0 start-50 translate-middle-x">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Creacion</th>
                <th scope="col">Sede</th>
                <th scope="col">Federacion</th>
                <th scope="col">Estadio</th>
                <th scope="col">Apodos</th>
              </tr>
            </thead>

            <tbody>
              {this.state.registros.map((value, index) => (
                <tr key={index}>
                  <th scope="row">{value.id}</th>
                  <td>{value.nombre}</td>
                  <td>{value.creacion}</td>
                  <td>{value.sede}</td>
                  <td>{value.federacion}</td>
                  <td>{value.nombre_estadio}</td>
                  <td>{value.apodos}</td>
                  <td>
                    <svg
                      onClick={() => this.mostrarModalEditar(value)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00bcd4"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>

                    <svg
                      onClick={() => this.eliminar(value.id, value.nombre)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff2d55"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M4 7h3m4 0h9" />
                      <path d="M10 11l0 6" />
                      <path d="M14 14l0 3" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l.077 -.923" />
                      <path d="M18.384 14.373l.616 -7.373" />
                      <path d="M9 5v-1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.state.mostrarModal && (
          <div className="modal-overlay" style={modalStyles.overlay}>
            <div className="modal-content" style={modalStyles.content}>
              <Formulario
                registroAEditar={this.state.registroSeleccionado}
                onClose={this.cerrarModal}
                onGuardar={this.alGuardar}
                notificacion={this.props.notificacion}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

//Estilos para ventana modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
  },
};
function ContenedorNavegacion(props) {
  let navigate = useNavigate();
  return <Clubes {...props}navigate={navigate} />;
}

export default ContenedorNavegacion;
