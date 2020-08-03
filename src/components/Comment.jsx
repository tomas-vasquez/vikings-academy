import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/min/locales";

import { storageUrl, flagsUrl } from "config";

// reactstrap components
import { Collapse, Row, Col } from "reactstrap";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
    };
    moment.locale("es");
  }

  componentDidMount() {
    this.setState({ collapse1: true });
  }

  /*!
  =========================================================
  * metodo render :D
  =========================================================
  */

  render() {
    let comment = this.props.comment;
    let replyComment = this.props.replyComment;

    let userData = this.props.userData;

    return (
      <Collapse isOpen={this.state.collapse1}>
        <hr className="m-0" />
        <div className="p-2">
          {/* comeentario que se esta respondiendo */}
          {replyComment !== null && replyComment !== undefined ? (
            <div>
              <small className="h6 font-weight-400 text-muted mt-0">
                <i className="fa fa-reply mx-1"></i>
                {comment.name.split(" ")[0]} repondió a{" "}
                {replyComment.name}:
              </small>
              <div
                className="shadow media align-items-center px-sm-3 px-2 mb-2 mb-0 bg-muted rounded py-2"
                style={{ borderLeft: "solid 4px " }}
              >
                {replyComment.pic_url !== null ? (
                  <img
                    className="avatar avatar-md rounded-circle mr-3"
                    src={storageUrl + replyComment.pic_url}
                    alt={replyComment.name}
                  />
                ) : (
                  <img
                    alt={replyComment.name}
                    className="avatar avatar-md rounded-circle mr-3"
                    src={require("assets/img/noPic.jpg")}
                  />
                )}
                <img
                  className="avatar-flag"
                  src={flagsUrl + replyComment.flag + ".png"}
                  alt={replyComment.flag}
                />
                <div className="media-body">
                  {this.state.replyComment === userData.id ? (
                    <>
                      <small className="h6 font-weight-400 text-muted mt-0">
                        Tú - {moment(comment.comment_created_at, "UNIX").fromNow()}
                      </small>
                      <br />
                    </>
                  ) : (
                    <>
                      <small className="h6 font-weight-400 text-muted mt-0">
                        {moment(comment.comment_created_at, "UNIX").fromNow()}
                      </small>
                      <br />
                    </>
                  )}
                  {replyComment.comment_content.length < 150 ? (
                    <>{replyComment.comment_content}</>
                  ) : (
                    <>{replyComment.comment_content.substring(0, 150)}...</>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* comeentario  */}

          <div className="media align-items-center">
            {comment.pic_url !== null ? (
              <img
                className="avatar avatar-md rounded-circle mr-3"
                src={storageUrl + comment.pic_url}
                alt={comment.name}
              />
            ) : (
              <img
                alt={comment.name}
                className="avatar avatar-md rounded-circle mr-3"
                src={require("assets/img/noPic.jpg")}
              />
            )}
            <img
              className="avatar-flag"
              src={flagsUrl + comment.flag + ".png"}
              alt={comment.flag}
            />
            <div className="media-body">
              {comment.user_id === userData.id ? (
                <>
                  <small className="h6 font-weight-400 text-muted mt-0">
                    Tú - {moment(comment.comment_created_at, "UNIX").fromNow()}
                  </small>
                  <br />
                </>
              ) : (
                <>
                  <small className="h6 font-weight-400 text-muted mt-0">
                    {userData.name +
                      " - " +
                      moment(comment.comment_created_at, "UNIX").fromNow()}
                  </small>
                  <br />
                </>
              )}

              <Row>
                <Col xs="auto" style={{ flex: "auto" }}>
                  <div>
                    <p className="h4 font-weight-500 mt-0">
                      {comment.comment_content}
                    </p>
                  </div>
                </Col>
                <Col xs="auto" className="ml-auto mt-2 text-muted">
                  <Link to="#!">
                    {comment.likes}
                    <i className="fa fa-heart ml-1 mr-3"></i>
                  </Link>

                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.handleClickReplyComments(e, comment);
                    }}
                  >
                    <i className="fa fa-reply mr-3"></i>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps, {})(Comments);
