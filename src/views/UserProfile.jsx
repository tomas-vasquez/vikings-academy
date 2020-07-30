
import React from "react";

// reactstrap components
import {

  Row,
  Col
} from "reactstrap";

import FormDataUser from "components/formDataUser"; 
import CardAvatar from "components/CardAvatar";


class UserProfile extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
            <FormDataUser/>
            </Col>
            <Col md="4">
              <CardAvatar />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
