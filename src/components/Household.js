import React from 'react';
import { Link } from 'react-router-dom';


// Using props the Household page has conditional rendering to switch between
// a new house and a edit house situation.
export const Household = (props) => {
  if (props.editHouseMode) {
// This will create a default value for the housename/roommate/and list of roommates to pull a default value upon load of test data
// It will also create a list of roommate elements with keys and values in a form
// Both the edit and new pages will take an array of house roommates
// It will add roommates to the roommate array with the + button and delete them from the array with the -
// button. Then save the information to the house object with the save button.

    return (<div className= "container"><center><h1>Edit Household</h1></center>
      <div className="container-fluid">
        <div className="backgroundTag">
          <div className="form-group">
            <label htmlFor="houseName">House Name:</label>
            <p><input type="text" className="form-control" id="houseName" placeholder="Example: Name of house or address"
            defaultValue={props.currentHouse.houseName}></input></p>
          </div>
          <div className="form-group">
              <label htmlFor="inviteRoommate">Invite Roommate:</label>
              <p><input type="email" className="form-control" id="inviteRoommate" placeholder="Enter Google Email Address"></input></p>
          </div>
          <div className="form-group centerButton">
              <center><button type="button" className="btn btn-primary" onClick={props.handleRoommateSubmit} id="inviteRoommateButton"><i className="fas fa-plus-circle"></i></button></center>
          </div>
          <div className="form-group">
              <label htmlFor="selectRoommate">Remove Roommate(s):</label>
              <p><select multiple className="custom-select" id="selectRoommate">

              {props.currentRoommates.map((element, index) =>
                <option key={index} value={element.roommateId}>
                {element.roommateName}
                </option>)
              }
              </select></p>
          </div>
              <div className="form-group centerButton">
              <center><button type="button" id="removeRoommateList" onClick={props.deleteRoommate} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button></center>
              </div>
          <div className="form-group inline-form rightButton">
          <Link to="/dashboard"><button type="button" id="confirmInformation" className="btn btn-primary" onClick={props.handleHouseSubmit}>Submit</button></Link>
          <Link to="/dashboard"><button type="button" id="cancelInformation" className="btn btn-danger">Cancel</button></Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
  else {
  return (<div className= "container">
    <center><h1>New Household</h1></center>
      <div className="container-fluid">
        <div className="backgroundTag">
          <div className="form-group">
            <label htmlFor="houseName">House Name:</label>
            <p><input type="text" className="form-control" id="houseName" placeholder="Example: Name of house or address"></input></p>
          </div>
          <div className="form-group">
            <label htmlFor="inviteRoommate">Invite Roommate:</label>
            <p><input type="email" className="form-control" id="inviteRoommate" placeholder="Enter Google Email Address"></input></p>
          </div>
          <div className="form-group centerButton">
            <center><button type="button" className="btn btn-primary" onClick={props.handleRoommateSubmit} id="inviteRoommateButton"><i className="fas fa-plus-circle"></i></button></center>
          </div>
          <div className="form-group">
            <label htmlFor="selectRoommate">Remove Roommate(s):</label>
            <p><select multiple className="custom-select" id="selectRoommate">
            {props.currentRoommates.map((element, index) =>
              <option key={index} value={element.roommateId}>
              {element.roommateName}
              </option>)
            }
            </select></p>
          </div>
            <div className="form-group centerButton">
            <center><button type="button" id="removeRoommateList" onClick={props.deleteRoommate} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button></center>
        </div>
        <div className="form-group inline-form rightButton">
          <Link to="/dashboard"><button type="button" id="confirmInformation" className="btn btn-primary" onClick={props.handleHouseSubmit}>Submit</button></Link>
          <Link to="/dashboard"><button type="button" id="cancelInformation" className="btn btn-danger">Cancel</button></Link>
        </div>
      </div>
    </div>
  </div>
  );}
};
