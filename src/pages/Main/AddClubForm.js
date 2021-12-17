import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Formik, Form, Field, useFormik, useFormikContext } from 'formik';
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

const ClubDetail = ({ addClubRow, handleCloseButtonTabbed }) => {
  const [isSave, setIsSave] = useState(false);

  const formik = useFormik({
    initialValues: {
      club_name: '',
      club_info: '',
      club_active_info: '',
      club_invite_info: '',
      club_invite_link: '',
      club_master: '',
      club_member: '',
      club_state: '',
      index: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSaveClubButton = async (event) => {
    handleCloseButtonTabbed();
    setIsSave(false);
    console.log('save start');
    addClubRow();
    setIsSave(true);
    formik.resetForm();
  };

  useEffect(() => {
    console.log(isSave);
  }, []);

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
            placeholder="club info"
          />
          <div>
            <div>
              <Icon className="icon_width" name="users" />
              <input
                id="club_name"
                name="club_name"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_name}
                placeholder="club name"
              />
            </div>
            <div>
              <Icon className="icon_width" name="linkify" />
              <input
                id="club_name"
                name="club_name"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_name}
                placeholder="club name"
              />
            </div>
            <div>
              <Icon className="icon_width" name="mail" />
              <input
                id="club_name"
                name="club_name"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_name}
                placeholder="club name"
              />
            </div>
            <div>
              <Icon className="icon_width" name="marker" />
              <input
                id="club_name"
                name="club_name"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.club_name}
                placeholder="club name"
              />
            </div>
          </div>
        </form>
      </div>
      <Button
        form="my-form"
        type="submit"
        className="save-club-button"
        onClick={handleSaveClubButton}
      >
        <Button.Content visible> Save </Button.Content>
      </Button>
    </div>
  );
};

export default ClubDetail;
