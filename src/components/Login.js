import React from 'react';
import { Redirect } from 'react-router-dom';
//import { Link, Redirect } from 'react-router-dom';

//holds buttons to create new house, and login with google account

export const Login = function (props) {

  if (props.toCreateOrJoin === true) {
     return <Redirect to='/createorjoin' />
   }

  if (props.toDashboard === true) {
    return <Redirect to='/dashboard' />
  }

  return (
      <div>
        <div className="centerButton">
          <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
        </div>

        <div className= "container"><center><h1>Flatmate Login</h1></center>
          <div className="container-fluid">
            <div className="backgroundTag">
              <div className="form-group">
                <label htmlFor="roommateLogin">Email:</label>
                <p><input type="text" className="form-control" id="roommateEmail" placeholder="Email"
                /></p>
              </div>

              <div className="form-group">
                <label htmlFor="roommateLogin">Password:</label>
                <p><input type="text" className="form-control" id="roommatePassword" placeholder="Password"
                /></p>
              </div>



              <div className="form-group inline-form rightButton">
              <button type="button" id="confirmInformation" className="btn btn-primary" onClick={props.handleLoginSubmit}>Login</button>
              <button type="button" id="cancelInformation" className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
