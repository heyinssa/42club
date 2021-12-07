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
        console.log(e);
        return (
          <Link
            key={e.club_name}
            to={clubDetailUrl}
            state={{ club: e, index: index }}
          >
            <List.Item>
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
