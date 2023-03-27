 import React, { useState, useEffect } from 'react'; 

import styles from './carousel.module.css';
import Breadcrumb from '../Breadcrumb'

 
import useCategorias from '../../../services/categorias/useCategorias' 
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';


const CarouselNav = ({nome, placeholder, action, cor1, cor2, direction, setItems, json_api, nome_buscado, categoria_buscada}) => {

    const {categorias, getCategorias} = useCategorias()

    
const cores = ['#1D8D96', '#C31B22', '#F80073', '#D3A150', '#E60FC5', '#C7831E', '#53ADB4', '#2D1B46', '#392503', '#D9004B', '#000000', '#110D6E', '#69B727', '#217A7E', '#3DD08C', '#E60F72', '#D94AB3', '#E530DE']

    useEffect(() => {
        getCategorias()
    }, [])

    const [search, setSearch] = useState('');
 

    function handleOnSubmit(event) {
        event.preventDefault();
        const books = json_api;
        const results = books.filter(book => book[nome_buscado].toLowerCase().indexOf(search) !== -1);
        setItems(results);
    }

    function handleSearchChange(event) {
        setSearch(event.target.value.toLowerCase());
    }


    function handleCategory(event) {
        event.preventDefault();
        const books = json_api;
        const results = books.filter(book => book[categoria_buscada] == event.target.value);
       
        setItems(results);
     
    }


    
    var Allcategorias =  categorias.map((categoria, index) => {


        return (
            <SwiperSlide key={index}   style={{order: '0' }}>
                    <aside key={categoria.cat_id} className={`${styles.list}`}>
                        
                        <div   className={`${styles.cat}`} style={{background:cores[index]}}>
                            <label>
                                <input onChange={handleCategory} name='categoria' type="radio" value={categoria.cat_id} /><span>{categoria.cat_nome}</span>
                            </label>
                        </div> 
                    </aside>  
            </SwiperSlide>
            ) 
       
    });
 

    return (
    <header   className={`${styles.carouselNav}`} style={{background: 'linear-gradient('+direction+', '+cor1+', '+cor2+')' }}>  
        <div className='container_padrao' > 

            <Breadcrumb
                nome_final = {nome}  
            />

            <div data-uk-grid className='uk-grid uk-child-width-1-2@m'>
                <div>
                    <h1>O que você procura?</h1>
                    <form onSubmit={handleOnSubmit}   className={`${styles.form_search}`}>
                        <input className={` ${styles.search}`}  type="text" placeholder={placeholder}  onChange={handleSearchChange} /> 
                    </form>
                </div>
                <div>
                    <h2 className='uk-flex uk-flex-right@m uk-flex-left'>{nome}</h2>
                </div>
            </div>

            <div>
                <h1>Navegue por área:</h1>
            </div>  
        </div>  

        <section    className={`${styles.container_slider} ${styles.card_bolha}`}>



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
                            slidesPerView: 5,
                          },
                        }}
                   
                        >
                           {Allcategorias}
             </Swiper>


 
           
        </section>
    </header>

  

    )
}

export default CarouselNav