import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

//holds buttons to create new house or join an existing house
export const CreateOrJoin = function (props) {
  if (props.toCreateOrJoin === true) {
      props.resetToCreateOrJoin();
   }

  if (props.toJoinHousehold === true) {
      return <Redirect to='/joinhousehold' />
   }



  return (
      <div>
        <div className="centerButton">
          <Link to="/login"><img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" /></Link>
        </div>

        <div>
          <center><h4> {props.currentRoommateEmail} is not a roommate of a house.</h4></center>
          <center><h4>Please create a new house or check to see if there is a household to join.</h4></center>
        </div>

        <div className="centerButton">
          <Link to="/household"><button type="button" id="createHouseButton" className="btn btn-primary btn-lg">Create Household</button>
          </Link>
        </div>

        <div className="centerText">
          <h5>OR</h5>
        </div>

        <div className="centerButton">
        <button type="button" id="joinHouseButton" className="btn btn-primary btn-lg" onClick={props.lookupInvite}>Join Household</button>
        </div>

        <div id="errorMessage" >
          <center><h4>You have not been invited to any houses.</h4></center>
          <center><h4>Ask the house owner to invite you or create one yourself.</h4></center>
        </div>



      </div>
    );
}

// <button type="button" id="joinHouseButton" className="btn btn-primary btn-lg" onClick={props.lookupInvite(props.currentRoommateEmail)}>Join Household</button>



// <Link to="/joinhousehold"><button type="button" id="joinHouseButton" className="btn btn-primary btn-lg">Join Household</button>
// </Link>
