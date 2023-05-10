 

 
import Layout from '@/components/Manole/Layout'; 
import Newsletter from '@/components/Manole/Newsletter'
import Config from '@/util/Config' 
import ContainerAulasGratuitas from '@/components/Manole/ContainerAulasGratuitas'
import styles from './aulasgratuitas.module.css';

 
 async function getAulas() {
  const res = await fetch( Config.API_URL + 'aulas-gratuitas/aulas/?filtro=&perPage=300&currentPage=1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',   
           'Authorization': Config.API_KEY,
        }, 
    } );

  if (!res.ok) {
   
    throw new Error('Failed to fetch data');
  }

  return res.json();
 }

export default async function  AulasGratuitas() {   

  const aulas = await getAulas()

  return (
    <Layout>  
      <ContainerAulasGratuitas aulas={aulas.data} />
      <Newsletter />  
</Layout>  
)}
 