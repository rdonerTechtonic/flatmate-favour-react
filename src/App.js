import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Homepage } from './components/Homepage.js';
import { CreateOrJoin } from './components/CreateOrJoin.js';
import { JoinHousehold } from './components/JoinHousehold.js';
import { Registration } from './components/Registration.js';
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
import axios from 'axios';
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
      currentHouseId: null,
      currentRoommateId: null,
      //emailInvitedMode: false,
      eventToEdit: 0,
      houseId: null,
      roommateId: null,
    };
    // this.saveStateToStorage = this.saveStateToStorage.bind(this);
    this.loadState = this.loadState.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.editEvent = this.editEvent.bind(this);
    //    this.newEvent = this.newEvent.bind(this);
    //    this.newRoommate = this.newRoommate.bind(this);
    this.getEventFormData = this.getEventFormData.bind(this);
    this.getHouseNameFormData = this.getHouseNameFormData.bind(this);
    this.handleHouseSubmit = this.handleHouseSubmit.bind(this);
    this.handleRoommateSubmit = this.handleRoommateSubmit.bind(this);
    this.deleteRoommate = this.deleteRoommate.bind(this);
    this.handleUpdateEventStatus = this.handleUpdateEventStatus.bind(this);
    this.handleEditHouse = this.handleEditHouse.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.getHouse = this.getHouse.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  // standard houseObj example
  // {
  //   houseName: "The Davis's",
  //   houseAddress: "12345 Main",
  //   houseOwner: "5bf5a3fa16018b9d0931b701",
  //   houseCity: "Boulder",
  //   houseState: "CO",
  //   houseLongitude: "",
  //   houseLatitude: ""
  // }

  // Pass this function a standard houseObj and it will create it on the database.
  postNewHouse(houseObj) {
    axios
    ({
      method: 'post',
      url: 'http://localhost:3005/household?',
      data: houseObj,
    })
    .then((response) => {return console.log(response.data);})
    .catch((response) => {console.log('postNewHouse() failed.');});
  }

  // Pass this function a houseId and a standard houseObj and it will edit that house on the database.
  editHouse(houseId, houseObj) {
    axios({
      method: 'put',
      url: 'http://localhost:3005/household?houseId=' + houseId,
      data: houseObj,
    })
    .then((response) => {return console.log(response.data);})
    .catch((response) => {console.log('editHouse() failed.');});
  }

  // Pass this function a houseId and it will return that house.
  getHouse(houseId) {
    axios({
      method: 'get',
      url: 'http://localhost:3005/household?houseId=' + houseId,
    })
    .then((response) => {this.setState({ ffHouse: response.data[0] });})
    .catch((response) => {console.log('getHouse() failed.');});
  }

  // getLoginEmail(e){
  //   let enteredEmail = {}
  //   enteredEmail.push(document.getElementById('roommateEmail').value)
  //   return enteredEmail;
  // }

  //  standard roommateObj example
  // {
  //   roommateName: "Daffy Duck",
  //   roommateEmail: "daffy@gmail.com",
  //   roommaterooPassword: "password123",
  //   houseId: "5bf5a3fa16018b9d0931b72a",
  // }

  // Pass this function a standard roommateObj and it'll create it on the database.
  postNewRoommate(newRoommateObj) {
    axios({
      method: 'post',
      url: 'http://localhost:3005/roommate?',
      data: newRoommateObj,
    }).then((response) => {return console.log(response.data);
    }).catch((response) => {console.log('postNewRoommate() failed.');
    });
  }

  // Pass this function a houseId and it will return all roommates belonging to that house.
  getRoommates(houseId) {
    axios({
      method: 'get',
      url: 'http://localhost:3005/roommate?houseId=' + houseId,
    })
    .then((response) => {this.setState({ ffRoommates: response.data });})
    .catch((response) => {console.log('getRoommates() failed.');});
  }

  // Standard eventObj example
  // {
  //   eventTitle: "Mow the Lawn",
  //   eventOwner: "5bf5a3fa16018b9d0931b722",
  //   eventAssignees: ["5bf5a3fa16018b9d0931b721","5bf5a3fa16018b9d0931b723"],
  //   eventDescription: "It's not gonna mow itself",
  //   eventStartDate: "2018-01-01T00:00:00.000Z",
  //   eventEndDate: "2018-01-01T00:00:00.000Z",
  //   eventLocation: "Back Yard",
  //   eventStatus: "pending",
  //   houseId: "5bf5a3fa16018b9d0931b72b"
  // }

  // Pass this function a standard eventObj and it will create it on the database.
  postNewEvent(eventObj) {
    axios({
      method: 'post',
      url: 'http://localhost:3005/event?',
      data: eventObj, })
      .then((response) => {console.log(response.data);})
      .catch((response) => {console.log('postNewEvent() failed.');
    });
  }

  // Pass this function an eventId and a standard eventObj and it will edit that event on the database.
  editEvent(eventId, eventObj) {
    axios({
      method: 'put',
      url: 'http://localhost:3005/event?eventId=' + eventId,
      data: eventObj,
    })
    .then((response) => {return console.log(response.data);})
    .catch((response) => {console.log('editEvent() failed.');});
  }

  // Pass this function a houseId and it will return all events belonging to that house.
  getEvents(houseId) {
    axios({
      method: 'get',
      url: 'http://localhost:3005/event?houseId=' + houseId,
    })
    .then((response) => {this.setState({ ffEvents: response.data });})
    .catch((response) => {console.log('getEvents() failed.');});
  }

  // Function to delete an event.  Pass this the ID of the event you want to delete.
  deleteEvent(eventId) {
    let eventPosition = this.getEventPositionById(eventId);
    let currentEvents = JSON.parse(JSON.stringify(this.state.ffEvents));
    currentEvents.splice(eventPosition, 1);
    this.setState({ ffEvents: currentEvents });
    // this.saveStateToStorage();
  }

  // Function to delete a roommate.  Pass this the ID of the roommate to delete.
  deleteRoommate(roommateId) {
    let roommatePosition = this.getRoommatePositionById(roommateId);
    let currentRoommates = JSON.parse(JSON.stringify(this.state.ffRoommates));
    currentRoommates.splice(roommatePosition, 1);
    // this.setState({ ffRoommates: currentRoommates }, this.saveStateToStorage);
  }

  handleLoginSubmit(e) {
    //   const { email, password } = this.state;

    if (this.currentHouseId != null) {
      window.location = '/dashboard';
    } else {
      window.location = '/createorjoin'
    }

  }

  handleCreateOrJoin(){
    alert("this works")
    // housdId, houseName, houseIn
  }



  // Function to call utility functions when the submit new Roommate Button is pressed.
  handleRoommateSubmit() {
    let newRoommateObj =
        [{
          roommateName: this.getRoommateNameFormData().split('@')[0],
          roommateId: Math.floor((Math.random() * 100000000000000) + 1),
          houseId: this.state.ffHouse.houseId,
          roommateEmail: this.getRoommateNameFormData(),
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
  //    this.newHouse(newHouseObj);
    }
  }

  // Function to call utility functions when the edit event button is pressed.
  handleEventEdit(e) {
    this.setState({ editEventMode: true });
    this.setState({ eventToEdit: this.getEventPositionById(parseInt(e.target.id)) });
  }

  // Function to switch out of editEventMode when new event button is pressed.
  handleNewEvent () {
    this.setState({ editEventMode: false });
  }

  // Function to call utility functions when the create new event button is pressed.
  handleEventSubmit() {
    if (this.state.editEventMode) {
      this.editEvent(this.state.eventToEdit, this.getEventFormData());
      this.setState({ editEventMode: false });
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

  // Function to handled updating the status of an event when.
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

  //  Function to switch into edit mode when pressing the edit house button.
  handleEditHouse() {
    this.setState({ editHouseMode: true });
  }

  // Function to grab form data (housename) from the household page and return it.
  getHouseNameFormData() {
    let newHouseName = document.getElementById('houseName').value;
    return newHouseName;
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
    }, ];
    if (!this.state.editEventMode) {
      newEventObj[0].eventStatus = 'pending';
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
      if (this.state.ffRoommates[i].roommateId == input) {
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
  // saveStateToStorage() {
  //   let dataToSave = JSON.parse(JSON.stringify(this.state));
  //   store.set('localStorage', dataToSave);
  // }

  // Function to load state from local storage using store.js.  Should be called
  // automatically on page load.
  // loadStateFromStorage() {
  //   let storedData = store.get('localStorage');
  //   if (storedData !== undefined) {
  //     asdf;
  //     this.setState(
  //       {
  //         ffHouse: storedData.ffHouse,
  //         ffEvents: storedData.ffEvents,
  //         ffRoommates: storedData.ffRoommates,
  //       });
  //   }
  // }

  loadState() {
    //replace with houseId returned from login
    let houseId = '5bf5a3fa16018b9d0931b72b';
    // this.getHouse(houseId).then((houseObj) => {console.log(houseObj)})
    this.getHouse(houseId);
    this.getEvents(houseId);
    this.getRoommates(houseId);
    // this.getHouse(houseId).then((houseObj) => {this.setState({ffHouse: houseObj})})
    // this.getEvents(houseId).then((eventsArr) => {this.setState({ffEvents: eventsArr})})
    // this.getRoommates(houseId).then((roommatesArr) => {this.setState({ffRoommates: roommatesArr})})

    // this.setState(
    //   {
    //     ffHouse: this.getHouse(houseId),
    //     ffEvents: this.getEvents(houseId),
    //     ffRoommates: this.getRoommates(houseId),
    //   }
    // );
  }

  // Function to load storage automatically when the app runs.
  componentWillMount() {
    this.loadState();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/joinhousehold">JoinHousehold</Link></li>
          <li><Link to="/createorjoin">CreateOrJoin</Link></li>
          <li><Link to="/registration">Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/household">household</Link></li>
          <li><Link to="/Event">Event</Link></li>
          <Route exact path="/" component={Homepage}/>
          <Route path="/createorjoin" render={(props) => <CreateOrJoin
            handleLoginSubmit={this.handleLoginSubmit}
          />} />
          <Route path="/joinhousehold" render={(props) => <JoinHousehold
            currentRoommates={this.state.ffRoommates}
          />} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" render={(props) => <Login
            handleLoginSubmit={this.handleLoginSubmit}
             />} />
          <Route path="/dashboard" render={(props) => <Dashboard
            ffEvents={this.state.ffEvents}
            ffRoommates={this.state.ffRoommates}
            handleUpdateEventStatus={this.handleUpdateEventStatus}
            handleDateChange={this.handleDateChange}
            handleEditHouse={this.handleEditHouse}
            handleEventEdit={this.handleEventEdit}
            handleNewEvent={this.handleNewEvent}
            />} />
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
