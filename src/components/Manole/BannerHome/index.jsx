'use client';

import Config from '@/util/Config';

import {  useQueries } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import getUsername from "@/services/login/useLogin";
import {useSession} from "next-auth/react";

async function getBanner() {
    const res = await fetch(Config.API_URL + `banner/controllers/getBanners.php?limit=3`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },

    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const banners = await res.json();
    return banners;
}



export default function BannerHome( props ) {

    const { data: session, status } = useSession();

 const [banners] =
    useQueries({
            queries: [
                {
                    queryKey: ["data-banners"],
                    queryFn: () =>  getBanner(),
                },

            ],
    } );

    if (banners.isLoading)
        return  (
            <SkeletonTheme  baseColor="#A9A9A9" highlightColor="#444">
        <p>
            <Skeleton count={1}  className={`homeBannerSkeleton`}  />
        </p>
    </SkeletonTheme>);

    if (banners.error)
        return <div>An error has occurred: {banners.error.message};</div>


  return <>
      <header  >

          {banners.error ? (
                    "error"
                ) : (
                  <div className="uk-position-relative" data-uk-slider >

                  <div className="uk-position-relative  uk-width-1-1" >
                      <ul className="uk-slider-items uk-width-1-1"  >
                          {
                              banners.data.map( ( item ) => (
                                  <li key={ item.link } className="uk-width-1-1" >
                                      <a href={ item.href } target="_blank"  className="uk-width-1-1 uk-display-block"  >
                                          <Image className="uk-visible@m uk-width-1-1 uk-display-block min-width-1-1" src={ item.link } alt={ item.titulo }  width={3000} height={1500}   />
                                          <Image className="uk-hidden@m uk-width-1-1 uk-display-block min-width-1-1" src={ item.link_mobile } alt={ item.titulo }  width={3000} height={1500}  />
                                      </a>
                                  </li>

                              ))

                          }

                      </ul>

                      <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#"
                          data-uk-slideshow-item="previous"></a>
                      <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#"
                          data-uk-slideshow-item="next"></a>
                      <div className="uk-position-bottom">
                          <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
                      </div>
                  </div>
              </div>
        )}


</header>


 </>
}

