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


                </select></p>
            </div>
                <div className="form-group centerButton">
                <center><button type="button" id="listOfHouses" onClick={props.deleteRoommate} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button></center>
                </div>
            <div className="form-group inline-form rightButton">
            <Link to="/dashboard"><button type="button" id="confirmHouse" className="btn btn-primary" onClick={props.handleHouseSubmit}>Submit</button></Link>
            <Link to="/dashboard"><button type="button" id="cancelHouse" className="btn btn-danger">Cancel</button></Link>
            </div>
          </div>
        </div>



      </div>
    );



};
