"use client";

import React, {useEffect, useState} from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import Config from "@/util/Config";
import styles from "./style.module.css";

export default function ContainerCursosDispo(props) {
  const { data: session, status_a } = useSession();
  const usu_id = session?.user?.decode?.usu_id;

  const fetchRecomendacoes = async (parans_user_id) => {

      const res = await fetch(
            `https://nwlax96g00.execute-api.us-east-1.amazonaws.com/recomendacao/busca?user=${parans_user_id}`,
            {
                method: "GET",
                headers: {
                    Authorization: Config.API_KEY,
                },
            }
        );

        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();
    };
    const [ enabled, setEnabled ] = useState(true);

    const { data, isLoading, isFetching, error, status } = useQuery({
        queryKey: ["Cursos-Recomendados"],
        queryFn: () => fetchRecomendacoes(usu_id),
        refetchOnWindowFocus: false,
        refetchInterval: 0.1,
        enabled: enabled && !!usu_id,

    });

    useEffect(() => {
        if (data?.length > 4) {
            setEnabled(false)
        }
    }, [ data ])

    return status === "loading" ? (
        <div
            className={`uk-child-width-1-5 uk-grid uk-margin-large-top uk-flex-center`}
        >
            <div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}
                ></div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}
                ></div>
            </div>

            <div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}
                ></div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}
                ></div>
            </div>

            <div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}
                ></div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}
                ></div>
            </div>

            <div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}
                ></div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}
                ></div>
            </div>

            <div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightSmall} uk-width-1-1 uk-border-rounded`}
                ></div>
                <div
                    className={`${styles.bgGrey} ${styles.bgHeightLarge}  uk-width-1-1 uk-border-rounded`}
                ></div>
            </div>
        </div>
    ) : status === "error" ? (
        <p>Error: {error.message}</p>
    ) : (
        <div className="uk-position-relative" tabIndex="-1" data-uk-slider>
            <h2 className={styles.subtitulo}>Os alunos também se interessam</h2>
            <div className={`uk-slider-container ${styles.padding_x}`}>
                <div
                    className={`uk-slider-items uk-child-width-1-5@l uk-child-width-1-4@m uk-flex-center uk-margin-large-top  uk-grid`}
                >
                    {data.map((recomendation_item, i) => (
                        <React.Fragment key={`container_interessam${i}_pages`}>
                            <div key={'container_interessam'+recomendation_item.product_id + i}>
                                <div className={`${styles.card}`}>
                                    <h1 className={`${styles.titulo}`}>
                                        {recomendation_item.name}
                                    </h1>

                                    <div
                                        className={`${styles.thumbmail}`}
                                        style={{
                                            backgroundImage: `url( ${recomendation_item?.items[0]?.images[0]?.imageUrl})`,
                                        }}
                                    ></div>

                                    <a
                                        target="_blank"
                                        href={recomendation_item.url}
                                        className={`${styles.saber_mais}`}
                                    >
                                        Saber Mais
                                    </a>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <button
                className={`uk-position-center-left uk-position-small  ${styles.btn_pure}`}
                data-uk-slider-item="previous"
                >
                <div className={styles.circleShadow}>
                    <img src="/manole/perfil/left-sm.svg" />
                </div>
            </button>
            <button
                className={`uk-position-center-right uk-position-small ${styles.btn_pure}`}
                data-uk-slider-item="next"
            >
                <img
                    className={styles.circleShadow}
                    src="/manole/perfil/right-md.svg"
                />
            </button>
        </div>
    );
}
