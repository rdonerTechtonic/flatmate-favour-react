import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const Registration = function (props) {
  return(
    <div>
      <div class="centerButton">
        <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
      </div>

      <div className= "container"><center><h1>New User Registration</h1></center>
        <div className="container-fluid">
          <div className="backgroundTag">
            <div className="form-group">
              <label htmlFor="houseName">Email:</label>
              <p><input type="text" className="form-control" id="userRegistration" placeholder="Example: Valid email address"
              /></p>
            </div>

            <div className="form-group">
              <label htmlFor="houseName">First Name:</label>
              <p><input type="text" className="form-control" id="userRegistration" placeholder="Example: First Name of User"
              /></p>
            </div>

            <div className="form-group">
              <label htmlFor="houseName">Last Name:</label>
              <p><input type="text" className="form-control" id="userRegistration" placeholder="Example: Lastname of User"
              /></p>
            </div>

            <div className="form-group">
              <label htmlFor="houseName">Password:</label>
              <p><input type="text" className="form-control" id="userRegistration"
              /></p>
            </div>

            <div className="form-group inline-form rightButton">
            <Link to="/dashboard"><button type="button" id="confirmInformation" class="btn btn-primary" onClick={props.handleHouseSubmit}>Register</button></Link>
            <Link to="/homepage"><button type="button" id="cancelInformation" class="btn btn-danger">Cancel</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
