import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import './Main.css';

const ClubList = ({ clubList }) => {
  // const containerRef = useRef(null);
  let containerRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    // console.log(entry.isIntersecting);
    setIsVisible(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) {
      containerRef.current.forEach((ref, index) => {
        // if (index == 0) console.log(index, ref);
        observer.observe(ref);
      });
    }
    return () => {
      containerRef.current.forEach((ref) => {
        observer.unobserve(ref);
      });
    };
  }, [containerRef, options]);

  const handleCardTabbed = (index) => {
    console.log(index);
  };

  return (
    <>
      <List className="display">
        {clubList.map((e, index) => {
          const clubDetailUrl = `/clubdetail/${e._rowNumber}`;
          return (
            <Link
              ref={(el) => {
                console.log(index, el);
                containerRef.current[e._rowNumber - 2] = el;
              }}
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
              {/* <List.Item className="listitem"> */}
              <Animated
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={isVisible ? false : true}
              >
                <div className="card-box">
                  <div>
                    <h2>{isVisible ? 'yes' : 'nono'}</h2>
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
              </Animated>
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
              {/* </List.Item> */}
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default ClubList;
