import React from 'react';
// import { withRouter } from 'react-router-dom';
import { Button, List, Icon } from 'semantic-ui-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from 'react-loader-spinner';
import background from '../../images/background.png';
import './Main.css';

const ClubDetail = ({ club, handleCloseButtonTabbed }) => {
  const [isSave, setIsSave] = useState(false);
  const location = useLocation();

  const handleClubInfo = (event) => {
    // setClubinfo(event.target.value);
  };

  const handleSaveClubButton = async (event) => {
    handleCloseButtonTabbed();
    setIsSave(false);
    console.log('save start');
    await club.save();
    setIsSave(true);
  };

  // const init = async () => {
  //   const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  //   const _doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  //   const authGoogleSheet = async () => {
  //     try {
  //       await _doc.useServiceAccountAuth(gs_creds);
  //       await _doc.loadInfo();
  //     } catch (e) {
  //       console.error('Error: ', e);
  //     }
  //   };

  //   const fetchClubList = async () => {
  //     try {
  //       const sheet = _doc.sheetsByIndex[0];
  //       const rows = await sheet.getRows();
  //       setRow(rows[params.row - 2]);
  //     } catch (e) {
  //       console.error('Error: ', e);
  //     }
  //   };

  //   await authGoogleSheet();
  //   await fetchClubList();
  // };

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
        <List>
          <List.Item>
            <List.Icon name="users" />
            <List.Content>{club.club_master}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="marker" />
            <List.Content> 42Seoul </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="mail" />

            <List.Content>
              <textarea
                className="clubinfo"
                type="text"
                name="club_info"
                value={club.club_info}
                onChange={handleClubInfo}
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="linkify" />
            <List.Content>
              <a href={club.club_invite_link}>{club.club_invite_link}</a>
            </List.Content>
          </List.Item>
        </List>
        <div>{club.club_active_info}</div>
        <div>{club.club_invite_info}</div>
        <div>{club.club_state}</div>
        <div>{club.club_member}</div>
      </div>
      <Button className="save-club-button" onClick={handleSaveClubButton}>
        <Button.Content visible> Save </Button.Content>
      </Button>
    </div>
  );
};

export default ClubDetail;
