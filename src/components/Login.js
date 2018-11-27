import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const Login = function (props) {
  return (
      <div>
        <div class="centerButton">
          <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
        </div>

        <div className= "container"><center><h1>Flatmate Login</h1></center>
          <div className="container-fluid">
            <div className="backgroundTag">
              <div className="form-group">
                <label htmlFor="userLogin">Username:</label>
                <p><input type="text" className="form-control" id="userLogin" placeholder="Username"
                /></p>
              </div>

              <div className="form-group">
                <label htmlFor="userLogin">Password:</label>
                <p><input type="text" className="form-control" id="userLogin" placeholder="Password"
                /></p>
              </div>



              <div className="form-group inline-form rightButton">
              <Link to="/dashboard"><button type="button" id="confirmInformation" class="btn btn-primary" onClick={props.handleHouseSubmit}>Login</button></Link>
              <Link to="/dashboard"><button type="button" id="cancelInformation" class="btn btn-danger">Cancel</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
