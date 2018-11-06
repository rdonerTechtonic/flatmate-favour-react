import React, { Component } from 'react';
import { UserBar } from './UserBar.js';
import { EventDashboard } from './EventDashboard';
import { Link } from 'react-router-dom';

//holds entire dashboard page
//dashboard includes logo, pictures of users with button functionality, and an event dashboard that holds all events
export const Dashboard = ({ ffRoommates, ffEvents, handleUpdateEventStatus, handleDateChange }) => {
    return (
      <div>
        <Link to="/login"><img src="/Flatmate-Favour-Logo.png" alt="flatmate favour icon" id="logo" /></Link>
          <UserBar ffRoommates={ffRoommates} />
            <EventDashboard ffEvents={ffEvents} handleUpdateEventStatus={handleUpdateEventStatus} handleDateChange={handleDateChange} />
      </div>
    );
  };
