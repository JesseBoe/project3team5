import React from "react";
import { MDBContainer, MDBAlert } from 'mdbreact';

const AlertPage = () => {
  return (
    <MDBContainer>
      <MDBAlert color="warning" dismiss>
        <strong>You won the match!</strong> You should check your profile for game score.
      </MDBAlert>
    </MDBContainer>
  );
};

export default AlertPage;