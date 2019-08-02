import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import AvatarSetter from "../components/PlayerAvatar/AvatarSetter";

class players extends Component {
  state = {
    players: [],
    name: "",
    level: "",
    score: "",
    
  };

  componentDidMount() {
    this.loadplayers();
  }

  loadplayers = () => {
    API.getplayers()
      .then(res =>
        this.setState({ players: res.data, name: "", level: "", score: "" })
      )
      .catch(err => console.log(err));
  };

  deleteplayer = id => {
    API.deleteplayer(id)
      .then(res => this.loadplayers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.position) {
      API.saveplayer({
        name: this.state.name,
        level: this.state.level,
        score: this.state.score,
        
      })
        .then(res => this.loadplayers())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1><i class="fas fa-user-plus"></i> <strong>Add Player</strong></h1>
            </Jumbotron>
            <div>
              <AvatarSetter/>
            </div>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="name*"
              />
              <Input
                value={this.state.level}
                onChange={this.handleInputChange}
                name="level"
                placeholder="level*"
              />
              <Input
                value={this.state.score}
                onChange={this.handleInputChange}
                name="score"
                placeholder="score"
              />
              
    
              
              <FormBtn
                disabled={!(this.state.position && this.state.name)}
                onClick={this.handleFormSubmit}
              >
               <i class="fas fa-check-square"></i> Submit Player
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1><i class="fas fa-user-friends"></i> <strong>Players</strong></h1>
            </Jumbotron>
            {this.state.players.length ? (
              <List>
                {this.state.players.map(player => (
                  <ListItem key={player._id}>
                    <Link to={"/players/" + player._id}>
                      <strong>
                      <i class="fas fa-user"></i> {player.name}: {player.position}
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

export default players;
