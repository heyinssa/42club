import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Main.css';

const ClubList = ({ clubList }) => {
  const handleCardTabbed = (index) => {
    console.log(index);
  };

  return (
    <List>
      {clubList.map((e, index) => {
        const clubDetailUrl = `/clubdetail`;
        delete e._sheet;
        return (
          <Link
            key={e.club_name}
            to={clubDetailUrl}
            state={{
              club: e,
              // club:
              // {
              //   club_name: e.club_name,
              //   club_info: e.club_info,
              //   club_active_info: e.club_active_info,
              //   club_invite_info: e.club_invite_info,
              //   club_invite_link: e.club_invite_link,
              //   club_master: e.club_master,
              //   club_member: e.club_member,
              //   club_state: e.club_state,
              //   index: e.index,
              // },
            }}
          >
            <List.Item className="listitem">
              <Card className="card_width" onClick={handleCardTabbed}>
                {/* <Image src="/images/avatar/large/matthew.png" wrapped ui={false} /> */}
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
              </Card>
            </List.Item>
          </Link>
        );
      })}
    </List>
  );
};

export default ClubList;
