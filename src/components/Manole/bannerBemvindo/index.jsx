 
  
import styles from './bannerBemvindo.module.css';

const bannerBemvindo = () => {
 

  return (
    <header className={`${styles.Bgbanner}`}> 

        <section className={`uk-container ${styles.max_container_banner}`}> 
            <div className="uk-child-width-expand uk-grid uk-grid-small uk-grid-match">
                <div className={`uk-flex uk-flex-middle ${styles.text_perfil}`}>
                        <div>
                            <h1>Bem vinda, Marcela!</h1>
                            <p>É bom ter você de volta no Portal Manole Conteúdo.</p>
                        </div>
                </div>

                <div className={`${styles.max_img_container}`}>
                    <div>   <img className={`${styles.tamanho_image_banner_perfil}`} src="/manole/perfil/imagem_perfil.png" /> </div>
                </div>
            </div>
        </section>
    </header>
  )
}


export default bannerBemvindo