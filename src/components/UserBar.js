import React, { Component } from 'react';
import gravatar from 'gravatar';

//user bar will grab gravatars based off the email off the user. Eventually we will filter events by user
export const UserBar = function (props) {
    return (
      <div align="center">
        <button className="btn btn-info">
          <a href="#">
            <i className="fas fa-users"></i>
          </a>
        </button>

        <span className="dashboardUsers">
        {

          props.ffRoommates.map((elem, index) => (
              <a key={index} href=''>
                  <img style={{ margin: '10px', padding: 0, width: '50px', height: '50px', borderRadius: '10%', boxShadow: '10px 10px 29px 6px rgba(0,0,0,0.75)' }}  src={gravatar.url(elem.userEmail, { size: '400' })} />
              </a>

          ))
        }
        </span>
        <button className="btn btn-info">
          <a href="household.html">
            <i className="fas fa-users-cog"></i>
          </a>
        </button>
      </div>
    );
  };

// $(document).ready(populateDashboardWithRoommates);

// function populateDashboardWithRoommates() {
//   for (var i = 0; i < testHousehold.ffHouse.HouseRoomates.length; i++) {
//     $('span.dashboardUsers').append('<button class="btn btn-info" id="' + testHousehold.ffHouse.HouseRoomates[i] + '"<a href="#"><i class="fas fa-user"></i></a></button>');
//     // console.log(testHousehold.ffHouse);
//   };
// };
