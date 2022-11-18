import buttomStyle from "./buttonStyle.css";

function Button(props) {
  return <button className={'button ' + props.style} type={props.type} onClick={props.onClick}>
          
        {props.content}
        {props.icon}

    </button>;
}

export default Button;