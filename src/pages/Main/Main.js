import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';
import ClubList from './ClubList';
import './Main.css';

const Main = () => {
  const [clubList, setClubList] = useState([]);
  const [clubList1, setClubList1] = useState([]);
  // const [clubList2, setClubList2] = useState([]);
  // const [clubList3, setClubList3] = useState([]);
  // var clubList1;
  let clubList2;
  let clubList3;

  const init = async () => {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;

    const _doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    // console.log(_doc);

    const authGoogleSheet = async () => {
      try {
        await _doc.useServiceAccountAuth(gs_creds);
        await _doc.loadInfo();
        // const sheet = doc.sheetsById[SHEET_ID];
        // const result = await sheet.addRow(row);
      } catch (e) {
        console.error('Error: ', e);
      }
    };

    const divideClubList = async (rows) => {
      setClubList1(
        rows.filter((result) => {
          return result.club_state == '상시 모집';
        })
      );
      // // setClubList2(
      // clubList2 = {
      //   ...rows.filter((result) => {
      //     return result.club_state == '기수 모집';
      //   }),
      // };
      // // );
      // // setClubList3(
      // clubList3 = {
      //   ...rows.filter((result) => {
      //     return (
      //       result.club_state != '상시 모집' && result.club_state != '기수 모집'
      //     );
      //   }),
      // };
      // // );
    };

    const fetchClubList = async () => {
      try {
        const sheet = _doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        rows[0].club_name = '42JS';
        await rows[0].save();
        await divideClubList(rows);
        clubList1[0].club_name = '4242';
        await clubList1[0].save();
        console.log(rows[0]);
        console.log(clubList1[0]);
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
      <div>
        <h1 className="subtitle"> 상시 모집 </h1>
        <ClubList clubList={clubList1} />
      </div>
      {/* <div>
        <h1 className="subtitle"> 기수 모집 </h1>
        <ClubList clubList={clubList2} />
      </div>
      <div>
        <h1 className="subtitle"> 기타 </h1>
        <ClubList clubList={clubList3} />
      </div> */}
      <Link to="addclub">
        <Button className="add-club-button">
          <Button.Content visible> 동아리 추가 </Button.Content>
        </Button>
      </Link>
    </div>
  );
};

export default Main;
