import React from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
  Form,
  Input,
  Row,
  Col,
  Popover,
  CardFooter,
  CardTitle,
} from "reactstrap";

// core components
import OptionCountries from "./OptionCountries";
import {
  focusHandler,
  blurHandler,
  focusHandler2,
  blurHandler2,
  nameChangedHandler,
} from "helpers/input";

import Profile from "_controllers/Profile";

class Index extends React.Component {
  constructor() {
    super();
    this.profile = new Profile();
  }

  handleResetForm = (e) => {
    e.preventDefault();
    this.profile.updateUserData();
  };

  handleDataUpdate = (e) => {
    e.preventDefault();
    this.profile.updateUserData(e.target);
  };

  render() {
    return (
      <Card className="shadow">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">perdonaliza tu perfil aqui...</h5>
              <CardTitle tag="h2">Tu perfil</CardTitle>
              
            </Col>
            <Col className="text-right" xs="6">
              <Button
                color="primary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("form-user-data").reset();
                }}
              >
                Deshacer cambios
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className=" ">
          <h6 className="heading-small text-muted mb-4">
            Información principal
          </h6>
          <div className="px-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Nombre de cuenta (no editable):
                  </label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={"@" + this.props.user_name}
                      type="text"
                      disabled
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label">
                    Correo electrónico (no editable):
                  </label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-envelope" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      defaultValue={this.props.email}
                      type="email"
                      disabled
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <Form onSubmit={this.handleDataUpdate} id="form-user-data">
            <div className="px-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      Nombre completo:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="name"
                        defaultValue={this.props.name}
                        placeholder="Mi nombre completo"
                        type="text"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        onChange={nameChangedHandler}
                        minLength="8"
                        maxLength="60"
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">Redes Sociales</h6>
            <div className="px-lg-4">
              <OptionCountries parent_reference={this} />

              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      Enlace de Facebook:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-facebook-square" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="link_facebook"
                        defaultValue={this.props.link_facebook}
                        placeholder="Enlace de su perfil de facebook"
                        type="text"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                      />
                      <InputGroupAddon
                        onClick={(e) => {
                          window.open(
                            document.getElementById("input-facebook").value,
                            "blank"
                          );
                        }}
                        id={"tooltip475038074"}
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText>
                          <i className="fa fa-external-link-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Popover target="tooltip475038074">Provar enlace</Popover>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      Enlace de Twitter:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-twitter" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="link_twitter"
                        defaultValue={this.props.link_twitter}
                        placeholder="Enlace de su perfil de twitter"
                        type="text"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                      />
                      <InputGroupAddon
                        onClick={(e) => {
                          window.open(
                            document.getElementById("input-twitter").value,
                            "blank"
                          );
                        }}
                        id="tooltip475038073"
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText>
                          <i className="fa fa-external-link-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <UncontrolledTooltip delay={0} target="tooltip475038073">
                        Provar enlace
                      </UncontrolledTooltip>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      Enlace de Instagram:
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-instagram" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="link_instagram"
                        defaultValue={this.props.link_instagram}
                        placeholder="Enlace de su perfil de instagram"
                        type="text"
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                      />
                      <InputGroupAddon
                        onClick={(e) => {
                          window.open(
                            document.getElementById("input-instagram").value,
                            "blank"
                          );
                        }}
                        id={"tooltip487838073"}
                        addonType="append"
                        style={{ cursor: "pointer" }}
                      >
                        <InputGroupText>
                          <i className="fa fa-external-link-alt" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <UncontrolledTooltip delay={0} target="tooltip487838073">
                        Provar enlace
                      </UncontrolledTooltip>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <hr className="my-4" />

            <h6 className="heading-small text-muted">Acerca de tí</h6>
            <div className="px-lg-4">
              <FormGroup>
                <label className="form-control-label">Tu descripción:</label>
                <Input
                className="mb-0"
                  name="description"
                  placeholder="Escribe algo acerca de tí..."
                  rows="3"
                  defaultValue={this.props.description}
                  type="textarea"
                  maxLength="160"
                  onFocus={focusHandler2}
                  onBlur={blurHandler2}
                />
              </FormGroup>
              <input className="d-none" id="real-button-submit" type="submit" />
            </div>
          </Form>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="text-center">
            <Button
              className="my0"
              color="primary"
              onClick={(e) => {
                document.getElementById("real-button-submit").click();
              }}
            >
              Guardar cambios <i className="fa fa-save mr-2"></i>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.userData };
};

export default connect(mapStateToProps)(Index);
