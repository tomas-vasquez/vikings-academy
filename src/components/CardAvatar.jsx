import React from "react";

import { connect } from "react-redux";

// reactstrap components
import {
  Card,
  CardBody,
  Input,
  CardText,
  CardFooter,
} from "reactstrap";

import Profile from "_controllers/Profile";
import { flagsUrl, storageUrl } from "config";
import SocialButtons from "./SocialButtons";

class CardAvatar extends React.Component {
  constructor() {
    super();
    this.profile = new Profile();
  }

  handlePicPicker = (e) => {
    const file = e.target.files[0];
    this.profile.handle_pic_selected(file);
  };

  render() {
    let pic_url;

    if (
      this.props.blob_pic_url !== undefined &&
      this.props.blob_pic_url !== null
    ) {
      pic_url = this.props.blob_pic_url;
    } else {
      if (this.props.pic_url !== null ) {
        pic_url = storageUrl + this.props.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
    }

    return (
      <>
        <Card className="card-user">
          <CardBody>
            <CardText />
            <div className="author">
              <div className="block block-one" />
              <div className="block block-two" />
              <div className="block block-three" />
              <div className="block block-four" />
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  className="avatar"
                  style={{ cursor: "pointer" }}
                  onClick={this.profile.handleClickPic}
                  src={pic_url}
                />
                <h5 className="title">
                  {this.props.name}
                  <span>
                    <img src={flagsUrl + this.props.flag + ".png"} alt="" />
                  </span>
                </h5>
              </a>
              <p className="description">{"@" + this.props.user_name}</p>
            </div>
            <div className="card-description text-center">{this.props.description}</div>
          </CardBody>
          <CardFooter>
            <div className="button-container">
              <SocialButtons data={this.props} />
            </div>
          </CardFooter>
        </Card>
        <Input
            className="form-control d-none"
            id="input-pic"
            type="file"
            accept="image/*"
            onChange={this.handlePicPicker}
          />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.userData };
};

export default connect(mapStateToProps)(CardAvatar);
