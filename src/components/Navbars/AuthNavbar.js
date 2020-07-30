import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { myRoutes } from "config";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
    };
  }
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent",
      });
    } else {
      this.setState({
        color: "",
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };


  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div className={"navbar-toggle d-inline"}>
                <div className="logo-img">
                  <img
                    src={require("assets/img/vikings-logo.png")}
                    alt="vikings-code-logo"
                    style={{ borderRadius: 0, display:"block" }}
                  />
                </div>
              </div>
              <NavbarBrand className="d-block" href="#pablo" onClick={(e) => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to={myRoutes.register}
                    tag={Link}
                  >
                    <i className="fa fa-user mr-2" />
                    <span className="nav-link-inner--text">Registrarme</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to={myRoutes.login}
                    tag={Link}
                  >
                    <i className="fa fa-key mr-2" />
                    <span className="nav-link-inner--text">Iniciar Sesión</span>
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to={myroutes.home}
                    tag={Link}
                  >
                    <i className="fa fa-laptop" />
                    <span className="nav-link-inner--text">Oficina virtual</span>
                  </NavLink>
                </NavItem> */}

              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
