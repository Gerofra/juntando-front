import React, { Component } from "react";

import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';

import { Link } from "react-router-dom";
import MyLink from "../components/buttons/MyLink";
import Button from './buttons/Button'
import Alert from "../components/alert/Alert"
import { MdOutlinePerson, MdPassword, MdOutlineLockOpen } from "react-icons/md";
import formStyle from "./styles/formsStyle.css";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });



    if (this.checkBtn) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div>

          <form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >

          <h3 className="formTitle">Iniciar sesión</h3>

          {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  <Alert alertType="danger" msg={this.state.message}/>
                </div>
              </div>
            )}


        <div className="inputGroup">
          <MdOutlinePerson className="icon" />
          <input className="inputClassic"
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.onChangeUsername}
          validations={[required]}
          placeholder="usuario"/>
        </div>

        <div className="inputGroup">
          <MdPassword className="icon" />
          <input className="inputClassic"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            validations={[required]}
            placeholder="contraseña"
          />
        </div>

        <Button style="green" type="submit" content="Ingresar" disabled={this.state.loading} icon={<MdOutlineLockOpen />} />


  

            <input
              type="checkbox"
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </form>

        <Link to={`/contact`}>
          <MyLink
            type="default__link"
            icon=""
            content="Olvidé mi contraseña"
          ></MyLink>
        </Link> 
        
      </div>
    );
  }
}

export default withRouter(Login);