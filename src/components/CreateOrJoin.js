import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const CreateOrJoin = function (props) {
  return (
      <div>
        <div class="centerButton">
          <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
        </div>

        <div class="centerButton">
          <Link to="/household"><button type="button" id="createHouseButton" class="btn btn-primary btn-lg">Create Household</button>
          </Link>
        </div>

        <div class="centerText">
          <p>OR</p>
        </div>

        <div class="centerButton">
        <Link to="/joinhousehold"><button type="button" id="joinHouseButton" class="btn btn-primary btn-lg">Join Household</button>
        </Link>
        </div>



      </div>
    );
};
