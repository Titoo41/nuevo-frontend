import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaginatedList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Cambia la URL a tu endpoint de la API que devuelve datos paginados
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://tuservidorapi.com/entidad?page=${page}`);
      setData(response.data.results);  // Ajusta según la estructura de tu respuesta
      setTotalPages(response.data.totalPages); // Suponiendo que tu API devuelve el total de páginas
      setCurrentPage(page);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    fetchData(pageNumber);
  };

  return (
    <div>
      <h1>Listado Paginado</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.nombre}</li> // Ajusta según tu data
          ))}
        </ul>
      )}
      <div>
        {/* Botones de paginación */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
