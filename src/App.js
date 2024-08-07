import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  
  //when change coin and type USD, return the amount of Coin
  const [money, setMoney] = useState(0);
  const [coinAmount, setCoinAmount] = useState(0);
  const [selectedCoinID, setSelectecCoinID] = useState("");
  
  //just one time
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json)
        setLoading(false)
      })

  }, [])
  
  //Input Dollar Amount
  const onChange = (event) => {
    setMoney(event.target.value)
  };
  
  //Selected Coin
  const selectedChanged = (event) => {
    setSelectecCoinID(event.target.value)
  };
  
  const onClick = (event) => {
    const selectedCoin = coins.find(c => c.id === selectedCoinID);
    if (selectedCoin) {
      const coinPrice = selectedCoin.quotes.USD.price;
      setCoinAmount(money / coinPrice)
    }
  };
  
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> :  
        <select onChange={selectedChanged} value={selectedCoinID}>
       <option value="">Select a coin</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol}) = {coin.quotes.USD.price} USD
          </option>
        ))}
        </select>
        
}
      

      <div>
        <input
          onChange={onChange}
          type="number"
          value={money}
          placeHolder = "Please write down USD">
        </input>
        <button
          onClick={onClick}
        >Calculate</button>  ➡️ {coinAmount}
      </div>
    </div>
  )
}

export default App;
