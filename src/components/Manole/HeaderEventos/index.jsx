"use client";


import { useQuery } from "@tanstack/react-query";
import Config from "@/util/Config";
import styles from "./headerEventos.module.css";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

async function getAllWebinares() {
  const res = await fetch(Config.API_URL + `webinar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: Config.API_KEY,
    },
  });
 
  const webinares = await res.json(); 
  return webinares;
}

export default function HeaderMeusEventos(props) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["initial-otthes-webinares"],
    queryFn: () => getAllWebinares(),
  });

  var cont = 5;
  var webinares = [];

  if (props.data != "undefined") {
    webinares = props.data;
  }

  props.type == "full" ? (cont = 5) : (cont = 5);

  function validate_thumb(item, index) {
    var count_in_2 = index + 2;

    if (count_in_2 % 2 === 0) {
      return "/manole/perfil/w01.jpeg";
    } else {
      return "/manole/perfil/w02.jpeg";
    }
  }

  const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  return (
    <>
      <div
        className={`uk-flex uk-flex-middle uk-grid uk-grid-match  ${styles.width_title}`}
      >
        <div>
          <h2 className={`${styles.mytitle}`}>
            <span> {props.title} </span>
          </h2>
        </div>
      </div>

      <div className={`Mycursos ${styles.Myeventos} `}>
        {error ? (
          <p>Oh no, there was an error:</p>
        ) : isLoading || isFetching ? (
          <div className="loader-manole"></div>
        ) : data ? (
          <Swiper
            modules={[Pagination, Scrollbar, A11y]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: "auto",
              },
              // when window width is >= 768px
              959: {
                slidesPerView: cont,
              },
            }}
          >
            {data.map((item, index) => (
                <SwiperSlide key={`eventos_${item.webinar_id}_${props.page}`}>
                  <div className={`${styles.curso_min_card}`}  key={hashCode(item.webinar_id.toString())}>
                    <div className={`${styles.padding}`}>
                      <h2>{item.webinar_theme}</h2>
                      <p> {item.webinar_location}</p>
                    </div>

                    <div className={`${styles.img_mini_curso}`}>
                      <Image src={validate_thumb(item, index)} alt="Itens do minicurso" width={500} height={500}/>
                    </div>

                    <div className={`${styles.padding} uk-flex uk-flex-right`}>
                      <a
                        href={`https://inscricao.manoleeducacao.com.br/webinar/?webinar_id=${item.webinar_id}`}
                        target="_blank"
                      >
                        Saber mais
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>não achou nada</div>
        )}
      </div>
    </>
  );
}
