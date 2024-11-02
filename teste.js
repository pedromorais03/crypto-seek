// i can change the interval (d1 = daily, m1 = minute, h1 = hour)
// fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
// .then((res) => res.json()).then((data) => {
//    let crypto = data.data
//    crypto.forEach(c => {
//       console.log(c.priceUsd, c.date)
//    });
// })

// i can change the days interval
// fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30')
// .then((res) => res.json()).then((data) => {
//    let crypto = data.prices
//    // console.log(data)
//    crypto.forEach(c => {
//       console.log(c[1])
//    });
// })

// fetching carbon emission
fetch('https://digiconomist.net/wp-json/mo/v1/bitcoin/stats/20241031')
.then((res) => res.json()).then((data) => {
   console.log(data[0]["24hr_kWh"])
})