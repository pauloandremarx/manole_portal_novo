import Config from '@/util/Config'

export async function getRecomendacoes(page = 0, user_id){

    let from = 0 ;
    let to = 19;
    const res = await fetch(
        `https://nwlax96g00.execute-api.us-east-1.amazonaws.com/recomendacao/products?from=${from + page}&to=${to + page}&user=${user_id}`,
        {
            method: "GET",
            headers: {
                'Authorization': Config.API_KEY,
            },
        }
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return await res.json();

}