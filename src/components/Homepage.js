import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const Homepage = function (props) {



  return (
      <div>
        <div class="centerButton">
          <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
        </div>

        <div class="centerButton">
          <Link to="/login"><button type="button" id="loginButton" class="btn btn-primary btn-lg">Login</button>
          </Link>
        </div>

        <div class="centerText">
          <p>OR</p>
        </div>

        <div class="centerButton">
        <Link to="/registration"><button type="button" id="createHouseholdButton" class="btn btn-primary btn-lg">Register</button>
        </Link>
        </div>



      </div>
    );
};
