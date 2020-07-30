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
  Col,
} from "reactstrap";

// import Users from "_controllers/Users";
import {
  focusHandler,
  blurHandler,
  user_nameChangedHandler,
} from "helpers/input";
import { Link } from "react-router-dom";
import Controller_Users from "_controllers/Users";

class FormRegister extends React.Component {
  componentDidMount() {
    this.users = new Controller_Users();
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.users.register(e.target, this.props.successCallback);
  };

  render() {
    return (
      <Card className="shadow ">
        <Row className="px-4 align-items-center">
          <Col xs="12" lg="6" className="d-none d-lg-block p-0">
            <img
              src={require("assets/img/undraw_Hello_qnas.svg")}
              alt="wedwdwee we"
              className="img-fluid p-4"
            />
          </Col>

          <Col xs="12" lg="6" className="p-0 pl-md-2">
            <Form onSubmit={this.submitHandler}>
              <CardBody className=" px-2">
                <div className="px-2">
                  <div className="text-center mt-0 mb-3">
                    <h1>Crear cuenta</h1>
                  </div>

                  <FormGroup>
                    <label className="form-control-label">
                      Su correo electrónico:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        id="input-email"
                        placeholder="Su correo electrónico"
                        type="email"
                        required
                        autoComplete="off"
                        minLength="8"
                        maxLength="60"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">
                      Nombre para su cuenta:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="user_name"
                        onChange={user_nameChangedHandler}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        id="input-username"
                        placeholder="Nombre para su cuenta "
                        required
                        type="text"
                        autoComplete="off"
                        minLength="8"
                        maxLength="20"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">
                      Contraseña para su cuenta:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        id="input-password"
                        placeholder="Defina su contraseña"
                        type="text"
                        autoComplete="off"
                        minLength="8"
                        maxLength="20"
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="custom-control custom-checkbox mt-3">
                    <input
                      className="custom-control-input"
                      defaultValue="off"
                      name="accept_the_terms"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      Acepto los
                      <Link target="blank" to="/terms">
                        {" "}
                        términos y condiciones.
                      </Link>{" "}
                    </label>
                  </div>

                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit">
                      Crear cuenta <i className="fa fa-check"></i>
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Form>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default FormRegister;
