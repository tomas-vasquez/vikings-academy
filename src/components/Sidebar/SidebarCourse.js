import React from "react";
import { NavLink, Link } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    let currentItem = this.props.currentItem;
    return  currentItem.item_title === routeName? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  render() {
    let items = this.props.items;
    let currentItem = this.props.currentItem;
    let course_title = this.props.course_title;
    const { bgColor, logo } = this.props;
    let logoImg = null;
    let logoText = null;

    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <Link
            to="/"
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img
                src={logo.imgSrc}
                alt="vikings-code-logo"
                style={{ borderRadius: 0 }}
              />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.outterLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="vikings-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {items !== undefined&& currentItem !== null
              ? items.map((item, key) => (
                  <li
                    className={
                      this.activeRoute(item.item_title) 
                    }
                    key={key}
                  >
                    <NavLink
                      to={
                        "/"+
                        course_title +
                        "/" +
                        item.item_title.replace(/ /g, "_")
                      }
                      className="nav-link"
                      activeClassName="active"
                      onClick={this.props.toggleSidebar}
                    >
                      <i className="fa fa-book" />
                      <p>{item.item_title}</p>
                    </NavLink>
                  </li>
                ))
              : null}

          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
