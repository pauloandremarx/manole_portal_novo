import React from 'react' 
import styles from './form.module.css'; 
import Image from 'next/image';

const FormCuston = ({children, titulo, tamanho='0px', submit}) => { 
  
    return (
       
          <div className={`${styles.form_container}`} style={{ maxWidth: tamanho }}>
              <div className='uk-flex uk-flex-center uk-position-relative'><img  className={`${styles.form_logo}`}  src="/manole/form/manole-educao.webp" /></div>
              <h2>{titulo}</h2>
              <form onSubmit={submit}>

                {children}

                <div className='uk-margin uk-width-1-1'>
                            <a   className={`${styles.preferencias}`}>Preferências de cookies</a>
                        </div>

                        <div className='uk-margin uk-width-1-1'>
                            <p   className={`${styles.precisa_ajuda}`}>
                                Precisa de ajuda? Fale agora com um de<br />
                                nossos atendentes <strong>(11) 4196-6000</strong>
                            </p>
                        </div>

              </form>
              <div className='uk-flex uk-flex-center uk-margin-small'>
                <a className={`${styles.btn_form_loja}`}>Loja Virtual</a>
              </div>
          </div>
     
     
          
    
    )
  }


export default FormCuston