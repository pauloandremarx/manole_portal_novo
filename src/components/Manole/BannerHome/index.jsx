'use client';
 
import Config from '@/util/Config'
import { Suspense } from "react"; 
import { useQuery } from "@tanstack/react-query";


async function getBanner() {
  const res = await fetch( Config.API_URL + 'banner/controllers/getBanners.php?limit=3', {
      method: 'GET',
      mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',  
         
        }, 
    } );
  
  return res.json();
}


export default function BannerHome( props ) {

const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["data-banners"],
    queryFn: () => getBanner(),
  });

  
  return <>
      <header>
          
          { error ? (
            <div className="uk-container" ><p className="uk-margin-top">Erro ao carregar imagem do banner!</p></div>
              ) : isLoading || isFetching ? (
                    <div class="uk-margin-top loader-manole"></div> 
            ) : data ? (
                  <div className="uk-position-relative uk-slideshow" data-uk-slideshow="ratio: 8:3; min-height: 400;">

                  <div className="uk-position-relative uk-visible-toggle uk-light" >
                 
                      <ul className="uk-slideshow-items">
                          {
              
                              data.map( ( item ) => (
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
                  ) : (
                          
                          <div className="uk-container" ><p>Vetor de imagem vazios!</p></div>
     
        )}
            

</header>
 </>
}
 
 