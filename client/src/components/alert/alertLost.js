import React from "react";
import { MDBContainer, MDBAlert } from 'mdbreact';

const AlertlostPage = () => {
  return (
    <MDBContainer>
      <MDBAlert color="warning" dismiss>
        <strong>You lost the match!</strong> Good luck next time!!
      </MDBAlert>
    </MDBContainer>
  );
};

export default AlertlostPage;