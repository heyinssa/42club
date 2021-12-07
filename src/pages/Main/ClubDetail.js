import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { Card, Icon, Image } from 'semantic-ui-react';
import { useLocation } from 'react-router';
import './Main.css';

const ClubDetail = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div>
      {/* <div>{location.state.club.name}</div> */}
      <div> hihi </div>
    </div>
  );
};

export default ClubDetail;
