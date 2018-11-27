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
        <Link to="/household"><button type="button" id="createHouseholdLandButton" class="btn btn-primary btn-lg">Create New Household</button>
        </Link>
        </div>

        <div class="centerText">
          <p>IF FLATMATES HAVE INVITED YOU</p>
        </div>

        <div class="centerButton">
        <Link to="/joinhousehold"><button type="button" id="checkPasswordButton" class="btn btn-primary btn-lg">Join Your Flatmates!</button>
        </Link>
        </div>



      </div>
    );
};
