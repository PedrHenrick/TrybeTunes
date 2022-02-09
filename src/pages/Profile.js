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
      <div className="profileDiv">
        <img
          className="imgProfile"
          src={ userObj.image }
          alt={ userObj.name }
          data-testid="profile-image"
        />
        <div className="divElement">
          <h3>Nome:</h3>
          <h3 className="infoUser">{ userObj.name }</h3>
        </div>
        <div className="divElement">
          <h3>Email:</h3>
          <p className="infoUser">{ userObj.email }</p>
        </div>
        <div className="divElement">
          <h3>Descrição:</h3>
          <p className="infoUser">{ userObj.description }</p>
        </div>
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
      </div>
    );
  }
}

export default Profile;
