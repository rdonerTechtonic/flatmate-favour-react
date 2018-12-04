import React from 'react';
import { Link } from 'react-router-dom';


//holds buttons to create new house, and login with google account
export const JoinHousehold = function (props) {

  if (props.toJoinHousehold === true) {
      props.resetToJoinHousehold();
   }

  // console.log(props.currentRoommates);

  return (
      <div>
        <div className="centerButton">
          <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
        </div>

        <div className="container-fluid">
          <div className="backgroundTag">
            <div className="form-group">
              <label htmlFor="houseName">You have been invited to join:</label>
              <p>
                <input type="text" className="form-control" id="selectedHouseName" placeholder="Name of house" readOnly value={props.ffHouse.houseName}/>
              </p>
            </div>
            <div className="form-group centerButton">
              <button type="button" id="confirmJoin" className="btn btn-primary" onClick={props.handleJoinHouse}>Join Household</button>
            </div>
            <div className="form-group inline-form rightButton">
            <Link to="/dashboard"><button type="button" id="confirmHouse" className="btn btn-primary" onClick={props.handleHouseSubmit}>Submit</button></Link>
            <Link to="/createorjoin"><button type="button" id="cancelHouse" className="btn btn-danger">Cancel</button></Link>
            </div>
          </div>
        </div>



      </div>
    );



};
