

 
import { Suspense } from "react"; 
import Layoutv2 from '@/components/Manole/Layoutv2'

import BannerBemvindo from '@/components/Manole/bannerBemvindo'
import HeaderMeusCursos from '@/components/Manole/HeaderMeusCursos'
import Config from '@/util/Config'
 

import HeaderEventos from '@/components/Manole/HeaderEventos'

 import { cookies } from 'next/headers';
import styles from './painel.module.css';
import HeaderMinicursos from '@/components/Manole/HeaderMiniCursos'
 
 
 
async function getAllMinicursos() {
  const res = await fetch( Config.API_URL + 'aulas-gratuitas/minicurso/?filtro=&currentPage=1&perPage=99', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',   
          'Authorization': Config.API_KEY,
        }, 
    } );

  if (!res.ok) {
   
    throw new Error('Minicursos Failed to fetch data');
  }

  return res.json();
}

async function getAllLogs(user, qtd) {
  const res = await fetch( Config.API_URL + `auth/logs?filter=&usu_id=${user}&qtde=${qtd}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',   
          'Authorization': Config.API_KEY,
        }, 
    } );

  if (!res.ok) {
   
    throw new Error('Logs Failed to fetch data');
  }

  return res.json();
}


async function getAllWebinares() {
  const res = await fetch( Config.API_URL + `webinar`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',   
          'Authorization': Config.API_KEY,
        }, 
    } );

  if (!res.ok) {
   
    throw new Error('Webinares Failed to fetch data');
  }

  return res.json();
}


export default async function Painel() {
  const cookieStore = cookies();
  const userid = cookieStore.get('userid');

  function getDifference(array1, array2) {
  return array1.filter(object1 => {
    return array2.some(object2 => {
      return object1.curso_id == object2.conteudo_acessado;
    });
  });
} 
  
  const Allminicursos = await getAllMinicursos();
  const meuslogs = await getAllLogs( 508568, 5 ); 
  const webinares = await getAllWebinares();
  
  return (
    <Layoutv2>
      <BannerBemvindo /> 
      
   
     
      <section className={` uk-margin-large-top ${styles.container_painel}`} >
        
        <Suspense fallback={<p>Loading feed...</p>}>

            <HeaderMeusCursos title={ `Cursos acessados recentemente` } type={ `full` } data={getDifference(Allminicursos.data, meuslogs)} />

        </Suspense>

         <Suspense fallback={<p>Loading feed...</p>}>

              <HeaderMinicursos title={ `Minicursos:` } subtitle={ `Aprenda de forma rápida e eficiente` } type={ `mini` } data={Allminicursos.data.slice(0, 10)} /> 
          </Suspense>
        </section>
 
   

    <div className={`${styles.widht_100Over}`}>        
            <section className={` uk-margin-large-top ${styles.container_painel_enventos}`} >

            
                  <Suspense fallback={<p>Loading feed...</p>}>
          <HeaderEventos title={ `Próximos eventos` } data={webinares} />
                
</Suspense>
            </section>
            </div>
         
    </Layoutv2>
  );
}


 
