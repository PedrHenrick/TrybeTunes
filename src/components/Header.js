import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.VerificateUser();
  }

  VerificateUser = async () => {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    const nav = (
      <nav>
        <h2 data-testid="header-user-name">{`Olá ${user.name}`}</h2>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <hr />
        <Link to="/profile/edit">Editar Perfil</Link>
        <hr />
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <hr />
        <Link to="/album/:id">Álbum</Link>
        <hr />
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <hr />
      </nav>
    );
    const loadingElement = <h2>Carregando...</h2>;
    return (
      <header data-testid="header-component">
        { loading ? loadingElement : nav }
      </header>
    );
  }
}

export default Header;
