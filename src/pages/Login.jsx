import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  async chamaAPI() {
    const { pegaAPI, name, history } = this.props;
    pegaAPI(true);
    await createUser({ name });
    history.push('/search');
  }

  render() {
    const { isValid, validName, loading } = this.props;
    return (
      <div data-testid="page-login">
        {
          loading && <Carregando />
        }
        <input data-testid="login-name-input" type="text" onChange={ validName } />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isValid }
          onClick={ () => this.chamaAPI() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  history: PropTypes.string.isRequired,
  validName: PropTypes.func.isRequired,
  pegaAPI: PropTypes.func.isRequired,
};

export default Login;
