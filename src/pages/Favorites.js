import React, { Component } from 'react';
import Header from '../components/Header';
// import { Route, Switch } from 'react-router-dom';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favoritos</h1>
      </div>
    );
  }
}

export default Favorites;
