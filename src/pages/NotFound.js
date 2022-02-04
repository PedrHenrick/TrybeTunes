import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1>Deu merda</h1>
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default NotFound;
