import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const JoinHousehold = function (props) {

  return (
  <div>
    <div class="centerButton">
      <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
    </div>

    <div className= "container"><center><h1>Flatmate Check-in</h1></center>
      <div className="container-fluid">
        <div className="backgroundTag">
        <div className="form-group">
          <center><label htmlFor="invitedEmail">Already invited? Enter email below to see if your email is associated with a house:</label></center>
          <p><input type="text" className="form-control" id="invitedEmail" placeholder="Enter email used for initation"
          /></p>

          <div className="form-group inline-form rightButton">
          <button type="button" id="confirmInformation" class="btn btn-primary" >Check Now</button>
          <Link to="/homepage"><button type="button" id="cancelInformation" class="btn btn-danger">Cancel</button></Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  );


// handleInvitedEmail


};
