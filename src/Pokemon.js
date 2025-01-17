import React, { Component } from 'react';
import './main.css';

class Pokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      id: null,
      types: [],
    };
  }

  renderTypes(types) {
    let allTypes =  [];
    types.forEach((t) => {
      const capitalizedType = t['type']['name'].toUpperCase();
      allTypes.push(capitalizedType);
    });
    allTypes = allTypes.join();

    const str = "Type: " + allTypes;

    return (
      <div className="type-container">
        {str}
      </div>
    );
  }

  renderPlusIcon() {
    return (
      <img className="plus-icon" src="https://img.icons8.com/flat_round/64/000000/plus.png"
           onClick={this.alertPlus}/>
    );
  }

  alertPlus() {
    alert("You have clicked the plus button!");
  }

  render() {
    const plusIcon = this.renderPlusIcon();
  
    const types = this.renderTypes(this.props.types);
    const url = "https://pokeres.bastionbot.org/images/pokemon/" + this.props.id + ".png"
    return (
      <div className="pokemon-container">
        <div className="left-side">
          <div className="pokemon-image-container">
            <img className="pokemon-image" src={url}/>
          </div>
          <div className="info-container">
            <div className="name-container">
              {this.props.name.toUpperCase()}
            </div>
            {types}
          </div>
        </div>
        <div className="right-side">
          <div className="multiplier">
            1.5X
          </div>
          {plusIcon}
        </div>
      </div>
    );
  }
}

export default Pokemon;
