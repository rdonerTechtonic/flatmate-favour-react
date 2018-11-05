import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';

export const EventItem = function (props) {
    let statusImg = '';
    let statusButtonText = '';

    // if (!props.eventStatus.accepted) {
    //   statusImg = '/Handshake-Icon.png';
    //   statusButtonText = 'Accept?';
    // }
    //
    // if (props.eventStatus.accepted && !props.eventStatus.completed) {
    //   statusImg = '/Hourglass-Icon.png';
    //   statusButtonText = 'Done?';
    // }
    //
    // if (props.eventStatus.completed && !props.eventStatus.thanked) {
    //   statusImg = '/Check-Icon.png';
    //   statusButtonText = 'Thank?';
    // }
    //
    // if (props.eventStatus.thanked) {
    //   statusImg = '/Check-Icon.png';
    //   statusButtonText = 'Thanked';
    // }


    switch (props.eventStatus) {
      case 'pending':
        statusImg = '/Handshake-Icon.png';
        statusButtonText = 'Accept?';
        break;
      case 'accepted':
        statusImg = '/Hourglass-Icon.png';
        statusButtonText = 'Done?';
        break;
      case 'done':
        statusImg = '/Check-Icon.png';
        statusButtonText = 'Thank?';
        break;
      case 'thanked':
        statusImg = '/Check-Icon.png';
        statusButtonText = 'Thanked';
        break;
    }
    return (
      <div className="card">
              <div className="card-header task-accepted" id="heading'+ i +'">
                <div className="row">
                  <div className="col-2 status">
                    <img src={statusImg} alt="" className="header-icon" />
                </div>
                    <button className="col-6 collapsed alert status" data-toggle="collapse" data-target={`#collapse${props.index}`} aria-expanded="false" aria-controls={props.index} id="item1">
                  {props.eventTitle}
                </button>
                    <button onClick={props.handleUpdateEventStatus} className="col-3 ml-auto changeStatus btn" type="button" name="button" data-eventindex="1" data-index={props.index} data-status={props.eventStatus}>
                  {statusButtonText}
                </button>
                  </div>
                </div>
                <div id={`collapse${props.index}`} className="collapse drop-down" aria-labelledby="heading1" data-parent="#accordion">
                  <div className="card-body">
                    <ul className="list-inline">
                      <h2>
                    Acceptor(s):
                  </h2>
                      <li className="list-inline-item">
                        {props.eventAcceptor}
                      </li>
                    </ul>
                    <div>
                      <h2>Requestor:</h2>
                      <img src={gravatar.url('rdoner@email.arizona.edu')} />
                      <p>
                        {props.eventOwner}
                      </p>
                    </div>
                    <div>
                      <h2>Begin:</h2>
                      <p>
                        {props.eventStartDate}<br />
                        Start time
                      </p>
                    </div>
                    <div>
                      <h2>End:</h2>
                      <p>
                      {props.eventEndDate}<br />
                      End Time
                      </p>
                    </div>
                    <div>
                      <h2>Location:</h2>
                      <p>
                        {props.eventLocation}
                      </p>
                    </div>
                    <div>
                      <h2>Notes:</h2>
                      <p>
                        {props.eventDescription}
                      </p>
                    </div>
                      <Link className="ml-auto btn btn-light" to="/Event">Event</Link>
                  </div>
                </div>
              </div>

    );
  };

// <a href="event.html" className="ml-auto btn btn-light" type="button" name="button">
