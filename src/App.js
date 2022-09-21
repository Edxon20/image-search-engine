import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario.jsx';

function App() {

  //State de la app
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {

    const consultarApi = async () => {

      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '30082241-d4494a87a9bc61e13163025dd';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setBusqueda(resultado.hits);

    }
    consultarApi();

  }, [busqueda])

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
     
    </div>
  );
}

export default App;
