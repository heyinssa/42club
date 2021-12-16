import React from 'react';
import { Button, List, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
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
    await club.save();
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
        <div>
          <h1 className="clubdetail-title-box-title">{club.club_name}</h1>
          <span className="clubdetail-title-box-subtitle">
            {club.club_category}
          </span>
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
              <Icon className="icon_width" name="marker" />
              42Seoul{' '}
            </List.Content>
          </List.Item>
          <List.Item></List.Item>
          <List.Item>
            <List.Content>
              <Icon className="icon_width" name="linkify" />
              <a href={club.club_invite_link}>
                {club.club_invite_link == '' ? ' - ' : '참여 링크'}
              </a>
            </List.Content>
          </List.Item>
          <List.Content>
            <Icon className="icon_width" name="mail" />
            {club.club_invite_dm == '' ? ' - ' : club.club_invite_dm}
          </List.Content>
        </List>
        <div>{club.club_active_info}</div>
        <div>{club.club_invite_info}</div>
        <div>{club.club_member}</div>
      </div>
      <button className="save-club-button" onClick={handleSaveClubButton}>
        Save
      </button>
    </div>
  );
};

export default ClubDetail;
