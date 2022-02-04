import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default ProfileEdit;
