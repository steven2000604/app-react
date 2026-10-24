import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { SoloLetras } from '../../utils/validaciones';

const Formulario = ({ registroAEditar, onClose, onGuardar, notificacion }) => {

  // 1. Estado inicial del formulario
  const [form, setForm] = useState({
    nombre: '',
    creacion: '',
    sede: '',
    federacion: '',
    nombre_estadio: '',
    apodos: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. useEffect: Detectar si estamos en modo EDICIÓN
  useEffect(() => {
    if (registroAEditar) {

      setForm({
        ...registroAEditar,
        
      });
    } else {
      setForm({
        nombre: '', creacion: '', sede: '', federacion: '', nombre_estadio: '', apodos: ''
      });
    }

  }, [registroAEditar]);

  // 3. Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    console.log(form);
  };

  // 4. Envío del formulario (Create o Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    

    // Determinar si es POST (crear) o PUT (editar)
    const method = registroAEditar ? 'put' : 'post';
    // Si editamos, agregamos el ID a la URL. Si creamos, usamos la URL base.
    const url = registroAEditar
      ? `http://localhost:5000/clubes/${registroAEditar.id}`//Put
      : 'http://localhost:5000/clubes/';//Post

    try {
      await axios({
        method: method,
        url: url,
        data: form,
        
      });

      // Si todo sale bien:
      notificacion(registroAEditar ? 'Club actualizado' : 'Club registrado');
      onGuardar(); // Llamamos a la función del padre para recargar la tabla
      onClose();   // Cerramos el modal

    } catch (err) {
      // Manejo de errores (ej: Cédula duplicada 409, Error servidor 500)
      console.log(err);
      if (err.response) {
        setError(err.response.data.message || 'Error al guardar');
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formulario-container">
      <h3>{registroAEditar ? 'Editar Club' : 'Nuevo Club'}</h3>

      {error && <p className="alert alert-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text" name="nombre" value={form.nombre} onChange={handleChange}
            required maxLength="40"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Creacion:</label>
          <input
            type="text" name="creacion" value={form.creacion} onChange={handleChange}
            required maxLength="10"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Sede:</label>
          <input
            type="text" name="sede" value={form.sede} onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Federación:</label>
          <input
            type="text" name="federacion" value={form.federacion} onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>	Estadio:</label>
          <input
            type="text" name="nombre_estadio" value={form.nombre_estadio} onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>	Apodos:</label>
          <input
            type="text" name="apodos" value={form.apodos} onChange={handleChange}
            className="form-control"
          />
        </div>


        <div className="botones-accion" style={{ marginTop: '15px' }}>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" onClick={onClose} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;