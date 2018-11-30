import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const Registration = function (props) {
  return(
    <div>
      <div class="centerButton">
        <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
      </div>

      <div className= "container"><center><h1>New Roommate Registration</h1></center>
        <div className="container-fluid">
          <div className="backgroundTag">
            <div className="form-group">
              <label htmlFor="houseName">Email:</label>
              <p><input type="text" className="form-control" id="roommateRegistration" placeholder="Enter Valid Email Address"
              /></p>
            </div>

            <div className="form-group">
              <label htmlFor="houseName">Roommate Name:</label>
              <p><input type="text" className="form-control" id="roommateRegistration" placeholder="Name of Roommate"
              /></p>
            </div>


            <div className="form-group">
              <label htmlFor="houseName">Password:</label>
              <p><input type="text" className="form-control" id="roommateRegistration" placeholder="Type your password"
              /></p>
            </div>

            <div className="form-group inline-form rightButton">
            <Link to="/createorjoin"><button type="button" id="confirmRegistration" class="btn btn-primary" onClick={props.handleHouseSubmit}>Register</button></Link>
            <Link to="/homepage"><button type="button" id="cancelInformation" class="btn btn-danger">Cancel</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
