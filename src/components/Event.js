import React from 'react';
import { Link } from 'react-router-dom';

//if the page is in edit mode, it will pull the data from props to populate the page
//if not in edit mode, make a blank form that will pull the input data and add it to the state with the handleEventSubmit
export const Event = function (props) {

  if (props.editEventMode) {
    return (<div className= "container">
    <div className="centerButton">
      <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
    </div>
    <h1>Edit Event</h1>
      <form id="eventForm">
        <div class="form-group">
          <label for="eventTitle">Title:</label>
          <input type="text" class="form-control" id="eventTitle"
            defaultValue={props.eventToEdit.eventTitle} placeholder="Example: Clean the kitchen." />
        </div>
        <div class="form-group">
          <label for="eventLocation">Location:</label>
          <input type="text" class="form-control" id="eventLocation"
            defaultValue={props.eventToEdit.eventLocation} placeholder="Example: The kitchen." />
        </div>
        <div class="form-group">
          <label for="selectRoommate">Roommate(s):</label>
          <select multiple class="custom-select" id="selectRoommate" >
          {props.currentRoommates.map((element, index) =>
            <option key={index} value={element._id}>
            {element.roommateName}
            </option>)
          }
          </select>
        </div>
        <div class="form-group">
          <label for="eventNotes">Notes:</label>
          <input type="text" class="form-control" id="eventNotes"
            defaultValue={props.eventToEdit.eventDescription} placeholder="Example: Do the dishes." />
        </div>
        <label for="startEventDate">Start Date & Time:</label>
        <div class="form-group form-inline">
          <input type="date" class="form-control dateWidth" id="startEventDate"
            defaultValue={props.eventToEdit.eventStartDate.split("T")[0]} />
          <input type="time" class="form-control timeWidth" id="startEventTime"
            defaultValue={props.eventToEdit.eventStartDate.slice(11,16)} />
        </div>
        <label for="endEventDate">End Date & Time:</label>
        <div class="form-group form-inline">
          <input type="date" class="form-control dateWidth" id="endEventDate"
            defaultValue={props.eventToEdit.eventEndDate.split("T")[0]} />
          <input type="time" class="form-control timeWidth" id="endEventTime"
            defaultValue={props.eventToEdit.eventEndDate.slice(11,16)} />
        </div>
        <div class="form-group inline-form rightButton">
          <Link to="/dashboard"><button type="button" id="submitEventButton" class="btn btn-primary" onClick={props.handleEventSubmit}>Submit</button></Link>
          <Link to="/dashboard"><button type="button" id="cancelEventButton" class="btn btn-danger" onClick={props.handleEventCancel}>Cancel</button></Link>
        </div>
      </form>
    </div>
    );
  }
  else {
  return (<div className= "container">
  <div className="centerButton">
    <img src="/Flatmate-Favour-Logo.png" className="rounded" alt="Logo" />
  </div>
  <h1>New Event</h1>
    <form id="eventForm">
      <div class="form-group">
        <label for="eventTitle">Title:</label>
        <input type="text" class="form-control" id="eventTitle" placeholder="Example: Clean the kitchen." />
      </div>
      <div class="form-group">
        <label for="eventLocation">Location:</label>
        <input type="text" class="form-control" id="eventLocation" placeholder="Example: The kitchen." />
      </div>
      <div class="form-group">
        <label for="selectRoommate">Roommate(s):</label>
        <select multiple class="custom-select" id="selectRoommate" >
        {props.currentRoommates.map((element, index) =>
          <option key={index} value={element._id}>
          {element.roommateName}
          </option>)
        }
        </select>
      </div>
      <div class="form-group">
        <label for="eventNotes">Notes:</label>
        <input type="text" class="form-control" id="eventNotes" placeholder="Example: Do the dishes." />
      </div>
      <label for="startEventDate">Start Date & Time:</label>
      <div class="form-group form-inline">
        <input type="date" class="form-control dateWidth" id="startEventDate" />
        <input type="time" class="form-control timeWidth" id="startEventTime" />
      </div>
      <label for="endEventDate">End Date & Time:</label>
      <div class="form-group form-inline">
        <input type="date" class="form-control dateWidth" id="endEventDate" />
        <input type="time" class="form-control timeWidth" id="endEventTime" />
      </div>
      <div class="form-group inline-form rightButton">
        <Link to="/dashboard"><button type="button" id="submitEventButton" class="btn btn-primary" onClick={props.handleEventSubmit}>Submit</button></Link>
        <Link to="/dashboard"><button type="button" id="cancelEventButton" class="btn btn-danger" onClick={props.handleEventCancel}>Cancel</button></Link>
      </div>
    </form>
  </div>
  );
  }
};
