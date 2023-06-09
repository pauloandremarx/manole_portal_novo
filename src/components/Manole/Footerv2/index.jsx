import React from 'react' 
import Image from 'next/image'
import styles from './manolefooterv2.module.css';
import Link from 'next/link';
  

 

const Footer = () => {
  return (
    <footer>
        <span id="end_nav"></span>
        <div className={`${styles.bg_cinza_leve}`}> 
            <div className='container_padrao'>
                <div data-uk-grid className='uk-grid uk-child-width-1-4@m uk-flex uk-flex-top'>
                    <div className='uk-position-relative uk-flex uk-flex-top'>
                        <div>
                            <Image width={180} height={180}  className={`${styles.margin_top_small} uk-position-relative next_img`} src="/manole/footer/manole_logo.webp"  alt="Manole logo footer" />
                            <p>Prover conteúdo essencial à formação do estudante, do profissional e do público em geral por meio de experiências únicas e excelentes. Manter um relacionamento sustentável com toda a cadeia produtiva e a comunidade.</p>
                            <h4>Copyright © 2022 - Manole Educação</h4>
                        </div>
                    </div>

                    <div className='uk-flex uk-flex-top'>
                        <div>
                            <h2>Links úteis</h2>

                            <a>Manole</a>

                            <a>Manole Educação</a>

                            <a>Central de atendimento</a>

                            <a>Privacidade & Termos</a>
                        </div>
                    </div>

                    <div className='uk-flex uk-flex-top'>
                     
                        <div className={`${styles.itens_margin_img}`}>
                        <h2>Contatos</h2>

                             <div className='uk-flex uk-flex-top'>
                                    <Image src="/manole/perfil/fi_map-pin.svg" width={180} height={180} className='img_next' alt='Icone da rua' />
                                    <span>Av. Marcos Penteado de Ulhôa Rodrigues, 1119 - Tamboré, Barueri - SP, 06460-040</span>
                             </div>

                             <div className='uk-flex uk-flex-top'>
                                    <Image src="/manole/perfil/u_phone.svg" width={180} height={180} className='img_next' alt='Icone do telefone'/>
                                    <span>Telefone : (11) 4196-6000</span>
                             </div>

                             <div className='uk-flex uk-flex-top'>
                                    <Image src="/manole/perfil/fi_mail.svg" width={180} height={180} className='img_next' alt='Icone do email' />
                                    <span>E-mail : ead@manoleeducacao.com.br</span>
                             </div>
                        </div>
                    </div>

                    <div className='uk-flex uk-flex-top'>
                        <div className={`${styles.container_redes_footer}`} > 
                            <Image src="/manole/perfil/youtube_bnt.svg" width={180} height={180} className='img_next' alt='Icone do youtube'/>

                            <Image src="/manole/perfil/instagran_bnt.svg" width={180} height={180} className='img_next' alt="icon do instagran" />

                            <Image src="/manole/perfil/facebook_bnt.svg" width={180} height={180} className='img_next' alt='Icone do facebook'/>

                            
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
 
    </footer>
    
  )
}

export default Footer