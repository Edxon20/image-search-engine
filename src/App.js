import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario.jsx';
import ListadoImagenes from './components/ListadoImagenes.jsx';

function App() {

  //State de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalPaginas]= useState(1);

  useEffect(() => {

    const consultarApi = async () => {

      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '30082241-d4494a87a9bc61e13163025dd';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      //Calcular el total de paginas
      const calcucularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcucularTotalPaginas);

    }
    consultarApi();

  }, [busqueda])

  //Definir la pagina anterior
  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;
    
    setPaginaactual(nuevaPaginaActual);

  }
  //Definir la pagina siguiente

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;
    
    setPaginaactual(nuevaPaginaActual);

  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>

     <div className='row justify-content-center'>

        <ListadoImagenes imagenes={imagenes} />
        <button
          type='button'
          className='bbtn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior </button>

        <button
          type='button'
          className='bbtn btn-info'
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>

     </div>     
    </div>
  );
}

export default App;
