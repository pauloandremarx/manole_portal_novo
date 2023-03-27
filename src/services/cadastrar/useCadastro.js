 import axios from "axios"
import Config from '../../util/Config'

const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': Config.API_KEY, 
    'Accept': 'application/json'
 };
 
  

class CadastroService{  

    async cadastroMiniCursos(data){ 
     
        return axios({
            url: Config.API_URL + `aulas-gratuitas/minicurso/`, 
            method: "POST",
            mode: 'no-cors',
            data: data,
            headers: headers
        }).then((response) => { 
             
            console.log(response);
            
           
        }).catch((error) => {  
            console.log(error);
            console.log('deu errado dentro');
        }) 
    }



    
    async cadastroAulasGratuitas(data){
        return axios({
            url: Config.API_URL + `aulas-gratuitas/aulaGratuita/?filtro=${data.email}`, 
            method: "GET", 
            headers: headers
        }).then((response) => { 
  
            if(response.data.usu_email){
                console.log("Usuario encontrado!");
                return 200; 
            }else{
                console.log("Usuario não encontrado!");

                return axios({
                    url: Config.API_URL + `aulas-gratuitas/aulaGratuita/createUser`, 
                    method: "POST", 
                    data: data,
                    headers: headers
                }).then((response) => { 
                    console.log('Usuário Cadastrado')
                }).catch((error) => {
                    return Promise.reject(error)
                })
            }
           
        }).catch(() => {  
        
        })
    } 

 
}

const cadastro = new CadastroService()

export default cadastro