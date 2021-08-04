import React from "react";
import { Link } from "react-router-dom";

class Registered extends React.Component {
  render() {
    return (
      <div>
        <h3>Registration Sucess..!</h3>
        <Link to="/" style={{ textAlign: "right" }}>
          Log in
        </Link>
      </div>
    );
  }
}
export default Registered;
