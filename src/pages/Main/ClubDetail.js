import React from 'react';
// import { withRouter } from 'react-router-dom';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import './Main.css';

const ClubDetail = () => {
  const [clubinfo, setClubinfo] = useState([]);
  const location = useLocation();

  console.log(location);

  const handleClubInfo = (event) => {
    setClubinfo(event.target.value);
  };

  useEffect(() => {
    setClubinfo(location.state.club.club_info);
  }, []);

  return (
    <div className="Container">
      <div className="clubdetail">
        <div className="title-box">
          <h1 className="title">{location.state.club.club_name}</h1>
        </div>
        <div className="body-box">
          <List>
            <List.Item>
              <List.Icon name="users" />
              <List.Content>{location.state.club.club_master}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="marker" />
              <List.Content> 42Seoul </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="mail" />

              <List.Content>
                {/* {location.state.club.club_info} */}
                <textarea
                  className="clubinfo"
                  type="text"
                  name="club_info"
                  value={clubinfo}
                  onChange={handleClubInfo}
                />
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href={location.state.club.club_invite_link}>
                  {location.state.club.club_invite_link}
                </a>
              </List.Content>
            </List.Item>
          </List>
          <div>{location.state.club.club_active_info}</div>
          <div>{location.state.club.club_invite_info}</div>
          <div>{location.state.club.club_state}</div>
          <div>{location.state.club.club_member}</div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
