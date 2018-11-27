// src/Auth/Auth.js

import auth0 from 'auth0-js';
import history from '../history';
import axios from 'axios';
// import ping from '../Ping/Ping';
import axios from 'axios';

//old stuff
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'flatmate-favour.auth0.com',
    clientID: 'Wyqe-_9ePSOsvmX3ENtcQsmAxTM8UpoC',
    redirectUri: 'http://localhost:3000/dashboard',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login() {
    this.auth0.authorize();
  }

  // createUser() {
  // return (
  //   axios.post('http://127.0.0.1:3000/login',
  //         user: user,
  //         headers: { 'authorization': `Bearer ${localStorage.getItem('access_token')}` },
  //       })
  //   .then(response => {
  //         console.log(response);
  //       })
  //   .catch(() => {
  //     console.log('error');
  //   });
  // }

  getUser() {
    const { getAccessToken } = this.props.auth;
    const API_URL = 'http://http://127.0.0.1:3000/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

//new stuff
  constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getProfile = this.getProfile.bind(this);

    }

    getAccessToken() {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No Access Token found');
      }
      return accessToken;
    }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

    handleAuthentication() {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/home');
        } else if (err) {
          history.replace('/home');
          console.log(err);
        }
      });
    }

    setSession(authResult) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/home');
    }

    logout() {
      // Clear Access Token and ID Token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // navigate to the home route
      history.replace('/home');
    }

    isAuthenticated() {
      // Check whether the current time is past the
      // Access Token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  }
