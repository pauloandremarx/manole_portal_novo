"use client";

import React, { useState } from "react";
import styles from "./CursosDisponiveis.module.css";
import { useQueries } from "@tanstack/react-query";
import { getRecomendacoes } from "@/services/recomendacoes/userRecomendacoes";
import usePostLogs from "@/services/Postlogs/usePostLogs";
import useCadastroLogado from "@/services/cadastrarLogado/useCadastroLogado";
import { getLogs } from "@/services/GetLogs/useGetLogs";
import { useSession } from "next-auth/react";

export default function ContainerCursosDisponiveis(props) {
    const [page, setPage] = React.useState(0);

    const { data: session, status } = useSession();

    const usu_id = session?.user?.decode?.usu_id;

    const [todos, setTodos] = useState([]);

    const [recomendacoes] = useQueries({
        queries: [
            {
                queryKey: ["recomendacoes", page],
                queryFn: () => getRecomendacoes(page, usu_id),
                enabled: !!usu_id,
                keepPreviousData: true,
            },
        ],
    });


 


    if (recomendacoes.isLoading) return "Caregando cursos...";
    if (recomendacoes.error) return recomendacoes.error.message;

    return (
        <>
            <span>Current Page: {page}</span>

            <button
                onClick={() => setPage(page + 10)}
                disabled={recomendacoes.isPreviousData}
            >
                Carregar mais
            </button>
            <div className={`uk-child-width-1-5@m`} data-uk-grid="">
                {todos.data?.map(function (item, i) {
                    return (
                        <div key={item.name + i}>
                            <div className={`${styles.card}`}>
                                <h1 className={`${styles.titulo}`}>{item.name}</h1>

                                <div
                                    className={`${styles.thumbmail}`}
                                    style={{
                                        backgroundImage: `url( ${item?.items[0]?.images[0]?.imageUrl})`,
                                    }}
                                ></div>

                                <a className={`${styles.saber_mais}`}>Saber Mais</a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
