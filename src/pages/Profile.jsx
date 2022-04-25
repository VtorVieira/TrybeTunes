import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userAPI: {},
      loading: false,
    };
  }

  async componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState(() => ({
      loading: true,
    }), async () => {
      const userData = await getUser();
      this.setState({
        userAPI: userData,
        loading: false,
      });
    });
  };

  render() {
    const { userAPI: { name, email, description, image }, loading } = this.state;
    return (
      <>
        <Header />
        { loading ? <Carregando /> : (
          <div data-testid="page-profile">
            <img data-testid="profile-image" src={ image } alt="Foto usuario" />
            <Link to="./profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
            <div>
              { name }
            </div>
            <div>
              { email }
            </div>
            <div>
              { description }
            </div>
          </div>
        ) }
      </>
    );
  }
}
