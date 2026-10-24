import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resumen from "./components/Resumen";
import Clubes from "./components/Clubes";

class App extends React.Component {
  //JavaScript
  notificacion = (mensaje, tipo = 'info', duracion = 3000) => {
    /* acceso al contenerdor */
    let container = document.querySelector(".notif-container");
    /* crear un elemto de la notificacion */
    const notif = document.createElement("div");
    //agrego clases al elemto
    notif.className = `notif-toast $(tipo)`;
    //agrego mensaje al elemento
    notif.innerText = mensaje;
    //agregamos el elemento al contender
    container.appendChild(notif);
    //activar animación de entrada
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notif.classList.add("show"); //mostramos la notificación
      });
    });
    setTimeout(() => {
      notif.classList.remove("show");
      notif.classList.add("fade-out");
      notif.addEventListener("transitionend", () => {
        notif.remove(); //eliminar elemntos
      });
    }, duracion);
  };
  render() {
    return (
      <div className="App">
        <div className="notif-container"></div>
        <Router>
          <Routes>
            <Route path="/" element={<Resumen />} />
            <Route path="/clubes" element={<Clubes  notificacion={this.notificacion}/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
