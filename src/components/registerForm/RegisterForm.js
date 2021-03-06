import React, { Component } from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import { Form, Button } from "react-bootstrap";

import CreateUser from "../../services/CreateUser";
import "./RegisterForm.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      displayName: "",
    };

    this.client = new CreateUser();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On Submit, Register And Log In New User
  handleRegister = (event) => {
    event.preventDefault();
    this.client.registerUser(this.state).then((response) => {
      this.props.login({
        username: this.state.username,
        password: this.state.password,
      });
    });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <div>
        <Form id="register-form" onSubmit={this.handleRegister}>
          <Form.Group controlId="resgisterform">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              autoFocus
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="displayname">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Register
          </Button>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form>
      </div>
    );
  }
}
export default withAsyncAction("auth", "login")(RegisterForm);
