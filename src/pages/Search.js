import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disable: true,
      loading: false,
      informationValue: false,
      valueAlbum: false,
      band: '',
      albums: [],
    };
  }

  componentWillUnmount() {
    this.renderForm();
  }

  onSearchBand = async () => {
    const { search } = this.state;

    this.setState({ loading: true });
    const albuns = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      informationValue: true,
      band: search,
      search: '',
      albums: albuns,
    });

    if (albuns.length === 0) this.setState({ valueAlbum: false });
    else this.setState({ valueAlbum: true });
  }

  renderAlbum = () => {
    const { valueAlbum, band, albums } = this.state;
    const successResult = (
      <h2 className="text">
        { 'Resultado de álbuns de: ' }
        { band }
      </h2>
    );
    const failResult = <h2 className="messengerResult">Nenhum álbum foi encontrado</h2>;

    return (
      <div>
        { valueAlbum ? successResult : failResult }
        <section className="AlbumsList">
          { albums.map((album) => {
            const keyy = album.collectionId;
            return (
              <Link
                to={ `/album/${keyy}` }
                key={ keyy }
                className="albumCard"
                data-testid={ `link-to-album-${keyy}` }
              >
                <div key={ keyy } className="Albums">
                  <img
                    src={ album.artworkUrl100 }
                    alt={ `Imagem do disco ${album.collectionName}` }
                    width="120px"
                  />
                  <h4>{ album.artistName }</h4>
                  <h4>{ album.collectionName }</h4>
                </div>
              </Link>
            );
          }) }
        </section>
      </div>
    );
  }

  onInputChange = ({ target }) => {
    const NAME_MIN = 2;
    const { name, value } = target;
    if (value.length >= NAME_MIN) this.setState({ disable: false });
    else this.setState({ disable: true });

    this.setState({
      [name]: value,
    });
  };

  renderForm = () => {
    const {
      search,
      disable,
    } = this.state;
    return (
      <form className="formSearch">
        <input
          className="inputSearch"
          type="text"
          name="search"
          data-testid="search-artist-input"
          placeholder="O que deseja ouvir?"
          value={ search }
          onChange={ this.onInputChange }
          autoComplete="off"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disable }
          onClick={ this.onSearchBand }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  render() {
    const {
      loading,
      informationValue,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : this.renderForm() }
        { informationValue ? this.renderAlbum() : null }
      </div>
    );
  }
}

export default Search;
