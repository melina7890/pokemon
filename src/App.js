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

  searchPokemon(search) {
    console.log(search);
    const lowerCaseSearch = search.toLowerCase();

    if (search == "" || !this.state.isSearching) {
      this.setState({pokemonToShow: this.state.allPokemon});
    } else {
      let list = [];
      this.state.allPokemon.forEach((pokemon) => {
        console.log(pokemon.name);
        console.log(pokemon.name.toLowerCase().indexOf(lowerCaseSearch));
        if(pokemon.name.toLowerCase().indexOf(lowerCaseSearch) > -1) {
          console.log(pokemon.name + "here");
          list.push(pokemon);
        }
      });
      console.log(list);
      this.setState({pokemonToShow: list});
    }
  }

  changeSearchState(searchState) {
    this.setState({isSearching: searchState});
  }

  componentDidMount() {
    this.fetchAllPokemon();
  }

  fetchAllPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then((response) => response.json())
    .then((allpokemon) => {
      this.setState({allPokemon: allpokemon.results, pokemonToShow: allpokemon.results});
    })
  }

  renderAllPokemon(){
    let list = [];
    console.log(this.state.pokemonToShow + "renderall")
      this.state.pokemonToShow.forEach((pokemon) => {
        list.push(<Pokemon url={pokemon.url}/>);
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
