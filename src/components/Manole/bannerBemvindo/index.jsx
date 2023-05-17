 
  
import styles from './bannerBemvindo.module.css';

import Image from 'next/image';

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
                    <div>   <Image className={`${styles.tamanho_image_banner_perfil} next_img`} src="/manole/perfil/imagem_perfil.png" alt="Imagem de perfil" width={800} height={800} /> </div>
                </div>
            </div>
        </section>
    </header>
  )
}


export default bannerBemvindo