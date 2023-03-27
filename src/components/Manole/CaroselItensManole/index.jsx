'use client';


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'
import styles from './caroselItensManole.module.css';
 
export function Carosel1() { 

    return ( 

        <div className={`${styles.container_slider} `}>
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
                              slidesPerView: 3,
                            },
                          }}
                   
                        >
                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel uk-position-relative"  href='https://solucoes.manole.com.br/' target='_blank'>
                                                <div className={`${styles.thum_mail_home_card} `} >  <img className='uk-position-relative'  src="/manole/home/solutions-1.webp" alt="Picture of the author"  data-uk-cover />  </div>
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                    <h1 className='uk-margin-bottom'>Produção de Webinares e Cursos EAD</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel" href='https://ebooks.manole.com.br/' target='_blank'>
                                            <div className={`${styles.thum_mail_home_card} `}  ><img className='uk-position-relative'  src="/manole/home/solutions-3.webp" alt="Picture of the author"  data-uk-cover /> </div>
                                            
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                    <h1 className='uk-margin-bottom'>Manole Bibliotech</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>
                    
                
                        
            </Swiper>
            </div>
    )
}


export function Carosel2() { 

    return ( 
         <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y]} 
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
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
                            slidesPerView: 3,
                          },
                        }}
                   
                        >
                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel uk-position-relative"  href='https://solucoes.manole.com.br/' target='_blank'>
                                                <div className={`${styles.thum_mail_home_card} `} >  <img className='uk-position-relative'  src="/manole/home/education-1.webp" alt="Picture of the author"  data-uk-cover />  </div>
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Curso de Ciências<br /> da Saúde</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel" href='/podcast' target='_blank'>
                                            <div className={`${styles.thum_mail_home_card} `}  ><img className='uk-position-relative'  src="/manole/home/education-2.webp" alt="Picture of the author"  data-uk-cover /> </div>
                                            
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Podcast</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>


                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                    <Link href='/minicursos'  legacyBehavior>
                                            <a className="uk-panel">
                                            <div className={`${styles.thum_mail_home_card} `}  ><img className='uk-position-relative'  src="/manole/home/education-3.webp" alt="Picture of the author"  data-uk-cover /> </div>
                                            
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Minicurso</h1>
                                                </div>
                                            </a>
                                            </Link>
                                        </div>
                            </SwiperSlide>
                    

                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                        <Link href='/aulas-gratuitas'  legacyBehavior>
                                            <a className="uk-panel">
                                            <div className={`${styles.thum_mail_home_card} `}  ><img className='uk-position-relative'  src="/manole/home/education-4.webp" alt="Picture of the author"  data-uk-cover /> </div>
                                            
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Aulas Gratuitas</h1>
                                                </div>
                                            </a>
                                            </Link>
                                        </div>
                            </SwiperSlide>
                
                        
                        </Swiper>
    )
}


export function Carosel3() { 

    return ( 
               <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]} 
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
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
                          slidesPerView: 3,
                        },
                      }}
                   
                        >
                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel uk-position-relative"  href='https://www.manole.com.br/profissionais-e-universitarios/?order=OrderByTopSaleDESC' target='_blank'>
                                                <div className={`${styles.thum_mail_home_card} `} >  <img className='uk-position-relative'  src="/manole/home/ieditora-1.webp" alt="Picture of the author"  data-uk-cover />  </div>
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Catálogo de Ciências da Saúde</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel" href='https://www.manole.com.br/profissionais-e-universitarios/exatas-sociais-e-aplicadas?order=OrderByTopSaleDESC' target='_blank'>
                                            <div className={`${styles.thum_mail_home_card} `}  ><img className='uk-position-relative'  src="/manole/home/ieditora-2.webp" alt="Picture of the author"  data-uk-cover /> </div>
                                            
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Catálogo Exatas Sociais e Aplicadas</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>


                            <SwiperSlide>
                            <div className={`${styles.h1_card} `}>
                                            <a className="uk-panel" href='https://www.manole.com.br/livros/interesse-geral?order=OrderByReleaseDateDESC' target='_blank'>
                                            <div className={`${styles.thum_mail_home_card} `}  ><img className='uk-position-relative'  src="/manole/home/ieditora-3.webp" alt="Picture of the author"  data-uk-cover /> </div>
                                            
                                                <div className="uk-position-small uk-position-bottom-center ">
                                                <h1 className='uk-margin-bottom'>Catálogo Interesse Geral</h1>
                                                </div>
                                            </a>
                                        </div>
                            </SwiperSlide>
                    
 
                        </Swiper> 
                   
    )
}