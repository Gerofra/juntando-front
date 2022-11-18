import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUser(id) {
    return axios.get(API_URL + id, 
      {headers: (authHeader())}
    );
  }

  updateUser(id, username, name, lastname, email, birthday, description, country, phone, password) {
    return axios.put(API_URL + 'update/' + id, 
      {id, username, name, lastname, email, birthday, description, country, phone, password},
      {headers: (authHeader())}
    );
  }


  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();