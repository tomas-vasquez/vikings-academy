import React from "react";
// nodejs library that concatenates classes
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  Media,
} from "reactstrap";
import { storageUrl } from "config";
import { myRoutes } from "config";
import Controller_Users from "_controllers/Users";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
    };
    this.user = new Controller_Users();
  }

  handleCloseSessionButtom = (e) => {
    e.preventDefault();
    this.user.logout();
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "",
      });
    } else {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };
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
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch,
    });
  };
  render() {
    // obtenemos la url de nuestra foto de perfil
    let pic_url;

    if (
      this.props.blob_pic_url !== undefined &&
      this.props.blob_pic_url !== null
    ) {
      pic_url = this.props.blob_pic_url;
    } else {
      if (this.props.pic_url !== null) {
        pic_url = storageUrl + this.props.pic_url;
      } else {
        pic_url = require("assets/img/noPic.jpg");
      }
    }
    return (
      <>
        <Navbar
          className={classnames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classnames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened,
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <h1 className="h3 pl-3 mt-3">
                {(
                  this.props.brandText.charAt(0).toUpperCase() +
                  this.props.brandText.slice(1, this.props.brandText.length)
                ).replace(/_/g, " ")}
              </h1>
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
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-sound-wave" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Another one
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav className="pr-3">
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <span>
                        <img
                          alt="..."
                          style={{ height: 30 }}
                          className="avatar avatar-sm rounded-circle"
                          src={pic_url}
                        />
                      </span>
                      <Media className="">
                        <span
                          className={classnames(
                            {
                              "d-none d-sm-block":
                                this.props.loc === myRoutes.academyLevel1 ||
                                this.props.loc === myRoutes.academyLevel2 ||
                                this.props.loc === myRoutes.academyLevel3,
                            },
                            "mb-0 text-md font-weight-bold ml-1"
                          )}
                        >
                          @{this.props.user_name}{" "}
                        </span>
                        <i className="ml-1 fa fa-sort-down"></i>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      tag={Link}
                      replace
                      to={myRoutes.basenameOffice + myRoutes.profile}
                    >
                      <i className="fa fa-user" />
                      <span>Mi perfil</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="#pablo"
                      onClick={this.handleCloseSessionButtom}
                    >
                      <i className="fa fa-sign-out-alt" />
                      <span>Cerrar sesión</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  blob_pic_url: state.userData.blob_pic_url,
  pic_url: state.userData.pic_url,
  user_name: state.userData.user_name,
});

export default connect(mapStateToProps)(AdminNavbar);
