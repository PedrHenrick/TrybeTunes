import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default Album;
