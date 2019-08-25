

const api = require('./api-bcb');
/* Quando fazemos testes unitários em funções/código de um modulo externo (Ex. Axios), precisamos "mockar" 
o módulo, caso contrário o teste será de integração e não um teste unitário lógico de um código/funções */ 
//Importando o Axios (Módulo externo)
const axios = require('axios');

//"Mockando" um módulo externo (Axios)
//O "Jest" inspeciona as funções do Axios, testando-as
//Se não "monckarmos" o módulo externo o "jest" testa somente a saída do código final da integração 
jest.mock('axios');


test('getCotacaoAPI', () => {
    const res = {      //Construindo o acesso ao objeto de resposta do getCotacaoAPI
        data: {
            value: [
                {cotacaoVenda: 3.90 }
            ]
        }
    }
//Quando o "Axios" for chamado com o "get" o teste será sobre a resposta "mockada"
axios.get.mockResolvedValue(res)

//Testando se o teste de acesso ao objeto de resposta é igual ao código da "lib" api.bcb.js
api.getCotacaoAPI('url').then(resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
})

});

test('extractCotacao', () => {
    const cotacao = api.extractCotacao({      //Construindo o acesso ao objeto de resposta do extractCotacao
        data: {
            value: [
                {cotacaoVenda: 3.90 }
            ]
        }
    })
    expect(cotacao).toBe(3.90)
});

/* Para descobrirmos o quanto temos de cobertura de todo o código que está sendo testado, podemos configurar 
algumas variáveis do "Jest" (módulo externo de testes), inserindo a variável "collectCoverage" dentro do arquivo package.json */

//Agrupando vários testes e fixando a data de retorno do objeto, pois precisamos devolver a data com o valor dela
describe('getToday', () => {
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }
    //Volta o "Date" com era antes      
    afterEach (() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getToday()
        console.log(today)
        //expect(today).toBe('1-1-2019')
    })
});
