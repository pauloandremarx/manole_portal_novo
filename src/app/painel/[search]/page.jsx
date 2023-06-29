"use client";

import Config from "@/util/Config";
import styles from "./search.module.css";

import Auth from "@/components/Manole/Auth";
import Layoutv2 from "@/components/Manole/Layoutv2";
import React, { useEffect, useState } from "react";


import { redirect, useRouter } from "next/navigation";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { useQueries } from "@tanstack/react-query";
import {CardBuscaNot, CardBuscaComprado} from "../../../components/Manole/CardBusca";



export default function MeusCursos({ params: { search } }) {
    const router = useRouter();

    const { data: session, status } = useSession();
    const usu_email = session?.user?.decode?.usu_email;

    const fetchMoodleBuscaDeCursos = async () => {
        const res = await fetch(
            `https://m4.manole.h.codely.com.br/webservice/rest/server.php?wstoken=${Config.WS_TOKEN}&moodlewsrestformat=json&wsfunction=theme_manole_search_course&param=${search}&user=${usu_email}`,
            {
                method: "GET",
            }
        );
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();
    };

    const [MoodleBuscaDeCursos] = useQueries({
        queries: [
            {
                queryKey: ["MoodleBuscaDeCursos", search],
                queryFn: () => fetchMoodleBuscaDeCursos(),
                enabled: !!usu_email,
            },
        ],
    });

    return (

            <Layoutv2>
                <div className="uk-container">
                    <h1 className='uk-margin-large-top'>Resultado da pesquisa por {search}</h1>
                    <section className={` uk-margin-large-top `}>
                        {MoodleBuscaDeCursos.status === "loading" ? (
                            <div
                                className={`uk-child-width-1-3 uk-grid uk-margin-large-top uk-flex-center`}
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
                        ) : MoodleBuscaDeCursos.status === "error" ? (
                            <p>Error: {MoodleBuscaDeCursos.error.message} </p>
                        ) : (
                            <>
                                <h2 className="uk-margin-large-top">Cursos cadastrados</h2>
                                <div
                                    className={`uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1 uk-flex-center uk-margin-medium-top`}
                                    data-uk-grid
                                >
                                    {MoodleBuscaDeCursos.data.map((item, i) => (
                                        item.enrolled === false ? null : <CardBuscaComprado fullname={item.fullname} courseid={item.courseid} id_moodle={item.id} key={"cursos_" + item.courseid + i} />
                                    ))}

                                </div>

                                <h2 className="uk-margin-large-top">Cursos não cadastrados</h2>
                                <div
                                    className={`uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1 uk-flex-center uk-margin-medium-top`}
                                    data-uk-grid
                                >
                                    {MoodleBuscaDeCursos.data.map((item, i) => (
                                        item.enrolled === true ? null : <CardBuscaNot fullname={item.fullname} courseid={item.courseid} id_moodle={item.id} key={"cursos_" + item.courseid + i} />
                                    ))}

                                </div>
                            </>
                        )}
                    </section>
                </div>
            </Layoutv2>

    );
}
