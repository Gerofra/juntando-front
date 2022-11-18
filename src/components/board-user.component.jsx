import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";



function BoardUser() {

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      getProfile(user.id);
    }
  }, []);


  const getProfile = async (e) => {
    try {   
      const res = await UserService.getUser(e);

      if (!res.data.error) {
        setProfile(res.data)
        setId(res.data.id)
      }
    } catch (error) {
      console.log(res.data.error)
    }
  };

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const newProfileData = {
    id,
    username,
    name,
    lastname,
    email,
    birthday,
    description,
    country,
    phone,
    password
  };


  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await UserService.updateUser(
        id,
        username,
        name,
        lastname,
        email,
        birthday,
        description,
        country,
        phone,
        password);

      if (!res.data.error) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(res.data.error)
    }
  };

  return (
      <form onSubmit={updateProfile}>
        <div className="board__container">

          <div className="editable__container">                     
            <input className="editable__text"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder={profile.username ? profile.username : 'sin definir'}/>
            <span className="editable__desc">Usuario</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={profile.name ? profile.name : 'sin definir'}/>
            <span className="editable__desc">Nombre</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="text"
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              placeholder={profile.lastname ? profile.lastname : 'sin definir'}/>
            <span className="editable__desc">Apellido</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder={profile.email ? profile.email : 'sin definir'}/>
            <span className="editable__desc">E-mail</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
                max="2010-12-1"
                type="date"
                name="birthday"
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                placeholder={profile.birthday? profile.birthday : 'sin definir'}/>            
            <span className="editable__desc">Fecha de nacimiento</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder={profile.description? profile.description : 'sin definir'}/>              
            <span className="editable__desc">Descripción de usuario</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="text"
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder={profile.country? profile.country : 'sin definir'}/>  
            <span className="editable__desc">País de residencia</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="text"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder={profile.phone? profile.phone : 'sin definir'}/>  
            <span className="editable__desc">Número de teléfono</span>
          </div>

          <div className="editable__container">
            <input className="editable__text"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="*******"/>  
            <span className="editable__desc">Contraseña</span>
          </div>

      </div>

<button type="submit">enviar</button>
    </form>
  );
}

export default BoardUser;
