import React, { useState, useEffect } from 'react'
import './Stats.css'
import axios from "axios";
import StatsRow from './StatsRow.js'
import { db } from './Firebase.js'

function Stats() {
  // Access the API key from the environment variable
  const TOKEN = process.env.REACT_APP_API_KEY;
  const BASE_URL = 'https://finnhub.io/api/v1/quote'
  const [stockData, setStockData] = useState([])
  const [ myStocks, setMyStocks ] = useState([])
  const getMyStocks = () => {
    db
    .collection('myStocks')
    .onSnapshot(snapshot => {
      console.log(snapshot)

      let promises = []
      let tempData = []
      snapshot.docs.map((doc) => {
        console.log(doc.data())
        promises.push(getStockData(doc.data().ticker)
        .then(res => {
          tempData.push({
            id: doc.id,
            data: doc.data(),
            info: res.data
          })
        })
        )
      })
    })
  }
  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  }

  useEffect(()=>{
    getMyStocks()
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
                  key={stock.name}
                  name={stock.name}
                  openPrice={stock.o}
                  price={stock.c}
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