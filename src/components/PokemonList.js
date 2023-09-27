import React, { useState } from 'react';
import { useApi } from '../utils/useApi';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

// Cambie los Componentes basados en clases a Componentes funcionales
function PokemonList() {
  const { data: pokemonData, isLoading, error } = useApi('/pokemon'); // Utiliza el hook de useApi 

  // Use state para el manejo de filtros y ordenamiento cuando cambien las variables establecidas
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');

  // Función para manejar cambios en el filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Función para manejar cambios en el sort
  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  // Extrae datos de la llamada al API
  const pokemon = pokemonData ? pokemonData.results : [];

  // Aplicamos filtro  y ordenación a los datos
  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px', backgroundColor: '#444444', borderRadius: '10px' }}>
      <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={poke => (
          <List.Item>
            <Link to={`/pokemon/${poke.name}`}>
              <Card
                hoverable
                style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                cover={<img alt={poke.name} src={"https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"} />}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card.Meta title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PokemonList;

