import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

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
    const successResult = <h2>{`Resultado de álbuns de: ${band}`}</h2>;
    const failResult = <h2>Nenhum álbum foi encontrado</h2>;
    return (
      <div>
        { valueAlbum ? successResult : failResult }
        { albums.map((album) => {
          const keyy = album.collectionId;
          return (
            <Link
              to={ `/album/${keyy}` }
              key={ keyy }
              data-testid={ `link-to-album-${keyy}` }
            >
              <div key={ keyy } className="Albums">
                <img
                  src={ album.artworkUrl100 }
                  alt={ `Imagem do disco ${album.collectionName}` }
                  width="120px"
                />
                <h4>{`Banda: ${album.artistName}`}</h4>
                <h4>{`Álbum: ${album.collectionName}`}</h4>
                <p>{`Quantidade de músicas: ${album.trackCount}`}</p>
                <p>{`Valor: ${album.collectionPrice} `}</p>
              </div>
            </Link>
          );
        }) }
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
      <form>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            data-testid="search-artist-input"
            placeholder="Qual banda dejesa buscar?"
            value={ search }
            onChange={ this.onInputChange }
          />
        </label>
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
