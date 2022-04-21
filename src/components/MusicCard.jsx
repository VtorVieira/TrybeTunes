import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: '',
      loadingFav: false,
    };
  }

  addChecked = async (id) => {
    this.setState({
      loadingFav: true,
    });
    const retonoAPI = await addSong(id);
    this.setState({
      favorite: retonoAPI,
      loadingFav: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackObj, favorites } = this.props;
    const isFavorite = favorites.some((fav) => fav.trackId === trackObj.trackId);
    const { loadingFav, favorite } = this.state;
    return (
      <div>
        { loadingFav && <Carregando /> }
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <input
          data-testid={ `checkbox-music-${trackObj.trackId}` }
          type="checkbox"
          checked={ (!isFavorite) ? favorite : isFavorite }
          onChange={ () => this.addChecked(trackObj) }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackObj: PropTypes.number.isRequired,
  favorites: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
