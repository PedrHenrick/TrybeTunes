import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import ProfileEdit from './ProfileEdit';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default Profile;
