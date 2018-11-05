import React, { Component } from 'react';
import { UserBar } from './UserBar.js';
import { EventDashboard } from './EventDashboard';
import { Link } from 'react-router-dom';

// export const Dashboard = function (props) {
//   return (<div className= "container">Dashboard</div>
//   );
// };

// export class Dashboard extends Component {
export const Dashboard = function (props) {
    console.log(props);
    return (
      <div>
        <Link to="/login"><img src="/Flatmate-Favour-Logo.png" alt="flatmate favour icon" id="logo" /></Link>
          <UserBar ffRoommates={props.ffRoommates} />
            <EventDashboard ffEvents={props.ffEvents} />
      </div>
    );
  };
