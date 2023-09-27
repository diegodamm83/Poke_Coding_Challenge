import React from 'react';
import { useApi } from '../utils/useApi';
import { Card } from 'antd';

// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función para capitalizar la primera letra de cada palabra en una cadena
function capitalizeEachWord(str) {
  return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

function PokemonDetail(props) {
  const { match } = props;
  const { data: pokemon, isLoading, error } = useApi(`/pokemon/${match.params.id}`); // Utiliza el hook incuido en useApi a traves del valor de match.params.id

  // Funcion para definir color de la carta en base al tipo de Pokémon
  const getCardColor = () => {
    if (pokemon.types && pokemon.types.length > 0) {
      switch (pokemon.types[0].type.name) {
        case 'fire':
          return '#FA8128'; 
        case 'water':
          return '#6BD9FF';
        case 'grass':
          return '#9EFF6B';
        case 'bug':
          return '#CBC3E3';
        default:
          return '#D3D3D3'; // Color default 
      }
    }
    return ''; // Color default en caso que un tipo no se encuentre

  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const cardColor = getCardColor(); // Obten el color de manera dinamica

  const cardStyle = {
    width: 400,
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: cardColor, // cardColor pasa el color en base al tipo de Pokémon
    border: '10px solid black',
  };

  const titleStyle = {
    fontSize: '30px',
    textAlign: 'center',
    fontFamily: 'Press Start 2P, cursive', // DEFINIR EL FONT PENDIENTE
    marginTop: '10px', 
  };  


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card 
        style={cardStyle} 
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta 
          title= {<h1 style={titleStyle}>{pokemon.name.toUpperCase()}</h1>}
          description={
            <>
              <h4><strong>Height:</strong> {pokemon.height/10} m</h4>
              <h4><strong>Weight:</strong> {pokemon.weight} kg</h4>
              {/* Usamos funcinoaes definidas para capitalizar los tipo y habilidades */}
              <h4><strong>Type:</strong> {capitalizeEachWord(pokemon.types.map(type => type.type.name).join(', '))}</h4>
              <h4><strong>Abilities:</strong> {capitalizeEachWord(pokemon.abilities.map(ability => ability.ability.name).join(', '))}</h4>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default PokemonDetail;

