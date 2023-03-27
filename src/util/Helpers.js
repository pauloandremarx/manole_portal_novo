export  function localStorageExpires()
{ 

    var toRemove = [],                      // Itens para serem removidos
        currentDate = new Date().getTime(); // Data atual em milissegundos

        if (typeof window !== 'undefined') {
                for (var i = 0, j = window.localStorage.length; i < j; i++) {
                var key = window.localStorage.key(i),
                    value = window.localStorage.getItem( key );

                // Verifica se o formato do item para evitar conflitar com outras aplicações
                if (value && value[0] === "{" && value.slice(-1) === "}") {

                        // Decodifica de volta para JSON
                        var current = JSON.parse(value);

                        // Checa a chave expires do item especifico se for mais antigo que a data atual ele salva no array
                        if (current.expires && current.expires <= currentDate) {
                            toRemove.push(key);
                        }
                }
                }

                // Remove itens que já passaram do tempo
                // Se remover no primeiro loop isto poderia afetar a ordem,
                // pois quando se remove um item geralmente o objeto ou array são reordenados
                for (var i = toRemove.length - 1; i >= 0; i--) {
                    window.localStorage.removeItem(toRemove[i]);
                }
        }
}

localStorageExpires();//Auto executa a limpeza

/**
 * Função para adicionar itens no localStorage
 * @param {string} chave Chave que será usada para obter o valor posteriormente
 * @param {*} valor Quase qualquer tipo de valor pode ser adicionado, desde que não falhe no JSON.stringify
 * @param {number} Tempo de vida em minutos do item
 */
 export  function setLocalStorage(chave, valor, minutos)
{
    var expirarem = new Date().getTime() + (60000 * minutos);

    if (typeof window !== 'undefined') {

    window.localStorage.setItem(chave, JSON.stringify({
        "value": valor,
        "expires": expirarem
    }));
    }
}

/**
 * Função para obter itens do localStorage que ainda não expiraram
 * @param {string} chave Chave para obter o valor associado
 * @return {*} Retorna qualquer valor, se o item tiver expirado irá retorna undefined
 */
 export  function getLocalStorage(chave)
{

        if (typeof window !== 'undefined') {
        localStorageExpires();//Limpa itens

        var value = window.localStorage.getItem(chave);  
            return value;
       
    }
}



/**
* Função para remover os itens do localstorage e do sessionstorage
@param {string} chave 
 **@returns {*}
*/
export  function removeStorage(chave)
{ 
       if (typeof window !== 'undefined') {
       localStorageExpires();//Limpa itens

       window.localStorage.removeItem(chave);
 
   }
}

 