"use client";

import Layoutv2 from "@/components/Manole/Layoutv2";
import { useEffect, useState } from "react";

import HeaderMeusCursosRealizados from "@/components/Manole/HeaderCursosFinalizados";

import useMeusCursos from "@/services/meusCursos/useMeusCursos";

import styles from "./m_cursos.module.css";
import { redirect, useRouter } from "next/navigation";
import Select from "react-select";
import { useSession } from "next-auth/react";


export default function MeusCursos() {
    const { data: session, status } = useSession();


    const [options, setoptions] = useState("andamento");

    let return_filter = "";

    const andamento = (
        <HeaderMeusCursosRealizados
            title={`Cursos em andamento `}
            subtitle={`Continue de onde parou e avance no seu aprendizado!`}
            break="true"
            type={`full`}
            page={"meus-cursos"}
        />
    );

    const comecado = (
        <HeaderMeusCursosRealizados
            title={`Cursos para começar `}
            subtitle={`Inicie seus cursos e comece a aprender!`}
            break="true"
            type={`full`}
            page={"meus-cursos"}
        />
    );

    const finalziado = (
        <HeaderMeusCursosRealizados
            title={`Cursos finalizados `}
            subtitle={`Parabéns por sua dedicação!`}
            break="true"
            type={`full`}
            complete={"true"}
            page={"meus-cursos"}
        />
    );

    if (options == "andamento") {
        return_filter = (
            <>
                {" "}
                {andamento} {comecado} {finalziado}
            </>
        );
    } else if (options == "comecado") {
        return_filter = (
            <>
                {" "}
                {comecado} {andamento} {finalziado}
            </>
        );
    } else if (options == "finalziado") {
        return_filter = (
            <>
                {" "}
                {finalziado} {andamento} {comecado}
            </>
        );
    }

    const options_cursos = [
        { value: "andamento", label: "Cursos em andamento" },
        { value: "comecado", label: "Cursos para começar" },
        { value: "finalziado", label: "Cursos finalizados" },
    ];

    return (

            <Layoutv2>
                <section
                    className={` uk-margin-large-top ${styles.container_painel}`}
                    data-uk-filter="target: .js-filter"
                >
                    <div className={styles.wid_select}>
                        <form>
                            <Select
                                className={`${styles.myselect}`}
                                placeholder="Selecione uma opção"
                                onChange={(e) => {
                                    setoptions(e.value);
                                }}
                                options={options_cursos}
                            ></Select>
                        </form>
                    </div>

                    {return_filter}
                </section>
            </Layoutv2>

    );
}
