import React from "react";

import { connect } from "react-redux";

import { subscribeToAutoRefresher } from "store/app_store/actions";

import moment from "moment";
import "moment/min/locales";

import Controller_Comments from "../../_controllers/Comments";

// reactstrap components
import {
  CardFooter,
  Card,
  Collapse,
  NavLink,
  Button,
  Row,
  Col
} from "reactstrap";

import { serverUrl, flagsUrl } from "config";

import Comment from "./Comment";

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      count: 0,
      maxCommentsShowing: 10,
      commentReply: null,
      isSendingComment: false
    }
    this.comments = new Controller_Comments();
    moment.locale("es");
  }

  // /*!
  // =========================================================
  // * para el cambio de url o de video
  // =========================================================
  // */
  //

  lastItem_id = null;

  componentDidMount() {
    this.lastItem_id = this.props.targetId;
    this.switchToComments();
  }

  componentDidUpdate = () => {
    if (this.lastItem_id !== this.props.targetId) {
      //guardamos los comentarios en la db
      this.comments.backupComments(this.lastItem_id);
      //hacemos el cambio de comentarios a mostrar
      this.lastItem_id = this.props.targetId;
      this.switchToComments();
    }
  }

  // /*!
  // =========================================================
  // * ordena los comentarios que nos llegan
  // =========================================================
  // */

  sortComments(array) {
    var aux = array;

    for (let y = 0; y <= array.length - 2; y++) {
      for (let i = 0; i <= array.length - 2; i++) {
        if (parseInt(array[i].post_at) < parseInt(array[i + 1].post_at)) {
          aux = array[i];
          array[i] = array[i + 1];
          array[i + 1] = aux;
        }
      }
    }
    return array;
  }
  // /*!
  // =========================================================
  // * ordena los comentarios que nos llegan
  // =========================================================
  // */

  switchToComments = () => {
    if (this.props.targetId !== undefined) {
      if (this.props.comments[this.props.targetId] === undefined) {

        this.comments.loadComments(this.props.targetId, () => {
          this.setState({ maxCommentsShowing: 10 });
          if (this.state.collapse1) {
            this.props.subscribeToAutoRefresher("comments?" + this.props.targetId + "?" + this.props.comments[this.props.targetId].lastUpdate, "HIGH_PRIORITY", this.updateGui);
          } else {
            this.props.subscribeToAutoRefresher("comments?" + this.props.targetId + "?" + this.props.comments[this.props.targetId].lastUpdate, "MEDIUM_PRIORITY", this.updateGui);
          }
        });

      } else {

        if (this.state.collapse1) {
          this.props.subscribeToAutoRefresher("comments?" + this.props.targetId + "?" + this.props.comments[this.props.targetId].lastUpdate, "HIGH_PRIORITY", this.updateGui);
        } else {
          this.props.subscribeToAutoRefresher("comments?" + this.props.targetId + "?" + this.props.comments[this.props.targetId].lastUpdate, "MEDIUM_PRIORITY", this.updateGui);
        }
      }
    }
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  updateGui = () => {
    //console.log("forceUpdate de comments");
    this.setState({ commentReply: null });
  }

  /*!
  =========================================================
  * accion al presionar el boton de enviar comentario
  =========================================================
  */

  commentBoxChangedHandler = e => {

    e.preventDefault();
    var letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGJHIJKLMNOPQRSTUVWXYZáéíóúÁÉÍÓÚ ¿?,.!¡;:+=-@#$%&*()_1234567890";

    const str = e.target.value;
    var aux = e.target.selectionStart;
    var newStr = "";

    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);

      if (letras.indexOf(String.fromCharCode(charCode)) !== -1) {
        newStr = newStr + String.fromCharCode(charCode);
      }
    }

    e.target.value = newStr;
    e.target.selectionStart = aux;
    e.target.selectionEnd = aux;

    //validamos la longitud del texto 
    let lenght = e.target.value.trim().length;
    if (lenght < 4) {
      e.target.setCustomValidity("Alarga el texto a 8 o mas carácteres (actualmente, usas " + lenght + " caracteres)");
    } else {

      e.target.setCustomValidity("");
    }
    if (charCode === 10)
      document.getElementById("buttom-submit").click()
  }


  handleSubmitComment = e => {
    e.preventDefault();
    const content = document.getElementById("comment-box").value;

    this.setState({ isSendingComment: true });

    let reply_id = null;
    if (this.state.commentReply !== null) {
      reply_id = this.state.commentReply.comment_id;
    }

    this.comments.postComment(this.props.targetId, content, reply_id, () => {
      this.setState({ isSendingComment: false });
      document.getElementById("comment-box").value = "";
      this.setState({ commentReply: null });
    }, () => {
      this.setState({ isSendingComment: false });
    });
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  handleClickOpenComments = (e, ) => {
    this.setState({ commentReply: null });

    if (this.props.comments[this.props.targetId] !== undefined) {
      if (this.state.collapse1) {
        this.setState({ collapse1: false, maxCommentsShowing: 15 });
        this.props.subscribeToAutoRefresher("comments?" + this.props.targetId + "?" + this.props.comments[this.props.targetId].lastUpdate, "MEDIUM_PRIORITY", this.updateGui);

      } else {
        this.setState({ collapse1: true });
        this.props.subscribeToAutoRefresher("comments?" + this.props.targetId + "?" + this.props.comments[this.props.targetId].lastUpdate, "HIGH_PRIORITY", this.updateGui);
      }
    }
  }
  
  /*!
  =========================================================
  * 
  =========================================================
  */

  handleClickReplyComments = (e, comment) => {
    this.setState({ commentReply: comment });
    document.getElementById("comment-box").focus();
  }

  /*!
  =========================================================
  * metodo render :D
  =========================================================
  */

  render() {
    //que si no se han cargado ahún

    let pic_url;
    //console.log(this.props.userData);

    if (this.props.userData.blob_pic_url !== undefined && this.props.userData.blob_pic_url !== null) {
      pic_url = this.props.userData.blob_pic_url;

    } else {

      if (this.props.userData.pic_url !== null) {
        pic_url = serverUrl + this.props.userData.pic_url

      } else {

        pic_url = require("_shared/static/noPic.jpg")
      }
    }

    return (
      <>
        <Card className="p-0 mt-3">

          <div className="py-0  rounded">
            <NavLink id="navbar_global"
              className="p-0 "
              data-toggle="collapse"
              aria-expanded={this.state.collapse1}
              onClick={e => {e.preventDefault();this.handleClickOpenComments(e)}}
            >
              <div className="rounded p-2 pl-3 mt-1 mb-2 text-center">
                <label className="mb-0 h4 text-primary" style={{ cursor: "pointer" }}>Comentarios: {
                  //que si no se han seleccionado ahún
                  this.props.targetId !== null ?
                    //que si no se han cargado ahún
                    this.props.comments[this.props.targetId] !== undefined ?
                      "(" + this.props.comments[this.props.targetId].data.length + " en total)"
                      :
                      <div className="mx-auto lds-dual-ring-sm pt-0 mr-3" />
                    :
                    null
                }</label>
                {this.state.collapse1 ?
                  <i className="ml-2 fa fa-chevron-up text-primary" style={{ cursor: "pointer" }} />
                  :
                  <i className="ml-2 fa fa-chevron-down text-primary" style={{ cursor: "pointer" }} />
                }
              </div>
            </NavLink>
          </div>

          <Collapse isOpen={this.state.collapse1} className="px-sm-3">


            {/* Si es que se ha iniciado session */}
            {this.props.isBeenLoadedMainData ?

              <>
                {/* comentario que se está respondiendo */}
                <Collapse isOpen={this.state.commentReply !== null} >

                  <div className="py-0 px-2">
                    {this.state.commentReply !== null ?
                      <>
                        <small className="h6 font-weight-400 text-muted mt-0"><i className="fa fa-reply ml-2 mr-1"></i> respondiendo al comentario de {this.state.commentReply.name.split(" ")[0]}:</small>
                        <div className="media align-items-center">

                          <div className="media-body">

                            <div className="media align-items-center mb-0 bg-muted rounded py-1 m-0" style={{ borderLeft: "solid 4px " }}>

                              <div className="ml-2">
                                {this.state.commentReply.pic_url !== null ?
                                  <img className="avatar avatar-md rounded-circle mr-3" src={serverUrl + this.state.commentReply.pic_url} alt={this.props.userData.name} />
                                  :
                                  <img alt={this.props.userData.name} className="avatar avatar-md rounded-circle mr-3" src={require("_shared/static/noPic.jpg")} />
                                }
                              </div>

                              <img className="avatar-flag" src={flagsUrl + this.state.commentReply.flag + ".png"} alt={this.state.commentReply.flag} />
                              <div className="media-body">
                                {this.state.commentReply.user_id === this.props.userData.id ?
                                  <><small className="h6 font-weight-400 text-muted mt-0">Tú - {moment(this.state.commentReply.post_at, "UNIX").fromNow()}</small><br /></>
                                  :
                                  <><small className="h6 font-weight-400 text-muted mt-0">{this.state.commentReply.name} - {moment(this.state.commentReply.post_at, "UNIX").fromNow()}</small><br /></>
                                }
                                {this.state.commentReply.content.lenght < 100 ?
                                  <p className="h4 font-weight-500 mt-0">{this.state.commentReply.content}</p>
                                  :
                                  <p className="h4 font-weight-500 mt-0">{this.state.commentReply.content.substring(0, 100)}...</p>
                                }
                              </div>
                            </div>

                          </div>
                          <div>
                            <Button
                              className="btn-icon-only rounded-circle btn-neutral  mr-1 ml-2"
                              onClick={e => {
                                this.setState({ commentReply: null });

                              }}
                            >
                              <i className="fa fa-times" />
                            </Button>
                          </div>
                        </div>
                      </>
                      :
                      <div style={{ height: "100px" }} />
                    }
                  </div>
                </Collapse>



                {/* caja de comentarios  */}

                <div className="pt-3 pb-4 px-2">
                  <div className="media align-items-center">
                    <div className="d-none d-sm-block ">
                      <div className="media align-items-center">
                        <img alt={this.props.userData.user_name} className="avatar avatar-md rounded-circle mr-2" src={pic_url} />
                      </div>
                    </div>

                    <div className="media-body ml-1 ml-sm-0">
                      <form id="form-comments" onSubmit={this.handleSubmitComment}>
                        <textarea name="content"
                          minLength={4}
                          onChange={this.commentBoxChangedHandler}
                          id="comment-box"
                          defaultValue=""
                          disabled={this.state.isSendingComment}
                          required
                          className="form-control"
                          placeholder={this.state.commentReply === null ? "Escribe aquí tu comentario o pregunta" : "Escribe aquí tu respuesta al comentario de arriba"}
                          resize="none"
                          rows="2"
                        ></textarea>
                        <button id="buttom-submit" className="d-none" type="submit"></button>
                      </form>

                    </div>
                    <div >
                      <Button
                        className="btn-icon-only text-center rounded-circle mr-1 ml-2"
                        color="primary"
                        target="_blank"
                        onClick={e => {
                          if (!this.state.isSendingComment) {
                            document.getElementById("buttom-submit").click()
                          }
                        }}
                      >
                        {this.state.isSendingComment ?
                          <div className="mx-auto lds-dual-ring-sm-w pt-0 mr-3" style={{ width: "auto" }} />
                          :
                          <i className="fa fa-paper-plane" />
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              </>
              :

              // if que no se inició session se muestra esto:
              <div className="pt-3 pb-4 px-2">
                <Row>
                  <Col xs="" className="mb-2">
                    <div>
                      <p className="mb-0">Inicia sesión para comentar aquí...</p>
                      <small>no te llevará más de 2 minutos   : )</small>
                    </div>
                  </Col>
                  <Col xs="auto" className="m-auto">
                    <Button
                      className="btn btn-sm text-center ml-2"
                      color="info"
                      onClick={e => {
                        if (this.props.registerClickHandler !== undefined) {
                          this.props.registerClickHandler();
                        } else {
                          alert("acción no implementada");
                        }
                      }}
                    >
                      registrarme
                    </Button>

                    <Button
                      className="btn btn-sm text-center"
                      color="primary"
                      onClick={e => {
                        if (this.props.loginClickHandler !== undefined) {
                          this.props.loginClickHandler();
                        } else {
                          alert("acción no implementada");
                        }
                      }}
                    >
                      inicar sesión
                    </Button>
                  </Col>
                </Row>
              </div>

            }

            {/* commentarios  */}



            <div className=" comments-box">
              {//que si no se ha seleccionado ahún
                this.props.targetId !== null ?
                  //que si no se han cargado ahún
                  this.props.comments[this.props.targetId] !== undefined ?
                    //que si no se tiene comentarios
                    this.props.comments[this.props.targetId].data.length !== 0 ?
                      this.sortComments(this.props.comments[this.props.targetId].data).slice(0, this.state.maxCommentsShowing).map(comment =>
                        <Comment
                          key={comment.comment_id}
                          comment={comment}
                          comment2={comment.reply_id !== "null" && comment.reply_id !== null ? this.props.comments[this.props.targetId].data.find(elem => {
                            return elem.comment_id === comment.reply_id
                          }) : null}
                          handleClickReplyComments={this.handleClickReplyComments}
                        />
                      )
                      :
                      <div className="text-center">
                        <p>Sin comentarios</p>
                      </div>
                    :
                    <div className="text-center">
                      <p>Cargando...</p>
                    </div>
                  :
                  <div className="text-center">
                    <p>No se ha seleccionado ningún video</p>
                  </div>
              }
            </div>






            {this.props.comments[this.props.targetId] !== undefined ?
              //que si no se tiene comentarios
              this.props.comments[this.props.targetId].data.length !== 0 ?
                this.props.comments[this.props.targetId].data.length > this.state.maxCommentsShowing ?

                  <CardFooter className="py-0  rounded">
                    <NavLink
                      onClick={e => this.setState({ maxCommentsShowing: this.state.maxCommentsShowing + 15 })}
                    >
                      <div className="rounded p-2 pl-3 mt-1 mb-2 text-center">
                        <label className="mb-0 h4 text-primary" style={{ cursor: "pointer" }}>Mostrar más... </label>
                      </div>
                    </NavLink>
                  </CardFooter>
                  :
                  null
                :
                null
              :
              null
            }
          </Collapse>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isBeenLoadedMainData: state.app.isBeenLoadedMainData,
  comments: state.comments,
  userData: state.userData,
})

const mapDispatchToProps = dispatch => ({
  subscribeToAutoRefresher: (name, priority, mycallback) => dispatch(subscribeToAutoRefresher(name, priority, mycallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments);