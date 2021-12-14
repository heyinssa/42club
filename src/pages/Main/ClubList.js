import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import './Main.css';

const ClubList = ({ clubList, setClub, handleClubTabbed }) => {
  const handleCardTabbed = (e) => {
    handleClubTabbed();
    setClub(e);
  };
  return (
    <>
      <List className="display">
        {clubList.map((e, index) => {
          return (
            // <Link
            //   key={e.club_name}
            //   to={clubDetailUrl}
            //   state={{
            //     club: {
            //       club_name: e.club_name,
            //       club_info: e.club_info,
            //       club_active_info: e.club_active_info,
            //       club_invite_info: e.club_invite_info,
            //       club_invite_link: e.club_invite_link,
            //       club_master: e.club_master,
            //       club_member: e.club_member,
            //       club_state: e.club_state,
            //       index: e.index,
            //     },
            //   }}
            // >
            <div onClick={() => handleCardTabbed(e)} value={e}>
              <div className="card-box">
                <div>
                  <h2>{e.club_name}</h2>
                </div>
                <div>{e.club_info}</div>
                <div className="card-box-desc">
                  <div>
                    <Icon name="code" />
                    Started in 2020
                  </div>
                  <div>
                    <Icon name="user" />
                    22 Friends
                  </div>
                </div>
              </div>
            </div>
            // </Link>
          );
        })}
      </List>
    </>
  );
};

export default ClubList;
