import React from "react";

// reactstrap components
import { Button } from "reactstrap";

class SocialButtons extends React.Component {
  render() {
    return (
      <>
        <Button
          className="btn-icon btn-round mb-2 mx-1"
          color="primary"
          href={"mailto:" + this.props.data.email}
          target="_blank"
        >
          <i className="fa fa-envelope" />
        </Button>
        {this.props.data.whatsapp_number ? (
          <Button
            className="btn-icon btn-round mb-2 mx-1"
            color="default"
            href={
              "https://api.whatsapp.com/send?phone=" +
              this.props.data.area_code +
              this.props.data.whatsapp_number
            }
            target="_blank"
          >
            <i className="fab fa-whatsapp" style={{ padding: 12 }} />
          </Button>
        ) : null}
        {this.props.data.link_facebook ? (
          <Button
            className="btn-icon btn-round"
            href={this.props.data.link_facebook}
            color="facebook"
          >
            <i className="fab fa-facebook" style={{ padding: 12 }} />
          </Button>
        ) : null}
        {this.props.data.link_twitter ? (
          <Button
            className="btn-icon btn-round btn-twitter mb-2 mx-1"
            href={this.props.data.link_twitter}
            target="_blank"
          >
            <i className="fab fa-twitter" style={{ padding: 12 }} />
          </Button>
        ) : null}
        {this.props.data.link_instagram ? (
          <Button
            className="btn-icon btn-round btn-instagram mb-2 mx-1"
            href={this.props.data.link_instagram}
            target="_blank"
          >
            <i className="fab fa-instagram" style={{ padding: 12 }} />
          </Button>
        ) : null}
      </>
    );
  }
}

export default SocialButtons;
