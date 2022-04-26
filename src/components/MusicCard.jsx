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
    const { favorites, trackId } = this.props; // recebido como props a lista de favoritos
    this.setState({
      favorite: favorites.some((fav) => fav.trackId === trackId), // utilizada a hof que retorna true se houver uma musica na lista
    });
  }

  addChecked = ({ target }) => { // destruturado o evento do click para diminuir o codigo
    this.setState({
      favorite: target.checked, // marca true or false a cada click
    }, async () => {
      const { favorite } = this.state;

      if (favorite === true) { // se marcado como favorito
        this.setState({
          loading: true, // add carregando
        });
        const { trackObj } = this.props; // recebido como props todas as musicas em um obj
        await addSong(trackObj); // add o obj clicado
        this.setState({
          loading: false, // remove carregando
        });
      } else {
        this.setState({
          loading: true, // add carregando
        });
        const { trackObj, returnFavorites } = this.props; // destruturando a funcao do componente Favorites
        if (returnFavorites === undefined) { // valida se o retorno é undefined, pois album não tem essa funcao, só o favorites
          await removeSong(trackObj); // remove o obj clicado
          this.setState({
            loading: false, // remove carregando
          });
        } else {
          await removeSong(trackObj); // remove o obj clicado
          this.setState({
            loading: false, // remove carregando
          });
          returnFavorites(); // executa a funcao criada no componente Favorites
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
