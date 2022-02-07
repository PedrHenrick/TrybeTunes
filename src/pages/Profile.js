import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userObj: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const userObj = await getUser();
    this.setState({ loading: false, userObj });
  }

  renderPage = () => {
    const { userObj } = this.state;
    return (
      <div>
        <img src={ userObj.image } alt={ userObj.name } data-testid="profile-image" />
        <h3>{ userObj.name }</h3>
        <p>{ userObj.email }</p>
        <p>{ userObj.description }</p>
        <Link to="/profile/edit">
          <button
            type="button"
          >
            Editar perfil
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : this.renderPage() }
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default Profile;
