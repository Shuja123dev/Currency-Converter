import axios from "axios"

const getCurrencies = async () => {
    const response = await axios.get('https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols', {
        headers: {
            'X-RapidAPI-Key': '2819954955msh9d66056844d80fbp168d10jsn2da9c582f5e8',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    })
    return response.data.symbols;
}

const converter = async (input, output, amount) => {
    const response = await axios.get('https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert', {
        headers: {
            'X-RapidAPI-Key': '2819954955msh9d66056844d80fbp168d10jsn2da9c582f5e8',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        },
        params: {
            from: input,
            to: output,
            amount: amount
        }
    })
    return response.data;
}

export default getCurrencies;
export { converter };