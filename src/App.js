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

  // Function to create a new household.
  newHouse(houseObj) {
    this.setState({
      ffHouse: houseObj, });
    this.saveStateToStorage();
  }

  // Function to add a new roommate.
  newRoommate(roommateObjs) {
    let currentHouse = JSON.parse(JSON.stringify(this.state.ffHouse));
    let currentRoommates = JSON.parse(JSON.stringify(this.state.ffRoommates));
    for (var i = 0; i < roommateObjs.length; i++) {
      currentRoommates.push(roommateObjs[i]);
      currentHouse.houseRoommates.push(roommateObjs[i].userId)
    }
    this.setState({ ffRoommates: currentRoommates, ffHouse: currentHouse });
  };

  // Function to add new event.
  newEvent(eventObjs) {
    let currentHouse = JSON.parse(JSON.stringify(this.state.ffHouse));
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    for (let i = 0; i < eventObjs.length; i++) {
      currentEvents.push(eventObjs[i]);
      currentHouse.houseEvents.push(eventObjs[i].eventId)
    }
    this.setState({ ffEvents: currentEvents, ffHouse: currentHouse });
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
    this.setState({ ffEvents: currentEvents });
  }

  handleRoommateSubmit() {
    let newRoommateObj =
    [{
      userName: this.getRoommateNameFormData().split('@')[0],
      userId: Math.floor((Math.random() * 100000000000000) + 1),
      houseId: this.state.ffHouse.houseId,
      userEmail: this.getRoommateNameFormData(),
    },];
    this.newRoommate(newRoommateObj);
    this.saveStateToStorage();

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

    this.saveStateToStorage();
  };

  handleEventEdit(eventId) {
    this.state.editEventMode = true;
    this.state.eventToEdit = this.getEventPositionById(eventId);
  }

  handleEventSubmit() {
    if (this.state.editEventMode) {
      this.editEvent(this.state.eventToEdit, this.getEventFormData());
      this.state.editEventMode = false;
    } else {
      this.newEvent(this.getEventFormData());
    }

    this.saveStateToStorage();

  }

  handleDeleteRoommatesSubmit() {
    let selectedRoommates = this.getSelectedRoommates();
    for (var i = 0; i < selectedRoommates.length; i++) {
       this.deleteRoommate(selectedRoommates[i])
    }
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
        selectedRoommates.push(parseInt(document.getElementById('selectRoommate')[i].value));
      }
    }
    let newEventStartDate = document.getElementById('startEventDate').value
      + 'T' + document.getElementById('startEventTime').value + '.000Z';
    let newEventEndDate = document.getElementById('endEventDate').value
      + 'T' + document.getElementById('endEventTime').value + '.000Z';
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
      houseId: this.state.ffHouse.houseId
    }];
    if (!this.state.editEventMode) {
      newEventObj[0].eventStatus =
      { requested: true,
        accepted: false,
        completed: false,
        thanked: false,
        archived: false,
      };
    }
    return newEventObj;
  }

  // Function to delete an event.  Pass this the ID of the event you want to delete.
  deleteEvent(eventId) {
    let eventPosition = this.getEventPositionById(eventId)
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    currentEvents.splice(eventPosition, 1);
    this.setState({ ffEvents: currentEvents });
    this.saveStateToStorage();
  }

  deleteRoommate(userId) {
    let roommatePosition = this.getRoommatePositionById(userId)
    let currentRoommates = JSON.parse(JSON.stringify(this.state.ffRoommates));
    currentRoommates.splice(roommatePosition, 1);
    this.setState({ ffRoommates: currentRoommates})
    this.saveStateToStorage();
  }

  getEventPositionById(input) {
    for (var i = 0; i < this.state.ffEvents.length; i++) {
      if (this.state.ffEvents[i].eventId === input) {
        return i;
      }
    }
  }

  getRoommatePositionById(input) {
    for (var i = 0; i < this.state.ffRoommates.length; i++) {
      if (this.state.ffRoommates[i].userId == input) {
        return i;
      }
    }
  }

  getSelectedRoommates() {
    let selectedRoommates = [];
    for (var i = 0; i < document.getElementById('selectRoommate').length; i++) {
      if (document.getElementById('selectRoommate')[i].selected) {
        selectedRoommates.push(document.getElementById('selectRoommate')[i].value)
      }
    }
    return selectedRoommates;
  }


  saveHouseState(newHouse){
    this.setState({ ffHouse: newHouse });
  }

  saveEventState(newEvents){
    this.setState({ ffEvents: newEvents });
  }

  saveRoommateState(newRoommates){
    this.setState({ ffRoommates: newRoommates });
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
        { userName: 'ryan', userId: Math.floor((Math.random() * 100000000000000) + 1), houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu' },
        { userName: 'devin', userId: Math.floor((Math.random() * 100000000000000) + 1), houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu' },
        { userName: 'steve', userId: Math.floor((Math.random() * 100000000000000) + 1), houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu' },
        { userName: 'renee', userId: Math.floor((Math.random() * 100000000000000) + 1), houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu' },
        { userName: 'delaney', userId: Math.floor((Math.random() * 100000000000000) + 1), houseId: houseObj.houseId, userEmail: 'rdoner@email.arizona.edu' },
    ];
    let eventObjs = [
      { eventId: Math.floor((Math.random() * 100000000000000) + 1),
        eventTitle: 'testEvent1',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription1',
        eventStartDate: '2018-11-02T21:48:56.637Z',
        eventEndDate: '2018-12-02T21:48:56.637Z',
        eventLocation: 'eventLocation1',
        houseId: 111,
        eventStatus: 'pending'
        // { requested: true,
        //   accepted: false,
        //   completed: false,
        //   thanked: false,
        //   archived: false,
        // },
      },
      { eventId: Math.floor((Math.random() * 100000000000000) + 1),
        eventTitle: 'testEvent2',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription2',
        eventStartDate: '2018-13-02T21:48:56.637Z',
        eventEndDate: '2018-14-02T21:48:56.637Z',
        eventLocation: 'eventLocation2',
        houseId: 111,
        eventStatus: 'accepted'
        // { requested: true,
        //   accepted: false,
        //   completed: false,
        //   thanked: false,
        //   archived: false,
        // },
      },
      { eventId: Math.floor((Math.random() * 100000000000000) + 1),
        eventTitle: 'testEvent3',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription3',
        eventStartDate: '2018-15-02T21:48:56.637Z',
        eventEndDate: '2018-16-02T21:48:56.637Z',
        eventLocation: 'eventLocation3',
        houseId: 111,
        eventStatus: 'done'
        // { requested: true,
        //   accepted: false,
        //   completed: false,
        //   thanked: false,
        //   archived: false,
        // },
      },
      { eventId: 4,
        eventTitle: 'testEvent4',
        eventOwner: 1,
        eventAssignees: [1, 2, 3],
        eventDescription: 'testDescription4',
        eventStartDate: '2018-15-02T21:48:56.637Z',
        eventEndDate: '2018-16-02T21:48:56.637Z',
        eventLocation: 'eventLocation4',
        houseId: 111,
        eventStatus: 'thanked'
        // { requested: true,
        //   accepted: false,
        //   completed: false,
        //   thanked: false,
        //   archived: false,
        // },
      },
    ];
    this.newHouse(houseObj);
    this.newRoommate(roommateObjs);
    this.newEvent(eventObjs);
    this.saveStateToStorage();
  }

  componentWillMount() {
    this.loadStateFromStorage();
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
          <Route path="/dashboard" render={(props) => <Dashboard ffEvents={this.state.ffEvents} ffRoommates={this.state.ffRoommates} handleUpdateEventStatus={this.handleUpdateEventStatus} />} />
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
