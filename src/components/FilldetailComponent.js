import React, { Component } from "react";
import axios from 'axios';
import {baseUrl} from "../shared/baseUrl";
import { UncontrolledTooltip} from "reactstrap";
import {Form }from 'reactstrap';
import '../css/filldetails.css';

export class Filldetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      codechef_username: "",
      codeforces_username: "",
      leetcode_username: "",
      usernameValid: false,
      codechefValid: false,
      codeforcesValid: false,
      leetcodeValid: false,
      formValid: false,
      usernamechecking: false,
      codechef_username_checking: false,
      codeforces_username_checking: false,
      leetcode_username_checking: false,
      errorMsg: {},
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }
   async handleSubmit(e) {
       e.preventDefault();
    await this.checkUsername();
    await this.checkCodechef();
    await this.checkCodeforces();
   await  this.checkLeetcode();
    if (
      this.state.usernameValid &&
      ((this.state.codechefValid && this.state.codechef_username !== "") ||
        this.state.codechef_username === "") &&
      ((this.state.codeforcesValid && this.state.codeforces_username !== "") ||
        this.state.codeforces_username === "") &&
      ((this.state.leetcodeValid && this.state.leetcode_username !== "") ||
        this.state.leetcode_username === "")
    ){
      var user_details={};
        user_details.envision_handle = this.state.username;
        user_details.codechef_handle = this.state.codechef_username;
        user_details.codeforces_handle = this.state.codeforces_username;
        user_details.leetcode_handle = this.state.leetcode_username;
      this.props.filldetailsUser(user_details);
      console.log(this.state);
    }else {
      console.log({success:false});
    }
  }
  async checkUsername() {
    if (!this.state.errorMsg.username && this.state.username.length > 1) {
      this.setState({ usernamechecking: true });
      await axios
        .post(`${baseUrl}usernamecheck`, {
          envision_handle: this.state.username,
        })
        .then((res) => {
          if (res.data.success) {
            this.setState({
              usernameValid: res.data.success,
              usernamechecking: false,
            });
          } else {
            var { errorMsg } = this.state;
            errorMsg.username = "Username already taken";
            this.setState({
              errorMsg,
              usernameValid: res.data.success,
              usernamechecking: false,
            });
          }
        });
    }
  }
  async checkCodechef() {
    if (
      !this.state.errorMsg.codechef_username &&
      this.state.codechef_username.length > 1
    ) {
      this.setState({ codechef_username_checking: true });
      await axios
        .post(`${baseUrl}handletest/codechef`, {
          codechef_handle: this.state.codechef_username,
        })
        .then((res) => {
          if (res.data.success) {
            this.setState({
              codechefValid: res.data.success,
              codechef_username_checking: false,
            });
          } else {
            var { errorMsg } = this.state;
            errorMsg.codechef_username = "Username not valid";
            this.setState({
              errorMsg,
              codechefValid: res.data.success,
              codechef_username_checking: false,
            });
          }
        });
    }
  }
 async checkCodeforces() {
    if (
      !this.state.errorMsg.codeforces_username &&
      this.state.codeforces_username.length > 1
    ) {
      this.setState({ codeforces_username_checking: true });
     await axios
        .post(`${baseUrl}handletest/codeforces`, {
          codeforces_handle: this.state.codeforces_username,
        })
        .then((res) => {
          if (res.data.success) {
            this.setState({
              codeforcesValid: res.data.success,
              codeforces_username_checking: false,
            });
          } else {
            var { errorMsg } = this.state;
            errorMsg.codeforces_username = "Username not valid";
            this.setState({
              errorMsg,
              codeforcesValid: res.data.success,
              codeforces_username_checking: false,
            });
          }
        });
    }
  }
  async checkLeetcode() {
    if (
      !this.state.errorMsg.leetcode_username &&
      this.state.leetcode_username.length > 1
    ) {
      this.setState({ leetcode_username_checking: true });
      await axios
        .post(`${baseUrl}handletest/leetcode`, {
        leetcode_handle: this.state.leetcode_username,
        })
        .then((res) => {
          if (res.data.success) {
            this.setState({
              leetcodeValid: res.data.success,
              leetcode_username_checking: false,
            });
          } else {
            var { errorMsg } = this.state;
            errorMsg.leetcode_username = "Username not valid";
            this.setState({
              errorMsg,
              leetcodeValid: res.data.success,
              leetcode_username_checking: false,
            });
          }
        });
    }
  }
  validateForm = () => {
    const {
      usernameValid,
      emailValid,
      passwordValid,
      passwordConfirmValid,
    } = this.state;
    this.setState({
      formValid:
        usernameValid && emailValid && passwordValid && passwordConfirmValid,
    });
  };
  updateUsername = (username) => {
    this.setState({ username }, this.validateUsername);
  };
  updateCodechef = (codechef_username) => {
    this.setState({ codechef_username }, this.validateCodechef);
  };
  updateCodeforces = (codeforces_username) => {
    this.setState({ codeforces_username }, this.validateCodeforces);
  };
  updateLeetcode = (leetcode_username) => {
    this.setState({ leetcode_username }, this.validateLeetcode);
  };
  validateUsername = () => {
    const { username } = this.state;
    let errorMsg = { ...this.state.errorMsg };

    if (username.length < 4 && username.length) {
      errorMsg.username = "At least 3 characters long";
    } else if (!/^[a-z]$/i.test(username[0]) && username.length) {
      errorMsg.username = "must start with a-z";
    } else {
      errorMsg.username = "";
    }
    this.setState({ errorMsg }, this.validateForm);
  };
  validateCodechef = () => {
    const { codechef_username } = this.state;
    let errorMsg = { ...this.state.errorMsg };

    if (codechef_username.length < 4 && codechef_username.length) {
      errorMsg.codechef_username = "At least 4 characters long";
    } else if (
      codechef_username.length &&
      !/^[a-z]$/i.test(codechef_username[0])
    ) {
      errorMsg.codechef_username = "must start with a-z";
    } else {
      errorMsg.codechef_username = "";
    }

    this.setState({ errorMsg }, this.validateForm);
  };
  validateCodeforces = () => {
    const { codeforces_username } = this.state;
    let errorMsg = { ...this.state.errorMsg };

    if (codeforces_username.length < 3 && codeforces_username.length) {
      errorMsg.codeforces_username = "At least 3 characters long";
    } else {
      errorMsg.codeforces_username = "";
    }

    this.setState({ errorMsg }, this.validateForm);
  };
  validateLeetcode = () => {
    const { leetcode_username } = this.state;
    let errorMsg = { ...this.state.errorMsg };

    if (leetcode_username.length < 3 && leetcode_username.length) {
      errorMsg.leetcode_username = "At least 3 characters long";
    } else {
      errorMsg.leetcode_username = "";
    }

    this.setState({ errorMsg }, this.validateForm);
  };
  render() {
    const ValidationMessage = (props) => {
      if (props.message) {
        return (
          <div className="tooltip-pos-10">
            <span
              style={{ color: "red" }}
              href="#D"
              id="UncontrolledTooltipExample"
              // className="alert-validate"
            >
              <i class="fa fa-exclamation-circle"></i>
            </span>
            <UncontrolledTooltip
              placement="left"
              target="UncontrolledTooltipExample"
              className="tooltip-form-10"
              hideArrow={true}
              innerClassName="tooltip-form-10"
            >
              {props.message}
            </UncontrolledTooltip>
          </div>
        );
      } else if (props.valid) {
        return (
          <div className="tooltip-pos-10">
            <div
              style={{ color: "green", size: "10px" }}
              id="UncontrolledTooltipExample"
              className="fa-1x"
            >
              <i class="fa fa-spinner fa-spin"></i>
            </div>
          </div>
        );
      }
      return null;
    };
    return (
      <div className="form-bg-10">
        <div className="form-details-10">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
    <span className="form-title-10">Hello {this.props.auth.user!==null?this.props.auth.user.displayname:"Rakshit"}!</span>
            <div className="form-group wrap-input-10">
              <label htmlFor="username" className="lable-input-10">
                Envision Username
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                className="input-txt-10"
                value={this.state.username}
                onChange={(e) => this.updateUsername(e.target.value)}
              />

              <span className="focus-input-10"></span>
              <ValidationMessage
                valid={this.state.usernamechecking}
                message={this.state.errorMsg.username}
              />
            </div>
            <div className="form-group wrap-input-10">
              <label htmlFor="codechef_username" className="lable-input-10">
                Codechef Username
              </label>
              <input
                type="text"
                placeholder="Codechef Username"
                id="codechef_username"
                name="codechef_username"
                className="input-txt-10"
                value={this.state.codechef_username}
                onChange={(e) => this.updateCodechef(e.target.value)}
              />

              <span className="focus-input-10"></span>
              <ValidationMessage
                valid={this.state.codechef_username_checking}
                message={this.state.errorMsg.codechef_username}
              />
            </div>
            <div className="form-group wrap-input-10">
              <label htmlFor="codeforces_username" className="lable-input-10">
                Codeforces Username
              </label>
              <input
                type="text"
                placeholder="Codeforces Username"
                id="codeforces_username"
                name="codeforces_username"
                className="input-txt-10"
                value={this.state.codeforces_username}
                onChange={(e) => this.updateCodeforces(e.target.value)}
              />

              <span className="focus-input-10"></span>
              <ValidationMessage
                valid={this.state.codeforces_username_checking}
                message={this.state.errorMsg.codeforces_username}
              />
            </div>
            <div className="form-group wrap-input-10">
              <label htmlFor="leetcode_username" className="lable-input-10">
                Leetcode Username
              </label>
              <input
                type="text"
                placeholder="Leetcode Username"
                id="leetcode_username"
                name="leetcode_username"
                className="input-txt-10"
                value={this.state.leetcode_username}
                onChange={(e) => this.updateLeetcode(e.target.value)}
              />

              <span className="focus-input-10"></span>
              <ValidationMessage
                valid={this.state.leetcode_username_checking}
                message={this.state.errorMsg.leetcode_username}
              />
            </div>
            <div className="form-btn-10">
              <button type="submit" className="form-btn-inner-10">
                Submit
                <i className="fa fa-long-arrow-right"></i>
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Filldetails;
