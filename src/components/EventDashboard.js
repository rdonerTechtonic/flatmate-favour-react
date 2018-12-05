import React from 'react';
import { EventItem } from './EventItem.js';
import { Link } from 'react-router-dom';

//holds datepicker, and all events in an accordion. For each event, make a new EventItem with all these props
export const EventDashboard = function (props) {
    return (
      <div>
        <div id="accordion">
          {
            props.ffEvents.map((elem, index) => (
              <EventItem
                key={index}
                index={index}
                eventStatus={elem.eventStatus}
                eventOwner={elem.eventOwner}
                eventAssignees={elem.eventAssignees}
                eventTitle={elem.eventTitle}
                eventStartDate={elem.eventStartDate}
                eventEndDate={elem.eventEndDate}
                eventLocation={elem.eventLocation}
                eventDescription={elem.eventDescription}
                eventId={elem._id}
                handleUpdateEventStatus={props.handleUpdateEventStatus}
                handleEventEdit={props.handleEventEdit}
                ffEvents={elem}
                />
            ))
          }
        </div>

        <div className="form-group rightButton">
          <Link onClick={props.handleNewEvent} to="/event">
            <button type="button" id="createEventObject" className="btn btn-addRoommate">
              <i className="fas fa-plus-circle"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  };
