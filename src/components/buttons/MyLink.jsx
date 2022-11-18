import buttomStyle from "./buttonStyle.css";

function MyLink(props) {
  return <div className={'button ' + props.type}>
    
        {props.icon}
        {props.content}
        
    </div>;
}

export default MyLink;
