import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';
import Loader from 'react-loader-spinner';
import ClubList from './ClubList';
import { ClubDetail } from '..';
import background from '../../images/background.png';
import './Main.css';

const Main = () => {
  const [isSave, setIsSave] = useState(false);
  const [isClubTabbed, setIsClubTabbed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [club, setClub] = useState([]);
  const [clubList1, setClubList1] = useState([]);
  const [clubList2, setClubList2] = useState([]);
  const [clubList3, setClubList3] = useState([]);

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

      setClubList2(
        rows.filter((result) => {
          return result.club_state == '기수 모집';
        })
      );
      setClubList3(
        rows.filter((result) => {
          return (
            result.club_state != '상시 모집' && result.club_state != '기수 모집'
          );
        })
      );
    };

    const fetchClubList = async () => {
      try {
        const sheet = _doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        await divideClubList(rows);
      } catch (e) {
        console.error('Error: ', e);
      }
    };
    setIsSave(false);
    console.log('init start');
    await authGoogleSheet();
    await fetchClubList();
    setIsSave(true);
    console.log('init done');
  };

  const handleClubTabbed = () => {
    setIsClubTabbed(true);
  };

  const handleCloseButtonTabbed = () => {
    setIsClubTabbed(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className="Container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="blur">
        <div className="header">
          <h1 className="title"> 42 Club List </h1>
        </div>
        {isClubTabbed && (
          <div className="modal">
            <ClubDetail
              club={club}
              handleCloseButtonTabbed={handleCloseButtonTabbed}
            />
          </div>
        )}
        {!isSave && (
          <div className="loader-box">
            <Loader
              className="loader"
              type="Puff"
              color="#00BFFF"
              height={80}
              width={80}
            />
          </div>
        )}
        {isSave && (
          <div className="Main">
            <div>
              <h3 className="subtitle sticky"> 상시 모집 </h3>
              <ClubList
                clubList={clubList1}
                setClub={setClub}
                handleClubTabbed={handleClubTabbed}
              />
            </div>
            <div>
              <h3 className="subtitle sticky"> 기수 모집 </h3>
              <ClubList
                clubList={clubList2}
                setClub={setClub}
                handleClubTabbed={handleClubTabbed}
              />
            </div>
            <div>
              <h3 className="subtitle sticky"> 기타 </h3>
              <ClubList
                clubList={clubList3}
                setClub={setClub}
                handleClubTabbed={handleClubTabbed}
              />
            </div>
            <Link to="addclub">
              <Button className="add-club-button">
                <Button.Content visible> 동아리 추가 </Button.Content>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
