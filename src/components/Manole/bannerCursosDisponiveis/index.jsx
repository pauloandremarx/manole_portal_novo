'use client' 

import styles from './bannerCursosDisponiveis.module.css';

export default function  bannerCursosDisponiveis ()  {
 

  return (
    <header className={`${styles.Bgbanner}`}> 

        <section className={`uk-container ${styles.max_container_banner}`}> 
            <div className="uk-child-width-expand uk-grid uk-grid-small uk-grid-match">
                <div className={`uk-flex uk-flex-middle ${styles.text_perfil}`}>
                        <div>
                            <h1>Título</h1>
                            <p>A Manole Educação oferece cursos <strong>livres e de atualização</strong> em áreas como Saúde, Direito e Negócios para estudantes universitários e profissionais.
                                
                                <span className="uk-visible@m"> Os cursos são produzidos em <strong>parceria com sociedades de classe, renomadas instituições e professores que são referências científicas nacionais</strong> em suas diversas especialidades.</span></p>
                        </div>
                </div>

                <div className={`${styles.max_img_container}`}>
                    <div  className={`uk-flex  `}>   
                        <div  className={` ${styles.img_item}`}>
                            <div><img className={`${styles.item1_b2}`} src="/manole/perfil/b2-item1.png" /> </div>
                            <div><img className={`${styles.item2_b2}`} src="/manole/perfil/b2-item2.png" /> </div>
                            <div><img className={`${styles.item3_b2}`} src="/manole/perfil/b2-item3.png" /> </div>
                        </div>
                        <img className={`${styles.tamanho_image_banner_circle}`} src="/manole/perfil/b2-circle.png" /> 
                    </div>

                    <p  className={`uk-hidden@m ${styles.text_down}`}>Os cursos são produzidos em <strong>parceria com sociedades de classe, renomadas instituições e professores que são referências científicas nacionais</strong> em suas diversas especialidades.</p>
                </div>
            </div>
        </section>
    </header>
  )
}


 