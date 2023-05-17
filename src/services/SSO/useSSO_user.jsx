import Config from '@/util/Config'


/*Notificação*/
export async function getNotification(email) {
    const res = await fetch( `https://m4.manole.h.codely.com.br/webservice/rest/server.php?wstoken=c0b544cef4039864667726553336548a&moodlewsrestformat=json&wsfunction=theme_manole_get_notify&user=${email}`, {
        method: "POST",
        headers: {
            'Accept': '*/*'
        },
    });
    const notification = await res.json();
    return notification;
}
 
/*Progresso e Certificado*/
export async function getProgress(email, curso) {
    const res = await fetch( `https://m4.manole.h.codely.com.br/webservice/rest/server.php?wstoken=${Config.WS_TOKEN}&moodlewsrestformat=json&wsfunction=theme_manole_get_progress&course=${curso} Manole&user=${email}`, {
        method: "POST",
        headers: {
            'Accept': '*/*'
        },
    });
    alert(res);
    const progress = await res.json();
    return progress;
}

/*LOGIN SSO*/
export async function getLoginSSO(username, firstname, lastname, email) {
    const res = await fetch( `https://m4.manole.h.codely.com.br/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=auth_userkey_request_login_url&user[username]=${username}&user[firstname]=${firstname} SSO&user[lastname]=${lastname} 1&user[email]=${email}&wstoken=${Config.WS_SSO_TOKEN}`, {
        method: "POST",
        headers: {

            'Accept': '*/*'
        },
    });
    const login = await res.json();
    return login;
}

 

