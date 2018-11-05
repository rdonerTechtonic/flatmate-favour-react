import React, { Component } from 'react';
import { UserBar } from './UserBar.js';
import { EventDashboard } from './EventDashboard';
import { Link } from 'react-router-dom';

export const Dashboard = ({ ffRoommates, ffEvents, handleUpdateEventStatus }) => {
    return (
      <div>
        <Link to="/login"><img src="/Flatmate-Favour-Logo.png" alt="flatmate favour icon" id="logo" /></Link>
          <UserBar ffRoommates={ffRoommates} />
            <EventDashboard ffEvents={ffEvents} handleUpdateEventStatus={handleUpdateEventStatus} />
      </div>
    );
  };
