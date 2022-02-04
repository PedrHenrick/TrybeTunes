import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Header from '../components/Header';
// import ProfileEdit from './ProfileEdit';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}

export default Profile;
