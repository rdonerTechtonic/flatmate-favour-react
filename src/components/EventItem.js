import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';

//based on eventStatus, change the image and text of the action rightButton
//each event is a card
//pass in the event data through props to each card
//one of the props is the handleUpdateEventStatus which will change the state of the event
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
                      <div>
                        <h2>Requestor:</h2>
                          <figure>
                            <img style={{ margin: '10px', padding: 0, width: '50px', height: '50px', borderRadius: '10%', boxShadow: '10px 10px 29px 6px rgba(0,0,0,0.75)' }} src={gravatar.url(props.eventOwner)} />
                            <figcaption>{props.eventOwner}</figcaption>
                          </figure>
                      </div>
                      <div>
                        <h2>
                          Acceptors:
                        </h2>
                        <span>
                          {
                            props.eventAssignees.map((elem, index) => (
                              <figure key={index} >
                                <img style={{ margin: '10px', padding: 0, width: '50px', height: '50px', borderRadius: '10%', boxShadow: '10px 10px 29px 6px rgba(0,0,0,0.75)' }} src={gravatar.url('rdoner@email.arizona.edu', { size: '400' })} />
                                <figcaption>{elem}</figcaption>
                              </figure>
                            ))
                          }
                        </span>
                      </div>


                    <div>
                      <h2>Start time</h2>
                      <p>
                        {props.eventStartDate.split('T')[0]}<br></br>
                        {props.eventStartDate.slice(11, 16)}
                      </p>
                    </div>
                    <div>
                      <h2>End Time</h2>
                      <p>
                        {props.eventEndDate.split('T')[0]}<br></br>
                      {props.eventEndDate.slice(11, 16)}
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
                      <Link id={props.eventId} onClick={props.handleEventEdit} className="ml-auto btn btn-light" to="/Event">Event</Link>
                  </div>
                </div>
              </div>

    );
  };

// <a href="event.html" className="ml-auto btn btn-light" type="button" name="button">


// {
//   props.eventAcceptor.map((elem, index) => (
//     <img key={index} style={{ margin: '10px', padding: 0, width: '50px', height: '50px', borderRadius: '10%', boxShadow: '10px 10px 29px 6px rgba(0,0,0,0.75)' }} src={gravatar.url(elem.userEmail, { size: '400' })} />
//   ))
// }
