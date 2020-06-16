import React, { Component } from 'react';
import './main.css';
import Header from './Header.js'
import Pokemon from './Pokemon.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
      allPokemon: [],
      pokemonToShow: []
    };
  }

  // search for pokemon if the search string is IN the pokemon name
  searchPokemon(search) {
    const lowerCaseSearch = search.toLowerCase();

    if (search == "") {
      this.setState({pokemonToShow: this.state.allPokemon});
    } else {
      let list = [];
      this.state.allPokemon.forEach((pokemon) => {
        if(pokemon.name.toLowerCase().indexOf(lowerCaseSearch) > -1) {
          list.push(pokemon);
        }
      });
      this.setState({pokemonToShow: list});
    }
  }

  changeSearchState(searchState) {
    this.setState({isSearching: searchState});
    if(!this.state.isSearching) {
      this.searchPokemon("");
    }
  }

  componentDidMount() {
    this.fetchAllPokemon();
  }

  fetchAllPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then((response) => response.json())
    .then((allpokemon) => {
      allpokemon.results.forEach((pokemon) => {
        fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          let pokemonData = {'name': data.name, 'id':data.id, 'types':data.types }
          this.setState({
            pokemonToShow: this.state.pokemonToShow.concat(pokemonData),
            allPokemon: this.state.allPokemon.concat(pokemonData)
          });
        });
      });
    });
  }

  renderAllPokemon(){
    let list = [];
    this.state.pokemonToShow.forEach((pokemon) => {
      list.push(<Pokemon name={pokemon.name} id={pokemon.id} types={pokemon.types}/>);
    })
    return (
      <div>
        {list}
      </div>
    );
  }

  render() {
    const pokemonRendered = this.renderAllPokemon();
    return (
      <div className="app">
        <Header searchPokemon={this.searchPokemon.bind(this)}
                changeSearchState={this.changeSearchState.bind(this)}/>
        <div className="slogan">Gotta Catch 'Em All</div>
        <div className="pokemon-list">
          {pokemonRendered}
        </div>
      </div>
    );
  }
}

export default App;
