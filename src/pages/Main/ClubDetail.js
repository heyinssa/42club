import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useFormik } from 'formik';
import './Main.css';

const ClubDetail = ({ club, handleCloseButtonTabbed }) => {
  const formik = useFormik({
    initialValues: {
      club_info: club.club_info,
      club_active_info: club.club_active_info,
      club_invite_info: club.club_invite_info,
    },
    onSubmit: (values) => {
      club.club_info = values.club_info;
      club.club_active_info = values.club_active_info;
      club.club_invite_info = values.club_invite_info;
      club.save();
      handleCloseButtonTabbed();
    },
  });

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
      <div>
        <form
          className="clubdetail-body-box"
          id="my-form2"
          onSubmit={formik.handleSubmit}
        >
          <List>
            <TextareaAutosize
              id="club_info"
              className="clubinfo"
              type="text"
              name="club_info"
              value={formik.values.club_info}
              onChange={formik.handleChange}
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
          />
          <TextareaAutosize
            className="clubinfo"
            type="text"
            name="club_invite_info"
            value={club.club_invite_info}
            placeholder="클럽 초대 정보를 입력해주세요!"
          />
        </form>
      </div>
      <button form="my-form2" type="submit" className="save-club-button">
        Save
      </button>
    </div>
  );
};

export default ClubDetail;
