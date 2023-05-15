'use client';
 
import Config from '@/util/Config'

import {  useQueries } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

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
        return "An error has occurred: " + banners.error.message;

  
  return <>
      <header>

          {banners.error ? (
                    "error"
                ) : (
                  <div className="uk-position-relative uk-slideshow" data-uk-slideshow="ratio: 8:3; min-height: 400;">

                  <div className="uk-position-relative uk-visible-toggle uk-light" >
                 
                      <ul className="uk-slideshow-items">
                          {

                              banners.data.map( ( item ) => (
                                  <li key={ item.link }>
                                      <a href={ item.href } target="_blank">
                            
                                          <img className="uk-visible@m" src={ item.link } alt={ item.titulo } data-uk-cover />
                                          <img className="uk-hidden@m" src={ item.link_mobile } alt={ item.titulo } data-uk-cover />
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
                          <ul className="uk-slideshow-nav  uk-dotnav uk-flex-center uk-margin"></ul>
                      </div>
                  </div>
              </div> 
        )}
            

</header>
 </>
}
 
 