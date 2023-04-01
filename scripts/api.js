

const api = {};

api.getAllPokemons = (offset = 0, limit = 9) => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(baseUrl)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .catch(error => console.log(error))
}

api.getPokemonByUrl = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((jsonBody) => {return createPokemon(jsonBody)})
        .catch(error => console.log(error))
}

function createPokemon(response){
  const types = response.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types
    const pokemon = {
      name: response.name,
      order:  response.order,
      photo: response.sprites.other["official-artwork"].front_shiny,
      types: types,
      type: type
    };
    return pokemon;
  }

  api.getPokemonName = (name) => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(baseUrl)
        .then((response) => response.json())
        .then((jsonBody) => {return createPokemon(jsonBody)})
        .catch((error) => {
          search__input.value = 'Sem resultados para sua busca'
        return
        })
}
