import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';
import Loader from 'react-loader-spinner';
import ClubList from './ClubList';
import { AddClubForm, ClubDetail } from '..';
import { useSwipeable } from 'react-swipeable';

// import background from '../../images/background.png';
import background2 from '../../images/background2.png';

import './Main.css';
import './searchbar.css';
import './footer.css';
import './modal.css';
import { height } from 'styled-system';

const Main = () => {
  const [isSave, setIsSave] = useState(false);
  const [isClubTabbed, setIsClubTabbed] = useState(false);
  const [isAddClubTabbed, setIsAddClubTabbed] = useState(false);
  const [sheet, setSheet] = useState([]);
  const [rows, setRows] = useState([]);
  const [club, setClub] = useState([]);
  const [clubList1, setClubList1] = useState([]);
  const [clubList2, setClubList2] = useState([]);
  const [clubList3, setClubList3] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handlers = useSwipeable({
    // onSwiped: (eventData) => console.log('User Swiped!', eventData),
    onSwipedDown: (eventData) => {
      console.log('swipe down!', eventData);
      setIsClubTabbed(false);
    },
  });

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
        const _sheet = _doc.sheetsByIndex[0];
        const _rows = await _sheet.getRows();
        setRows(_rows);
        setSheet(_sheet);
        await divideClubList(_rows, null);
      } catch (e) {
        console.error('Error: ', e);
      }
    };

    await authGoogleSheet();
    await fetchClubList();
    setIsSave(true);
  };

  const divideClubList = async (rows, text) => {
    const isContainSearchText = (clubinfo, searchText) => {
      if (searchText == null) return true;
      if (
        clubinfo.club_name.toLowerCase().indexOf(searchText.toLowerCase()) !=
          -1 ||
        clubinfo.club_info.toLowerCase().indexOf(searchText.toLowerCase()) != -1
      ) {
        return true;
      }
      return false;
    };

    setClubList1(
      rows.filter((result) => {
        return (
          result.club_state == '상시 모집' && isContainSearchText(result, text)
        );
      })
    );

    setClubList2(
      rows.filter((result) => {
        return (
          result.club_state == '기수 모집' && isContainSearchText(result, text)
        );
      })
    );

    setClubList3(
      rows.filter((result) => {
        return (
          result.club_state != '상시 모집' &&
          result.club_state != '기수 모집' &&
          isContainSearchText(result, text)
        );
      })
    );
  };

  const addClubRow = async (club) => {
    await sheet.addRow(club);
  };

  const handleAddClubTabbed = () => {
    setIsAddClubTabbed(true);
  };

  const handleClubTabbed = () => {
    setIsClubTabbed(true);
  };

  const handleCloseButtonTabbed = () => {
    setIsClubTabbed(false);
    setIsAddClubTabbed(false);
  };

  const handleSearchButtonTabbed = () => {
    setIsSave(false);
    divideClubList(rows, null);
    setIsSave(true);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setIsSave(false);
    divideClubList(rows, text);
    setIsSave(true);
  };

  useEffect(() => {
    setIsSave(false);
    init();
  }, []);

  return (
    <div
      className="asdf"
      style={
        isClubTabbed
          ? { height: '100vh', overflow: 'scroll' }
          : { height: '100%' }
      }
    >
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
          {isSave && (
            <div className="Main">
              <div className="wrap">
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    onChange={(e) => {
                      console.log(e.target.value);
                      handleSearchTextChange(e.target.value);
                    }}
                    value={searchText}
                    placeholder="input club name"
                  />
                  <button
                    type="submit"
                    className="searchButton"
                    onClick={handleSearchButtonTabbed}
                  >
                    <Icon className="searchicon" name="search" color="black" />
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
              {clubList2.length != 0 && (
                <div>
                  <h3 className="subtitle sticky"> 기수 모집 </h3>
                  <ClubList
                    clubList={clubList2}
                    setClub={setClub}
                    handleClubTabbed={handleClubTabbed}
                  />
                </div>
              )}
              {clubList3.length != 0 && (
                <div>
                  <h3 className="subtitle sticky"> 기타 </h3>
                  <ClubList
                    clubList={clubList3}
                    setClub={setClub}
                    handleClubTabbed={handleClubTabbed}
                  />
                </div>
              )}
              {clubList1.length + clubList2.length + clubList3.length == 0 && (
                <div>no Result!</div>
              )}
              <div className="footer">
                <div>Contact : @suhshin</div>
              </div>
            </div>
          )}
        </div>
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
      <div
        className={isClubTabbed ? 'modal modal-visible' : 'modal modal-hide'}
        // onClick={handleCloseButtonTabbed}
      >
        <div {...handlers} className="bgtest">
          <ClubDetail
            club={club}
            handleCloseButtonTabbed={handleCloseButtonTabbed}
          />
        </div>
      </div>
      <div
        className={isAddClubTabbed ? 'modal modal-visible' : 'modal modal-hide'}
        // onClick={handleCloseButtonTabbed}
      >
        <AddClubForm
          addClubRow={addClubRow}
          handleCloseButtonTabbed={handleCloseButtonTabbed}
        />
      </div>
      <button className="add-club-button" onClick={handleAddClubTabbed}>
        <Icon className="iconnomargin" name="plus" />
      </button>
    </div>
  );
};

export default Main;
