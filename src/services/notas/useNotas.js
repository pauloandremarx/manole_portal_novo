export async function getNotas(user_email) {

        const res = await fetch( `https://m4.manole.h.codely.com.br/webservice/rest/server.php?wstoken=c0b544cef4039864667726553336548a&moodlewsrestformat=json&wsfunction=theme_manole_get_grades&user=${user_email}`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Falha ao carregar, tentando novamente...");
        }
        const minhas_notas = await res.json();
        return minhas_notas;

}



