import React from 'react';
import { Icon, List } from 'semantic-ui-react';
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
          );
        })}
      </List>
    </>
  );
};

export default ClubList;
