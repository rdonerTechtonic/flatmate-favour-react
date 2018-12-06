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
          <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
        </div>

        <div>
          <center><p style={{color:'red'}}> {props.currentRoommateEmail} is not a roommate of a house. Please create a new house or check to see if there is a household to join.</p></center>
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
          <center><p style={{color:'red'}}>You have not been invited to any houses. Ask the house owner to invite you or create one yourself</p></center>
        </div>



      </div>
    );
}

// <button type="button" id="joinHouseButton" className="btn btn-primary btn-lg" onClick={props.lookupInvite(props.currentRoommateEmail)}>Join Household</button>



// <Link to="/joinhousehold"><button type="button" id="joinHouseButton" className="btn btn-primary btn-lg">Join Household</button>
// </Link>
