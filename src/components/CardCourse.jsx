import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardImg,
  Media,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";

import { storageUrl } from "config";
import { Link } from "react-router-dom";
import { myRoutes } from "config";

class CardCourse extends React.Component {
  render() {
    let course = this.props.course;
    let author = this.props.author;
    return (
      <Link replace to={"/" + course.course_short_link}>
        <Card className="shadow" style={{ cursor: "pointer" }}>
          <CardImg
            src={storageUrl + "academy/pics" + course.course_pic_url}
          ></CardImg>
          <CardBody className="p-2">
            {/* {JSON.stringify(author)}s */}
            <CardTitle tag="h4">{course.course_title}</CardTitle>
            <CardText>{course.course_desciption}</CardText>
          </CardBody>
          <CardFooter className="m-0 p-2">
            <Media>
              <Media left>
                <img
                  alt="..."
                  style={{ height: 30, width:30 }}
                  className="avatar rounded-circle m-0"
                  src={storageUrl + author.pic_url}
                />
              </Media>
              <Media body className="pl-2 my-auto">
                <Media heading className="mb-0">
                  {author.name}
                </Media>
              </Media>
              <Media right className="my-auto pr-2">
                <Media heading className="mb-0">
                  <i className="fa fa-user-graduate" />
                </Media>
              </Media>
            </Media>
          </CardFooter>
        </Card>
      </Link>
    );
  }
}

export default CardCourse;
