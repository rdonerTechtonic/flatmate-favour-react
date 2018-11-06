//test line 2
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
    this.saveStateToStorage = this.saveStateToStorage.bind(this);
    this.loadStateFromStorage = this.loadStateFromStorage.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.newRoommate = this.newRoommate.bind(this);
    this.getEventFormData = this.getEventFormData.bind(this);
    this.getHouseNameFormData = this.getHouseNameFormData.bind(this);
    this.handleHouseSubmit = this.handleHouseSubmit.bind(this);
    this.handleRoommateSubmit = this.handleRoommateSubmit.bind(this);
    this.deleteRoommate = this.deleteRoommate.bind(this);
    this.handleUpdateEventStatus = this.handleUpdateEventStatus.bind(this);
  }

  // Function to create a new household.  Takes in a house object that looks like this:
  // {
  //   houseId: Math.floor((Math.random() * 100000000000000) + 1),
  //   houseName: 'testHouseName',
  //   houseOwner: 'delaney',
  //   houseRoommates: [],
  //   houseLat: '1',
  //   houseLon: '2',
  //   houseAddress: '555 Central Ave',
  //   houseEvents: [],
  // };
  newHouse(houseObj) {
    this.setState({ ffHouse: houseObj }, this.saveStateToStorage);
  }

  // Function to add a new roommate.  Takes in an array of roommate objects that looks like this:
  // [{
  //   userName: 'ryan',
  //   userId: Math.floor((Math.random() * 100000000000000) + 1),
  //   houseId: houseObj.houseId,
  //   userEmail: 'rdoner@email.arizona.edu',
  // }]
  newRoommate(roommateObjs) {
    let currentHouse = JSON.parse(JSON.stringify(this.state.ffHouse));
    let currentRoommates = JSON.parse(JSON.stringify(this.state.ffRoommates));
    for (var i = 0; i < roommateObjs.length; i++) {
      currentRoommates.push(roommateObjs[i]);
      currentHouse.houseRoommates.push(roommateObjs[i].userId);
    }
    this.setState({ ffRoommates: currentRoommates, ffHouse: currentHouse }, this.saveStateToStorage);
  }

  // Function to add new event.  Takes in an array of event objects that looks like this:
  // [{ eventId: Math.floor((Math.random() * 100000000000000) + 1),
  //     eventTitle: 'testEvent1',
  //     eventOwner: 1,
  //     eventAssignees: [1, 2, 3],
  //     eventDescription: 'testDescription1',
  //     eventStartDate: '2018-11-02T21:48:56.637Z',
  //     eventEndDate: '2018-12-02T21:48:56.637Z',
  //     eventLocation: 'eventLocation1',
  //     houseId: 111,
  //     eventStatus: 'pending',
  //   },]
  newEvent(eventObjs) {
    let currentHouse = JSON.parse(JSON.stringify(this.state.ffHouse));
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    for (let i = 0; i < eventObjs.length; i++) {
      currentEvents.push(eventObjs[i]);
      currentHouse.houseEvents.push(eventObjs[i].eventId);
    }
    this.setState({ ffEvents: currentEvents, ffHouse: currentHouse }, this.saveStateToStorage);
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

    this.setState({ ffHouse: currentHouse }, this.saveStateToStorage);

  }

  // Function to edit an event.  Pass this an event index and object with the
  // following key and value pair you want set it to.  It can take any number of
  // the following: eventTitle: 'string', eventLocation: 'string', eventRoommates:
  // ['string', 'string'], eventNotes: 'string', eventStartDate: 'date string',
  // eventEndDate: 'date string', eventStatus: eventObj, eventPostedBy: 'string'.
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

    currentEvents[index] = eventToEdit;
    this.setState({ ffEvents: currentEvents }, this.saveStateToStorage);
  }

  // Function to delete an event.  Pass this the ID of the event you want to delete.
  deleteEvent(eventId) {
    let eventPosition = this.getEventPositionById(eventId);
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    currentEvents.splice(eventPosition, 1);
    this.setState({ ffEvents: currentEvents });
    this.saveStateToStorage();
  }

  // Function to delete a roommate.  Pass this the ID of the roommate to delete.
  deleteRoommate(userId) {
    let roommatePosition = this.getRoommatePositionById(userId);
    let currentRoommates = JSON.parse(JSON.stringify(this.state.ffRoommates));
    currentRoommates.splice(roommatePosition, 1);
    this.setState({ ffRoommates: currentRoommates }, this.saveStateToStorage);
  }

  // Function to call utility functions when the submit new Roommate Button is pressed.
  handleRoommateSubmit() {
    let newRoommateObj =
    [{
      userName: this.getRoommateNameFormData().split('@')[0],
      userId: Math.floor((Math.random() * 100000000000000) + 1),
      houseId: this.state.ffHouse.houseId,
      userEmail: this.getRoommateNameFormData(),
    },];
    this.newRoommate(newRoommateObj);
  }

  // Function to call utility functions when the submit new/edit house button is pressed
  handleHouseSubmit() {
    if (this.state.editHouseMode) {
      this.editHouse({ houseName: this.getHouseNameFormData() });
      this.state.editHouseMode = false;
    } else {
      let newHouseObj =
        {
          houseId: Math.floor((Math.random() * 100000000000000) + 1),
          houseName: this.getHouseNameFormData(),
          houseOwner: 'delaney',
          houseRoommates: [],
          houseLat: '1',
          houseLong: '2',
          houseAddress: '123 Fake St.',
          houseEvents: [],
        };
      this.newHouse(newHouseObj);
    }
  }

  // Function to call utility functions when the edit event button is pressed.
  handleEventEdit(eventId) {
    this.state.editEventMode = true;
    this.state.eventToEdit = this.getEventPositionById(eventId);
  }

  // Function to call utility functions when the create new event button is pressed.
  handleEventSubmit() {
    if (this.state.editEventMode) {
      this.editEvent(this.state.eventToEdit, this.getEventFormData());
      this.state.editEventMode = false;
    } else {
      this.newEvent(this.getEventFormData());
    }

  }

  // Function to call utility functions when the delete roommate button is pressed.
  handleDeleteRoommatesSubmit() {
    let selectedRoommates = this.getSelectedRoommates();
    for (var i = 0; i < selectedRoommates.length; i++) {
      this.deleteRoommate(selectedRoommates[i]);
    }
  }

  handleUpdateEventStatus(e) {
    const index = e.target.attributes.getNamedItem('data-index').value;
    const status = e.target.attributes.getNamedItem('data-status').value;
    let newStatus = '';

    if (status == 'pending') {
      newStatus = 'accepted';
      console.log('accepted');
    } else if (status == 'accepted') {
      newStatus = 'done';
      console.log('done');
    } else if (status == 'done') {
      newStatus = 'thanked';
      console.log('thanked');
    } else if (status === 'thanked') {
      newStatus = 'thanked';
      console.log('already thanked');
    }

    this.editEvent(index, { eventStatus: newStatus });
  }

  handleDateChange(e) {
    console.log('Date has changed');
    console.log(e.target.value);
    let date = e.target.value;
  }

  // Function to grab form data (housename) from the household page and return it.
  getHouseNameFormData() {
    let newHouseName = document.getElementById('houseName').value;
    return newHouseName;
  }

  // Function to grab form data (roommate email) from the household page and return it.
  getRoommateNameFormData() {
    let newRoommateName = document.getElementById('inviteRoommate').value;
    return newRoommateName;
  }

  // Function to grab form data from the event page and return a new event object.
  getEventFormData() {
    let selectedRoommates = [];
    for (var i = 0; i < document.getElementById('selectRoommate').length; i++) {
      if (document.getElementById('selectRoommate')[i].selected) {
        selectedRoommates.push(parseInt(document.getElementById('selectRoommate')[i].value));
      }
    }

    let newEventStartDate = document.getElementById('startEventDate').value + 'T' +
    document.getElementById('startEventTime').value + '.000Z';
    let newEventEndDate = document.getElementById('endEventDate').value + 'T' +
    document.getElementById('endEventTime').value + '.000Z';
    let newEventObj =
    [{
      eventId: Math.floor((Math.random() * 100000000000000) + 1),
      eventTitle: document.getElementById('eventTitle').value,
      eventLocation: document.getElementById('eventLocation').value,
      eventAssignees: selectedRoommates,
      eventDescription: document.getElementById('eventNotes').value,
      eventStartDate: newEventStartDate,
      eventEndDate: newEventStartDate,
      eventOwner: 1,
      houseId: this.state.ffHouse.houseId,
    },];
    if (!this.state.editEventMode) {
      newEventObj[0].eventStatus = 'pending'
    }

    return newEventObj;
  }

  // Utility function to assist with deleteEvent(), finds the position of the ffEvents to splice.
  getEventPositionById(input) {
    for (var i = 0; i < this.state.ffEvents.length; i++) {
      if (this.state.ffEvents[i].eventId === input) {
        return i;
      }
    }
  }

  // Utility function to assist with deleteRoommate(), finds the position of the
  // ffRoommates to splice.
  getRoommatePositionById(input) {
    for (var i = 0; i < this.state.ffRoommates.length; i++) {
      if (this.state.ffRoommates[i].userId == input) {
        return i;
      }
    }
  }

  // Function to get the ID of the roommates selected on the household/event page.
  // Returns an array of roommate Id's
  getSelectedRoommates() {
    let selectedRoommates = [];
    for (var i = 0; i < document.getElementById('selectRoommate').length; i++) {
      if (document.getElementById('selectRoommate')[i].selected) {
        selectedRoommates.push(document.getElementById('selectRoommate')[i].value);
      }
    }

    return selectedRoommates;
  }

  // Function to save the state to local storage using store.js.  Should be called
  // automatically when a function to create edit or delete something from state is called.
  saveStateToStorage() {
    let dataToSave = JSON.parse(JSON.stringify(this.state));
    store.set('localStorage', dataToSave);
  }

  // Function to load state from local storage using store.js.  Should be called
  // automatically on page load.
  loadStateFromStorage() {
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

  // Utility function to populate the app with test data.
  testData() {
    let houseObj = {
      houseId: Math.floor((Math.random() * 100000000000000) + 1),
      houseName: 'testHouseName',
      houseOwner: 'delaney',
      houseRoommates: [],
      houseLat: '1',
      houseLon: '2',
      houseAddress: '555 Central Ave',
      houseEvents: [],
    };
    let roommateObjs = [
        { userName: 'ryan', userId: Math.floor((Math.random() * 100000000000000) + 1),
        houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu', },
        { userName: 'devin', userId: Math.floor((Math.random() * 100000000000000) + 1),
        houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu', },
        { userName: 'steve', userId: Math.floor((Math.random() * 100000000000000) + 1),
        houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu', },
        { userName: 'renee', userId: Math.floor((Math.random() * 100000000000000) + 1),
        houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu', },
        { userName: 'delaney', userId: Math.floor((Math.random() * 100000000000000) + 1),
        houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu', },
    ];
    let eventObjs = [
      { eventId: Math.floor((Math.random() * 100000000000000) + 1),
        eventTitle: 'testEvent1',
        eventOwner: 'rdoner@email.arizona.edu',
        eventAssignees: ['rdoner@email.arizona.edu', 'ridemralphio@yahoo.com', 'ryan.doner@techtonic.com'],
        eventDescription: 'testDescription1',
        eventStartDate: '2018-11-02T21:48:56.637Z',
        eventEndDate: '2018-12-02T21:48:56.637Z',
        eventLocation: 'eventLocation1',
        houseId: 111,
        eventStatus: 'pending',
      },
      { eventId: Math.floor((Math.random() * 100000000000000) + 1),
        eventTitle: 'testEvent2',
        eventOwner: 'rdoner@email.arizona.edu',
        eventAssignees: ['rdoner@email.arizona.edu', 'ridemralphio@yahoo.com', 'ryan.doner@techtonic.com'],
        eventDescription: 'testDescription2',
        eventStartDate: '2018-13-02T21:48:56.637Z',
        eventEndDate: '2018-14-02T21:48:56.637Z',
        eventLocation: 'eventLocation2',
        houseId: 111,
        eventStatus: 'accepted',
      },
      { eventId: Math.floor((Math.random() * 100000000000000) + 1),
        eventTitle: 'testEvent3',
        eventOwner: 'rdoner@email.arizona.edu',
        eventAssignees: ['rdoner@email.arizona.edu', 'ridemralphio@yahoo.com', 'ryan.doner@techtonic.com'],
        eventDescription: 'testDescription3',
        eventStartDate: '2018-15-02T21:48:56.637Z',
        eventEndDate: '2018-16-02T21:48:56.637Z',
        eventLocation: 'eventLocation3',
        houseId: 111,
        eventStatus: 'done',
      },
      { eventId: 4,
        eventTitle: 'testEvent4',
        eventOwner: 'rdoner@email.arizona.edu',
        eventAssignees: ['rdoner@email.arizona.edu', 'ridemralphio@yahoo.com', 'ryan.doner@techtonic.com'],
        eventDescription: 'testDescription4',
        eventStartDate: '2018-15-02T21:48:56.637Z',
        eventEndDate: '2018-16-02T21:48:56.637Z',
        eventLocation: 'eventLocation4',
        houseId: 111,
        eventStatus: 'thanked',
      },
    ];
    this.newHouse(houseObj);
    this.newRoommate(roommateObjs);
    this.newEvent(eventObjs);
    this.saveStateToStorage();
  }

  // Function to load storage automatically when the app runs.
  componentWillMount() {
    this.loadStateFromStorage();
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
          <Route path="/dashboard" render={(props) => <Dashboard
            ffEvents={this.state.ffEvents}
            ffRoommates={this.state.ffRoommates}
            handleUpdateEventStatus={this.handleUpdateEventStatus}
            handleDateChange={this.handleDateChange} />} />
          <Route path="/household" render={(props) => <Household
            editHouseMode={this.state.editHouseMode}
            currentRoommates={this.state.ffRoommates}
            currentHouse={this.state.ffHouse}
            handleHouseSubmit={this.handleHouseSubmit}
            handleRoommateSubmit={this.handleRoommateSubmit}
            deleteRoommate={this.deleteRoommate}
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
