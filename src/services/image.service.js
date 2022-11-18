import axios from 'axios';
import authHeader from './auth-header';
import authHeaderMultipart from './auth-header-multipart';
const API_URL = 'http://localhost:8080/api/images/';

class ImageService {


  getPhoto(id) {
    return axios.get(API_URL + id + '/profile', 
        {id}, 
        {headers: (authHeader())}
    );
  }

  uploadPhoto(id, imagefile) {
    return axios.post(API_URL + id,
        {id, imagefile},
        {headers: (authHeaderMultipart())
        }     
    )
  }


    fetchImage = async (id) => {
        try {

          const response = await fetch(API_URL + id +  '/profile');
          const imageBytes = await response.arrayBuffer();
          var blob = new Blob([imageBytes], { type: "image/png" });
          var imageUrl = URL.createObjectURL(blob);
          return imageUrl;

        } catch (error) {
          console.log("ERROR:", error);
        }
    };

      
  
}

export default new ImageService();