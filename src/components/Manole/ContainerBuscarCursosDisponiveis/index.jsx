"use client";

import React, {useState} from "react";
import {useInfiniteQuery, useQueries, useQuery} from "@tanstack/react-query";

import {useSession} from "next-auth/react";
import Config from "@/util/Config";
import styles from './CursosDisponiveis.module.css';

export default function ContainerBuscaCursosDispo(props) {
    const { data: session, status_a } = useSession();
    const usu_id = session?.user?.decode?.usu_id;

    const fetchCategoriasDisponiveis = async () => {
        const res = await fetch(
            `https://nwlax96g00.execute-api.us-east-1.amazonaws.com/recomendacao/course_categories`,
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

    const [categorias] =
        useQueries({
            queries: [
                {
                    queryKey: ["categorias"],
                    queryFn: () => fetchCategoriasDisponiveis(usu_id),
                    enabled: !!usu_id,
                },
            ],
        });


    if (categorias.error) return  categorias.error.message;
    if (categorias.error)  return instituicoes.error.message;
    const search = props.search.replaceAll("-", " ");
    const search_parans = categorias?.data?.find(word => word.nome ===  search ).grupo_cat;



    const [pageNumber, setPageNumber] = useState(0 );

    const fetchCursosDisponiveis = async () => {

        if(!!usu_id && !!search_parans) {
            const res = await fetch(
                `https://nwlax96g00.execute-api.us-east-1.amazonaws.com/recomendacao/busca?user=${usu_id}&category=${search_parans}`,
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
    }

    const { data, isLoading, isFetching, error, status } = useQuery({
        queryKey: ["todos_cursos_categorias", search_parans],
        queryFn: () => fetchCursosDisponiveis(),
        enabled: !!search_parans,
    });


    return status === 'loading' ? (

        <div className={`uk-child-width-1-5 uk-grid uk-margin-large-top uk-flex-center`}>
            <div>{search} - {search_parans}</div>
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
        <p>Error: {error.message} </p>
    ) : (
        <>

            <div className={`uk-child-width-1-5@l uk-child-width-1-4@m uk-flex-center uk-margin-large-top`} data-uk-grid>

                    <React.Fragment >
                        {data.map((recomendation_item, i) => (
                            <div key={'cursos_'+recomendation_item.product_id + i}>
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

            </div>


        </>
    )



}
