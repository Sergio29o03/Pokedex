import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(''); 
  const [number, setNumber] = useState(1);
  const [pokemonList, setPokemonList] = useState([]); // Nuevo estado para la lista de Pokémon

  const URL = `https://pokeapi.co/api/v2/pokemon/${number}`;
  const initialListURL = 'https://pokeapi.co/api/v2/pokemon?limit=20'; // URL para obtener los primeros 20 Pokémon

  useEffect(() => {
    // Obtener la lista de los primeros 20 Pokémon
    axios
      .get(initialListURL)
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((err) => {
        window.alert(err);
      });

    // Obtener los detalles de un Pokémon específico
    axios
      .get(URL)
      .then((response) => {
        setData(response.data);
        setName(response.data.name);
        setWeight(response.data.weight);
      })
      .catch((err) => {
        window.alert(err);
      });
  }, [URL, initialListURL]); // Agregar ambos URLs como dependencias

  return (
    <div className="App">
      <h1>Pokemon</h1>
          {/* Lista de Pokémon */}
          <h2>Lista de Pokémon</h2>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <a href={`#${pokemon.name}`}>{pokemon.name}</a> - ID: {index + 1}
          </li>
        ))}
      </ul>


      <input
        type="number"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button>Mostrar</button>
      <h2>Nombre: {name}</h2>
      <h3>Peso: {weight}</h3>
      {data && data.sprites && data.sprites.other && (
        <img
          src={data ? data.sprites.other.dream_world.front_default : '<p> cargando <p>'}
          alt={name}
        />
      )}
      <p>Mis Habilidades Son: </p>
      {data ? (
        <ul>
          {data.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
