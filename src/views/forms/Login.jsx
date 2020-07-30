
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col

} from "reactstrap";

import { focusHandler, blurHandler } from "helpers/input";

import Controller_Users from "_controllers/Users";

class Login extends React.Component {

  componentDidMount() {
    this.users = new Controller_Users();
  }

  submitHandler = e => {
    e.preventDefault();
    this.users.login(e.target, this.props.successCallback);
  }


  render() {
    return (
      <Card className="shadow p-0">

        <CardBody className="p-0">

          <Row className="px-2 px-md-4 align-items-center">

            <Col xs="12" lg="6" className="d-none d-lg-block p-0 ">
              <img src={require("assets/img/undraw_Hello_qnas.svg")}
                alt="wedwdwee we"
                className="img-fluid p-4" />
            </Col>

            <Col xs="12" lg="6" className="px-4 pb-4">

              <div className=" px-0 py-4">
                <div className="text-center mt-0 mb-3">
                  <h1>Iniciar sesión</h1>
                </div>
                <div className="text-muted text-center mt-2">-----  ingresa tus credeciales:  -----</div>
              </div>

              <div className="px-2">
                <Form role="form" id="formLogin" onSubmit={this.submitHandler}>
                  <FormGroup >
                    <label className="form-control-label" htmlFor="input-user_name">Su correo electrónico:</label>
                    <InputGroup >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="input-email"
                        name="email"
                        placeholder="Correo electrónico"
                        type="email"
                        autoComplete="tloging-login"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-password">Su contraseña:</label>
                    <InputGroup >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="input-password"
                        name="password"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        placeholder="Contraseña"
                        type="password"
                        autoComplete="tloging-login"
                        minLength="8"
                        maxLength="25"
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="custom-control custom-checkbox mt-3">
                    <input className="custom-control-input" name="remember_token" id="customCheckLogin" type="checkbox" />
                    <label className="custom-control-label pt-1" htmlFor="customCheckLogin">
                      Recordarme en este dispositivo
                    </label>
                  </div>

                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit" onClick={this.check_login}>
                      Iniciar sesión <i className="fa fa-arrow-right ml-1" />
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Login;
