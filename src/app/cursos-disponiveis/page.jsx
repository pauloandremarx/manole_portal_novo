 

 
import Layoutv2 from '@/components/Manole/Layoutv2'

import BannerCursosDisponiveis from '@/components/Manole/bannerCursosDisponiveis'
import HeaderMeusCursos from '@/components/Manole/HeaderMeusCursos'
import HeaderEventos from '@/components/Manole/HeaderEventos'

import styles from './cdisponiveis.module.css';
import Link from 'next/link'
 

 

export default function CursosDisponiveis() {
 

  return (
    <Layoutv2>
      
        <BannerCursosDisponiveis /> 

        <section className={` uk-margin-large-top ${styles.container_painel}`} >

                <HeaderMeusCursos title={`Cursos acessados recentemente`} type={`full`} />

                <HeaderMeusCursos title={`Continue de onde parou`}  type={`full`} />

               <HeaderMeusCursos title={`Minicursos:`}  subtitle={`Aprenda de forma rápida e eficiente`} type={`mini`}/> 
             
        </section>



    <div className={`${styles.widht_100Over}`}>        
            <section className={` uk-margin-large-top ${styles.container_painel_enventos}`} >

            
            
                        <HeaderEventos title={`Próximos eventos`} />
                

            </section>
            </div>
         
    </Layoutv2>
  );
}


 
