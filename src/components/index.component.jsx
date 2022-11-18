import React, { Component } from "react";

import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import MyLink from "../components/buttons/MyLink";
import containerHome from "./styles/homeStyle.css";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
        <div className="container__home">

        <div className="main__box">
  
          <div className="box__left">
            <h1>Juntando</h1>
            <h2>Encontrá personas con quienes compartir momentos.</h2>
          </div>
  
          <div className="box__right">

              <Link to={`/login`}>
                <MyLink
                  type="blue"
                  icon=""
                  content="Ingresar con mi cuenta"
                ></MyLink>
              </Link>  
  
              <Link to={`/register`}>
              <MyLink
                type="green"
                icon=""
                content="Crear cuenta nueva"
              ></MyLink>
              </Link> 
            
  
            <Link to={`/info`}>
              <MyLink
                type="default__link"
                icon={<BsInfoCircle />}
                content="¿Cómo funciona?"
              ></MyLink>
            </Link>
  
          </div>
  
        </div>
  
  
        <div className="footer__home">
  
          <div>
            <Link to={`/register`}>
              <MyLink
                type="default__link__dark"
                icon=""
                content="Registrarse"
              ></MyLink>
            </Link>
  
            <Link to={`/login`}>
              <MyLink
                type="default__link__dark"
                icon=""
                content="Iniciar sesión"
              ></MyLink>
            </Link>
  
            <Link to={`/info`}>
              <MyLink
                type="default__link__dark"
                icon=""
                content="¿Cómo funciona?"
              ></MyLink>
            </Link>
  
            <Link to={`/conditions`}>
              <MyLink
                type="default__link__dark"
                icon=""
                content="Condiciones"
              ></MyLink>
            </Link>
          </div>
  
          <div>
            <Link to={`/`}>
              <MyLink
                type="default__link__dark"
                icon=""
                content="Juntando.fun 2022"
              ></MyLink>
            </Link>
          </div>
  
        </div>
  
      </div>
    );
  }
}