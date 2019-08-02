import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
 <BrowserRouter>
  <Switch>
   <Route path="/" component={App} />
  </Switch>
 </BrowserRouter>,
 document.getElementById("root")
);
registerServiceWorker();

var socket = io.connect("http://localhost");

function authenticate(socket, data, callback) {
    var username = data.username;
    var password = data.password;

    db.findUser('User', {username:username}, function(err, user) {
        if (err || !user) return callback(new Error("User not found"));
        return callback(null, user.password == password);
    });
}

function postAuthenticate(socket, data) {
    var username = data.username;

    db.findUser('User', {username:username}, function(err, user) {
        socket.client.user = user;
    });
}

function disconnect(socket) {
    console.log(socket.id + ' disconnected');
}
