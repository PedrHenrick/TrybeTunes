import React, { Component } from 'react';
import Header from '../components/Header';
// import { Route, Switch } from 'react-router-dom';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
            />
          </label>
          <button
            type="button"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
