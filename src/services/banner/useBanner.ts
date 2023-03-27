import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
const headers = { 
   'Content-Type': 'text/html; charset=UTF-8',     
   
};

interface Banner {
   titulo: String;
   link: String;
   href: String;
   ordem: Number; 
}


export default function useBanner ()  {
   const [banner, setBanner] = useState<Banner[]>([]);
 
   function getBanner (limit: Number) {
      const virtual_limit =   limit; 

      axios({
         url: Config.API_URL + `banner/controllers/getBanners.php?limit=${virtual_limit}`,
         method: "GET", 
         headers: headers


     }).then((response) => {
      setBanner(response.data);

      
     }).catch((error) => {
      console.log(error);
     })  
   
   }
 

   return {  
      banner,
      getBanner
   }
}

 
 