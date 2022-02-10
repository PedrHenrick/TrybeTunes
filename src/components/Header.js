import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import TrybeTunes from '../img/trybetunesLogo';

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

  navPage = () => {
    const { user } = this.state;
    return (
      <nav>
        <section className="headerTop">
          <div className="DivlogoTrybetunesHeader">
            <img
              src={ TrybeTunes }
              className="logoTrybetunesHeader"
              alt="Logo TrybeTunes"
            />
          </div>
          <div className="divUserNameHeader">
            <section className="nameImage">
              <img src={ user.image } alt="Foto do usuário" className="userImage" />
              <h2
                className="userNameHeader"
                data-testid="header-user-name"
              >
                { user.name }
              </h2>
              <p> 🟢 online </p>
            </section>
          </div>
        </section>
        <section className="headerBottom">
          <Link to="/profile" className="left" data-testid="link-to-profile">Perfil</Link>

          <Link to="/search" className="center" data-testid="link-to-search">Search</Link>

          <Link
            to="/favorites"
            className="rigth"
            data-testid="link-to-favorites"
          >
            Favoritos
          </Link>

        </section>
      </nav>
    );
  }

  render() {
    const { loading } = this.state;
    const loadingElement = <h2 className="loadingConst">Carregando...</h2>;
    return (
      <header data-testid="header-component">
        { loading ? loadingElement : this.navPage() }
      </header>
    );
  }
}

export default Header;
