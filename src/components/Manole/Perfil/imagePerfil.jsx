
import {getLocalStorage} from '@/util/Helpers'
import {useRouter} from 'next/navigation'
import styles from "./image-perfil.module.css";
import Link from "next/link";

export default function MeuPerfil() {

return (
    <div className={ `${ styles.box_image } ` }>
        <div
            className={ `${ styles.img_user }` }
            style={ {
                backgroundImage: `url("/manole/perfil/user_people.svg")`,
            } }
        ></div>
        <div className={ `${ styles.box_image_upload } ` }>
            <label  >
                <Image width={ 60 } height={ 60 } className={ `uk-position-relative next_img` } src="/manole/perfil/botao_photo.svg" alt={ "Botão Upload" } />
            </label>

            <input
                id="file-input"
                className={ `${ styles.image_upload_input } ` }
                type="file"
            />
        </div>
    </div> 
 );
}
