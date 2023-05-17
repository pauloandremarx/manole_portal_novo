import React from 'react' 
import Image from 'next/image'
import styles from './manolefooter.module.css';
import Link from 'next/link';
  

const navigation = [ 
    { name: 'Início', href: '/' }, 
    { name: 'Sobre nós', href: '/sobre-nos' }, 
    { name: 'Soluções', href: '/#solucoes' },
    { name: 'Educação', href: '/#educacao' }, 
    { name: 'Editora', href: '/#editora' }, 
    { name: 'Blog', href: '/blog' },
  ]

const Footer = () => {
  return (
    <footer>
        <span id="end_nav"></span>
        <div className={`${styles.bg_cinza_leve}`}> 
            <div className='container_padrao'>
                <div data-uk-grid className='uk-grid uk-child-width-1-4@m uk-flex uk-flex-top'>
                    <div className='uk-position-relative uk-flex uk-flex-top'>
                        <Image className='uk-position-relative uk-margin-large-top' src="/manole/footer/manole_logo.webp" width={200} height={200} alt={`logo do rodapé da Manole`} />
                    </div>

                    <div className='uk-flex uk-flex-top'>
                        <div>
                            <h6>Nosso Endereço</h6> 
                            <p>Alameda América, 876 – Tamboré Santana do Parnaíba – SP <br /> 
                            CEP: 06543-315
                            </p> 
                            <Link legacyBehavior href='https://www.google.com/maps/place/Manole/@-23.4707791,-46.8324778,17z/data=!3m1!4b1!4m5!3m4!1s0x94cf027a264aea95:0x55b4f70dbdb446b6!8m2!3d-23.470784!4d-46.8302838' target="_blank">
                                 <a >Ver no mapa</a>
                                 </Link>
                        </div>
                    </div>

                    <div className='uk-flex uk-flex-top'>
                        <div>
                            <h6>Entre em Contato</h6> 
                            <p>
                            <Link legacyBehavior href="mailto:atendimento@manole.com.br" ><a className='text_azul'><span>atendimento@manole.com.br</span></a></Link><br />
                                (11) 4196-6000 <br />
                                (11) 99866-4994
                            </p> 
                            <span>Segunda a sexta das 8h às 18h</span>
                        </div>
                    </div>

                    <div className='uk-flex uk-flex-top'>
                        <div className={`${styles.container_redes_footer}`} >
                            <h6 className='uk-text-center uk-margin-small-bottom'>Siga-nos nas redes :)</h6> 
                            
                            <div className='uk-grid uk-child-width-1-3 uk-grid-small grid-column-small uk-margin-top' data-uk-grid>

                                <div>
                                    <Image className={`uk-position-relative  ${styles.icons}`} src="/manole/footer/icon-whats.svg" fill   alt={`Icone do whatsapp da Manole`} />
                                </div>

                                <div>
                                    <Image className={`uk-position-relative  ${styles.icons}`}  src="/manole/footer/icon-telegran.svg" fill alt={`Icone do telegran da Manole`} />
                                </div>

                                <div>
                                    <Image className={`uk-position-relative  ${styles.icons}`}  src="/manole/footer/icon-instagran.svg" fill alt={`Icone do instagran da Manole`} />
                                </div>

                                <div>
                                    <Image className={`uk-position-relative  ${styles.icons}`}  src="/manole/footer/icon-youtube.svg" fill alt={`Icone do youtube da Manole`} />
                                </div>

                                <div>
                                    <Image className={`uk-position-relative  ${styles.icons}`}  src="/manole/footer/icon-facebook.svg" fill alt={`Icone do facebook da Manole`} />
                                </div>

                                <div>
                                    <Image className={`uk-position-relative  ${styles.icons}`}  src="/manole/footer/icon-linkdin.svg" fill alt={`Icone do Linkdin da Manole`} />
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
        <div className={`${styles.navBarfooter}`}>
            <div className='container_padrao'>
                <div className='uk-grid' data-uk-grid>
                    <div className='uk-width-2-3@m'>
                        <div className='uk-nav' data-uk-nav>
                            <ul  className={`${styles.nav_bar_footer} uk-navbar-nav`}>
                                {navigation.map((item, index) => (
                                    <li key={index} >

                                        <Link href={item.href} legacyBehavior>
                                            <a   title={item.name} >
                                                {item.name}
                                            </a>    
                                        </Link>  
                                    </li>
                                 ))} 
                            </ul>
                        </div>
                    </div>
                    <div className='uk-width-1-3@m uk-flex uk-flex-middle uk-flex-right@m uk-flex-center'> 
                        <div className={`${styles.copright}`} >© 2022 Manole. Todos os direitos reservados.</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    
  )
}

export default Footer