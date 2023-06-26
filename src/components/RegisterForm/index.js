import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./index.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      gender: "",
      location: "",
      prime: false,
      errorMessage: "",
      redirectToLogin: false,
    };
  }

  handleRegister = async () => {
    try {
      const { username, name, password, gender, location, prime } = this.state;

      const response = await fetch(
        "http://localhost:3004//register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            password,
            gender,
            location,
            prime,
          }),
        }
      );

      if (response.ok) {
        this.setState({ errorMessage: "", redirectToLogin: true });
        console.log("User created successfully");
      } else {
        const data = await response.text();
        this.setState({ errorMessage: data });
      }
    } catch (error) {
      console.error(error);
      this.setState({ errorMessage: "An error occurred while registering" });
    }
  };

  validatePassword = (password) => {
    return password.length >= 8;
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    const {
      username,
      name,
      password,
      gender,
      location,
      prime,
      errorMessage,
    } = this.state;

    return (
      <div className="register-form-container">
        <h2 className="register-heading">Sign Up</h2>
        <form className="register-form">
          <div className="register-form-group">
            <label className="register-label">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              className="register-username-input-field"
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              className="register-username-input-field"
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              className="register-password-input-field"
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Gender:</label>
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={this.handleInputChange}
              className="register-gender-input-field"
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Location:</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.handleInputChange}
              className="register-location-input-field"
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Prime Customer:</label>
            <input
              type="checkbox"
              name="prime"
              checked={prime}
              onChange={this.handleCheckboxChange}
              className="register-checkbox-field"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={this.handleRegister}
              className="register-button"
            >
              Register
            </button>
          </div>
          {errorMessage && (
            <p className="register-error-message">{errorMessage}</p>
          )}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
