"use client";

import styles from "./headerv2.module.css";
import Image from "next/image";
import Link from "next/link";

import { getLocalStorage, removeStorage } from "../../../util/Helpers";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const url_painel =
    pathname == "/meus-curso/" ? `uk-button ${styles.button_active}` : "";

  const url_meus_cursos =
    pathname == "/meus-curso/" ? `uk-button ${styles.button_active}` : "";

  const url_cursos_disponiveis =
    pathname == "/cursos-disponiveis/"
      ? `uk-button ${styles.button_active}`
      : "";

  const navigation = [
    {
      name: "Painel",
      href: `/painel/${getLocalStorage("username")}/${getLocalStorage(
        "userid"
      )}`,
      className: url_painel,
    },
    { name: "Meus cursos", href: "/meus-cursos/", className: url_meus_cursos },
    {
      name: "Cursos disponiveis",
      href: "/cursos-disponiveis/",
      className: url_cursos_disponiveis,
    },
    { name: "Portal", href: "/", className: "" },
  ];

  function handleLogout(e) {
    e.preventDefault();

    removeStorage("token");
    removeStorage("refleshToken");
    removeStorage("username");
    removeStorage("email");
    removeStorage("userid");
    router.push("/login");
  }

  var logado = false;

  if (
    getLocalStorage("username") == "undefined" ||
    getLocalStorage("username") == null ||
    getLocalStorage("username") == ""
  ) {
    logado = false;
  } else {
    logado = true;
  }

  return (
    <>
      <div className={`${styles.nav} uk-position-top`}>
        <div
          id={`${styles.id_nav}`}
          data-uk-sticky={`animation: uk-animation-slide-top; sel-target: .bg_stick; cls-active: ${styles.uk_navbar_sticky} ; top: 200; end:#end_nav;`}
        >
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
                      <img src="/manole/perfil/mobile_icon.svg" />
                    </a>
                  </li>
                  <li className="uk-visible@m">
                    <Link
                      href={`/painel/${getLocalStorage(
                        "username"
                      )}/${getLocalStorage("userid")}`}
                      legacyBehavior
                    >
                      <a className={`${styles.zero_min_height}`}>
                        <img
                          src="/manole/perfil/logo.png"
                          className={`${styles.logo_navheader}`}
                          alt="Logo Manole"
                        />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="uk-navbar-center uk-hidden@m">
                <ul className="uk-navbar-nav uk-flex uk-flex-middle uk-height-1-1 ">
                  <li>
                    <Link
                      href={`/painel/${getLocalStorage(
                        "username"
                      )}/${getLocalStorage("userid")}`}
                      legacyBehavior
                    >
                      <a className={`${styles.zero_min_height}`}>
                        <img
                          src="/manole/perfil/logo.png"
                          className={`${styles.logo_navheader}`}
                          alt="Logo Manole"
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
                      <Link
                        href={`/painel/${getLocalStorage(
                          "username"
                        )}/${getLocalStorage("userid")} `}
                        legacyBehavior
                      >
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
                      <Link href="/meus-cursos/" legacyBehavior>
                        <a
                          title="Meus cursos"
                          className={
                            pathname == "/meus-cursos"
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
                      <Link href="/cursos-disponiveis/" legacyBehavior>
                        <a
                          title="Cursos disponiveis"
                          className={
                            pathname == "/cursos-disponiveis"
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
                    <aside className={`${styles.flex_user}`}>
                      <div
                        className={`uk-flex uk-flex-middle ${styles.margin_itens}`}
                      >
                        <div className="uk-visible@m">
                          <a uk-toggle="target: .toggle-search; animation: uk-animation-fade">
                            <img
                              className={`toggle-search ${styles.close_lupa}`}
                              src="/manole/perfil/lupa.svg"
                            />{" "}
                            <img
                              hidden
                              className={`toggle-search ${styles.close_lupa}`}
                              src="/manole/perfil/close.svg"
                            />
                          </a>
                        </div>
                        <div>
                          <a>
                            <img src="/manole/perfil/sino.svg" />
                          </a>
                        </div>
                        <aside
                          hidden
                          className={`${styles.username_dropdown} `}
                          data-uk-dropdown="mode: click;pos: bottom-center"
                        >
                          <Link href="/meus-cursos" legacyBehavior>
                            <a>
                              •<strong>"Novo aviso"</strong>
                            </a>
                          </Link>
                          <a>"Novo post forum"</a>
                          <a>"Nova mensagem privada"</a>
                          <a>"Módulo liberado"</a>
                          <a>"Atividade liberada"</a>
                          <a onClick={handleLogout}>
                            <img src="/manole/perfil/preferencias.svg" />{" "}
                            Preferencias de notificações
                          </a>
                        </aside>
                        <div className="uk-visible@m">
                          <a title="ajuda">
                            <img src="/manole/perfil/ajuda.svg" />
                          </a>
                        </div>

                        <div
                          className={`${styles.img_user}`}
                          style={{
                            backgroundImage: `url("/manole/perfil/user_people.svg")`,
                          }}
                        ></div>
                        <aside
                          hidden
                          className={`${styles.username_dropdown} uk-visible@m`}
                          data-uk-dropdown="mode: click;pos: bottom-center"
                        >
                          <Link
                            href={`/painel/${getLocalStorage(
                              "username"
                            )}/${getLocalStorage("userid")}/meu-perfil`}
                            legacyBehavior
                          >
                            <a>
                              <img src="/manole/perfil/meu_perfil.svg" /> Meu
                              Perfil <span className={`${styles.star}`}>9</span>
                            </a>
                          </Link>
                          <Link
                            href={`/painel/${getLocalStorage(
                              "username"
                            )}/${getLocalStorage("userid")}/minha-senha`}
                            legacyBehavior
                          >
                            <a>
                              <img src="/manole/perfil/minha_senha.svg" /> Minha
                              Senha{" "}
                            </a>
                          </Link>
                          <a>
                            <img src="/manole/perfil/notas.svg" /> Notas{" "}
                          </a>
                          <a>
                            <img src="/manole/perfil/mensagens.svg" />{" "}
                            Menssagens{" "}
                          </a>
                          <a>
                            <img src="/manole/perfil/arquivos.svg" /> Arquivos
                            Privados{" "}
                          </a>
                          <a onClick={handleLogout}>
                            <img src="/manole/perfil/fi_log-out.svg" /> Sair
                          </a>
                        </aside>
                      </div>
                    </aside>
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
                <img
                  src="/manole/header/logo.webp"
                  className={`uk-position-relative ${styles.logo_off_canvas}`}
                />
              </div>

              <a className="uk-position-absolute uk-offcanvas-close">
                <img
                  src="/manole/perfil/close.svg"
                  className={`${styles.close_offcnvas}`}
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
                    Meu Perfil{" "}
                    <div className={`${styles.nivel_off}`}>
                      {" "}
                      Nivel<span className={`${styles.star}`}>9</span>{" "}
                    </div>
                  </div>
                </div>
              </a>
              <ul className={`uk-nav-sub ${styles.my_nav_sub}`}>
                <li>
                  <aside
                    className={`${styles.username_dropdown} ${styles.username_dropdown_off_canvas}`}
                  >
                    <a href="/meus-cursos/">
                      <img src="/manole/perfil/meu_perfil.svg" /> Meu Perfil{" "}
                    </a>
                    <a>
                      <img src="/manole/perfil/minha_senha.svg" /> Minha Senha{" "}
                    </a>
                    <a>
                      <img src="/manole/perfil/notas.svg" /> Notas{" "}
                    </a>
                    <a>
                      <img src="/manole/perfil/mensagens.svg" /> Menssagens{" "}
                    </a>
                    <a>
                      <img src="/manole/perfil/arquivos.svg" /> Arquivos
                      Privados{" "}
                    </a>
                    <a onClick={handleLogout}>
                      <img src="/manole/perfil/preferencias.svg" />{" "}
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
                  <img src="/manole/perfil/right-md.svg" />
                </div>
              </li>
            ))}

            <li className={`${styles.sem_bordinha} uk-margin-small-top`}>
              <img src="/manole/perfil/ajuda.svg" /> Ajuda
            </li>

            <li className={`${styles.sem_bordinha}`}>
              <a onClick={handleLogout}>
                <img src="/manole/perfil/fi_log-out.svg" /> Sair
              </a>{" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
