const pokemonList = document.getElementById('pokemonList'); //atribuindo a uma constante minha lista de pokemon do HTML
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// pokeApi.getPokemons().then((pokemons = []) => {

//     //como a função já tem a referência do pokemon, e o map executa a ação para cada item do array, posso passar a função convertPokemonToLi direto.
//     //mesma coisa de: pokemons.map((pokemon)=>convertPokemonToLi(pokemon));
//     const listPokemon = pokemons.map(convertPokemonToLi).join('');

//     pokemonList.innerHTML = listPokemon; //concatenando minha lista do HTML com o que estou recebendo
// }).catch((error) => console.error(error));

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})