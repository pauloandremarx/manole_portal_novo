 
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react"
 
const headers = { 
   'Content-Type': 'application/json',      
   'Authorization': Config.API_KEY, 
};
 


export default function useWebinares ()  { 

   const [webinares, setWebinares] = useState([]);  
 
   function getWebinares() {  
      axios({
         url: Config.API_URL + `webinar`,
         method: "GET", 
         headers: headers

      }).then((response) => { 
         setWebinares(response.data);  
          console.log( "------------webinares response---------------------" );
          console.log(response.data);
         
     }).catch((error) => {
     
      console.log(error);
     }) 
 
   } 

   return { 
      webinares, 
      getWebinares,  
   }
}

 
 