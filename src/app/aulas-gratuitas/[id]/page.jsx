'use client'

import React, { useEffect, useState } from "react";
import styles from './aulas_single_post.module.css';
import Layout from '@/components/Manole/Layout'
import Breadcrumb from '@/components/Manole/Breadcrumb'
import CardAula from '@/components/Manole/CardAula'

import useAulasgratuitas from '@/services/aulasgratuitas/useAulasgratuitas'



import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const AulasSinglePost = ({ params: { id } }) => {



    const  IdSingleAulas  = id



    useEffect(() => {
        getSingleAulas(IdSingleAulas)
        getAllaulas()
    }, [IdSingleAulas])

    const {Allaulas, getAllaulas, getSingleAulas, SingleAulas} = useAulasgratuitas()
    const [results, setResults] = useState([]);
    let cursos = useState([]);



    useEffect(() => {

        cursos = Allaulas.filter(item => item['curso_categoria_id'] == SingleAulas?.curso_categoria_id)

        setResults(cursos.slice(0, 3));

        console.log(cursos)


    }, [SingleAulas, Allaulas])



    function createVideo() {
        if(SingleAulas){
            return { __html: SingleAulas?.aula_gratuita_embeded   }
        }
      }




  return (
    <Layout>
        <header className={`${styles.bg_single_post} `}>
            <div className="container_padrao">
                <div data-uk-grid className="uk-grid uk-child-width-1-2@m">
                    <div>
                        <Breadcrumb
                            nome_final="assista"
                            nome_meio="aulas"
                            link_meio="/aulas-gratuitas"
                        />
                    </div>
                    <div className="uk-flex uk-flex-right@m uk-flex-left">
                        <h2>aulas</h2>
                    </div>
                </div>

                <h1> <SkeletonTheme color="grey" highlightColor="#444">{ SingleAulas?.aula_gratuita_titulo || <Skeleton/>  } </SkeletonTheme> </h1>
                <h3>Alberto dos Santos de Lemos</h3>
            </div>
        </header>
        <div  className={`container_padrao ${styles.container_thumb} `}>

        { SingleAulas ?

        <div className="uk-height-1-1 uk-flex uk-flex-center uk-flex-middle uk-background-cover" >
                <div  className={`${styles.MasterVideo} `} dangerouslySetInnerHTML={createVideo()} />
            </div>   : <Skeleton height={450} />

        }


            <a>Confira outras aulas gratuitas</a>
        </div>
      <main className='uk-margin-large-top'>
        <section className='uk-margin-medium'>
            <div className='container_padrao'>
                <h2 className={`aulas_title`}>Cursos relacionados a aula</h2>

                <div data-uk-grid className='uk-grid uk-child-width-1-3@m uk-grid-match'>



                {
                    results.map( ( item, index ) => (
                    <div key={index}>
                        <CardAula
                            url_img={item.aula_categoria_img}
                            titulo={item.aula_categoria_titulo}
                            professores={ `${item.aula_categoria_desc.substring(0, 50)}...` }

                            link={item.aula_categoria_id}
                                        />
                     </div>

                    ))}


                </div>
            </div>
        </section>



      </main>


    </Layout>
  )
}

export default AulasSinglePost