import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

//holds buttons to create new house or join an existing house
export const CreateOrJoin = function (props) {
  if (props.toJoinHousehold === true) {
     return <Redirect to='/joinhousehold' />
   }

  return (
      <div>
        <div className="centerButton">
          <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
        </div>

        <div className="centerButton">
          <Link to="/household"><button type="button" id="createHouseButton" className="btn btn-primary btn-lg">Create Household</button>
          </Link>
        </div>

        <div className="centerText">
          <p>OR</p>
        </div>

        <div className="centerButton">
        <button type="button" id="joinHouseButton" className="btn btn-primary btn-lg" onClick={props.lookupInvite}>Join Household</button>


        </div>



      </div>
    );
};

// <button type="button" id="joinHouseButton" className="btn btn-primary btn-lg" onClick={props.lookupInvite(props.currentRoommateEmail)}>Join Household</button>



// <Link to="/joinhousehold"><button type="button" id="joinHouseButton" className="btn btn-primary btn-lg">Join Household</button>
// </Link>
