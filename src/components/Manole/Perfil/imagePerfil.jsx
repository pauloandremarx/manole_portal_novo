
import {getLocalStorage} from '@/util/Helpers'
import {useRouter} from 'next/navigation'
import { getPerfilNormal } from "@/services/formProfile/useFormProfile";
import {atualizarAvatar } from "@/services/atualizarPerfil/useAtualizarPerfil";
import styles from "./image-perfil.module.css";

import {useQuery} from "@tanstack/react-query";
import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {useSession, signOut} from "next-auth/react";

export default function ImagePerfil() {
    const { data: session, status } = useSession();
    const refleshToken = session?.user?.refleshToken;

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["perfil-normal_upload_image"],
        queryFn: () => getPerfilNormal(refleshToken),
        refetchOnWindowFocus: false,
        enabled: !!refleshToken,
    });

    const fileInputRef = useRef();
    const [image, setImage] = useState();
    const [avatar, setAvatar] = useState();
    const [preview, setPreview] = useState();


    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null)
        }
    }, [image]);

    const formdata = new FormData();
    const submitAtualizarAvatar = async ( event ) => {
        event.preventDefault();

        formdata.append("file", avatar);
        console.log( formdata.get('file') );

        setTimeout( () => {
            atualizarAvatar.atualizacaoAvatar( getLocalStorage( "refleshToken" ), formdata )
                .then( ( response ) => {
                    Swal.fire( {
                        icon: "success",
                        title: "Cadastro",
                        text: response.status == 200 ? "Avatar atualizado com sucesso!" : response.status + ": Não foi possivel atualizar o avatar, tente novamente mais tarde!",
                        confirmButtonText: "Confirmar",
                    } );
                } )
                .catch( ( error ) => {
                    Swal.fire( {
                        icon: "error",
                        title: "Opps!",
                        text:  error,
                    } );
                } );
        }, 1000 );
    };

return (
    <>
    {error ? (error.message) : isLoading || isFetching ? (
                <div className="loader-manole"></div>
            ) :
            data ? (
                <form onSubmit={submitAtualizarAvatar}>
                    <div className={ `${ styles.box_image } ` }>

                        {preview ? (<><div
                            className={ `${ styles.img_user }` }
                            style={ {
                                backgroundImage: `url( ${preview })`,
                            } }
                        ></div></>) : (<>  <div
                            className={ `${ styles.img_user }` }
                            style={ {
                                backgroundImage: `url( ${data.avatar })`,
                            } }
                        ></div></>)}


                        <div className={ `${ styles.box_image_upload } ` }>
                            <label>
                                <img className={`input_img`}  src="/manole/perfil/botao_photo.svg" alt={ "Botão Upload" } />
                                <input
                                    type="file"
                                    style={{display:'none'}}
                                    ref={fileInputRef}
                                    onClick={(event) => {

                                    fileInputRef.current.click();}}

                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        if (file && file.type.substring(0, 5) === "image") {
                                            setImage(file);
                                            setAvatar(file);
                                            formdata.append("file", event.target.files[0]);
                                        } else {
                                            setImage(null);
                                            setAvatar(null);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    {preview && (<button className={`${styles.btn_confirmar}`} type='submit'>Confirmar</button>)}
                </form>

            ) : ('não achou nada')

    }
    </>
)}
