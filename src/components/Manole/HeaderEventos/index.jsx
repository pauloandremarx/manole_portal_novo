'use client';


import styles from './headerEventos.module.css'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';


export default function HeaderMeusEventos(props) { 

    var cont = 5;
    var webinares = [];
    
     if( props.data != "undefined"){
        webinares = props.data;   
    } 

    props.type == 'full' ? cont = 5 : cont = 5;

    function validate_thumb( item, index ) {  
        var count_in_2 = index + 2; 

            if ( (count_in_2 % 2) === 0 ) {
                return "/manole/perfil/w01.jpeg";
            } else{
                return "/manole/perfil/w02.jpeg";
            }   
            
        
    }

    return (
        <>
         <div className={`uk-flex uk-flex-middle uk-grid uk-grid-match  ${styles.width_title}`}> 
                    <div>
                        <h2 className={`${styles.mytitle}`}><span> {props.title} </span></h2> 
                    </div>
                  
                </div>



                <div className={`Myeventos ${styles.Myeventos} `} >


                <Swiper
                        modules={[ Pagination, Scrollbar, A11y]} 
      
                      
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

                    { webinares ? webinares.map( ( item, index ) => ( <>
                    
                        <SwiperSlide>
                                    <div className={`${styles.curso_min_card}`}>
                                        <div className={`${styles.padding}`} > 
                                            <h2>{item.webinar_theme }</h2>
                                            <p> { item.webinar_location}</p>
 
                                            
                                </div>
                                
                              
                                <div className={ `${ styles.img_mini_curso }` }>
                                            <img src={validate_thumb(item, index)} /> 
                                        </div>
 
                                        <div className={`${styles.padding} uk-flex uk-flex-right`}>
                                            <a href={`https://inscricao.manoleeducacao.com.br/webinar/?webinar_id=${item.webinar_id}`} target="_blank">Saber mais</a>
                                        </div>
                                    </div>
                                </SwiperSlide> 
 
                    
                    
                    </> ) ) : "" } 
 
                          
                           
                </Swiper>
       
            </div>
        
        </>
    )

}