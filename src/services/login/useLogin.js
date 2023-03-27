 
import axios from "axios"
import Config from '../../util/Config'
import jwt_decode from "jwt-decode";
 


const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': Config.API_KEY, 
    'Accept': 'application/json'
 };
 
 

class UsuarioService{ 
    


    async login(data){
        return axios({
            url: Config.API_URL + `auth`,
            method: "POST", 
            data: data,
            headers: headers
        }).then((response) => {
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('refleshToken', response.data.refleshToken);


            var decoded = jwt_decode(response.data.token); 
 

            window.localStorage.setItem('userid', decoded.usu_id); 
            window.localStorage.setItem('username', decoded.usu_email); 
          
            console.log(response.data)  
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

 
}

const user = new UsuarioService()

export default user