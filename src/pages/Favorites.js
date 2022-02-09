import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songFav: [],
    };
  }

  async componentDidMount() {
    const favs = await getFavoriteSongs();
    this.setState({ loading: false, songFav: favs });
  }

  checkTheCheck = async (song) => {
    if (song.checked) {
      this.setState({ loading: true });
      await removeSong(song);

      const favs = await getFavoriteSongs();
      this.setState({ loading: false, songFav: favs });
    }
  }

  renderPage = () => {
    const { songFav } = this.state;
    return (
      <section className="favSection">
        { songFav.map((song) => (
          <MusicCard
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ parseInt(song.trackId, 10) }
            checked
            checkTheCheck={ this.checkTheCheck }
            key={ parseInt(song.trackId, 10) }
          />
        )) }
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : this.renderPage() }
      </div>
    );
  }
}

export default Favorites;
