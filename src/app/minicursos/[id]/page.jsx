
'use client'

import React, { useEffect, useState } from "react";

import styles from './minicursos_single.module.css';
   
import Layout from '../../../components/Manole/Layout'

import Breadcrumb from '../../../components/Manole/Breadcrumb'
 

import FormCuston from '../../../components/Manole/Form'
 
import CardAula from '../../../components/Manole/CardAula'

import CardProduto from '../../../components/Manole/CardProduto'
 
import InputCuston from '../../../components/Manole/InputCuston'
 
 
import InputRadio from '../../../components/Manole/InputRadio'

  

import useMinicursos from '../../../services/minicurso/useMinicursos'
 



import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

 
 
export default function MiniCursosSinglePost( { params: { id } }) {
    
 
     const string = id;
       
     const nameSingleMinicurso = (string || "").replaceAll('%20', ' ');
 

    useEffect(() => {
        getSingleMinicursos(nameSingleMinicurso)
        getAllMinicursos();
 
    }, [nameSingleMinicurso])

    const {Allminicursos, getAllMinicursos, getSingleMinicursos, Singleminicursos} = useMinicursos()
    const [results, setResults] = useState([]);
    let cursos = useState([]);

     
  
    useEffect(() => {  
   
            cursos =  Allminicursos.filter(item => item['curso_categoria'] == Singleminicursos?.curso_categoria) 
            setResults(cursos.slice(0, 3));
                    
            console.log(cursos)
       
    }, [Singleminicursos, Allminicursos])

    

  return (
    <Layout> 
          <header className={ `${ styles.bg_single_post }` }>
                <p>teste: { nameSingleMinicurso}</p>
        <div className="container_padrao">
            <div data-uk-grid className="uk-grid uk-child-width-1-2@m">
                <div>
                    <Breadcrumb 
                        nome_final="assista"
                        nome_meio="minicursos"
                        link_meio="/minicursos"
                    />
                </div>
                <div className="uk-flex uk-flex-right@m uk-flex-left">
                          <h2>Minicurso</h2>
                        
                </div>
            </div>

            <h1> <SkeletonTheme color="grey" highlightColor="#444">{ Singleminicursos?.curso_titulo_site || <Skeleton/>  } </SkeletonTheme></h1>
            <h3>{Singleminicursos?.curso_url || <Skeleton/>  }</h3>
        </div> 
    </header>
    <div  className={`container_padrao ${styles.container_thumb}`}>


    {Singleminicursos?.curso_thumb ? <div className="uk-height-1-1 uk-flex uk-flex-center uk-flex-middle uk-background-cover " data-src={Singleminicursos?.curso_thumb || '' } uk-img="loading: eager"> </div>  : <Skeleton height={450} /> }



        <a>Confira outras aulas gratuitas</a>
    </div>
  <main className='uk-margin-xlarge-top'> 
    <section className='uk-margin-medium'> 
        <div className='container_padrao'>
            <h2 className='aulas_title'>Cursos relacionados a aula</h2>
        
            <div  className='uk-grid uk-child-width-1-3@m uk-grid-match'>
           {
            results.map((item, index) => (
              <div key={index}>
                  <CardProduto  
                          url_img= {item.curso_thumb}
                              titulo={item.curso_titulo_site}
                          
                              link={item.curso_titulo_site}

                              curso_id={item.curso_id}
                              curso_id_moodle={item.curso_id_moodle}
                      />
              </div>

             ))}
            
            </div>
        </div>
    </section>

    
        <div id="modal-close-default" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <button className="uk-modal-close-default" type="button" ></button>
                <FormCuston
                 titulo="Preencha o formulário e receba uma aula gratuita."
                 tamanho='1000px'
                >

                    <InputCuston 
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        icon="icon: user"
                    />

                    <InputCuston 
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        icon="icon: mail"
                    />

                    <InputCuston 
                        type="text"
                        name="tel"
                        placeholder="Telefone"
                        icon="icon: receiver"
                    />

                    <InputRadio 
                        name="Concordo em fornecer meus dados para receber conteúdos e ofertas por e-mail ou outros meios."
                     />

                    <input value="Receber aula por e-mail" type='submit' />
                    <a className="btn_ja_e_aluno">Já é aluno Manole? Fazer login</a>
                </FormCuston>
             </div>
        </div>


 
  
  </main>


</Layout>  
  )
}

 