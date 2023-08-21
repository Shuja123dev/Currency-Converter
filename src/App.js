import { useEffect, useState } from 'react';
import './App.css';
import getCurrencies, { converter } from './api';
import exchange from './images/exchange.svg'

function App() {

  const [currencies, setCurrencies] = useState();
  const [currencyKeys, setCurrencyKeys] = useState()
  const [inputType, setInputType] = useState('USD');
  const [outputType, setOutputType] = useState('AED');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  const handleChangeInput = (e) => {
    setInputType(e.target.value);
  }
  const handleChangeOutput = (e) => {
    setOutputType(e.target.value);
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  }

  const fetchCurrencies = async () => {
    const response = await getCurrencies();
    setCurrencies(Object.values(response));
    setCurrencyKeys(Object.keys(response));
    if (amount === 0) {
      setResult(0)
    }
  }

  const exchangeValue = () => {
    let changer = inputType;
    setInputType(outputType);
    setOutputType(changer);
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchResult = async () => {
    setResult('')
    const response = await converter(inputType, outputType, parseFloat(amount))
    setResult(response.result)
    console.log(response);
  }

  useEffect(() => {
    fetchResult();
  }, [amount, inputType, outputType])

  return (
    <>
      <div className="app">
        <div className='main'>
          <div className="inner-main">
            <div className="box">
              <h4>Amount</h4>
              <div className="input-box">
                <span>{inputType}</span>
                <input value={amount} placeholder='Enter Amount...' onChange={handleChange} type='number' />
              </div>
            </div>
            <div className="box">
              <h4>From</h4>
              <select name="inputType" id="inputType" value={inputType} onChange={handleChangeInput}>
                {
                  (currencyKeys && currencyKeys.map((item, index) => {
                    return <option key={item} value={item}>{item} {currencies[index]}</option>
                  })) || <option value='USD'>USD United States Dollar </option>
                }
              </select>
            </div>
            <div className="interchange">
              <img onClick={exchangeValue} src={exchange} alt="" />
            </div>
            <div className="box">
              <h4>To</h4>
              <select name="outputType" id="outputType" value={outputType} onChange={handleChangeOutput}>
                {
                  (currencyKeys && currencyKeys.map((item, index) => {
                    return <option key={item} value={item}>{item} {currencies[index]}</option>
                  })) || <option value='AED'>AED United Arab Emirates Dirham</option>
                }
              </select>
            </div>
          </div>
          <p>{result} {outputType}</p>
        </div>
      </div>
    </>
  );
}

export default App;
