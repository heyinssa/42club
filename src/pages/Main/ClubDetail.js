import React from 'react';
// import { withRouter } from 'react-router-dom';
import { Button, List } from 'semantic-ui-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from 'react-loader-spinner';

import './Main.css';

const ClubDetail = ({ handleIsClicked }) => {
  const [club, setClub] = useState([]);
  const [isSave, setIsSave] = useState('false');
  // const [row, setRow] = useState([]);
  // const location = useLocation();
  // const params = useParams();

  const handleClubInfo = (event) => {
    // setClubinfo(event.target.value);
  };

  const handleSaveClubButton = async (event) => {
    // setIsSave(false);
    // console.log('save start');
    // await row.save();
    // setIsSave(true);
    // console.log('save done');
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

  // useEffect(() => {
  //   init();
  //   setClub(location.state.club);
  //   console.log(params);
  // }, []);

  return (
    <div className="Container">
      {!isSave && (
        <div className="loader-box">
          <Loader
            className="loader"
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
          />
        </div>
      )}
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
                  // value={clubinfo}
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
        <Button className="save-club-button" onClick={handleSaveClubButton}>
          <Button.Content visible> Save </Button.Content>
        </Button>
      </div>
    </div>
  );
};

export default ClubDetail;
