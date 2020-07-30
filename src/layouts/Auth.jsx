import React from "react";
import {connect } from "react-redux"
import { Route, Switch } from "react-router-dom";


// core components
import AdminNavbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footer/Footer";

import {myRoutes} from "config";

import { Row, Container, Col } from "reactstrap";
import { replace } from "connected-react-router";
import routes from "routes";


class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
    };
  }

  successHandler = () => {
    this.props.replace(myRoutes.home);
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "auth") {
        return (
          <Route
            path={ prop.path}
            render={() => {
              return <prop.component successCallback={this.successHandler} />;
            }}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Vikings Academy";
  };
  render() {
    return (
      <>
        <div className="wrapper">
          <div
            className="main-panel d-flex content-align-center"
            ref="mainPanel"
            data={this.state.backgroundColor}
            style={{ minHeight: 600, height: window.innerHeight }}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

            <Container className="my-auto ">
              <Row className="justify-content-center">
                <Col md="9">
                  <Switch>
                    {this.getRoutes(routes)}
                    {/* <Redirect from="*" to="/admin/dashboard" /> */}
                  </Switch>
                </Col>
              </Row>
              <div className="fixed-bottom">
                <Footer fluid />
              </div>
            </Container>
          </div>
        </div>
      
      </>
    );
  }
}

const mapDispachToProps = dispatch => ({
  replace: (newLocation) => { return dispatch(replace(newLocation)) }
})

export default connect(null, mapDispachToProps)(Auth);
