// Nuevo archivo para llamar al API usando compenentes funcionales y hooks
import { useState, useEffect } from 'react';

// Hook personalizado para llamar a la API usando useState para inicializar valores
export function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Uso de useEffect para llamar a la API cuando se monta el componente o "endpoint" cambia
  useEffect(() => {
    // Función asincrónica fetchData que realiza la llamada a la API
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2${endpoint}`);

        // Verificamos si la respuesta de la red es exitosa
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parseamos la respuesta a formato JSON almacenamos en la state variable data
        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    // Llamamos la funcion para hacer llamada al API
    fetchData();
  }, [endpoint]); // El efecto cambiará cada que endpoint cambia

  // Retornamos objeto con las state variables data, isLoading y error
  return { data, isLoading, error };
}
