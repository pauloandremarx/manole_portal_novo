
'use client';
import Layoutv2 from '@/components/Manole/Layoutv2'
import BannerCursosDisponiveis from '@/components/Manole/bannerCursosDisponiveis'
import ContainerCursosDisponiveis from '@/components/Manole/ContainerCursosDisponiveis'
import ContainerInteressam from '@/components/Manole/ContainerInteressam'
import styles from './cdisponiveis.module.css';
import React from "react";
import CategoriasCursosDisponiveis from "@/components/Manole/CategoriasCursosDisponiveis";

export default function TodosOsCursos() {

  return (
    <Layoutv2>
        <BannerCursosDisponiveis />

            <div className={`uk-container uk-container-large`}>
                <CategoriasCursosDisponiveis />
                <ContainerCursosDisponiveis />
                <ContainerInteressam />
            </div>

    </Layoutv2>
  );
}



