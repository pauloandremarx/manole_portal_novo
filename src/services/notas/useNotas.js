import Config from '@/util/Config'
export async function getNotas(user_email) {

        const res = await fetch( `https://m4.manole.h.codely.com.br/webservice/rest/server.php?wstoken=${Config.WS_TOKEN}&moodlewsrestformat=json&wsfunction=theme_manole_get_grades&user=${user_email}`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Falha ao carregar, tentando novamente...");
        }
        const minhas_notas = await res.json();
        return minhas_notas;

}



