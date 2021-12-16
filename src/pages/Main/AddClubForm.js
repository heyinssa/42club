import React from 'react';
import { Button, List, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
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
            <textarea
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              className="clubinfo"
              type="text"
              name="club_info"
              value={club.club_info}
              onChange={handleClubInfo}
            />
          </List.Item>
          <List.Item>
            <List.Icon name="linkify" />
            <List.Content>
              <a href={club.club_invite_link}>
                {' '}
                {club.club_invite_link == '' ? ' - ' : '참여 링크'}{' '}
              </a>
            </List.Content>
          </List.Item>
          <List.Icon name="mail" />
          <List.Content>
            <a href={club.club_invite_link}>{club.club_invite_link}</a>
          </List.Content>
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
