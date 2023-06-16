"use client";

import React, {useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";

import {useSession} from "next-auth/react";
import Config from "@/util/Config";
import styles from './CursosDisponiveis.module.css';

export default function ContainerCursosDispo(props) {

    const { data: session, status_a } = useSession();
    const usu_id = session?.user?.decode?.usu_id;

    const [pageNumber, setPageNumber] = useState(0 );

    const fetchCursosDisponiveis = async ({ pageNumber, user_id = usu_id }) => {
        let from = 0 ;
        let to = 19;

        const res = await fetch(
            `https://nwlax96g00.execute-api.us-east-1.amazonaws.com/recomendacao/products?from=${from + pageNumber}&to=${to + pageNumber}&user=${user_id}&category=/179/`,
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

        setPageNumber(pageNumber + 20);

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
        queryKey: ['projects'],
        queryFn: ({pageParam = 20}) => fetchCursosDisponiveis({  pageNumber }),
        enabled: !!usu_id,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {

            const nextPage =
                lastPage.length > 0 && lastPage.length < 100 ?  lastPage.length - lastPage.length   : undefined;
            return nextPage;
        },
        getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
    })


    return status === 'loading' ? (
        <div className={`uk-child-width-1-5 uk-grid uk-margin-large-top uk-flex-center`}>
            <div>
                <div className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}>

                </div>
                <div className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}>

                </div>
            </div>

            <div>
                <div className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}>

                </div>
                <div className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}>

                </div>
            </div>

            <div>
                <div className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}>

                </div>
                <div className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}>

                </div>
            </div>

            <div>
                <div className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}>

                </div>
                <div className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}>

                </div>
            </div>

            <div>
                <div className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}>

                </div>
                <div className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}>

                </div>
            </div>
        </div>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            <div className={`uk-child-width-1-5@l uk-child-width-1-4@m uk-flex-center uk-margin-large-top`} data-uk-grid>
                {data.pages.map((group, i) => (
                    <React.Fragment key={`${i}_pages`}>
                        {group.map((recomendation_item) => (
                            <div key={recomendation_item.product_id + i}>
                                <div className={`${styles.card}`}>
                                    <h1 className={`${styles.titulo}`}>{recomendation_item.name}</h1>

                                    <div
                                        className={`${styles.thumbmail}`}
                                        style={{
                                            backgroundImage: `url( ${recomendation_item?.items[0]?.images[0]?.imageUrl})`,
                                        }}
                                    ></div>

                                    <a target='_blank' href={recomendation_item.url} className={`${styles.saber_mais}`}>Saber Mais</a>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div>
                <button
                    onClick={() => {fetchNextPage();   }}
                    className={`uk-button uk-button-primary  uk-margin-small-bottom uk-margin-large-top ${styles.btnCarregarMais}`}

                >
                    {isFetchingNextPage
                        ? 'Carregando mais...'
                        : hasNextPage
                            ? 'Carregar Mais'
                            : 'Nada mais para carregar'}
                </button>
            </div>

        </>
    )



}
