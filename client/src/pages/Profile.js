import React from "react";
import { Jumbotron } from "reactstrap";
import { Col, Row, Container } from "../components/Grid";
import NewAvatar from "../components/PlayerAvatar/NewAvatar";

const Profile = props => {
  //console.log(props.user);
  console.log(props.user.robot.RobotColor);
  return (
    <Container>
      <br />
      <Row>
        <Col size="sm-1" />
        <Col size="sm-10">
          <Jumbotron className="text-center">
            <h1 className="text-center">
              <small>
                <i className="fas fa-baseball-ball fa-spin" />
              </small>{" "}
              <strong> Player stats</strong>
            </h1>
            <p className="lead text-center"> Players</p>
            <hr className="my-2 text-center" />

            {/* <Link to="/teams" className="btn btn-outline-primary">teams</Link> 
        <Link to="/games" className="btn btn-outline-primary">games</Link>  */}
            <div>
              <NewAvatar
                RobotAntenna={props.user.robot.RobotAntenna}
                RobotColor={props.user.robot.RobotColor}
                RobotImage={props.user.robot.RobotImage}
              />
              <br />
              Name: {props.user.firstName} {props.user.lastName}
              <br />
              Game Score: {props.user.gameScore}
              <br />
              Historical Score: {props.user.histScore}
              <br />
            </div>
          </Jumbotron>
        </Col>
        <Col size="sm-1" />
      </Row>
    </Container>
  );
};

export default Profile;
