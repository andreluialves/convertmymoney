//Fazendo a conversão com base na cotação e na quantidade
const convert = (cotacao, quantidade) => {
    return cotacao * quantidade
};

//Convertendo valor para ter 2 casas decimais
const toMoney = valor => {
    return parseFloat(valor).toFixed(2)
};

//Exportando as "convert" e "toMoney" para que fique disponivel para importação com o "require"
module.exports = {
    convert,
    toMoney
};