import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const apiUrl = "http://localhost:3004/login";
    const userDetails = { username, password };
    console.log(userDetails);
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    const { showSubmitError, errorMsg } = this.state;
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
