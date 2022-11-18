import React from "react";
import alertStyles from "./alertStyle.css";

function Alert(props) {
  return (
    <div className={'alert ' + props.alertType}>

      {props.msg}

    </div>
  );
}

export default Alert;
