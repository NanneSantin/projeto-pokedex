const pokeApi = {};

function convertPokeApiToPokemonModel(pokeDetails) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetails.id;
    pokemon.name = pokeDetails.name;

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; //pega o primeiro item do array types usando destructing

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
    return fetch(pokemon.url) //pegando a url dos detalhes de cada pokemon
        .then((response) => response.json())//convertendo
        .then(convertPokeApiToPokemonModel)
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json()) //converte para objeto em JS
        .then((jsonBody) => jsonBody.results) //o then abaixo de outro: o debaixo recebe o retorno do de cima.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests)) //aguarda toda a lista de cima ser resolvida
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

