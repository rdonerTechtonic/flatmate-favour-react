import React from 'react';
import { Link } from 'react-router-dom';

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
        <a href="https://www.google.com/" id="googleAPIButton" class="btn btn-primary btn-lg" role="button">
        Sign in with G+</a>
      </div>
    </div>
  );
};
