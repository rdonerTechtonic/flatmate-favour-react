import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const Homepage = function (props) {



  return (
      <div>
        <div className="centerButton">
          <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
        </div>

        <div className="centerButton">
          <Link to="/login"><button type="button" id="loginButton" className="btn btn-primary btn-lg">Login</button>
          </Link>
        </div>

        <div className="centerText">
          <p>OR</p>
        </div>

        <div className="centerButton">
        <Link to="/registration"><button type="button" id="createHouseholdButton" className="btn btn-primary btn-lg">Register</button>
        </Link>
        </div>



      </div>
    );
};
