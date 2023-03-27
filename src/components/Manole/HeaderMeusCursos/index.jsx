
'use client';
import Link from 'next/link'
import styles from './headerMeusCursos.module.css'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';

import usePostLogs from '@/services/Postlogs/usePostLogs'
import useCadastroLogado from '@/services/cadastrarLogado/useCadastroLogado'

import { getLocalStorage, removeStorage } from '@/util/Helpers'

export default function HeaderMeusCursos(props) { 

    var cont = 0;
    var cursos = [];
    
    if(props.break ){
        var not_border = styles.not_border;
    }
    
    props.type == 'full' ? cont = 3 : cont = 4;


    if( props.data != "undefined"){
        cursos = props.data;   

        console.log(props.data);
    } 


      
  const mandar_pro_curso = ( e ) => {
 
     let data_logs = {
        usu_id: getLocalStorage( 'userid' ),
        tipo: "minicurso",
        conteudo: e.target.attributes.getNamedItem( "data-Id" ).value,
    }

     let data_logado = {
        curso_id_moodle: e.target.attributes.getNamedItem( "data-moddleid" ).value,
        curso_id: e.target.attributes.getNamedItem( "data-Id" ).value,
        usu_id: getLocalStorage( 'userid' ), 
    }

    
    
     useCadastroLogado.cadastroLogadoMiniCursos(data_logado)
      .then((response) => { 

          console.log( response ); 
        
         if(response.data){  
             
             window.open( response.data.url, '_blank' );
             
             usePostLogs.postLogs( data_logs )
                .then( ( response ) => { 
                    console.log( response );  
                            
                })
                .catch( ( error ) => {
                    console.log( error );
                } );
                    } 
  
       
      })
      .catch((error) => {
          console.log(error);
          console.log("Não foi possivel cadastrar o usuário!")
       
      })
    
  }

    return (
        <>
         <div className={`uk-flex uk-flex-middle uk-grid uk-grid-match  ${styles.width_title}`}> 
                    <div>
                        <h2 className={`uk-heading-line   ${styles.myLine}  ${not_border}`} ><span> {props.title} {props.break ? <br /> : ''} <span> {props.subtitle ? props.subtitle : ''}</span></span></h2> 
                    </div>

                    {props.break ? '' : <a className='uk-visible@m'><span>Ver todos <img src="/manole/perfil/right-md.svg" /> </span></a> }

                </div>



                <div className={`Mycursos`} >


                <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]} 
     
                        navigation={{ clickable: true }}
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
                              
                        { (props.type == 'full') ? (

                            <> 
                                {  cursos ?  cursos.map((item, index) => (<> 
                                
                                    <SwiperSlide>
                                                            <a className={`${styles.curso_card}`} data-Id={ item.curso_id } data-moddleid={item.curso_id_moodle}  onClick={ mandar_pro_curso }>
                                                                <div >
                                                                    <div className='uk-flex uk-flex-top'>
                                                                        <div className={styles.min_width_icon}>{props.complete ? <img src="/manole/perfil/completeIcon.svg" />  : <img src="/manole/perfil/cursoIcon.svg" />}</div>
                                                                        <div>
                                                                            <h2>{ item.curso_nome_completo?.substring( 0, 50 ) || item.curso_titulo_site?.substring( 0, 50 ) }{ item.curso_nome_completo?.length >= 50 ? '...' : '' || item.curso_titulo_site?.length >= 50 ? '...' : ''}</h2>
                                                                            <p>{ item.curso_url }</p>
                                                                        </div> 
                                                                    </div>

                                                                    <div className={`uk-flex  uk-flex-middle  ${styles.min_height_40}`}>
                                                                        <progress className={`uk-progress ${styles.myprogress}`}  value="20" max="100"></progress>
                                                                        <span>60%</span>
                                                                    </div>
                                                                
                                                                </div>
                                                            </a>
                                                        </SwiperSlide> 
                                
                                </>) ) : "" } 
 
                            </>
                       
                        ) : (

                            <>
                                   {  cursos ?  cursos.map((item, index) => (<> 
                                
                                <SwiperSlide>
                                                        <a className={`${styles.curso_card}`}>
                                                            <div>
                                                                <div className='uk-flex uk-flex-top'>
                                                                    <div className={styles.min_width_icon}>{props.complete ? <img src="/manole/perfil/completeIcon.svg" />  : <img src="/manole/perfil/cursoIcon.svg" />}</div>
                                                                    <div>
                                                                         <h2>{ item.curso_nome_completo?.substring( 0, 50 ) || item.curso_titulo_site?.substring( 0, 50 ) }{ item.curso_nome_completo?.length >= 50 ? '...' : '' || item.curso_titulo_site?.length >= 50 ? '...' : ''}</h2>
                                                                        <p>11ª edição - 2022</p>
                                                                    </div> 
                                                                </div>

                                                                <div className={`uk-flex  uk-flex-middle  ${styles.min_height_40}`}>
                                                                    <progress className={`uk-progress ${styles.myprogress}`}  value="20" max="100"></progress>
                                                                    <span>60%</span>
                                                                </div>
                                                            
                                                            </div>
                                                        </a>
                                                    </SwiperSlide> 
                            
                                </>) ) : "" } 
                            </>
                        )  
                    }
                </Swiper>
       
            </div>
        
        </>
    )

}