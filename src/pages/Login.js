import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      Nome: '',
      disable: true,
      loading: false,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const NAME_MIN = 3;
    const { name, value } = target;

    if (value.length >= NAME_MIN) this.setState({ disable: false });
    else this.setState({ disable: true });

    this.setState({
      [name]: value,
    });
  };

  onSaveName = async () => {
    const { Nome, loading } = this.state;
    console.log(loading, '1');
    this.setState({
      loading: true,
    });
    await createUser({ name: Nome });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const {
      Nome,
      disable,
      loading,
      redirect,
    } = this.state;
    const form = (
      <form>
        <h1>Login</h1>
        <label htmlFor="Nome">
          Nome
          <input
            type="text"
            name="Nome"
            data-testid="login-name-input"
            value={ Nome }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ disable }
          onClick={ this.onSaveName }
        >
          Entrar
        </button>
      </form>
    );
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : form }
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;

// Code Reviews:
//  Álvaro Ramos: https://github.com/tryber/sd-018-b-project-trybetunes/pull/78
//  Victor Santos: https://github.com/tryber/sd-018-b-project-trybetunes/pull/59;
