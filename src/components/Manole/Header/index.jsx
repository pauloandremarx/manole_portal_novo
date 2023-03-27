'use client'

import React, { useState, useEffect, useRef } from 'react' 
import styles from './header.module.css'; 
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getLocalStorage, removeStorage } from '../../../util/Helpers'
 
import cookieCutter from 'cookie-cutter'
const navigation = [ 

  { name: 'Soluções', href: '/#solucoes' },
  { name: 'Educação', href: '/#educacao' }, 
  { name: 'Editora', href: '/#editora'  }, 

]
  

const Header = () => { 
    const router = useRouter();
    

    function handleLogout(e) {
        e.preventDefault();
    
        removeStorage("token");
        removeStorage("userid");
        removeStorage("refleshToken");
        removeStorage("username");
        removeStorage("email");
        router.push("/login");
      }

      const [logado, setLogado] = useState(false);
 
      useEffect(() => {

      if (getLocalStorage('username') == 'undefined' || getLocalStorage('username') == null || getLocalStorage('username') == '') {
        setLogado(false);
      } else {
        setLogado(true);
      } 

    }, [getLocalStorage('username')])

      
  return (
      <>
          
   <div className={`${styles.nav}`}  >
            <div id={`${styles.id_nav}`} 
                data-uk-sticky="animation: uk-animation-slide-top; sel-target: .bg_stick; cls-active: uk-navbar-sticky; top: 200; end:#end_nav; ">
                <div className={`${styles.bg_stick}`}>
                    <nav className={`uk-navbar-container uk-navbar-transparent container_padrao uk-navbar  ${styles.color_nav} `}    data-uk-navbar>

                        <div className="uk-navbar-left">
                            <ul className="uk-navbar-nav  uk-flex uk-flex-middle uk-height-1-1">
                                <li>
                                <Link href="/" legacyBehavior>
                                    <a className='zero-min-height' > 
                                    
                                       <img src="/manole/header/logo.webp"  className={`${styles.logo_navheader}`}  alt="Logo Manole" /> 
                              
                                    </a>

                                </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="uk-navbar-right">
                              <ul className="uk-navbar-nav uk-flex uk-flex-middle uk-height-1-1 uk-visible@m">
                                  
                                  <li  >
                                        <span className={`${styles.navborder}`} >   
                                            <Link href="/" legacyBehavior>
                                                <a  title="Home" className="uk-button uk-button-text" >
                                                    Home
                                                </a>
                                             </Link>
                                        </span>
                                </li>
                                  
                                  <li  >
                                        <span className={`${styles.navborder}`} >   
                                            <Link href="/sobre-nos" legacyBehavior>
                                                <a  title="Sobre-nos" className="uk-button uk-button-text" >
                                                    Sobre-nos
                                                </a>
                                             </Link>
                                        </span>
                                </li>

                            {navigation.map((item, index) => ( 
                                   <li key={index}  >
                                        <span className={`${styles.navborder}`} >   
                                         
                                            <a href={item.href} title={item.name} className="uk-button uk-button-text" >
                                                {item.name}
                                            </a>
                                             
                                        </span>
                                </li>
                                ))} 

 
                                <li>
                                    <div   className={`${styles.btn} ${styles.loja_virtual}`}>
                                    <Link href={"https://www.manole.com.br/"} legacyBehavior >
                                        <a  target="_blank" rel="noopener noreferrer">
                                            <div> 
                                                <div className={`${styles.width_container_cart}`}>
                                                    <img src="/manole/header/carrinho-de-compra-branco.svg" fill className={`uk-position-relative  ${styles.filter_orange}`} sizes="4px" alt="Icone carrinho de compra" /> 
                                                </div>
                                                Loja virtual
                                            </div>
                                        </a>
                                        </Link>
                                    </div>
                                </li>
                          
                                {logado ?(

                                            <li>
                                            <aside  className={`${styles.flex_user}`}>
                                            <div className='uk-flex uk-flex-middle'>
                                                <div  className={`${styles.img_user}`}  ></div>
                                            </div>

                                            

                                                <div>
                                                    <p  className={`${styles.seja_bemvindo}`} >Seja Bem-vindo</p>
                                                    <span className={`${styles.username}`}>Usuário <span data-uk-icon="icon: chevron-down; ratio: 1"></span></span>  
                                                </div>
                                            
                                            </aside>
                                         
                                                <div  className={`${styles.username_dropdown}`} data-uk-dropdown="mode: click">
                                                    <Link href={ `/painel` } legacyBehavior><a>Painel</a></Link>
                                                    <Link href={`/painel/meu-perfil`} legacyBehavior><a>Meu perfil</a></Link>
                                                   
                                                      <a>Alterar Senha</a>
                                                    <div  className={`${styles.laranja}`}> </div> 
                                                        <a onClick={handleLogout}>Sair</a>
                                                     
                                                </div>
                                            
                                            </li>
                                
                               ):(

                                <li>
                                    <div className={`${styles.btn} ${styles.area_aluno}`} > 
                                        <Link href="/login/"   legacyBehavior  >
                                            <a  >
                                                <div> 
                                                    <div className={`${styles.width_container_cart}`}>
                                                        <Image src="/manole/header/livro-laranja.svg" fill className={`uk-position-relative  ${styles.filter_orange}`} sizes="4px" alt="Icone livro laranja" /> 
                                                    </div>
                                                    Área do Aluno 
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </li>

                                

                               )}

                                
                                
                            </ul>
                        

                            <div className="uk-navbar-nav uk-hidden@m">
                                <div className='padding_right_h'>
                                    <a className="uk-navbar-toggle" data-uk-toggle="target: #my-mobile-nav">
                                        <span className='hamburgue'  ></span>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                    </nav> 

                </div>
            </div>
        </div>
        <div id="my-mobile-nav" data-uk-offcanvas="overlay: false; flip:true;">
            <div className="uk-offcanvas-bar">

                    <div className="nav_mobile_header_container"> 
                        <div className='uk-flex uk-flex-between'>
                            <div>
                                   <Image src="/manole/header/logo.webp" fill className='uk-position-relative' sizes="50px" /> 
                               
                            
                            </div>
                            <div className='uk-flex uk-flex-top'><button className="uk-offcanvas-close uk-display-block uk-position-relative" type="button"  ></button></div>
                        </div>
                    </div>
                    <ul className="nav_mobile_container uk-nav uk-nav-default uk-width-1-1 uk-margin-top">

                    {navigation.map((item, index) => (
                                   <li key={index}  >
                                     
                                            <a href={item.href} title={item.name} className="mobile_a">
                                                {item.name}
                                            </a>
                                         
                                </li>
                                ))} 
                    
                        <li className="uk-nav-divider"></li>
                        <li><strong>Entre em contato</strong></li>
                        <li><a  href="mailto:atendimento@manole.com.br"><span>atendimento@manole.com.br</span></a></li>
                        <li><span>(11) 4196-600</span></li>
                        <li><span>(11) 98966-4994</span></li>
                        <li className='orange'>Segunda a sexta das 8h ás 18h</li>
                    </ul>
                </div>

            
        </div>

    </>
  )
}

export default Header