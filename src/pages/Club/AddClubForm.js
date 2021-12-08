import React from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import gs_creds from '../../spreadsheet-react-6e8623ac213c.json';

const AddClubForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [doc, setDoc] = useState([]);

  const init = async () => {
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const _doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    console.log(_doc);
    setDoc(_doc);

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

    await authGoogleSheet();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.name);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    console.log(age);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(state);
  };

  const handleSubmitButton = async () => {
    const addRow = async () => {
      try {
        const sheet = doc.sheetsByIndex[0];
        const newRow = { club_name: name, club_master: age };
        const result = await sheet.addRow(newRow);
      } catch (e) {
        console.error('Error: ', e);
      }
    };
    await addRow();
    console.log('done!');
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="Container">
      <div className="addclub">
        <div className="title-box">
          <h1 className="title"> 42 Club List </h1>
        </div>
        <Container fluid className="container">
          <Form className="form" onSubmit={submitHandler}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Enter your name"
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Age</label>
              <input
                placeholder="Enter your age"
                type="number"
                name="age"
                value={age}
                onChange={handleAgeChange}
              />
            </Form.Field>
            {/* <Form.Field>
            <label>Salary</label>
            <input
              placeholder="Enter your salary"
              type="number"
              name="salary"
              value={salary}
              onChange={changeHandler}
            />
          </Form.Field>
          <Form.Field>
            <label>Hobby</label>
            <input
              placeholder="Enter your hobby"
              type="text"
              name="hobby"
              value={hobby}
              onChange={changeHandler}
            />
          </Form.Field> */}
            <Button color="blue" type="submit" onClick={handleSubmitButton}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AddClubForm;
