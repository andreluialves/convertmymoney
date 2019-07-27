//Importanto o Express
const express = require('express');

//Executando o express
const app = express();

//Importanto o path
const path = require('path');

//Importanto o arquivo de conversão
const convert = require('./lib/convert');

//Criando uma variável de ambiente para autorizar uma configuração externa da porta de comunicação
//const port = env.PORT || 3000;

//Chamando o Ejs como view engine
app.set ('view engine', 'ejs');

//Configurando o path das páginas
app.set ('views', path.join(__dirname, 'views'));

//Determinar que o "Express" procure arquivos na pasta "public", caso não ache na pasta principal
app.use (express.static(path.join(__dirname, 'public')));

//Determinar a resposta da requisição de acesso a aplicação seja a página home.ejs
app.get ('/', (req, res) => {
    res.render ('home')
});

//Determinar a resposta da requisição de acesso a URL /cotacao seja a página home.ejs
app.get ('/cotacao', (req, res) => {
    const {cotacao, quantidade} = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render ('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos!'
        })
    }
});

//Criando um servidor
app.listen(3000, err => {
    if (err) {
        console.log('Opa, não foi possível iniciar.')
    }
    else {
        console.log('ConvertMyMoney está online...')
    }
});

