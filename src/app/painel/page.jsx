'use client'
import {useSession, signOut} from "next-auth/react";
import { redirect } from "next/navigation";

import Layoutv2 from "@/components/Manole/Layoutv2";
import BannerBenvindo from "@/components/Manole/bannerBemvindo";
import HeaderMeusCursos from "@/components/Manole/HeaderMeusCursos";
import HeaderMinicursos from "@/components/Manole/HeaderMiniCursos";
import HeaderEventos from "@/components/Manole/HeaderEventos";


import styles from "./painel.module.css";


export default function Painel() {

  const { data: session, status } = useSession();

  return (

          <Layoutv2>
            <BannerBenvindo />

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


    );

}
