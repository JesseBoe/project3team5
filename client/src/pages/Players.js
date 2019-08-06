import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import AvatarSetter from "../components/PlayerAvatar/AvatarSetter";
import Navbar from "../components/Navbar/Navbar";

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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>
                <i class="fas fa-user-plus" /> <strong>Add Player</strong>
              </h1>
            </Jumbotron>
            <div>
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
                disabled={!(this.state.firstName)}
                onClick={this.handleFormSubmit}
                
              >Save Changes
                {/* <button>
                  {" "}
                  Submit player <i class="fa fa-check-square-o" />
                </button> */}

                {/* <i class="fas fa-check-square"></i> Submit Player */}
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>
                <i class="fas fa-user-friends" /> <strong>Players</strong>
              </h1>
            </Jumbotron>
            {this.state.players.level ? (
              <List>
                {this.state.players.map(player => (
                  <ListItem key={player._id}>
                    <Link to={"/players/" + player._id}>
                      <strong>
                        <i class="fas fa-user" /> {player.firstName}:{" "}
                        {player.position}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteplayer(player._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Players;
