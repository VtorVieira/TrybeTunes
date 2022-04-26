import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.returnFavorites();
  }

  returnFavorites = async () => {
    this.setState({
      loading: true,
    });
    const retornoGet = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: retornoGet,
    });
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? (<Carregando />) : (
            <div>
              { favorites.map((trackMusic, index) => (
                <MusicCard
                  key={ index }
                  trackName={ trackMusic.trackName }
                  trackId={ trackMusic.trackId }
                  previewUrl={ trackMusic.previewUrl }
                  trackObj={ trackMusic }
                  favorites={ favorites }
                  returnFavorites={ this.returnFavorites }
                />
              )) }

            </div>
          )
        }
      </div>
    );
  }
}
Favorites.propTypes = {
  // trackName: PropTypes.string.isRequired,
  // trackId: PropTypes.number.isRequired,
  // previewUrl: PropTypes.string.isRequired,
  // favorites: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // trackObj: PropTypes.objectOf(PropTypes.shape).isRequired,
};
