"use client";

import React, {useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getRecomendacoes} from "@/services/recomendacoes/userRecomendacoes";
import {useSession} from "next-auth/react";
import Config from "@/util/Config";
import styles from './CursosDisponiveis.module.css';

export default function ContainerCursosDisponiveis(props) {


    const { data: session, status_a } = useSession();
    const usu_id = session?.user?.decode?.usu_id;


    const fetchRecomendacoes = async ({ pageParam  = 0, user_id = usu_id }) => {
        let from = 0 ;
        let to = 19;
        const res = await fetch(
            `https://nwlax96g00.execute-api.us-east-1.amazonaws.com/recomendacao/products?from=${from + pageParam}&to=${from + to}&user=${user_id}`,
            {
                method: "GET",
                headers: {
                    'Authorization': Config.API_KEY,
                },
            }
        );

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return await res.json();
    }


    let pageParam = 0;
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['projects', pageParam],
        queryFn: ({pageParam = 0}) => fetchRecomendacoes({  pageParam }),


        enabled: !!usu_id,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage =
                lastPage.length > 0 && lastPage.length < 100 ? allPages.length - 1 : undefined;
            return nextPage;
        },
        getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
    })



    return status === 'loading' ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            <div className={`uk-child-width-1-5@m`} data-uk-grid="">
                {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.map((recomendation_item) => (
                            <div key={recomendation_item.name + i}>
                                <div className={`${styles.card}`}>
                                    <h1 className={`${styles.titulo}`}>{recomendation_item.name}</h1>

                                    <div
                                        className={`${styles.thumbmail}`}
                                        style={{
                                            backgroundImage: `url( ${recomendation_item?.items[0]?.images[0]?.imageUrl})`,
                                        }}
                                    ></div>

                                    <a className={`${styles.saber_mais}`}>Saber Mais</a>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div>
                <button
                    onClick={() => fetchNextPage()}

                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )


 /*
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
 )*/
}
