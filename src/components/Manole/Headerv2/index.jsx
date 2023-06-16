"use client";

import styles from "./headerv2.module.css";
import Image from "next/image";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Notification from "@/components/Manole/Notification";
import LogadoHeaderv2 from "@/components/Manole/Perfil_Images/header_v2";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const url_painel =
      pathname === "/painel/meus-cursos"
          ? `uk-button ${styles.button_active}`
          : "";

  const url_meus_cursos =
      pathname === "/painel/meus-cursos"
          ? `uk-button ${styles.button_active}`
          : "";

  const url_cursos_disponiveis =
      pathname === "/painel/cursos-disponiveis"
          ? `uk-button ${styles.button_active}`
          : "";

  const navigation = [
    {
      name: "Painel",
      href: `/painel`,
      className: url_painel,
    },
    {
      name: "Meus cursos",
      href: "/painel/meus-cursos",
      className: url_meus_cursos,
    },
    {
      name: "Cursos disponiveis",
      href: "/painel/cursos-disponiveis",
      className: url_cursos_disponiveis,
    },
    { name: "Portal", href: "/", className: "" },
  ];

  const stickyHeader = useRef();

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    let fixedTop = 200;
    const header = document.querySelector(".nav_stick");
    window.pageYOffset > fixedTop &&
    window.pageYOffset <= document.body.offsetHeight - 1100
        ? header.classList.add(`${styles.is_sticky}`)
        : header.classList.remove(`${styles.is_sticky}`);
  };

  return (
      <>
        <div className={`${styles.nav}  nav_stick`} ref={stickyHeader}>
          <div id={`${styles.id_nav}`}>
            <div className={`${styles.bg_stick}`}>
              <nav
                  className={`uk-navbar-container uk-navbar-transparent container_padrao uk-navbar  ${styles.color_nav} `}
                  data-uk-navbar
              >
                <div className="uk-navbar-left">
                  <ul className="uk-navbar-nav  uk-flex uk-flex-middle uk-height-1-1 uk-">
                    <li className="padding_right_h uk-hidden@m">
                      <a
                          className="uk-navbar-toggle"
                          data-uk-toggle="target: #my-mobile-nav"
                      >
                        <Image
                            className="next_img"
                            src="/manole/perfil/mobile_icon.svg"
                            alt="Icone do mobile"
                            width={100}
                            height={100}
                        />
                      </a>
                    </li>
                    <li className="uk-visible@m">
                      <Link href={`/painel`} legacyBehavior>
                        <a className={`${styles.zero_min_height}`}>
                          <Image
                              src="/manole/perfil/logo.png"
                              className={`${styles.logo_navheader} next_img`}
                              alt="Logo Manole"
                              width={100}
                              height={100}
                          />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="uk-navbar-center uk-hidden@m">
                  <ul className="uk-navbar-nav uk-flex uk-flex-middle uk-height-1-1 ">
                    <li>
                      <Link href={`/painel`} legacyBehavior>
                        <a className={`${styles.zero_min_height}`}>
                          <Image
                              src="/manole/perfil/logo.png"
                              className={`${styles.logo_navheader}`}
                              alt="Logo Manole"
                              width={100}
                              height={100}
                          />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="uk-navbar-right">
                  <ul className="uk-navbar-nav uk-flex uk-flex-middle uk-height-1-1 ">
                    <li className="uk-visible@m">
                    <span className={`${styles.navborder} `}>
                      <Link href={`/painel`} legacyBehavior>
                        <a
                            title="Painel"
                            className={
                              pathname == "/painel"
                                  ? `uk-button ${styles.button_active}`
                                  : "uk-button uk-button-text"
                            }
                        >
                          Painel
                        </a>
                      </Link>
                    </span>
                    </li>

                    <li className="uk-visible@m">
                    <span className={`${styles.navborder} `}>
                      <Link href="/painel/meus-cursos" legacyBehavior>
                        <a
                            title="Meus cursos"
                            className={
                              pathname == "/painel/meus-cursos"
                                  ? `uk-button ${styles.button_active}`
                                  : "uk-button uk-button-text"
                            }
                        >
                          Meus cursos
                        </a>
                      </Link>
                    </span>
                    </li>

                    <li className="uk-visible@m">
                    <span className={`${styles.navborder} `}>
                      <Link href="/painel/cursos-disponiveis" legacyBehavior>
                        <a
                            title="Cursos disponiveis"
                            className={
                              pathname == "/painel/cursos-disponiveis"
                                  ? `uk-button ${styles.button_active}`
                                  : "uk-button uk-button-text"
                            }
                        >
                          Cursos disponiveis
                        </a>
                      </Link>
                    </span>
                    </li>

                    <li className="uk-visible@m">
                    <span className={`${styles.navborder} `}>
                      <Link href="/" legacyBehavior>
                        <a
                            title="Portal"
                            className={`uk-button uk-button-text`}
                        >
                          Portal
                        </a>
                      </Link>
                    </span>
                    </li>

                    <li>
                      <LogadoHeaderv2 />
                    </li>
                  </ul>
                </div>
              </nav>
              <aside
                  className="uk-container uk-container-small toggle-search"
                  hidden
              >
                <form className="uk-flex uk-flex-center">
                  <div className="uk-margin uk-width-1-1">
                    <div className="uk-inline uk-width-1-1">
                    <span
                        className={`uk-form-icon ${styles.colorAzuzinho}`}
                        uk-icon="icon: search"
                    ></span>
                      <input
                          className={`uk-input ${styles.mysearch}`}
                          type="search"
                          aria-label="Not clickable icon"
                          placeholder="O que você procura?"
                      />
                      <a
                          uk-toggle="target: .toggle-search; animation: uk-animation-fade"
                          className={`uk-position-center-right uk-margin-small-right ${styles.colorAzuzinho}`}
                          uk-icon="icon: close"
                      ></a>
                    </div>
                  </div>
                </form>
              </aside>
            </div>
          </div>
        </div>

        <div
            id="my-mobile-nav"
            data-uk-offcanvas="overlay: false; flip:true;"
            className={`${styles.off_canvas_flip_id}`}
        >
          <div className={`uk-offcanvas-bar ${styles.my_off_canvas}`}>
            <div className="">
              <div className="uk-flex uk-flex-center">
                <div>
                  <Image
                      src="/manole/header/logo.webp"
                      className={`uk-position-relative next_img ${styles.logo_off_canvas}`}
                      width={100}
                      height={100}
                      alt="Icone de logo da manole"
                  />
                </div>

                <a className="uk-position-absolute uk-offcanvas-close">
                  <Image
                      src="/manole/perfil/close.svg"
                      className={`${styles.close_offcnvas} next_img`}
                      width={100}
                      height={100}
                      alt="Icone  de fechar"
                  />
                </a>
              </div>

              <div className="uk-inline uk-width-1-1">
              <span
                  className={`uk-form-icon ${styles.colorAzuzinho}`}
                  uk-icon="icon: search"
              ></span>
                <input
                    className={`uk-input ${styles.mysearch}`}
                    type="search"
                    aria-label="Not clickable icon"
                    placeholder="O que você procura?"
                />
                <a
                    className={`uk-position-center-right uk-margin-small-right ${styles.colorAzuzinho}`}
                    uk-icon="icon: close"
                ></a>
              </div>
            </div>
            <ul
                className="nav_mobile_container uk-nav uk-nav-default uk-width-1-1 uk-margin-top"
                data-uk-nav
            >
              <li className="uk-parent">
                <a href="#" className={`parent_title ${styles.parent_title}`}>
                  <div className="uk-flex uk-flex-miidle">
                    <div className={`${styles.img_user}`}></div>
                    <div className={`${styles.meu_perfil_offcanvas}`}>
                      Meu Perfil
                      <div className={`${styles.nivel_off}`}>
                        Nivel<span className={`${styles.star}`}>9</span>
                      </div>
                    </div>
                  </div>
                </a>
                <ul className={`uk-nav-sub ${styles.my_nav_sub}`}>
                  <li>
                    <aside
                        className={`${styles.username_dropdown} ${styles.username_dropdown_off_canvas}`}
                    >
                      <Link href="painel/meus-cursos" legacyBehavior>
                        <a>
                          <Image
                              className="next_img"
                              src="/manole/perfil/meu_perfil.svg"
                              width={100}
                              height={100}
                              alt="Icone  de meu perfil"
                          />{" "}
                          Meu Perfil
                        </a>
                      </Link>
                      <a href="painel/minha-senha">
                        <Image
                            className="next_img"
                            src="/manole/perfil/minha_senha.svg"
                            width={100}
                            height={100}
                            alt="Icone  de minha senha"
                        />{" "}
                        Minha Senha
                      </a>
                      <Link href="painel/notas" legacyBehavior>
                        <a>
                          <Image
                              className="next_img"
                              src="/manole/perfil/notas.svg"
                              width={100}
                              height={100}
                              alt="Icone  de notas"
                          />{" "}
                          Notas
                        </a>
                      </Link>
                      <a>
                        <Image
                            className="next_img"
                            src="/manole/perfil/mensagens.svg"
                            width={100}
                            height={100}
                            alt="Icone  de minha mensagem"
                        />{" "}
                        Menssagens
                      </a>
                      <a>
                        <Image
                            className="next_img"
                            src="/manole/perfil/arquivos.svg"
                            width={100}
                            height={100}
                            alt="Icone  de arquivos"
                        />{" "}
                        Arquivos Privados
                      </a>
                      <a onClick={signOut}>
                        <Image
                            className="next_img"
                            src="/manole/perfil/preferencias.svg"
                            width={100}
                            height={100}
                            alt="Icone  de deslogar"
                        />
                        Prefereências
                      </a>
                    </aside>
                  </li>
                </ul>
              </li>

              {navigation.map((item, index) => (
                  <li key={index} className={`${styles.bordinha_bottom}`}>
                    <a href={item.href} title={item.name} className="mobile_a">
                      {item.name}
                    </a>

                    <div>
                      <Image
                          className="next_img"
                          src="/manole/perfil/right-md.svg"
                          width={100}
                          height={100}
                          alt="Icone  de flechinha"
                      />
                    </div>
                  </li>
              ))}

              <li className={`${styles.sem_bordinha} uk-margin-small-top`}>
                <Image
                    className="next_img"
                    src="/manole/perfil/ajuda.svg"
                    width={100}
                    height={100}
                    alt="Icone  de ajuda"
                />{" "}
                Ajuda
              </li>

              <li className={`${styles.sem_bordinha}`}>
                <a onClick={signOut}>
                  <Image
                      className="next_img"
                      src="/manole/perfil/fi_log-out.svg"
                      width={100}
                      height={100}
                      alt="Icone  de deslogar"
                  />{" "}
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
  );
};

export default Header;
