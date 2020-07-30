import React from "react";

class Suspense extends React.Component {
  componentDidMount() {
    document.getElementById("wrapper").style.height =
      window.innerHeight - 200 + "px";
    window.onresize = () => {
      document.getElementById("wrapper").style.height =
        window.innerHeight - 200 + "px";
    };
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    return (
      <div>
        <div id="wrapper" className="d-flex align-items-center">
          <div className="mx-auto">
            <div className="mx-auto lds-dual-ring"></div>
            <h2>{this.props.msg}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Suspense;
