import React from "react";

import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Container,
} from "reactstrap";

import Alerts from "helpers/Alerts";
import CardCourse from "components/CardCourse";
import Controller_Academy from "_controllers/Academy";

class AllCourses extends React.Component {
  constructor(props) {
    super();
    this.alerts = new Alerts();
    this.academy = new Controller_Academy();
  }

  componentDidMount() {
    if (this.props.academy.courses[0] === undefined) {
      this.academy.loadCourses(() => {
          this.forceUpdate();
      });
    }
  }



  render() {
    var courses = this.props.academy.courses
    // console.log(this.props.academy);
    if (courses[0] !== undefined) {
      return (
        <>
          <div className="content">
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h3">
                      Todos los cursos...
                      <i className="fa fa-fire text-danger" />
                      <i className="fa fa-fire text-danger" />
                      <i className="fa fa-fire text-danger" />
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Container fluid>
                      <Row>
                        {courses.map((_course, key) => (
                          <Col key={key} xs="12" sm="6" xl="4">
                            <CardCourse course={_course} author={
                              this.props.academy.authors.find(author =>{
                                return author.user_id === _course.course_author_id;
                              })
                            } />
                          </Col>
                        ))}
                        {/* {this.renderCourses(courses[0])} */}
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    } else {
      return (
        <div className="content">{/* <SSuspense msg="cargando..." /> */}</div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  academy: state.academy
});

export default connect(mapStateToProps)(AllCourses);
