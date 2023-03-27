
import Layout from '@/components/Manole/Layout'; 
import Newsletter from '@/components/Manole/Newsletter'
import Config from '@/util/Config' 
import ContainerMinicursos from '@/components/Manole/ContainerMinicursos'

 async function getMinicursos() {
  const res = await fetch( Config.API_URL + 'aulas-gratuitas/minicurso/?filtro=&currentPage=1&perPage=99', {
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

 
export default async function Minicursos() {
  
   const minicursos = await getMinicursos()

  return (
    <Layout>  
        <ContainerMinicursos minicursos={minicursos.data} />
        <Newsletter /> 

       
    </Layout>  
)}
 
 
