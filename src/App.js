import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login.js';
import { Dashboard } from './components/Dashboard.js';
import { Household } from './components/Household.js';
import { Event } from './components/Event.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
var store = require('store');

class App extends Component {
  constructor() {
    super();
    this.state = {
      ffEvents: [],
      ffHouse: {},
      ffRoommates: [],
      editEventMode: false,
      editHouseMode: false,
      eventToEdit: 0,
    };
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.newRoommate = this.newRoommate.bind(this);
    this.getEventFormData = this.getEventFormData.bind(this);
    this.getHouseNameFormData = this.getHouseNameFormData.bind(this);
    this.handleHouseSubmit = this.handleHouseSubmit.bind(this);
    this.handleRoommateSubmit = this.handleRoommateSubmit.bind(this);
    this.handleRoommateDelete = this.handleRoommateDelete.bind(this);
  }

  // Function to create a new household.
  newHouse(houseObj) {
    this.setState({
      ffHouse: houseObj, });
    this.saveState();
  }

  // Function to add a new roommate.
  newRoommate(roommateObjs) {
    let currentRoommates = JSON.parse(JSON.stringify(this.state.ffRoommates));
    for (var i = 0; i < roommateObjs.length; i++) {
      currentRoommates.push(roommateObjs[i]);
    }

    this.setState({ ffRoommates: currentRoommates });
  };




  // Function to add new event.
  newEvent(eventObjs) {
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    for (let i = 0; i < eventObjs.length; i++) {
      currentEvents.push(eventObjs[i]);
    }

    this.setState({ ffEvents: currentEvents });
  }

  // Function to edit a household.  Pass this an object with the key and value
  // pair you want to set it to.  It can take any number of the following:
  // houseName: 'string', houseOwner: 'string', houseRoommates: ['string', 'string']
  editHouse(input) {
    let currentHouse = JSON.parse(JSON.stringify(this.state.ffHouse));

    if (input.hasOwnProperty('houseName')) {
      currentHouse.houseName = input.houseName;
    }

    if (input.hasOwnProperty('houseOwner')) {
      currentHouse.houseOwner = input.houseOwner;
    }

    if (input.hasOwnProperty('houseRoommates')) {
      currentHouse.houseRoommates = input.houseRoommates;
    }

    this.setState({ ffHouse: currentHouse });
  }

  // Function to edit an event.  Pass this an event index and object with the
  // following key and value pair you want set it to.  It can take any number of
  // the following: eventTitle: 'string', eventLocation: 'string', eventRoommates:
  // ['string', 'string'], eventNotes: 'string', eventStartDate: 'date string',
  // eventEndDate: 'date string', eventStatus: 'string', eventPostedBy: 'string'.
  editEvent(index, input) {
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    let eventToEdit = currentEvents[index];
    if (input.hasOwnProperty('eventTitle')) {
      eventToEdit.eventTitle = input.eventTitle;
    }

    if (input.hasOwnProperty('eventLocation')) {
      eventToEdit.eventLocation = input.eventLocation;
    }

    if (input.hasOwnProperty('eventAssignees')) {
      eventToEdit.eventAssignees = input.eventAssignees;
    }

    if (input.hasOwnProperty('eventDescription')) {
      eventToEdit.eventDescription = input.eventDescription;
    }

    if (input.hasOwnProperty('eventStartDate')) {
      eventToEdit.eventStartDate = input.eventStartDate;
    }

    if (input.hasOwnProperty('eventEndDate')) {
      eventToEdit.eventEndDate = input.eventEndDate;
    }

    if (input.hasOwnProperty('eventStatus')) {
      eventToEdit.eventStatus = input.eventStatus;
    }

    if (input.hasOwnProperty('eventPostedBy')) {
      eventToEdit.eventPostedBy = input.eventPostedBy;
    }

    currentEvents[index] = eventToEdit;
    this.setState({ ffEvents: currentEvents });
  }

  // eventStatus:
  //     { requested: true,
  //       accepted: false,
  //       completed: false,
  //       thanked: false,
  //       archived: false,

  handleRoommateSubmit() {
    let newRoommateObj =
    [{
      userName: this.getRoommateNameFormData().split('@')[0],
      userId: Math.floor((Math.random() * 100000000000000) + 1),
      houseId: this.state.ffHouse.houseId,
      userEmail: this.getRoommateNameFormData(),
    },];
    this.newRoommate(newRoommateObj);
    this.saveState();

  };

  handleRoommateDelete() {
    console.log('handleRoommateDelete');

  };

  handleHouseSubmit() {
    if (this.state.editHouseMode) {
      this.editHouse({ houseName: this.getHouseNameFormData() });
      this.state.editHouseMode = false;
    } else {
      let newHouseObj =
        {
          houseId: Math.floor((Math.random() * 100000000000000) + 1),               //replace with function to generate ID,
          houseName: this.getHouseNameFormData(),
          houseOwner: 'delaney',        //replace with function to detect creator
          houseRoommates: [],           //currently overwrites roommates added at same time as newHouse creation
          houseLat: '1',                //replace with function that detects coords from address below
          houseLong: '2',               //replace with function that detects coords from address below
          houseAddress: '123 Fake St.', //form needed on new household, with google map functionality
          houseEvents: [],
        };
      this.newHouse(newHouseObj);
    };

    this.saveState();
  };

  handleEventSubmit() {
    if (this.state.editEventMode) {
      this.editEvent(this.state.eventToEdit, this.getEventFormData());
      this.state.editEventMode = false;
    } else {
      this.newEvent(this.getEventFormData());
    }

    this.saveState();

  }

  getHouseNameFormData() {
    let newHouseName = document.getElementById('houseName').value;
    return newHouseName;
  }

  getRoommateNameFormData() {
    let newRoommateName = document.getElementById('inviteRoommate').value;
    return newRoommateName;
  };

  getEventFormData() {
    let selectedRoommates = [];
    for (var i = 0; i < document.getElementById('selectRoommate').length; i++) {
      if (document.getElementById('selectRoommate')[i].selected) {
        selectedRoommates.push(document.getElementById('selectRoommate')[i].text);
      }
    }

    let newEventStartDate = document.getElementById('startEventDate').value
      + 'T' + document.getElementById('startEventTime').value + '.000Z';
    let newEventEndDate = document.getElementById('endEventDate').value
      + 'T' + document.getElementById('endEventTime').value + '.000Z';
    let newEventObj =
    {
      eventTitle: document.getElementById('eventTitle').value,
      eventLocation: document.getElementById('eventLocation').value,
      eventRoommates: selectedRoommates,
      eventNotes: document.getElementById('eventNotes').value,
      eventStartDate: newEventStartDate,
      eventEndDate: newEventStartDate,
      eventPostedBy: 'current user',
    };
    if (!this.state.editEventMode) {
      newEventObj.eventStatus = 'pending';
    }

    return newEventObj;
  }

  // Function to delete an event.  Pass this the index of the event you want to delete.
  deleteEvent(index) {
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    currentEvents.splice(index, 1);
    this.setState({ ffEvents: currentEvents });
    this.saveState();
  }

  // Function to save the state to local storage using store.js.  Should be called
  // automatically when a function to create edit or delete something from state is called.
  saveState() {
    let dataToSave = JSON.parse(JSON.stringify(this.state));
    store.set('localStorage', dataToSave);
  }

  // Function to load state from local storage using store.js.  Should be called
  // automatically on page load.
  loadState() {
    let storedData = store.get('localStorage');
    if (storedData !== undefined) {
      this.setState(
        {
          ffHouse: storedData.ffHouse,
          ffEvents: storedData.ffEvents,
          ffRoommates: storedData.ffRoommates,
        });
    }
  }

  testData() {
    let roommateObjs = [
      { userName: 'ryan', userId: 1, houseId: 111, userEmail: 'rdoner@email.arizona.edu' },
      { userName: 'devin', userId: 2, houseId: 111, userEmail: 'rdoner@email.arizona.edu' },
      { userName: 'steve', userId: 3, houseId: 111, userEmail: 'rdoner@email.arizona.edu' },
      { userName: 'renee', userId: 4, houseId: 111, userEmail: 'rdoner@email.arizona.edu' },
      { userName: 'delaney', userId: 5, houseId: 111, userEmail: 'rdoner@email.arizona.edu' },
    ];
    let eventObjs = [
      { eventId: 1,
        eventTitle: 'testEvent1',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription1',
        eventStartDate: '2018-11-02T21:48:56.637Z',
        eventEndDate: '2018-12-02T21:48:56.637Z',
        eventLocation: 'eventLocation1',
        houseId: 111,
        eventStatus:
        { requested: true,
          accepted: false,
          completed: false,
          thanked: false,
          archived: false,
        },
      },
      { eventId: 2,
        eventTitle: 'testEvent2',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription2',
        eventStartDate: '2018-13-02T21:48:56.637Z',
        eventEndDate: '2018-14-02T21:48:56.637Z',
        eventLocation: 'eventLocation2',
        houseId: 111,
        eventStatus:
        { requested: true,
          accepted: false,
          completed: false,
          thanked: false,
          archived: false,
        },
      },
      { eventId: 3,
        eventTitle: 'testEvent3',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription3',
        eventStartDate: '2018-15-02T21:48:56.637Z',
        eventEndDate: '2018-16-02T21:48:56.637Z',
        eventLocation: 'eventLocation3',
        houseId: 111,
        eventStatus:
        { requested: true,
          accepted: false,
          completed: false,
          thanked: false,
          archived: false,
        },
      },
    ];
    let houseObj = {
      houseId: '111',
      houseName: 'testHouseName',
      houseOwner: 'delaney',
      houseRoommates: [1, 2, 3],
      houseLat: '1',
      houseLon: '2',
      houseAddress: '555 Central Ave',
      houseEvents: [1, 2, 3],
    };
    this.newRoommate(roommateObjs);
    this.newEvent(eventObjs);
    this.newHouse(houseObj);
    this.saveState();
  }

  componentWillMount() {
    this.loadState();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/household">household</Link></li>
          <li><Link to="/Event">Event</Link></li>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" render={(props) => <Dashboard ffEvents={this.state.ffEvents} ffRoommates={this.state.ffRoommates} />} />
          <Route path="/household" render={(props) => <Household
            editHouseMode={this.state.editHouseMode}
            currentRoommates={this.state.ffRoommates}
            currentHouse={this.state.ffHouse}
            handleHouseSubmit={this.handleHouseSubmit}
            handleRoommateSubmit={this.handleRoommateSubmit}
            handleRoommateDelete={this.handleRoommateDelete}
            />}/>
          <Route path='/event' render={(props) => <Event
            handleEventSubmit={this.handleEventSubmit}
            editEventMode={this.state.editEventMode}
            eventToEdit={this.state.ffEvents[this.state.eventToEdit]}
            currentRoommates={this.state.ffRoommates}
            />}/>
        </div>
      </Router>
    );
  }
}

export default App;
