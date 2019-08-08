import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import AvatarSetter from "../components/PlayerAvatar/AvatarSetter";
import Navbar from "../components/Navbar/Navbar";
import NewAvatar from "../components/PlayerAvatar/NewAvatar";
import Button from "../components/GameButton/WideButton";
import quickStyle from "./quickStyle.css";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      firstName: props.user.firstName,
      robot: props.user.robot
    };
  }

  componentDidMount() {
    this.loadplayers();
  }

  loadplayers = () => {
    API.getplayers()
      .then(res => this.setState({ players: res.data }))
      .catch(err => console.log(err));
  };

  deleteplayer = id => {
    API.deleteplayer(id)
      .then(res => this.loadplayers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({
      firstName: value
    });
  };

  handleAvatarChange = robot => {
    console.log(robot);
    this.setState({
      robot: robot
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.firstName) {
      API.saveplayer(this.props.user._id, {
        firstName: this.state.firstName,
        robot: this.state.robot
      })
        .then(res => window.location.reload())
        .catch(err => console.log(err));
    }
  };

  handleRedirect = (path) => {
    this.redirectTo = path;
    this.forceUpdate();
  }

  redirectTo = ""

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>
                <i class="fas fa-user-plus" /> <strong>Edit Player</strong>
              </h1>

              <div
                style={{
                  display: "inline-block",
                  marginBottom: "10px"
                }}
              >
                <AvatarSetter
                  robot={this.props.user.robot}
                  onChange={this.handleAvatarChange}
                />
              </div>
              <form>
                <Input
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  name="firstName"
                  placeholder="First Name"
                />

                <FormBtn
                  disabled={!this.state.firstName}
                  onClick={this.handleFormSubmit}
                >
                  Save Changes
                  {/* <button>
                  {" "}
                  Submit player <i class="fa fa-check-square-o" />
                </button> */}
                  {/* <i class="fas fa-check-square"></i> Submit Player */}
                </FormBtn>
              </form>
            </Jumbotron>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron className="text-center">
              <div
                className="text-center"
                style={{
                  margin: "auto"
                }}
              >
                <h1>
                  <i class="fas fa-user-friends" /> <strong>Player Info</strong>
                </h1>

                <div
                  style={{
                    display: "inline-block"
                  }}
                >
                  <NewAvatar
                    RobotAntenna={this.props.user.robot.RobotAntenna}
                    RobotColor={this.props.user.robot.RobotColor}
                    RobotImage={this.props.user.robot.RobotImage}
                  />
                  <br />
                  Name: {this.props.user.firstName} {this.props.user.lastName}
                  <br />
                </div>
              </div>
            </Jumbotron>
          </Col>
        </Row>

        <div className=" d-flex justify-content-center" style={{ marginTop: "2%" }}>
          <Button func={()=> {this.handleRedirect('/create')}} color="#ba1e68" text={'CREATE GAME'} />
        </div>
        <div className=" d-flex justify-content-center" style={{ marginTop: "2%" }}>
          <Button func={() => { this.handleRedirect('/join') }} color="#ba1e68" text={'JOIN GAME'} />
        </div>

        {this.redirectTo != "" ? <Redirect to={this.redirectTo} /> : ""}

      </Container>
    );
  }
}

export default Players;
