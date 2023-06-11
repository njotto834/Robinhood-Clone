import React, { useState, useEffect } from 'react'
import './Stats.css'
import axios from "axios";
import StatsRow from './StatsRow.js'

function Stats() {
  // Access the API key from the environment variable
  const TOKEN = process.env.REACT_APP_API_KEY;
  const BASE_URL = 'https://finnhub.io/api/v1/quote'
  const [stockData, setStockData] = useState([])
  
  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  }

  useEffect(()=>{
    let stockData = []
    const stockList = ["AAPL", "MSFT", "TSLA", "BABA", "UBER", "DIS", "SBUX"];
    let promises = [];
    stockList.map((stock) => {
      promises.push(
        getStockData(stock)
        .then((res) => {
          stockData.push({
            name: stock,
            ...res.data
          })
        })
      )
    })

    Promise.all(promises).then(() => {
      setStockData(stockData)
      console.log(stockData)
    })
  }, [])

  return (
    <div className="stats">
        <div className="stats__container">
          <div className="stats__header">
            <p>Stocks</p>
          </div>
          <div className="stats__content">
            <div className="stats__rows">
              {stockData.map((stock) => (
                <StatsRow
                  // key={stock.data.ticker}
                  // name={stock.data.ticker}
                  // openPrice={stock.info.o}
                  // volume={stock.data.shares}
                  // price={stock.info.c}
                  />
              ))}
            </div>
          </div>
          <div className="stats__header">
            <p>Lists</p>
          </div>
        </div>
    </div>
  )
}

export default Stats