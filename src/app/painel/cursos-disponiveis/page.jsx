

import Layoutv2 from '@/components/Manole/Layoutv2'
import BannerCursosDisponiveis from '@/components/Manole/bannerCursosDisponiveis'
import ContainerCursosDisponiveis from '@/components/Manole/ContainerCursosDisponiveis'
import ContainerInteressam from '@/components/Manole/ContainerInteressam'
import styles from './cdisponiveis.module.css';
import React from "react";

export default function TodosOsCursos() {

  return (
    <Layoutv2>
        <BannerCursosDisponiveis />

            <div className={`uk-container uk-container-large`}>
                <ContainerCursosDisponiveis />
                <ContainerInteressam />
            </div>

    </Layoutv2>
  );
}



