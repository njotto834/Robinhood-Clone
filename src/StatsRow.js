import React from 'react'

function StatsRow() {
  return (
    <div className="row">
        <div className="row__intro">
            {/* <h1>{props?.name}</h1> */}
            <h1>AAPL</h1>
            {/* <p>{props.volume &&
                (propps.volume + " shares")}</p> */}
                <p>200 Shares</p>
        </div>
        <div className="row__chart">
            {/* <img src={StockChart} height={16}/> */}
        </div>
        <div className="row__numbers">
            {/* <p className="row__price">{props.price}</p>
            <p className="row__percentage"> +{Number(percentage).toFixed(2)}</p> */}
            <p className="row__price">$200.00</p>
            <p className="row__percentage"> +2%</p>
        </div>
    </div>
  )
}

export default StatsRow