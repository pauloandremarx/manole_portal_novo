

import Layoutv2 from '@/components/Manole/Layoutv2'
import BannerCursosDisponiveis from '@/components/Manole/bannerCursosDisponiveis'
import ContainerCursosDisponiveis from '@/components/Manole/ContainerCursosDisponiveis'
import ContainerInteressam from '@/components/Manole/ContainerInteressam'
import styles from '.././cdisponiveis.module.css';
import React from "react";
import CategoriasCursosDisponiveis from "@/components/Manole/CategoriasCursosDisponiveis";
import ContainerBuscaCursosDispo from "@/components/Manole/ContainerBuscarCursosDisponiveis";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function TodosOsCursos({ params: { search } }) {

    const { data: session, status } = useSession();

    if (!session) {
        redirect("/api/auth/signin");
    }

  return (
    <Layoutv2>
        <BannerCursosDisponiveis title={search} />

            <div className={`uk-container uk-container-large`}>
                <CategoriasCursosDisponiveis />
                <ContainerBuscaCursosDispo search={search} />
                <ContainerInteressam />
            </div>

    </Layoutv2>
  );
}



