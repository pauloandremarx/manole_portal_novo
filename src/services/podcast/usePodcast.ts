 
import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
const headers = { 
   'Content-Type': 'application/json',     
   'Authorization': Config.API_KEY, 
};

interface Podcast {
   id_canal: Number;
   titulo: String;
   descricao: String;
   imgUrl: String;

   playlist: String;

   episodios: String;

}


export default function usePodcast ()  {
   const [podcast, setPodcast] = useState<Podcast[]>([]);
 
 
   function getPodcast () {
       
 
      axios({
         url: Config.API_URL + `podcast/list`,
         method: "GET", 
         headers: headers

         
     }).then((response) => {
      setPodcast(response.data);
      console.log(response.data)

     }).catch((error) => {
      console.log(error);
     }) 

   }

 
 

   return {  
      podcast,
      getPodcast

   }
}

 
 