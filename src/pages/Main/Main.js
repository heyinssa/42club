import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';
import ClubList from './ClubList';
import './Main.css';

const Main = () => {
  const [clubList, setClubList] = useState([]);

  const addClubButtonTabbed = () => {
    window.location.href = 'addclub';
  };

  const init = async () => {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    console.log(doc);
    const authGoogleSheet = async () => {
      try {
        await doc.useServiceAccountAuth(gs_creds);
        await doc.loadInfo();
        // const sheet = doc.sheetsById[SHEET_ID];
        // const result = await sheet.addRow(row);
      } catch (e) {
        console.error('Error: ', e);
      }
    };
    const fetchClubList = async () => {
      try {
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        setClubList(rows);
      } catch (e) {
        console.error('Error: ', e);
      }
    };

    await authGoogleSheet();
    await fetchClubList();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="Container">
      <div className="Main">
        <div className="title-box">
          <h1 className="title"> 42 Club List </h1>
        </div>
      </div>{' '}
      <ClubList clubList={clubList} />
      <Button className="add-club-button" onClick={addClubButtonTabbed}>
        <Button.Content visible> 동아리 추가 </Button.Content>
        {/* <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content> */}
      </Button>
    </div>
  );
};

export default Main;
