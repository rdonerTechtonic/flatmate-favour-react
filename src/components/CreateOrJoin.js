import React from 'react';
import { Link } from 'react-router-dom';

//holds buttons to create new house, and login with google account
export const CreateOrJoin = function (props) {
  return (
      <div>
        <div class="centerButton">
          <img src="/Flatmate-Favour-Logo.png" class="rounded" alt="Logo" />
        </div>

        <div className="container-fluid">
          <div className="backgroundTag">
            <div className="form-group">
              <label htmlFor="houseName">House Name:</label>
              <p><input type="text" className="form-control" id="selectedHouseName" placeholder="Name of house"
              /></p>
            </div>
            <div className="form-group centerButton">
                <center><button type="button" className="btn btn-primary" onClick={props.handleRoommateSubmit} id="decisionButton"><i className="fas fa-plus-circle"></i></button></center>
            </div>
            <div className="form-group">
                <label htmlFor="invitedHouses">The below houses invited you!</label>
                <p><select multiple className="custom-select" id="invitedHouses">

                {props.currentRoommates.map((element, index) =>
                  <option key={index} value={element.userId}>
                  {element.userName}
                  </option>)
                }
                </select></p>
            </div>
                <div className="form-group centerButton">
                <center><button type="button" id="listOfHouses" onClick={props.deleteRoommate} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button></center>
                </div>
            <div className="form-group inline-form rightButton">
            <Link to="/dashboard"><button type="button" id="confirmHouse" class="btn btn-primary" onClick={props.handleHouseSubmit}>Submit</button></Link>
            <Link to="/dashboard"><button type="button" id="cancelHouse" class="btn btn-danger">Cancel</button></Link>
            </div>
          </div>
        </div>



      </div>
    );
};
