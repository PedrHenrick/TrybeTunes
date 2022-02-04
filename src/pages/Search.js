import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disable: true,
    };
  }

  onInputChange = ({ target }) => {
    const NAME_MIN = 2;
    const { name, value } = target;
    if (value.length >= NAME_MIN) this.setState({ disable: false });
    else this.setState({ disable: true });

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      search,
      disable,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              data-testid="search-artist-input"
              placeholder="Qual banda dejesa buscar?"
              value={ search }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
