import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <Link to="/search">Voltar</Link>
        <h1>Favoritos</h1>
      </div>
    );
  }
}

export default Favorites;
