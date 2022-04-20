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
    const { trackName, previewUrl, trackId } = this.props;
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
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ favorite }
          onChange={ () => this.addChecked(trackId) }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
