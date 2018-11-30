import React from 'react';
import gravatar from 'gravatar';
import { Link } from 'react-router-dom';

//<Link to="/household"></Link>
// onClick={props.handleEditHouse}

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
                  <img style={{ margin: '10px', padding: 0, width: '50px', height: '50px', borderRadius: '10%', boxShadow: '10px 10px 29px 6px rgba(0,0,0,0.75)' }} alt="gravatar"  src={gravatar.url(elem.roommateEmail, { size: '400' })} />
              </a>
          ))
        }
        </span>
        <Link to="/household"><button onClick={props.handleEditHouse} className="btn btn-info">
            <i className="fas fa-users-cog"></i>
        </button></Link>
      </div>
    );
  };
