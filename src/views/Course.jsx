import React from "react";
import moment from "moment";
import "moment/min/locales";

import parser from "html-react-parser";

import classnames from "classnames";

// reactstrap components
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link } from "react-router-dom";
import { flagsUrl } from "config";
import { storageUrl } from "config";

class Course extends React.Component {
  constructor(props) {
    super(props);
    moment.locale("es");
    this.state = { activeTab: "image" };
  }
  // componentDidMount = () => {
  //   let currentItem = this.props.currentItem;
  //   if (currentItem !== null) {
  //     let description = this.props.descriptions;
  //   }
  // };
  componentDidUpdate = () => {};
  render() {
    let course = this.props.course;
    let description = this.props.description;
    let itemIndex = this.props.itemIndex;
    let proviusItem = this.props.proviusItem;
    let currentItem = this.props.currentItem;
    let nextItem = this.props.nextItem;
    ////
    let author = this.props.author;
    let pic_url;
    if (author.pic_url !== null) {
      pic_url = storageUrl + author.pic_url;
    } else {
      pic_url = require("assets/img/noPic.jpg");
    }

    return (
      <>
        <div className="content">
          <Container fluid>
            <Row>
              <Col>
                <Card className="shadow mb-3">
                  <CardBody className="p-2 ">
                    {currentItem !== null ? (
                      <div className="video-container">
                        <video
                          controls={true}
                          src={currentItem.item_video_url}
                          width="720"
                          height="420"
                          autoPlay
                        />
                      </div>
                    ) : (
                      <div className="video-container">
                        <video
                          id="videokk"
                          style={{ backgroundColor: "black" }}
                        />
                      </div>
                    )}
                    <Row className="my-2">
                      {/* titulo del video */}
                      <Col xs="auto" className="d-flex">
                        {currentItem !== null ? (
                          <h2 className="ml-2 my-auto">
                            {itemIndex +
                              ".- " +
                              (
                                currentItem.item_title.charAt(0).toUpperCase() +
                                currentItem.item_title.slice(
                                  1,
                                  currentItem.item_title.length
                                )
                              ).replace(/_/g, " ")}
                          </h2>
                        ) : (
                          <div className="mt-2">
                            <h1 className="h2 mx-auto">
                              <i className="fa fa-exclamation-triangle"></i>{" "}
                              Video no encontrado
                            </h1>
                          </div>
                        )}
                      </Col>

                      {/* botones siguiente y anterior */}
                      {author !== null ? (
                        <Col xs="auto" className="ml-auto mb-1">
                          <ButtonGroup>
                            <Button
                              tag={Link}
                              replace
                              to={
                                "/" +
                                course +
                                "/" +
                                (proviusItem
                                  ? proviusItem.item_title.replace(/ /g, "_")
                                  : "")
                              }
                              className={classnames(
                                {
                                  "disabled shadow-none":
                                    proviusItem === undefined,
                                },
                                "text-primary btn-icon"
                              )}
                              color="neutral"
                            >
                              <i className="fa fa-step-backward"></i>
                            </Button>

                            <Button
                              tag={Link}
                              replace
                              to={
                                "/" +
                                course +
                                "/" +
                                (nextItem
                                  ? nextItem.item_title.replace(/ /g, "_")
                                  : "")
                              }
                              className={classnames(
                                {
                                  "disabled shadow-none":
                                    nextItem === undefined,
                                },
                                "text-primary btn-icon"
                              )}
                              color="neutral"
                            >
                              <i className="fa fa-step-forward"></i>
                            </Button>
                          </ButtonGroup>
                        </Col>
                      ) : null}
                    </Row>
                    <hr className="m-0 mb-2" />

                    <Nav tabs className="px-3 border-bottom">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "image",
                          })}
                          onClick={() => {
                            this.setState({ activeTab: "image" });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Descripcion
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "color",
                          })}
                          onClick={() => {
                            this.setState({ activeTab: "color" });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Comunidad
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="image">
                        <div className="px-2">
                          <div className="p-2 py-3">
                            {description !== undefined
                              ? parser(description)
                              : null}
                          </div>
                          {/* autor del video */}
                          {author !== null ? (
                            <>
                              <div className="media align-items-center mb-3">
                                <img
                                  alt={author.name}
                                  className="avatar rounded-circle mr-3"
                                  src={pic_url}
                                />
                                <img
                                  className="avatar-flag"
                                  src={flagsUrl + author.flag + ".png"}
                                  alt={author.flag}
                                />
                                <div className="media-body">
                                  {author.name}
                                  <br />
                                  <small className="text-muted mt-0">
                                    {moment(
                                      currentItem.created_at,
                                      "ISO"
                                    ).fromNow()}
                                  </small>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </TabPane>
                      <TabPane tabId="color">
                        
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Course;
