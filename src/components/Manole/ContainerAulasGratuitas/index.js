'use client'

import CarouselNav from '@/components/Manole/CarouselNav'
import CardAula from '@/components/Manole/CardAula' 
import { useState } from "react"


export default function CoontainerAulasGratuitas( props ) {
    
      const [ postNum, setPostNum] = useState(6); // Default number of posts dislplayed

    function handleClickMore() {
        setPostNum(prevPostNum => prevPostNum + 3) // 3 is the number of posts you want to load per click
    }


const [ searchItens, setItems ] = useState(); 
   var aulas = props.aulas;
    let text_not_encounter;
    
    if ( searchItens && searchItens.length == 0 ) {
      
        text_not_encounter =
      
            <> 
                <h3 className="ops">Ops….. <br /> Não foi possível encontrar resultados para o termo procurado.</h3>

                <div className="borda_text">

                    Verifique se você digitou as palavras corretamente ou tente novamente a busca.<br /><br />
  
                    Dicas<br />
                    Verifique se não há erro de digitação.<br />
                    Tente utilizar uma única palavra.<br />
                    Tente buscar por termos menos específicos e posteriormente use os filtros da busca.<br />
                    Procure utilizar sinônimos ao termo desejado.
                </div>
            </>
  
    }
  
    else {
        text_not_encounter = ''
    }

    return (<>
          <CarouselNav
      nome = "Aulas gratuitas"  
      cor1 = "#FD935F"
      cor2 = "#110D82"
      direction = "to right" 
      placeholder = "Pesquise por um aula ou categoria"
      setItems={setItems}
      json_api = {props.aulas}
      nome_buscado = "curso_titulo_site"
      categoria_buscada = "curso_categoria"
  />  
        <section className='uk-margin-medium'> 
            <div className='container_padrao'>
                <h2 className='aulas_title'>Todas as Aulas</h2>
                {text_not_encounter}
                <div data-uk-grid className='uk-grid uk-child-width-1-3@m'>
            

                {searchItens ? (

            searchItens.map((item, index) => (
                    <div key={index}>
                    
                        <CardAula 
                            url_img={item.aula_categoria_img}  
                            titulo={item.aula_categoria_titulo} 
                            professores={ `${ String(item.aula_categoria_desc).substring(0, 50)}...` }   
                            link={item.aula_categoria_id}
                    
                        />
                    </div>

                    ))
                
                
                    ) : (        aulas.slice(0, postNum).map((item, index) => (

                        <div key={index}>
                            <CardAula 
                            url_img={item.aula_categoria_img}  
                            titulo={item.aula_categoria_titulo} 
                            professores={ `${ String(item.aula_categoria_desc).substring(0, 50)}...` }   
                            link={item.aula_categoria_id} 
                            />
                        </div>
                        
                    ))
                    
                    )}
                    

                
                </div>

                {!searchItens && aulas.length >= postNum ? (<div className="uk-flex uk-flex-center uk-margin-large "><button className="uk-button uk-button-large uk-button-primary" onClick={handleClickMore}>Carregar mais</button></div>) : ''}
     

                <ul className="uk-pagination uk-flex-center uk-margin" >
                
                {/* !searchItens ? (
                        Array(2).fill('').map((_, index) => {
                            return <li  key={index}><a className={`page-link ${actualPage === (index + 1) ? "active" : ""}`} onClick={ () => {setActualPage(index + 1); window.scrollTo(0, 350)} } data-uk-scroll>
                                {index + 1}
                        </a></li>
                        })
                        )
                        : (  '' )*/}
        
                </ul>
            </div>
        </section>
        </>
    );
    
}