import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth.js';

const auth = new Auth();

function handleLogin() {
  auth.login();
}


//holds buttons to create new house, and login with google account
export const Login = function (props) {
  return (
    <div>
      <div class="centerButton">
        <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
      </div>

      <div class="centerButton">
        <Link to="/household"><button type="button" id="createHouseholdLandButton" class="btn btn-primary btn-lg">Create New Household</button>
        </Link>
      </div>

      <div class="centerText">
        OR
      </div>

      <div class="centerButton">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

// <a href="https://www.google.com/" id="googleAPIButton" class="btn btn-primary btn-lg" role="button">
// Sign in with G+</a>
