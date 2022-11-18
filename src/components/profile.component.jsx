import React, { useState, useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import ImageService from "../services/image.service";

import { MdAccountCircle, MdRoom, MdCake} from "react-icons/md";
import boxesStyle from "./styles/boxesStyle.css";
import DragAndDrop from "./dragdrop/DragAndDrop";

function Profile() {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [profile, setProfile] = useState([]);
  const [photo, setPhoto] = useState();



  
  
  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user) 
      getProfile(user.id)
      getPhoto(user.id)
    }

  }, []);


  const [years, setYears] = useState();
  const getProfile = async (e) => {
    try {   
      const res = await UserService.getUser(e);

      setProfile(res.data)
      setYears(new Date(new Date() - new Date(res.data.birthday)).getFullYear() - 1970)   

    } catch (error) {
      console.log(res.data.error)
    }
  };


  const [newPhoto, setNewPhoto] = useState(null);
  const uploadPhoto = async (e) => {
    e.preventDefault();
    try {   
      const res = await ImageService.uploadPhoto(currentUser.id, newPhoto)
      if (!res.data.error) {
        console.log(res.data)
      }
    } catch (error) {
      console.log('error')
    }
  };



  const getPhoto = async (e) => {
    try {   
      const res = await ImageService.fetchImage(e)
      setPhoto(res)

    } catch (error) {
      console.log('No se pudo cargar la imagen.')
    }
  };




  return (

    <div className="full__container">
      {currentUser ? <>

      
      <div className="profile__card">

        <div className="profile__card__photo">
        {photo ?
          <img src={photo} />
           : null }
        </div>

      {profile.name ?
        <div className="profile__card__info">
        
          <div className="profile__card__text">
            <h2>{profile.name + ' ' + profile.lastname} </h2>
            <i>({profile.username})</i>
          </div>

          <div className="profile__card__text">
            <p><MdCake/> {years} años</p>
            <p><MdRoom/> {profile.country}</p>
          </div>

          <div className="profile__card__desc">
            {profile.description}
          </div>   
        </div> : <div className="profile__card__text">Cargando...</div> } 

      </div>


      <div className="profile__card">

        <DragAndDrop/>

      </div>

      


    </> : null}

  </div>
);
  
}

export default Profile;