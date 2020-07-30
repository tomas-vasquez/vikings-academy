import React from "react";
import { connect } from "react-redux";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import SidebarCourse from "components/Sidebar/SidebarCourse";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";

import routes from "routes";

import Controller_Academy from "_controllers/Academy";
import logo from "assets/img/vikings-logo.png";
import DB from "helpers/db";
import Course from "views/Course";

var ps;

class CourseLayouth extends React.Component {
  nextItem = null;
  currentItem = null;
  proviusItem = null;
  itemIndex = 0;

  ////
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
    };
    this.academy = new Controller_Academy();
    this.db = new DB();
  }
  componentDidMount() {
    let course_title = document.baseURI.split("/")[3];
    // //cargamos los datos principales

    if (this.props.academy.courses[0] === undefined) {
      this.academy.loadCourses(() => {
        if (this.props.academy.items[course_title] === undefined) {
          this.academy.loadItems(course_title, () => {
            this.forceUpdate();
          });
        }
      });
    } else {
      if (this.props.academy.items[course_title] === undefined) {
        this.academy.loadItems(course_title, () => {
          this.forceUpdate();
        });
      }
    }

    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getCurrent = (items) => {
    let course_title = document.baseURI.split("/")[3];
    let item_title = document.baseURI.split("/")[4];

    let targetItem = null;

    if (item_title !== undefined) {
      targetItem = item_title;
      this.db.set("lasvideo>" + course_title, item_title);
    } else {
      let indb = this.db.get("lasvideo>" + course_title);
      if (indb === undefined) {
        targetItem = items[0].item_title;
        this.db.set("lasvideo>" + course_title, targetItem);
      } else {
        targetItem = indb;
      }
    }
    return targetItem.replace(/_/g, " ");
  };
  render() {
    this.currentItem = null;
    let course_title = document.baseURI.split("/")[3];
    let items = this.props.academy.items[course_title];
    let author = null;
    let description = "";
    //calculamos el currentItem
    if (items !== undefined) {
      items.forEach((item, key) => {
        if (item.item_title === this.getCurrent(items)) {
          this.proviusItem = items[key - 1];
          this.currentItem = item;
          this.itemIndex = key + 1;
          this.nextItem = items[key + 1];
          author = this.props.academy.authors.find((author) => {
            return author.user_id === item.item_author_id;
          });
        }
      });

      description = this.props.academy.descriptions[
        this.currentItem.item_content_url
      ];
      if (description === undefined) {
        this.academy.loadDescription(this.currentItem.item_content_url, ()=>{
          this.forceUpdate();
        })
      }
    }

    // console.log("this.proviusItem", this.proviusItem);
    // console.log("this.currentItem", this.currentItem);
    // console.log("this.nextItem", this.nextItem);

    return (
      <>
        <div className="wrapper">
          <SidebarCourse
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "/",
              text: "Vikings Academy",
              imgSrc: logo,
            }}
            items={items}
            course_title={course_title}
            currentItem={this.currentItem}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <>
              <AdminNavbar
                {...this.props}
                brandText={course_title}
                toggleSidebar={this.toggleSidebar}
                sidebarOpened={this.state.sidebarOpened}
              />
              {this.currentItem !== null ? (
                <Course
                  course={course_title}
                  description={description}
                  author={author}
                  itemIndex={this.itemIndex}
                  proviusItem={this.proviusItem}
                  currentItem={this.currentItem}
                  nextItem={this.nextItem}
                />
              ) : null}

              <Footer fluid />
            </>
          </div>
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy,
});

export default connect(mapStateToProps)(CourseLayouth);
