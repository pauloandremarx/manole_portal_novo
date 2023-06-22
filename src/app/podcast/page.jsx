'use client'

import React, { useEffect, useState } from "react";
import styles from './podcast.module.css';
import Layout from '@/components/Manole/Layout';

import Link from 'next/link'

import Breadcrumb from '@/components/Manole/Breadcrumb'
import CardPodcast from '@/components/Manole/CardPodcast'
import usePodcast from '@/services/podcast/usePodcast'

import Image from "next/image";

export default function POdcast() {

    const {podcast, getPodcast} = usePodcast()

    useEffect(() => {
      getPodcast()
    }, [])

  return (
    <Layout>

      <main   className={` ${styles.bg_podcast} `} >
            <section className="container_padrao">
                <div data-uk-grid className="uk-grid uk-child-width-1-2@m">
                        <div>
                            <Breadcrumb nome_final="podcast" />

                        </div>
                        <div className="uk-flex uk-flex-right@m uk-flex-left">
                            <h2>podcast</h2>
                        </div>
                </div>

                <div data-uk-grid className="uk-grid uk-child-width-1-2@m ">

                    <div   className={` ${styles.como_escutar} `}>
                      <h3>Como escutar?</h3>
                      <p>Clique nas imagens dos podcast abaixo ou encontre os programas nos aplicativos ao lado</p>
                    </div>

                    <div>
                      <aside   className={` ${styles.boder_branca} `}>
                        <div className="uk-child-width-1-3 uk-grid uk-grid-match" >
                          <div className="uk-flex uk-flex-middle uk-flex-center"><div><Image fill={true} className={`uk-position-relative  `}    src="/manole/Spotify-Logo.webp" /></div></div>
                          <div className="uk-flex uk-flex-middle  uk-flex-center"><div><Image fill={true} className={`uk-position-relative `}     src="/manole/deezer.webp" /></div></div>
                          <div className="uk-flex uk-flex-middle  uk-flex-center"><div> <Image fill={true} className={`uk-position-relative itunes_top`}   src="/manole/Spotify-Logo.webp" /></div></div>
                        </div>
                        </aside>
                    </div>
                </div>

                <hr  className={` ${styles.border_bottom_branca} `} />

                <div className="uk-margin-large-top">

                {
                podcast.map((item, index) => (

                <div key={index}>

                <CardPodcast

                titulo={item.titulo}
                resumo={item.descricao}
                img={item.imgUrl}

                lista={item.episodios}

                />
                </div>

                ))}


                </div>

            </section>

      </main>

    </Layout>
  );
}



