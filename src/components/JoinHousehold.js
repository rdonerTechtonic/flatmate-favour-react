import React from 'react';
import { Link } from 'react-router-dom';


//holds buttons to create new house, and login with google account
export const JoinHousehold = function (props) {
  console.log(props.currentRoommates);

  // const clicked = (e) => {
  //   e.preventDefault();
  //   console.log(props.currentRoommates);
  //   console.log(props.currentEmails);
  // };


  //<form onSubmit={clicked}>
  //</form>
  return (
  <div>
    <div className="centerButton">
      <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
    </div>

    <div className= "container"><center><h1>Flatmate Check-in</h1></center>
      <div className="container-fluid">
        <div className="backgroundTag">
        <div className="form-group">

          <center><label htmlFor="invitedEmail">Already invited? Enter email below to see if your email is associated with a house:</label></center>
          <p><input type="text" className="form-control" id="invitedEmail" placeholder="Enter email used for initation"
          /></p>

          <div className="form-group inline-form rightButton">
          <button type="submit" id="confirmInformation" className="btn btn-primary" onClick={props.getInvitedEmail}>Check Now</button>
          <Link to="/homepage"><button type="button" id="cancelInformation" className="btn btn-danger">Cancel</button></Link>

          </div>

        </div>
      </div>
    </div>
    </div>
  </div>
  );



};
