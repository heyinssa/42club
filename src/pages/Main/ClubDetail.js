import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './Main.css';

const ClubDetail = ({ club, handleCloseButtonTabbed }) => {
  const [clubName, setClubName] = useState('');
  const [clubInfo, setClubInfo] = useState('');
  const [clubActiveInfo, setClubActiveInfo] = useState('');
  const [clubInviteLink, setClubInviteLink] = useState('');
  const [clubInviteInfo, setClubInviteInfo] = useState('');
  const [clubMaster, setClubMaster] = useState('');
  const [clubMember, setClubMember] = useState('');
  const [clubState, setClubState] = useState('');

  const [isSave, setIsSave] = useState(false);

  const handleClubInfo = (event) => {
    setClubInfo(event.target.value);
  };

  const handleSaveClubButton = async (event) => {
    handleCloseButtonTabbed();
    setIsSave(false);
    console.log('save start');
    // await club.save();
    setIsSave(true);
  };

  useEffect(() => {
    console.log(club);
  }, []);

  return (
    <div className="clubdetail">
      <div className="clubdetail-title-box">
        <Icon
          className="hidden"
          name="close"
          onClick={handleCloseButtonTabbed}
        />
        <div className="clubdetail-title-box-contents">
          <h1>{club.club_name}</h1>
          <span>{club.club_category}</span>
        </div>
        <Icon
          className="clubdetail-title-box-closebutton"
          size="large"
          name="close"
          onClick={handleCloseButtonTabbed}
        />
      </div>
      <div className="clubdetail-body-box">
        <List>
          <TextareaAutosize
            className="clubinfo"
            type="text"
            name="club_info"
            value={club.club_info}
            onChange={handleClubInfo}
          />
          <List.Item>
            <List.Content>
              <Icon className="icon_width" name="users" />
              {club.club_master}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Icon className="icon_width" name="linkify" />
              <a href={club.club_invite_link}>
                {club.club_invite_link == '' ? ' - ' : '참여 링크'}
              </a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Icon className="icon_width" name="mail" />
              {club.club_invite_dm == '' ? ' - ' : club.club_invite_dm}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Icon className="icon_width" name="marker" />
              {club.club_slack_chanel}
            </List.Content>
          </List.Item>
        </List>
        <TextareaAutosize
          className="clubinfo"
          type="text"
          name="club_active_info"
          value={club.club_active_info}
          placeholder="클럽 활동 정보를 입력해주세요!"
          // onChange={handleClubInfo}
        />
        <TextareaAutosize
          className="clubinfo"
          type="text"
          name="club_invite_info"
          value={club.club_invite_info}
          placeholder="클럽 초대 정보를 입력해주세요!"
          // onChange={handleClubInfo}
        />
      </div>
      <button className="save-club-button" onClick={handleSaveClubButton}>
        Save
      </button>
    </div>
  );
};

export default ClubDetail;
