import React, { Component } from "react";
import { withRouter } from "react-router-dom";


const parseJwt = (token) => {
  try{
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component {
  constructor(props) {
    super(props);
    props.history.listen(() => {
      const jwt = JSON.parse(sessionStorage.getItem("jwt"));
      if (jwt) {
        const decodedJwt = parseJwt(jwt.token);
        if (decodedJwt.exp * 1000 < Date.now()){
          props.logOut();
        }
      }
    })
  }

  render(){
    return <div></div>;
  }
}

export default withRouter(AuthVerify);