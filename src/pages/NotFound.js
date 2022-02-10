import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <section data-testid="page-not-found" className="page_404">
        <div className="four_zero_four_bg">
          <h1 className="text-center ">404</h1>
        </div>
        <h3 className="h2">Página não encontrada</h3>
        <Link to="/" className="link_404">Voltar</Link>
      </section>
    );
  }
}

export default NotFound;

// Referência:
//  Todo a lógica atribuida a página foi retirada desse site: https://webdeasy.de/en/top-404-pages/
