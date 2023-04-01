const buttonLoadMoreItens = document.getElementById('load__more_items');
const search__box = document.getElementById('search__box');
const search__input = document.getElementById('search__input');
const clear_search = document.getElementById('clear_search');

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon__list = document.getElementById('pokemon__list');
const list = document.createDocumentFragment();

const limit = 9;
let offset = 0;
const maxRecords = 151

window.addEventListener("load", () =>  {
    console.log("Todos os recursos terminaram o carregamento!");
    getAllPokemon();
});

buttonLoadMoreItens.addEventListener('click', () => loadMoreItems());

clear_search.addEventListener('click', () =>{
  if(search__input.value){
    clearDivs();
    search__input.value = '';
    getAllPokemon()
  }
})

search__box.addEventListener('click', () => {
  const value = search__input.value;

  api.getPokemonName(value)
  .then((pokemon) =>{
    if(pokemon){
      clearDivs();
      createDiv(pokemon)
    }
  })
  
});

function getAllPokemon(){
  api.getAllPokemons(offset)
  .then((pokemons) => pokemons.map(pokemon => api.getPokemonByUrl(pokemon)))
  .then((pokemonsList) => Promise.all(pokemonsList))
  .then((results) => mapResults(results))
}

function mapResults(pokemons){
  pokemons.map((pokemon) => createDiv(pokemon));
}

function clearDivs(){
  while(pokemon__list.firstChild){
    pokemon__list.removeChild(pokemon__list.firstChild)
  }
} 

function loadMoreItems(){
  offset += limit
  
  const qtdRecordNextPage = offset + limit;
  if(qtdRecordNextPage >= maxRecords) {
    getAllPokemon(offset, limit)
    buttonLoadMoreItens.parentElement.removeChild(buttonLoadMoreItens)
  } else {
    getAllPokemon(offset, limit)
  }
}

function createDiv(pokemon) {
  let pokemonContainer = document.createElement('div');

  let photo = document.createElement('img');
  let photoDiv = document.createElement('div');
  let nameDiv = document.createElement('div');
  let name = document.createElement('h2');
  let typesDiv = document.createElement('div');

  pokemon.types.forEach(type => {
      let typeDiv = document.createElement('div');
      typeDiv.classList.add('pokemon__list--content-type')
      typeDiv.classList.add(type)
      typeDiv.innerHTML = `${type}`;
      typesDiv.appendChild(typeDiv);
  });
  
  pokemonContainer.classList.add("pokemon__list--content");
  pokemonContainer.classList.add(pokemon.type);

  photoDiv.classList.add('pokemon__list--content-photo');
  typesDiv.classList.add('pokemon__list--content-types');
  nameDiv.classList.add('pokemon__list--content-name');
  
  name.innerHTML = `${pokemon.name}`;
  photo.src = pokemon.photo;

  photoDiv.appendChild(photo);
  
  nameDiv.appendChild(name);
  nameDiv.appendChild(typesDiv);

  pokemonContainer.appendChild(nameDiv);
  pokemonContainer.appendChild(photoDiv);

  list.appendChild(pokemonContainer);
  pokemon__list.appendChild(list);
}
