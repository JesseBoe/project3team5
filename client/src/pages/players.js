
import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import List from "../components/List";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import  {ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

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
        this.setState({ players: res.data, name: "", level: "", score:"" })
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
    if (this.state.name) {
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
      
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1><i class="fas fa-user-plus"></i> <strong>Add Player</strong></h1>
            </Jumbotron>
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
                disabled={!(this.state.name)}
                onClick={this.handleFormSubmit}
              >
               <i class="fas fa-check-square"></i> Submit Player
              </FormBtn>
            </form>
          </Col>
          
            <Jumbotron>
              <h1><i class="fas fa-user-friends"></i> <strong>Players</strong></h1>
            </Jumbotron>
           
        </Row>
            
         
    );
  };
}

export default players;
