import React, { Component } from 'react';
import { EventItem } from './EventItem.js';
import { Link } from 'react-router-dom';

export const EventDashboard = function (props) {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2" className="dashboard-label">
              Date:
            </label>
            <input type="date" className="form-control datepicker" id="formGroupExampleInput2" placeholder="Another input" />
          </div>
        </form>

        <div id="accordion">
          {
            props.ffEvents.map((elem, index) => (
              <EventItem
                key={index}
                index={index}
                eventStatus={props.ffEvents[index].eventStatus}
                eventOwner={props.ffEvents[index].eventOwner.userName}
                eventAcceptor={props.ffEvents[index].eventAssignees.userName}
                eventTitle={props.ffEvents[index].eventTitle}
                eventStartDate={props.ffEvents[index].eventStartDate}
                eventEndDate={props.ffEvents[index].eventEndDate}
                eventLocation={props.ffEvents[index].eventLocation}
                eventDescription={props.ffEvents[index].eventDescription}
                ffEvents={props.ffEvents}
                />
            ))
          }
        </div>

        <div className="form-group rightButton">
          <Link to="/event">
            <button type="button" id="createEventObject" className="btn btn-primary">
              <i className="fas fa-plus-circle"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  };
