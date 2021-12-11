import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Main.css';

const ClubList = ({ clubList }) => {
  const handleCardTabbed = (index) => {
    console.log(index);
  };

  const styles = {
    pin_container: {
      // margin: 0,
      // padding: 0,
      // width: '90vw',
      // display: 'grid',
      // gridTemplateColumns: 'repeat(auto-fill, 300px)',
      // gridAutoRows: '10px',
      // position: 'absolute',
      // left: '50%',
      // transform: 'translateX(-50%)',
      // justifyContent: 'center',
    },
    card: {
      margin: '15px 10px',
      padding: 0,
      borderRadius: '16px',
      // backgroundColor: 'red',
      gridRowEnd: 'span 45',
    },
    // small: {
    //   gridRowEnd: 'span 26',
    // },
    // medium: {
    //   gridRowEnd: 'span 33',
    // },
    // large: {
    //   gridRowEnd: 'span 45',
    // },
  };

  return (
    <>
      <List className="display" style={{ ...styles.pin_container }}>
        {clubList.map((e, index) => {
          const clubDetailUrl = `/clubdetail/${e._rowNumber}`;
          // console.log(e);
          return (
            <Link
              key={e.club_name}
              to={clubDetailUrl}
              state={{
                club: {
                  club_name: e.club_name,
                  club_info: e.club_info,
                  club_active_info: e.club_active_info,
                  club_invite_info: e.club_invite_info,
                  club_invite_link: e.club_invite_link,
                  club_master: e.club_master,
                  club_member: e.club_member,
                  club_state: e.club_state,
                  index: e.index,
                },
              }}
            >
              <List.Item className="listitem">
                <div className="card-box">
                  <div>{e.club_name}</div>
                  <div>
                    <div>{e.club_info}</div>
                    <div>Started in 2020</div>
                    <div>
                      <Icon name="user" />
                      22 Friends
                    </div>
                  </div>
                </div>
                {/* <Card className="card_width" onClick={handleCardTabbed}>
                  <Card.Content>
                    <Card.Header>{e.club_name}</Card.Header>
                    <Card.Meta>
                      <span className="date">Started in 2020</span>
                    </Card.Meta>
                    <Card.Description>{e.club_info}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                      22 Friends
                    </a>
                  </Card.Content>
                </Card> */}
              </List.Item>
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default ClubList;
