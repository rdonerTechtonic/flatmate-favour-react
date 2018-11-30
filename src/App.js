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
      currentHouseId: '5C018F16E417CFB382C1C94C',
      currentRoommateId: null,
      //emailInvitedMode: false,
      eventToEdit: 0,
      houseId: null,
      roommateId: null,
    };
    this.loadState = this.loadState.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.getEventFormData = this.getEventFormData.bind(this);
    this.getHouseNameFormData = this.getHouseNameFormData.bind(this);
    this.handleHouseSubmit = this.handleHouseSubmit.bind(this);
    this.handleRoommateSubmit = this.handleRoommateSubmit.bind(this);
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
  //   houseLatitude: "",
  //   houseInvitees: []
  // }

  //  standard roommateObj example
  // {
  //   userName: "Daffy Duck",
  //   userEmail: "daffy@gmail.com",
  //   userPassword: "password123",
  //   houseId: "5bf5a3fa16018b9d0931b72a",
  // }

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

  // Pass this function a standard houseObj and it will create it on the database.
  postNewHouse(houseObj) {
    axios
    ({
      method: 'post',
      url: 'http://localhost:3005/household?',
      data: houseObj,
    })
    .then((response) => {this.updateState("ffHouse", JSON.parse(response.config.data))})
    .catch((response) => {console.log('postNewHouse() failed.');});
  }

  // Pass this function a houseId and a partial houseObj and it will edit that house on the database.
  editHouse(houseId, houseObj) {
    axios({
      method: 'put',
      url: 'http://localhost:3005/household?houseId=' + houseId,
      data: houseObj,
    })
    .then((response) => {this.updateState("ffHouse", JSON.parse(response.config.data))})
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
    .then((response) => {this.updateState("ffHouse", response.data);})
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
    if (this.state.houseId) {
      this.editHouse( this.state.currentHouseId, { houseName: this.getHouseNameFormData() })
      this.setState.editHouseMode = false;
    } else {
      let newHouseObj =
        {
          houseName: this.getHouseNameFormData(),
          houseOwner: this.state.currentRoommateId,
          houseInvitees: [],
          houseLatitude: '',
          houseLongitude: '',
          houseAddress: '',
          houseState: '',
          houseCity: '',
        };
      this.postNewHouse(newHouseObj);
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

  updateState(state, input) {
    console.log(state);
    console.log(input);
    if (state === "ffHouse") {
      let houseState = this.state.ffHouse
      for (var key in input) {
        houseState[key] = input[key]
      }
      this.setState({ffHouse: houseState})
    }
    if (state === "ffEvents") {

    }
    if (state === "ffRoommates") {

    }
  }

  loadState() {
    this.getHouse(this.state.currentHouseId);
    this.getEvents(this.state.currentHouseId);
    this.getRoommates(this.state.currentHouseId);
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
