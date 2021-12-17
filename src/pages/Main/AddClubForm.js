import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import './Main.css';

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

const ClubDetail = ({ addClubRow, handleCloseButtonTabbed }) => {
  const [club, setClub] = useState({
    club_name: '',
    club_info: '',
    club_active_info: '',
    club_invite_info: '',
    club_invite_link: '',
    club_master: '',
    club_member: '',
    club_state: '',
    index: '',
  });
  const [isSave, setIsSave] = useState(false);

  const handleClubInfo = (event) => {
    // setClubInfo(event.target.value);
    setClub({ club_name: 'hi' });
  };

  const handleSaveClubButton = async (event) => {
    handleCloseButtonTabbed();
    setIsSave(false);
    console.log('save start');
    await club.addRow();
    setIsSave(true);
  };

  useEffect(() => {
    console.log(club);
  }, []);

  return (
    <div className="clubdetail">
      <div className="clubdetail-title-box">
        <h1 className="clubdetail-title-box-title">{club.club_name}</h1>
        <Icon
          className="clubdetail-title-box-closebutton"
          size="big"
          name="close"
          onClick={handleCloseButtonTabbed}
        />
      </div>
      <div className="clubdetail-body-box">
        <div className="clubdetail-body-box-contents">
          <div>
            <input
              className="clubdetail-body-box-contents-inputtitle"
              placeholder="club name"
            ></input>
          </div>
          <div>
            <input placeholder="club info"></input>
          </div>
          <div>
            <div>
              <Icon className="icon_width" name="users" />
              <input placeholder="club master"></input>
            </div>
            <div>
              <Icon className="icon_width" name="linkify" />
              <input placeholder="club invite link"></input>
            </div>
            <div>
              <Icon className="icon_width" name="mail" />
              <input placeholder="club invite slack id"></input>
            </div>
            <div>
              <Icon className="icon_width" name="marker" />
              <input placeholder="club slack chanel"></input>
            </div>
          </div>
        </div>
      </div>
      <Button className="save-club-button" onClick={handleSaveClubButton}>
        <Button.Content visible> Save </Button.Content>
      </Button>
    </div>
  );
};

export default ClubDetail;
