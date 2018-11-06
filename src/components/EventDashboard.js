import React, { Component } from 'react';
import { EventItem } from './EventItem.js';
import { Link } from 'react-router-dom';

//holds datepicker, and all events in an accordion. For each event, make a new EventItem with all these props
export const EventDashboard = function (props) {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2" className="dashboard-label">
              Date:
            </label>
            <input type="date" onChange={props.handleDateChange} className="form-control datepicker" id="formGroupExampleInput2" placeholder="Another input" />
          </div>
        </form>

        <div id="accordion">
          {
            props.ffEvents.map((elem, index) => (
              <EventItem
                key={index}
                index={index}
                eventStatus={elem.eventStatus}
                eventOwner={elem.eventOwner.userName}
                eventAcceptor={elem.eventAssignees.userName}
                eventTitle={elem.eventTitle}
                eventStartDate={elem.eventStartDate}
                eventEndDate={elem.eventEndDate}
                eventLocation={elem.eventLocation}
                eventDescription={elem.eventDescription}
                eventId={elem.eventId}
                handleUpdateEventStatus={props.handleUpdateEventStatus}
                handleEventEdit={props.handleEventEdit}
                ffEvents={elem}
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
