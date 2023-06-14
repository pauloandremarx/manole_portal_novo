"use client";
import styles from "./login.module.css";
import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", tenantKey: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          });

          if (res?.error) {
            setError(res.error);
          } else {
            setError(null);
          }
          if (res.url) router.push("painel/");
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <div className={ `${ styles.bg_login } nav_stick` }  > 
            <div  className={ `${ styles.container_login }` }>
            <div className={ `${ styles.form_container }` } >
            <div className="uk-flex uk-flex-center uk-position-relative">
              <Image
                className={`${styles.form_logo} next_img`}
                width={500}
                height={500}
                src="/manole/form/manole-educao.webp"
                alt="Logo manole"
              />
            </div>
            <h2>Fazer Login</h2>
            <form
              onSubmit={formik.handleSubmit}
               
            >
              <div
                className={`${styles.container_login} uk-width-1-1 uk-flex uk-flex-center`}
              >
                <div className={`${styles.bg_white}`}>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      
                    >
                      E-mail
                      <Field
                        name="email"
                        aria-label="Seu e-mail"
                        aria-required="true"
                        type="text"
                        className="uk-input"
                      />
                    </label>

                    <div className="uk-alert-danger uk-margin-small">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password" 
                    >
                      Senha
                      <Field
                        name="password"
                        aria-label="Sua senha"
                        aria-required="true"
                        type="password"
                        className="uk-input"
                      />
                    </label>

                    <div className="uk-alert-danger uk-margin-small">
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  <div className="uk-margin uk-width-1-1">
                    <div className="uk-flex uk-flex-between uk-width-1-1 ">
                      <div>
                        <label>
                          <input className="uk-radio" type="checkbox" />{" "}
                          <span className="uk-margin-small-left text">
                            Lembrar
                          </span>
                        </label>
                      </div>

                      <div className="uk-text-right">
                        <a className="text">
                          <i>Esqueceu a senha?</i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className={`${styles.submit}`}
                    >
                      {formik.isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                  </div>

                  <div className="uk-alert-danger uk-margin-small">
                    {error}
                  </div>
                </div>
              </div>

              <div className="uk-margin uk-width-1-1">
                <a className={`${styles.preferencias}`}>
                  Preferências de cookies
                </a>
              </div>

              <div className="uk-margin uk-width-1-1">
                <p className={`${styles.precisa_ajuda}`}>
                  Precisa de ajuda? Fale agora com um de
                  <br />
                  nossos atendentes <strong>(11) 4196-6000</strong>
                </p>
              </div>
            </form>
            <div className="uk-flex uk-flex-center uk-margin-small">
              <a className={`${styles.btn_form_loja}`}>Loja Virtual</a>
            </div>
            </div>
            </div>
            </div>
        )}
      </Formik>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
