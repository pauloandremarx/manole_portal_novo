 import axios from "axios"
import Config from '../../util/Config'

const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': Config.API_KEY, 
    'Accept': 'application/json'
 };
 
  

class LogsService{   

    async postLogs(data){ 
     
        return axios({
            url: Config.API_URL + `auth/logs`, 
            method: "POST",
            mode: 'no-cors',
            data: data,
            headers: headers
        }).then((response) => {  
            console.log( "Logs cadastrado com sucesso!" ); 
            return response
           
        }).catch((error) => {  
            console.log(error);
            
        }) 
    }
 
    
    async getLogs(user, qtd){
        return axios({
            url: Config.API_URL + `auth/logs?filter=&usu_id=${user}&qtde=${qtd}`,
            method: "GET",
            mode: 'no-cors',
            headers: headers
        } ).then( ( response ) => {   
            console.log(response.data)
            return response.data;   
        }).catch((error) => {  
            return error;
        })
    } 

 
}

const cadastro = new LogsService()

export default cadastro