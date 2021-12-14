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
import background2 from '../../images/background2.png';
import './Main.css';

const Main = () => {
  const [isSave, setIsSave] = useState(false);
  const [isClubTabbed, setIsClubTabbed] = useState(false);
  const [rows, setRows] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [club, setClub] = useState([]);
  const [clubList1, setClubList1] = useState([]);
  const [clubList2, setClubList2] = useState([]);
  const [clubList3, setClubList3] = useState([]);
  const [searchText, setSearchText] = useState('');

  const init = async () => {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const _doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const authGoogleSheet = async () => {
      try {
        await _doc.useServiceAccountAuth(gs_creds);
        await _doc.loadInfo();
      } catch (e) {
        console.error('Error: ', e);
      }
    };

    const fetchClubList = async () => {
      try {
        const sheet = _doc.sheetsByIndex[0];
        const _rows = await sheet.getRows();
        setRows(_rows);
        divideClubList(_rows);
      } catch (e) {
        console.error('Error: ', e);
      }
    };

    await authGoogleSheet();
    await fetchClubList();
  };

  const divideClubList = async (rows) => {
    setClubList1(
      rows.filter((result) => {
        return (
          result.club_state == '상시 모집' &&
          (searchText ? result.club_name.indexOf(searchText) != -1 : true)
        );
      })
    );

    setClubList2(
      rows.filter((result) => {
        return (
          result.club_state == '기수 모집' &&
          (searchText ? result.club_name.indexOf(searchText) != -1 : true)
        );
      })
    );

    setClubList3(
      rows.filter((result) => {
        return (
          result.club_state != '상시 모집' &&
          result.club_state != '기수 모집' &&
          (searchText ? result.club_name.indexOf(searchText) != -1 : true)
        );
      })
    );
  };

  const handleClubTabbed = () => {
    setIsClubTabbed(true);
  };

  const handleCloseButtonTabbed = () => {
    console.log(isClubTabbed);
    setIsClubTabbed(false);
  };

  const handleSearchButtonTabbed = () => {
    setIsSave(false);
    divideClubList(rows);
    setIsSave(true);
    console.log(searchText);
  };

  const handleSearchTextChange = (e) => {
    setIsSave(false);
    divideClubList(rows);
    setIsSave(true);
  };

  useEffect(() => {
    setIsSave(false);
    init();
    setIsSave(true);
  }, []);

  return (
    <>
      <div
        className="Container"
        style={{
          backgroundImage: `url(${background2})`,
        }}
      >
        <div className="blur">
          <div className="header">
            <h1 className="title"> 42 Club List </h1>
          </div>
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
              <div className="wrap">
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSearchText(e.target.value);
                      handleSearchTextChange(e);
                    }}
                    value={searchText}
                    placeholder="input club name"
                  />
                  <button
                    type="submit"
                    className="searchButton"
                    onClick={handleSearchButtonTabbed}
                  >
                    <Icon name="search" />
                  </button>
                </div>
              </div>
              {clubList1.length != 0 && (
                <div>
                  <h3 className="subtitle sticky"> 상시 모집 </h3>
                  <ClubList
                    clubList={clubList1}
                    setClub={setClub}
                    handleClubTabbed={handleClubTabbed}
                  />
                </div>
              )}
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
      <div
        className={isClubTabbed ? 'modal modal-visible' : 'modal modal-hide'}
      >
        <ClubDetail
          club={club}
          handleCloseButtonTabbed={handleCloseButtonTabbed}
        />
      </div>
    </>
  );
};

export default Main;
