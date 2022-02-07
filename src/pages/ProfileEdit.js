import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import InputText from '../components/InputText';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      Imagem: '',
      Nome: '',
      Email: '',
      Descrição: '',
      disable: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    const userObj = await getUser();
    this.setState({
      loading: false,
      Imagem: userObj.image,
      Nome: userObj.name,
      Email: userObj.email,
      Descrição: userObj.description,
    });
  }

  componentDidUpdate() {
    const {
      Imagem,
      Descrição,
      Nome,
      Email,
      disable,
    } = this.state;

    const indexOfLimit = -1;
    const validateEmail = [
      Email.length !== 0,
      Email.indexOf('@') !== indexOfLimit,
      Email.indexOf('.') !== indexOfLimit,
    ];

    const arrayValid = [
      Nome.length !== 0,
      Descrição.length !== 0,
      Imagem.length !== 0,
      validateEmail.every((condition) => condition),
    ];

    if (arrayValid.every((item) => item === true) && disable === true) {
      this.handleChangeDisable(false);
    } else if (!(arrayValid.every((item) => item === true)) && disable === false) {
      this.handleChangeDisable(true);
    }
  }

  handleChangeDisable = (value) => {
    this.setState({
      disable: value,
    });
  };

  getValue = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveInfo = async () => {
    const {
      Imagem,
      Descrição,
      Nome,
      Email,
    } = this.state;
    const obj = {
      name: Nome,
      email: Email,
      image: Imagem,
      description: Descrição,
    };
    this.setState({ loading: true });
    await updateUser(obj);
    this.setState({ loading: false, redirect: true });
  }

  renderPage = () => {
    const { Imagem, Nome, Email, Descrição, disable } = this.state;
    return (
      <form>
        <InputText
          name="Imagem"
          type="text"
          value={ Imagem }
          data="edit-input-image"
          getValue={ this.getValue }
        />
        <InputText
          name="Nome"
          type="text"
          value={ Nome }
          data="edit-input-name"
          getValue={ this.getValue }
        />
        <InputText
          name="Email"
          type="email"
          value={ Email }
          data="edit-input-email"
          getValue={ this.getValue }
        />
        <InputText
          name="Descrição"
          type="text"
          value={ Descrição }
          data="edit-input-description"
          getValue={ this.getValue }
        />
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={ disable }
          onClick={ this.saveInfo }
        >
          Enviar
        </button>
      </form>
    );
  }

  render() {
    const { loading, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : this.renderPage() }
        { redirect && <Redirect to="/profile" />}
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default ProfileEdit;

// CodeReview:
//  Victor Santos: https://github.com/tryber/sd-018-b-project-trybetunes/pull/59
