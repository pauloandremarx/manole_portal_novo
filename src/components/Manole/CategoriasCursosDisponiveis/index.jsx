
'use client'

import Config from "@/util/Config";
import styles from './categoriasdisponiveis.module.css';
import {useSession, signOut, getSession } from "next-auth/react";
import {useQueries, useQuery} from "@tanstack/react-query";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, {Fragment} from "react";
import Link from "next/link";

export default function CategoriasCursosDisponiveis() {

    const { data: session, status } = useSession();

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



    const [cursos_categorias] =
        useQueries({
            queries: [
                {
                    queryKey: ["cursos-categorias"],
                    queryFn: () => fetchCategoriasDisponiveis(usu_id),
                    enabled: !!usu_id,
                },
            ],
        });

    if (cursos_categorias.isLoading) return 'carregando';
    if (cursos_categorias.error)  return "An error has occurred: " + cursos_categorias.error.message;

    return (
        <div className="uk-position-relative uk-margin-top" tabIndex="-1" data-uk-slider>
            <div class="uk-slider-container uk-container " >
                <div className={`uk-slider-items uk-child-width-auto ${styles.altura_slider}`}  >
                    {cursos_categorias.data !== undefined && cursos_categorias.data.length !== 0 && (
                        // Use parênteses em vez de chaves aqui
                        cursos_categorias.data?.map(function (item, i) {
                            return (
                                    <div  key={'Swiper_Cursos_category_'+item.grupo_cat} className={`${styles.card_categoria}`}>
                                        <Link href={ `/painel/cursos-disponiveis/${ item?.nome?.replaceAll(" ", "-").replaceAll("/", "_") }` } legacyBehavior>
                                            <a className={'uk-box-shadow-small'}>
                                                {item.nome}
                                            </a>
                                        </Link>
                                    </div>
                            );
                        })
                    )}
                </div>
            </div>
            <button className="uk-position-center-left uk-position-small uk-hidden-hover"   data-uk-slidenav-previous
               data-uk-slider-item="previous"></button>
            <button className="uk-position-center-right uk-position-small uk-hidden-hover"   data-uk-slidenav-next
               data-uk-slider-item="next"></button>

        </div>
    );
}



