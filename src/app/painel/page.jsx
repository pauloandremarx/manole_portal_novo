'use client' 


import Layoutv2 from "@/components/Manole/Layoutv2";

import BannerBemvindo from "@/components/Manole/bannerBemvindo";

import HeaderMeusCursos from "@/components/Manole/HeaderMeusCursos"; 
import HeaderMinicursos from "@/components/Manole/HeaderMiniCursos";
import HeaderEventos from "@/components/Manole/HeaderEventos";

 
import styles from "./painel.module.css";

import { getLocalStorage } from '@/util/Helpers'
import { useRouter } from 'next/navigation'

export default function Painel() {
  const router = useRouter();
  if (getLocalStorage('username') == null) {

    router.push('/login');
  }

  return (
    <>
      
      <Layoutv2>
    
        <BannerBemvindo />

        <section className={` uk-margin-large-top ${styles.container_painel}`}>
          <HeaderMeusCursos
            title={`Cursos acessados recentemente`}
            type={`full`}
            page={"painel"}
          />

          <HeaderMinicursos
            title={`Minicursos:`}
            subtitle={`Aprenda de forma rápida e eficiente`}
            type={`mini`}
            page={"painel"}
          />


          <HeaderEventos title={`Próximos eventos`} type={`mini`} page={"painel"} />
        
        </section>
       
    </Layoutv2>
      </>

    );
  
}
