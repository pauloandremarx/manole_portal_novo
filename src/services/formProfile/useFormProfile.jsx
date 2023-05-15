import Config from '@/util/Config'


/*Perfil normal*/
export async function getPerfilNormal(token) {
    const res = await fetch(Config.API_URL + `auth/profile`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            Authorization: token,
            'Accept': 'application/json'
        },
    });
    const perfil_normal = await res.json();
    return perfil_normal;
}

/*Perfil Academico*/

export async function getPerfilAcademico(token) {
    const res = await fetch(Config.API_URL + `auth/profile/academy`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const minhaformacao = await res.json();
    return minhaformacao;
}

export async function getInstituicoes() {
    const res = await fetch(
        Config.API_URL + `auth/profile/institutions?search=`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: Config.API_KEY,
                Accept: "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const instituicoes_total = await res.json();
    const instituicoes = instituicoes_total.instituicoes;
    return instituicoes;
}

export async function getFormacao() {
    const res = await fetch(Config.API_URL + `auth/profile/academicEducation`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: Config.API_KEY,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const academicEducation_total = await res.json();
    const academicEducation = academicEducation_total.academicEducation;
    return academicEducation;
}

export async function getMeuCursos() {
    const res = await fetch(Config.API_URL + `auth/profile/courses?search=`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: Config.API_KEY,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const meus_cursos_total = await res.json();
    const meus_cursos = meus_cursos_total.courses;
    return meus_cursos;
}



export async function getMeuSpecialty() {
    const res = await fetch(
        Config.API_URL + `auth/profile/specialty?search=`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: Config.API_KEY,
                Accept: "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const meu_specialty_total = await res.json();
    const meu_specialty = meu_specialty_total.specialty
    return meu_specialty;
}



