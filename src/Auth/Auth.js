// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'flatmate-favour.auth0.com',
    clientID: 'Wyqe-_9ePSOsvmX3ENtcQsmAxTM8UpoC',
    redirectUri: 'http://localhost:3000/dashboard',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
