import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Homepage } from './components/Homepage.js';
import { CreateOrJoin } from './components/CreateOrJoin.js';
import { JoinHousehold } from './components/JoinHousehold.js';
import { Registration } from './components/Registration.js';
import { Login } from './components/Login.js';
import { Dashboard } from './components/Dashboard.js';
import { Household } from './components/Household.js';
import { Event } from './components/Event.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import axios from 'axios';
// var store = require('store');

class App extends Component {
  constructor() {
    super();
    this.state = {
      ffEvents: [],
      ffHouse: {},
      ffRoommates: [],
      editEventMode: false,
      editHouseMode: false,
      // currentHouseId: '5c018f16e417cfb382c1c94c',
      currentHouseId: null,
      // currentRoommateId: '5c018fa2e417cfb382c1c94e',
      currentRoommateId: null,
      currentRoommateEmail: null,
      //emailInvitedMode: false,
      eventToEdit: {},
      houseId: null,
      roommateId: null,
      toCreateOrJoin: false,
      toJoinHousehold: false,
      toDashboard: false

    };
    this.loadState = this.loadState.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.editEvent = this.editEvent.bind(this);
    // this.getEventFormData = this.getEventFormData.bind(this);
    this.getHouseNameFormData = this.getHouseNameFormData.bind(this);
    this.handleHouseSubmit = this.handleHouseSubmit.bind(this);
    this.handleUpdateEventStatus = this.handleUpdateEventStatus.bind(this);
    this.handleEditHouse = this.handleEditHouse.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.getHouse = this.getHouse.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.loadState = this.loadState.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.getEventToEdit = this.getEventToEdit.bind(this);
    this.handleEventCancel = this.handleEventCancel.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.lookupInvite = this.lookupInvite.bind(this);
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

  handleLogout() {
    const _self = this;
    axios({
      url: 'http://localhost:3005/auth/logout',
      method: 'get',
    }).then((response) => {
      console.log(response.data.auth);
      alert('Logged out!');
      _self._dumpToken();
      window.location = '/homepage';

    }).catch(() => {
      console.log('Log out failed!');
    });
  }

  //called once we have logged in
  _setTokenPoll() {
    setTimeout(() => {
            this.CheckTokenStatus();
          }, 3600000);
    // }, 20000);
  }

  //Checks Token Status at the server (Am I still logged in?)
  CheckTokenStatus() {
    // VERIFY USERS AUTH TOKEN VIA GET REQUEST
    axios({
      url: `http://localhost:3005/verify`,
      method: 'post',
      headers: { 'x-access-token': localStorage.getItem('jwt_token') },
    }).done(jwt => {
      //do nothing?
      // this._switchLogInHeader(jwt.name);

    }).fail((jwt) => {
      // console.log(jwt.responseJSON.message);
      console.log('token expired');
      this._dumpToken();
      // this.$loginModal.modal('show');

      //navigate to the login page instead
      window.location = '/homepage';
      // this._lockScreenModal();
      // false;
    });
  }

  _dumpToken() {
    localStorage.removeItem('jwt_token');
  }

  handleLoginSubmit() {
    console.log(document.getElementById('roommateEmail').value);
    console.log(document.getElementById('roommatePassword').value);

    axios({
      method: 'POST',
      url: 'http://localhost:3005/auth/login',
      dataType: 'json',
      data:
      {
        roommateEmail: document.getElementById('roommateEmail').value,
        roommatePassword: document.getElementById('roommatePassword').value,
      },
    }).then(response => {
      console.log(response.data);

      if (response.data.auth === true) {

        if (response.data.houseId === false) {
          this.setState({ currentRoommateId: response.data._id, currentHouseId: null, currentRoommateEmail: response.data.roommateEmail, toCreateOrJoin: true });
          alert(`${response.data.roommateEmail} is not a roommate of a Flatmate Favour house yet. Join a house that you have been invited to our create a house yourself.`);
          // console.log(this.props.history);
          // this.props.history.push('/CreateOrJoin');
              // this.props.history.push("/some/Path");
          // window.location = '/CreateOrJoin';

        } else if (response.data.houseId) {
          console.log('house found');
          this._setToken(response.data.token);
          this.setState({ currentRoommateId: response.data._id, currentHouseId: response.data.houseId, currentRoommateEmail: response.data.roommateEmail, toDashboard: true });
          this.loadState();

          //needs to retain state
          // window.location = '/dashboard';
        }

      } else {
        alert('Incorrect password. Try again');
      }

    }).catch((err) => {
      // alert('No roommate found for this email');
      console.log(err);
      console.log('No roommate found for this email');
    });

  }

  handleRegistration() {
    console.log(document.getElementById('roommateRegistrationEmail').value);
    console.log(document.getElementById('roommateRegistrationName').value);
    console.log(document.getElementById('roommateRegistrationPassword').value);

    let emailInput = document.getElementById('roommateRegistrationEmail').value;
    let userNameInput = document.getElementById('roommateRegistrationName').value;
    let passwordInput = document.getElementById('roommateRegistrationPassword').value;

    if (emailInput === '') {
      alert('Error: Email cannot be blank!');
      return false;
    }

    let re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!re.test(emailInput)) {
      alert('Error: Must be a valid email!');
      return false;
    }

    if (userNameInput === '') {
      alert('Error: Username cannot be blank!');
      return false;
    }

    // re = /^\w+$/;
    // if (!re.test(userNameInput)) {
    //   alert('Error: Username must contain only letters, numbers and underscores!');
    //   return false;
    // }

    if (passwordInput != '') {
      if (passwordInput.length < 6) {
        alert('Error: Password must contain at least six characters!');

        return false;
      }

      if (passwordInput == emailInput) {
        alert('Error: Password must be different from Username!');
        passwordInput.focus();
        return false;
      }

      // re = /[0-9]/;
      // if (!re.test(passwordInput)) {
      //   alert('Error: password must contain at least one number (0-9)!');
      //
      //   return false;
      // }

      // re = /[a-z]/;
      // if (!re.test(passwordInput)) {
      //   alert('Error: password must contain at least one lowercase letter (a-z)!');
      //
      //   return false;
      // }

      // re = /[A-Z]/;
      // if (!re.test(passwordInput)) {
      //   alert('Error: password must contain at least one uppercase letter (A-Z)!');
      //
      //   return false;
      //
      // }

    } else {
      alert("Error: Please check that you've entered and confirmed your password!");

      return false;
    }

    axios({
      method: 'POST',
      url: 'http://localhost:3005/auth/register',
      dataType: 'json',
      data:
      {
        roommateName: document.getElementById('roommateRegistrationName').value,
        roommateEmail: document.getElementById('roommateRegistrationEmail').value,
        roommatePassword: document.getElementById('roommateRegistrationPassword').value,

      },
    }).then(response => {
      console.log(response.data);
      window.location = '/login';

    }).catch((err, response) => {
      alert('You need to change your data');
    });

  }


  LogOut() {
    //TODO: clear state when user logs out
    //clear login and register formData
    //move to session storage and delete timeout

    //DUMP USER TOKEN FROM LOCALSTORAGE AND MAKE THE LOCK SCREEN MODAL APPEAR BLOCKING USER INTERACTION WITH THE APP.
    axios({
      url: `http://localhost:3005/auth/logout`,
      type: 'GET',
      // dataType: 'json',
      // headers: { 'x-access-token': localStorage.getItem('jwt_token') },
    }).done(jwt => {
      console.log(jwt.token);
      this._dumpToken();
      this._lockScreenModal();
      window.location = '/homepage';
    }).fail(() => {
      console.log('logout failed');
      this._dumpToken();
      this._lockScreenModal();
    });
  }

  _setToken(jwt) {
    //if the response auth returns as true, then set local storage
    if (jwt.auth)
    {
      localStorage.setItem('jwt_token', jwt.token);
    }
  }

  lookupInvite() {
    console.log('hi from lookupInvite');
    console.log(this.state.currentRoommateEmail);
    axios({
      method: 'post',
      url: 'http://localhost:3005/household/lookupInvite',
      data: { roommateEmail: this.state.currentRoommateEmail },
      // headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      console.log(response);
      console.log(response.data);
      console.log(response.data.household[0]);
      // console.log(response.data[0].household);

      //will this work?
      this.setState({ ffHouse: response.data.household[0], toJoinHousehold: true });

      // window.location = '/joinhousehold';
    }).catch(() => {
      alert('You have not been invited to any houses. Ask the house owner to invite you or create one yourself');
      // window.location = '/CreateOrJoin';
    });
  }

  // Pass this function a standard houseObj and it will create it on the database.
  postNewHouse(houseObj) {
    axios({
      method: 'post',
      url: 'http://localhost:3005/household?',
      data: houseObj,
    })
    .then((response) => {this.getHouse(this.state.currentHouseId);})
    .catch((response) => {console.log('postNewHouse() failed.');});
  }

  // Pass this function a houseId and a partial houseObj and it will edit that house on the database.
  editHouse(houseId, houseObj) {
    axios({
      method: 'put',
      url: 'http://localhost:3005/household?houseId=' + houseId,
      data: houseObj,
    })
    .then((response) => {this.getHouse(this.state.currentHouseId);})
    .catch((response) => {console.log('editHouse() failed.');});
  }

  // Pass this function a houseId and it will return that house.
  getHouse(houseId) {
    axios({
      method: 'get',
      url: 'http://localhost:3005/household?houseId=' + houseId,
    }).then((response) => {this.setState({ ffHouse: response.data[0]});
    }).catch((response) => {console.log('getHouse() failed.');});
  }

  // Pass this function a standard roommateObj and it'll create it on the database.
  postNewRoommate(newRoommateObj) {
    axios({
      method: 'post',
      url: 'http://localhost:3005/auth/register',
      data: newRoommateObj,
    }).then((response) => {this.getRoommates(this.state.currentHouseId);
    }).catch((response) => {console.log('postNewRoommate() failed.');});
  }

  // Pass this function a houseId and it will return all roommates belonging to that house.
  getRoommates(houseId) {
    axios({
      method: 'get',
      url: 'http://localhost:3005/roommate?houseId=' + houseId,
    }).then((response) => {this.setState({ ffRoommates: response.data });
    }).catch((response) => {console.log('getRoommates() failed.');});
  }



  // Pass this function a standard eventObj and it will create it on the database.
  postNewEvent(eventObj) {
    axios({
      method: 'post',
      url: 'http://localhost:3005/event?',
      data: eventObj,
    }).then((response) => {this.getEvents(this.state.currentHouseId);
    }).catch((response) => {console.log('postNewEvent() failed.');
    });
  }

  // Pass this function an eventId and a standard eventObj and it will edit that event on the database.
  editEvent(eventId, eventObj) {
    axios({
      method: 'put',
      url: 'http://localhost:3005/event?eventId=' + eventId,
      data: eventObj,
    }).then((response) => {this.getEvents(this.state.currentHouseId);
    }).catch((response) => {console.log('editEvent() failed.');});
  }

  getEvents(queryParams) {
    let query = '';
    if (queryParams._id) {
      query = '_id=' + queryParams._id;
    }

    if (queryParams.houseId) {
      query = 'houseId=' + queryParams.houseId;
    }

    if (queryParams.eventOwner) {
      query = 'eventOwner=' + queryParams.eventOwner;
    }

    if (queryParams.eventStartDate) {
      query = 'eventStartDate=' + queryParams.eventStartDate;
    }

    axios({
      method: 'get',
      url: 'http://localhost:3005/event?' + query,
    })
    .then((response) => {this.setState({ ffEvents: response.data });})
    .catch((response) => {console.log('getEvents() failed.');});
  }

  getEventToEdit(eventId) {
    axios({
      method: 'get',
      url: 'http://localhost:3005/event?_id=' + eventId,
    })
    .then((response) => {this.setState({ eventToEdit: response.data[0], editEventMode: true });})
    .catch((response) => {console.log('getEvents() failed.');});
  }

  // Function to call utility functions when the submit new/edit house button is pressed
  handleHouseSubmit() {
    if (this.state.editHouseMode) {
      this.editHouse(this.state.currentHouseId, { houseName: this.getHouseNameFormData() });
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
    this.getEventToEdit(e.target.id)
  }

  // Function to switch out of editEventMode when new event button is pressed.
  handleNewEvent () {
    this.setState({ editEventMode: false });
  }

  handleEventSubmit() {
    if (this.state.editEventMode) {
      this.editEvent(this.state.eventToEdit._id, this.getEventFormData()[0])
    } else {
      this.postNewEvent(this.getEventFormData()[0])
    }
  }

  handleEventCancel() {
    this.setState({ eventToEdit: {} })
    this.setState({ editEventMode: false })
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
    if (status === 'pending') {
      newStatus = 'accepted';
    } else if (status === 'accepted') {
      newStatus = 'done';
    } else if (status === 'done') {
      newStatus = 'thanked';
    } else if (status === 'thanked') {
      newStatus = 'thanked';
    }
    this.editEvent(index, {eventStatus: newStatus})
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
        selectedRoommates.push(document.getElementById('selectRoommate')[i].value);
      }
    }
    let newEventStartDate = document.getElementById('startEventDate').value + 'T' +
    document.getElementById('startEventTime').value + '.000Z';
    let newEventEndDate = document.getElementById('endEventDate').value + 'T' +
    document.getElementById('endEventTime').value + '.000Z';
    let newEventObj =
    [{
      eventTitle: document.getElementById('eventTitle').value,
      eventLocation: document.getElementById('eventLocation').value,
      eventAssignees: selectedRoommates,
      eventDescription: document.getElementById('eventNotes').value,
      eventStartDate: newEventStartDate,
      eventEndDate: newEventEndDate,
      eventOwner: this.state.currentRoommateId,
      houseId: this.state.currentHouseId,
    }, ];
    if (!this.state.editEventMode) {
      newEventObj[0].eventStatus = 'pending';
    }
    return newEventObj;
  }

  // Function to get the ID of the roommates selected on the household/event page.
  // Returns an array of roommate Id's

  //TODO needs to be updated
  getSelectedRoommates() {
    let selectedRoommates = [];
    for (var i = 0; i < document.getElementById('selectRoommate').length; i++) {
      if (document.getElementById('selectRoommate')[i].selected) {
        selectedRoommates.push(document.getElementById('selectRoommate')[i].value);
      }
    }
    return selectedRoommates;
  }

  loadState() {
    // this.getHouse(this.state.currentHouseId);
    // this.getEvents(this.state.currentHouseId);
    // this.getRoommates(this.state.currentHouseId);
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
            lookupInvite={this.lookupInvite}
            handleLoginSubmit={this.handleLoginSubmit}
            toJoinHousehold={this.state.toJoinHousehold}
          />} />
          <Route path="/joinhousehold" render={(props) => <JoinHousehold
            ffHouse={this.state.ffHouse}
            currentRoommates={this.state.ffRoommates}
          />} />
          <Route path="/registration" render={(props) => <Registration
            handleRegistration={this.handleRegistration}
          />} />
          <Route path="/login" render={(props) => <Login
            handleLoginSubmit={this.handleLoginSubmit}
            toCreateOrJoin={this.state.toCreateOrJoin}
            toDashboard={this.state.toDashboard}
             />} />
          <Route path="/dashboard" render={(props) => <Dashboard
            ffEvents={this.state.ffEvents}
            ffRoommates={this.state.ffRoommates}
            handleUpdateEventStatus={this.handleUpdateEventStatus}
            handleDateChange={this.handleDateChange}
            handleEditHouse={this.handleEditHouse}
            handleEventEdit={this.handleEventEdit}
            handleNewEvent={this.handleNewEvent}
            handleLogout={this.handleLogout}
            />} />
          <Route path="/household" render={(props) => <Household
            editHouseMode={this.state.editHouseMode}
            currentRoommates={this.state.ffRoommates}
            currentHouse={this.state.ffHouse}
            handleRoommateSubmit={this.handleRoommateSubmit}
            handleHouseSubmit={this.handleHouseSubmit}
            deleteRoommate={this.deleteRoommate}
            />}/>
          <Route path='/event' render={(props) => <Event
            handleEventSubmit={this.handleEventSubmit}
            editEventMode={this.state.editEventMode}
            eventToEdit={this.state.eventToEdit}
            ffEvents={this.state.ffEvents}
            currentRoommates={this.state.ffRoommates}
            getEventToEdit={this.getEventToEdit}
            handleEventCancel={this.handleEventCancel}
            />}/>
        </div>
      </Router>
    );
  }
}

export default App;
