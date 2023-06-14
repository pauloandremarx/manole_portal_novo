"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalStorage, removeStorage } from "@/util/Helpers";
import LogadoHeaderv1 from "@/components/Manole/Perfil_Images/header_v1";
import {useSession, signOut} from "next-auth/react";

const navigation = [
    { name: "Soluções", href: "/#solucoes" },
    { name: "Educação", href: "/#educacao" },
    { name: "Editora", href: "/#editora" },
];

const Header = () => {
    const router = useRouter();
    const { data: session, status } = useSession()

    const stickyHeader = useRef();

    // Sticky Menu Area
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
    });

    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        let fixedTop = 200;
        var header = document.querySelector(".nav_stick");
        if ((header = !null)) {
            const header = document.querySelector(".nav_stick");
            window.pageYOffset > fixedTop &&
            window.pageYOffset <= document.body.offsetHeight - 1100
                ? header.classList.add(`${styles.is_sticky}`)
                : header.classList.remove(`${styles.is_sticky}`);
        }
    };

    return (
        <>
            <div className={`${styles.nav} nav_stick`} ref={stickyHeader}>
                <div id={`${styles.id_nav} id_nav`}>
                    <div className={`${styles.bg_stick} bg_active`}>
                        <nav
                            className={`uk-navbar-container uk-navbar-transparent container_padrao uk-navbar  ${styles.color_nav} `}
                            data-uk-navbar
                        >
                            <div className="uk-navbar-left">
                                <ul className="uk-navbar-nav  uk-flex uk-flex-middle uk-height-1-1">
                                    <li>
                                        <Link href="/" legacyBehavior>
                                            <a className="zero-min-height">
                                                <Image
                                                    width={150}
                                                    height={150}
                                                    src="/manole/header/logo.webp"
                                                    className={`${styles.logo_navheader} next_img`}
                                                    alt="Logo Manole"
                                                />
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="uk-navbar-right">
                                <ul className="uk-navbar-nav uk-flex uk-flex-middle uk-height-1-1 uk-visible@m">
                                    <li>
                    <span className={`${styles.navborder}`}>
                      <Link href="/" legacyBehavior>
                        <a title="Home" className="uk-button uk-button-text">
                          Home
                        </a>
                      </Link>
                    </span>
                                    </li>

                                    <li>
                    <span className={`${styles.navborder}`}>
                      <Link href="/sobre-nos" legacyBehavior>
                        <a
                            title="Sobre-nos"
                            className="uk-button uk-button-text"
                        >
                          Sobre-nos

                        </a>
                      </Link>
                    </span>
                                    </li>

                                    {navigation.map((item, index) => (
                                        <li key={index}>
                      <span className={`${styles.navborder}`}>
                        <a
                            href={item.href}
                            title={item.name}
                            className="uk-button uk-button-text"
                        >
                          {item.name}
                        </a>
                      </span>
                                        </li>
                                    ))}

                                    <li>
                                        <div className={`${styles.btn} ${styles.loja_virtual}`}>
                                            <Link href={"https://www.manole.com.br/"} legacyBehavior>
                                                <a target="_blank" rel="noopener noreferrer">
                                                    <div>
                                                        <div className={`${styles.width_container_cart}`}>
                                                            <Image
                                                                src="/manole/header/carrinho-de-compra-branco.svg"
                                                                width={50}
                                                                height={50}
                                                                className={`uk-position-relative  ${styles.filter_white}`}
                                                                sizes="4px"
                                                                alt="Icone carrinho de compra"
                                                            />
                                                        </div>
                                                        Loja virtual
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </li>

                                    {status === "authenticated" ? (
                                        <li>
                                             <LogadoHeaderv1 />
                                        </li>
                                    ) : (
                                        <li>
                                            <div className={`${styles.btn} ${styles.area_aluno}`}>
                                                <Link href="/login/" legacyBehavior>
                                                    <a>
                                                        <div>
                                                            <div className={`${styles.width_container_cart}`}>
                                                                <Image
                                                                    src="/manole/header/livro-laranja.svg"
                                                                    width={10}
                                                                    height={10}
                                                                    className={`uk-position-relative  ${styles.filter_orange} next_img`}
                                                                    alt="Icone livro laranja"
                                                                />
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
                                    <div className={`${styles.padding_right_h}`}>
                                        <a
                                            className="uk-navbar-toggle"
                                            data-uk-toggle="target: #my-mobile-nav"
                                        >
                      <span
                          className={`${styles.hamburgue}`}
                          data-uk-icon="icon: menu; ratio: 2"
                      ></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <div id="my-mobile-nav" data-uk-offcanvas="overlay: true; flip:true;">
                <div className={`uk-offcanvas-bar  uk-offcanvas-bar_v1`}>
                    <div className={`${styles.nav_mobile_header_container}`}>
                        <div className="uk-flex uk-flex-between">
                            <div>
                                <Image
                                    src="/manole/header/logo.webp"
                                    width={50}
                                    height={50}
                                    className="uk-position-relative next_img"
                                    alt={`Logo da manole`}
                                />
                            </div>
                            <div className="uk-flex uk-flex-top">
                                <button
                                    className="uk-offcanvas-close uk-display-block uk-position-relative"
                                    type="button"
                                    data-uk-close
                                ></button>
                            </div>
                        </div>
                    </div>
                    <ul
                        className={` ${styles.nav_mobile_container} uk-nav uk-nav-default uk-width-1-1 uk-margin-top`}
                    >
                        {navigation.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} legacyBehavior>
                                    <a title={item.name} className={`${styles.mobile_a}`}>
                                        {item.name}
                                    </a>
                                </Link>
                            </li>
                        ))}

                        <li className="uk-nav-divider"></li>
                        <li>
                            <strong>Entre em contato</strong>
                        </li>
                        <li>
                            <a href="mailto:atendimento@manole.com.br">
                                <span>atendimento@manole.com.br</span>
                            </a>
                        </li>
                        <li>
                            <span>(11) 4196-600</span>
                        </li>
                        <li>
                            <span>(11) 98966-4994</span>
                        </li>
                        <li className="orange">Segunda a sexta das 8h ás 18h</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
