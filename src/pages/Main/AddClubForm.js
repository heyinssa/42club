import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useFormik } from 'formik';
import './Main.css';

const ClubDetail = ({ addClubRow, handleCloseButtonTabbed }) => {
  let club;

  const formik = useFormik({
    initialValues: {
      club_name: '',
      club_info: '',
      club_active_info: '',
      club_invite_info: '',
      club_invite_link: '',
      club_invite_dm: '',
      club_master: '',
      club_member: '',
      club_slack_chanel: '',
      club_state: '',
      index: '',
    },
    onSubmit: (values) => {
      club = { ...values };
      addClubRow(club);
      formik.resetForm();
    },
  });

  const handleSaveClubButton = async (event) => {
    handleCloseButtonTabbed();

    console.log('save start');
  };

  return (
    <div className="clubdetail">
      <div className="clubdetail-title-box">
        <Icon
          className="hidden"
          size="big"
          name="close"
          onClick={handleCloseButtonTabbed}
        />
        <h1 className="clubdetail-title-box-title"> Add Club </h1>
        <Icon
          className="clubdetail-title-box-closebutton"
          size="big"
          name="close"
          onClick={handleCloseButtonTabbed}
        />
      </div>
      <div className="clubdetail-body-box">
        <form
          className="clubdetail-body-box-contents"
          id="my-form"
          onSubmit={formik.handleSubmit}
        >
          <input
            id="club_name"
            name="club_name"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.club_name}
            className="clubdetail-body-box-contents-inputtitle"
            placeholder="club name"
          />
          <input
            id="club_info"
            name="club_info"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.club_info}
            className="clubdetail-body-box-contents-body"
            placeholder="club info"
          />
          <div>
            <div>
              <Icon className="icon_width" name="users" />
              <input
                id="club_master"
                name="club_master"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_master}
                className="clubdetail-body-box-contents-body"
                placeholder="club master"
              />
            </div>
            <div>
              <Icon className="icon_width" name="linkify" />
              <input
                id="club_invite_link"
                name="club_invite_link"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_invite_link}
                className="clubdetail-body-box-contents-body"
                placeholder="club invite_link"
              />
            </div>
            <div>
              <Icon className="icon_width" name="mail" />
              <input
                id="club_invite_dm"
                name="club_invite_dm"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_invite_dm}
                className="clubdetail-body-box-contents-body"
                placeholder="club invite_dm"
              />
            </div>
            <div>
              <Icon className="icon_width" name="marker" />
              <input
                id="club_slack_chanel"
                name="club_slack_chanel"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_slack_chanel}
                className="clubdetail-body-box-contents-body"
                placeholder="club slack_chanel"
              />
            </div>
          </div>
        </form>
      </div>
      <button
        form="my-form"
        type="submit"
        className="save-club-button"
        onClick={handleSaveClubButton}
      >
        Save
      </button>
    </div>
  );
};

export default ClubDetail;
