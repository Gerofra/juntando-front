import React, { useState, useRef } from "react";
import ImageService from "../../services/image.service";
import AuthService from "../../services/auth.service";
import dragDropStyle from "./dragDropStyle.css";
import Alert from "../alert/Alert"

function DragAndDrop() {
  // drag state
  const [dragActive, setDragActive] = useState(false);

  const [newAlert, setAlert] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  // ref
  const inputRef = useRef(null);
  
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setNewPhoto(e.dataTransfer.files[0])
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0])
    }
  };
  
// triggers the input when the button is clicked
    const onButtonClick = () => {
        handlePhoto()

    };


  
  const handlePhoto = async (e) => {
    try { 
        const user = AuthService.getCurrentUser()
        const res = await ImageService.uploadPhoto(user.id, newPhoto)
        if ( res.status === 200) {
            setNewPhoto(null)
            setAlert("Se ha subido correctamente.")
        }
    } catch (error) {
        console.log('No se pudo subir.')
    }
  };
  
  return (
    <>
    {newAlert? newAlert : null}
    <form id="form__file__upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>

      <input ref={inputRef} type="file" id="input-file-upload" 
      multiple={false} 
      onChange={handleChange} 
      name="imagefile"
      accept="image/png, image/jpeg" />

        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
            <div>
                {newPhoto? <>
                <h4>{newPhoto.name}</h4>
                <button className="upload-button" onClick={onButtonClick}>Subir foto</button> </>
                : 
                <h4>Elegir nueva foto</h4>}

            </div> 
        </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
  </>);
};

export default DragAndDrop;