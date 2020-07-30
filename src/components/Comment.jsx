import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";
import "moment/min/locales";

import { serverUrl, flagsUrl } from "config";

// reactstrap components
import {
  Collapse,
  Row,
  Col
} from "reactstrap";

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse1: false
    }
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
    let comment2 = this.props.comment2;

    return (

      <Collapse isOpen={this.state.collapse1}>

        <div className="border-top p-2">

          {/* comeentario que se esta respondiendo */}
          {comment2 !== null ?

            <div>
              <small className="h6 font-weight-400 text-muted mt-0"><i className="fa fa-reply mx-1"></i>{comment.name.split(" ")[0]} repondió el comentario de {comment2.name.split(" ")[0]}:</small>
              <div className="media align-items-center px-sm-3 px-2 mb-2 mb-0 bg-muted rounded py-2" style={{ borderLeft: "solid 4px " }}>
                {comment2.pic_url !== null ?
                  <img className="avatar avatar-md rounded-circle mr-3" src={serverUrl + comment2.pic_url} alt={comment2.name} />
                  :
                  <img alt={comment2.name} className="avatar avatar-md rounded-circle mr-3" src={require("_shared/static/noPic.jpg")} />
                }
                <img className="avatar-flag" src={flagsUrl + comment2.flag + ".png"} alt={comment2.flag} />
                <div className="media-body">
                  {this.state.comment2 === this.props.userData.id ?
                    <><small className="h6 font-weight-400 text-muted mt-0">Tú - {moment(comment2.post_at, "UNIX").fromNow()}</small><br /></>
                    :
                    <><small className="h6 font-weight-400 text-muted mt-0">{comment2.name} - {moment(comment2.post_at, "UNIX").fromNow()}</small><br /></>
                  }
                  {comment2.content.length < 150 ?
                    <>{comment2.content}</>
                    :
                    <>{comment2.content.substring(0, 150)}...</>
                  }
                </div>
              </div>
            </div>
            : null

          }


          {/* comeentario  */}


          <div className="media align-items-center">
            {comment.pic_url !== null ?
              <img className="avatar avatar-md rounded-circle mr-3" src={serverUrl + comment.pic_url} alt={comment.name} />
              :
              <img alt={comment.name} className="avatar avatar-md rounded-circle mr-3" src={require("_shared/static/noPic.jpg")} />
            }
            <img className="avatar-flag" src={flagsUrl + comment.flag + ".png"} alt={comment.flag} />
            <div className="media-body">
              {comment.user_id === this.props.userData.id ?
                <><small className="h6 font-weight-400 text-muted mt-0">Tú - {moment(comment.post_at, "UNIX").fromNow()}</small><br /></>
                :
                <><small className="h6 font-weight-400 text-muted mt-0">{comment.name} - {moment(comment.post_at, "UNIX").fromNow()}</small><br /></>
              }

              <Row>
                <Col xs="auto" style={{ flex: "auto" }}>
                  <div>
                    <p className="h4 font-weight-500 mt-0">{comment.content}</p>
                  </div>

                </Col>
                <Col xs="auto" className="ml-auto mt-2 text-muted">
                  {/* <Link to="#!">
                    {comment.likes}<i className="fa fa-heart ml-1 mr-3"></i>
                  </Link> */}

                  <Link to="#" onClick={e => {e.preventDefault();this.props.handleClickReplyComments(e, comment)} }>
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

const mapStateToProps = state => ({
  userData: state.userData,
})

export default connect(mapStateToProps, {})(Comments);