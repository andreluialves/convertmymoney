const convert = require('./convert.js');

test('convert cotacao 4 to quantidade 4', () => {
    expect(convert.convert(4,4)).toBe(16)
})

test('convert cotacao 0 to quantidade 4', () => {
    expect(convert.convert(0,4)).toBe(0)
})

test('toMoney converts float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('convert converts string', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})