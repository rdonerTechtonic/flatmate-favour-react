import React from 'react';
import { UserBar } from './UserBar.js';
import { EventDashboard } from './EventDashboard';
import { Link } from 'react-router-dom';

//holds entire dashboard page
//dashboard includes logo, pictures of users with button functionality, and an event dashboard that holds all events
export const Dashboard = (props) => {

  if (props.toDashboard === true) {
      props.resetToDashboard();
   }

    return (

      <div>
        <div className="centerButton">
          <img src="/Flatmate-Favour-Logo.png" alt="flatmate favour icon" id="logo" />
        </div>

        <div className="container-fluid">
          <div className="backgroundTag">
            <div className="form-group">
          <UserBar handleEditHouse={props.handleEditHouse} ffRoommates={props.ffRoommates} handleLogout={props.handleLogout}/>
            <EventDashboard ffEvents={props.ffEvents} handleUpdateEventStatus={props.handleUpdateEventStatus} handleDateChange={props.handleDateChange} handleEventEdit={props.handleEventEdit} handleNewEvent={props.handleNewEvent}/>
          </div>
        </div>
      </div>
    </div>  
    );
  };
