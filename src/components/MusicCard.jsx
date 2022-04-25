import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favorites, trackId } = this.props;
    this.setState({
      favorite: favorites.some((fav) => fav.trackId === trackId),
    });
  }

  addChecked = ({ target }) => {
    this.setState({
      favorite: target.checked,
    }, async () => {
      const { favorite } = this.state;

      if (favorite === true) {
        this.setState({
          loading: true,
        });
        const { trackObj } = this.props;
        await addSong(trackObj);
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: true,
        });
        const { trackObj, returnFavorites } = this.props;
        if (returnFavorites === undefined) {
          await removeSong(trackObj);
          this.setState({
            loading: false,
          });
        } else {
          await removeSong(trackObj);
          this.setState({
            loading: false,
          });
          returnFavorites();
        }
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {
          loading ? (<Carregando />)
            : (
              <div>
                <h4>{ trackName }</h4>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  <code>audio</code>
                </audio>
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    type="checkbox"
                    onChange={ this.addChecked }
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ favorite }
                    id={ trackId }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  returnFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape).isRequired,
  trackObj: PropTypes.objectOf(PropTypes.shape).isRequired,
};
