//Chamando o módulo Axios para fazer requisição externa
const axios = require('axios');

//URL do Banco Central, usando "Template String" para pegar a data do dia
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

//Pegando os dados da URL do Banco Central
const getCotacaoAPI = url => axios.get(url);
const extractCotacao = res => res.data.value[0].cotacaoVenda; //Pega a resposta do axios.get e acessa os dados do json da API
const getToday = () => {
    const today = new Date()
    return (today.getMonth()+1) +'-'+ today.getDate() +'-'+ today.getFullYear()
    //console.log((today.getMonth()+1), today.getDate(), today.getFullYear()) //Pegando somente o dia, ano e mes da função "new Date()"" 
};
const getCotacao = async() => {
    try {  //Tenta pegar os dados do Banco Central
        const today = getToday()
        const url = getUrl(today)
        console.log(today)
        const res = await getCotacaoAPI(url) //04-22-2019
        const cotacao = extractCotacao(res)
        return cotacao
    } catch(err) {  //Em caso de erro no acesso a API do BC, a resposta retorna vazia
        return ''
    }
};

//Exportanto od ados da URL
module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao
}
