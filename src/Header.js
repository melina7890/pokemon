import React, { Component } from 'react';
import './main.css';
import searchIcon from './search-13-32.png'
import xIcon from './x-mark-4-32.png'

class Header extends Component {

  constructor(props) {
    super(props);
    this.changeSearchState = this.changeSearchState.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      search: false,
    };
  }

  searchButton() {
    return (
      <div onClick={this.changeSearchState}>
        <img className="icon" src={searchIcon} alt="search icon"/>
      </div>
    );
  }

  xButton(props) {
    return (
      <div onClick={this.changeSearchState}>
        <img className="icon" src={xIcon} alt="x icon"/>
      </div>
    );
  }

  changeSearchState() {
    this.state.search? this.setState({search: false}) : this.setState({search: true});
    this.props.changeSearchState(this.state.search);
  }

  search({ target }) {
    this.props.searchPokemon(target.value);
  }

  searchBar() {
    return (
      <input className="form-control search-container"
             onKeyUp={this.search}
             id="search" type="text" placeholder="Search for Pokemon"
             aria-label="Search"/>
    );
  }

  render() {
    let headerButton, headerContent;
    if(this.state.search) {
      headerButton = this.xButton();
      headerContent = this.searchBar();
    } else {
      headerButton = this.searchButton()
      headerContent = <div>Select Champion +50%</div>;
    }
    return (
      <div className="header">
        <div className="header-content">
          {headerContent}
        </div>
        {headerButton}
      </div>
    )
  }
}
export default Header;
