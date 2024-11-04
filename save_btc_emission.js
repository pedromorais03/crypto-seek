require('dotenv').config()
const mysql = require('mysql2')
const BASE_URL = 'https://digiconomist.net/wp-json/mo/v1/bitcoin/stats/'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABSE
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
})

let start_date = new Date(2023, 0, 1)
let end_date = new Date(2023, 1, 1)

for(let data = new Date(start_date); data <= end_date; data.setDate(data.getDate() + 1)){
  let ano = data.getFullYear()
  let mes = data.getMonth() + 1
  let dia = data.getDate()

  if(mes < 10){
    mes = '0' + mes
  }

  if(dia < 10){
    dia = '0' + dia
  }

  let url = `${BASE_URL}${ano}${mes}${dia}`

  fetch(url).then((res) => res.json()).then((data) => {
    let total_energy_consumption = data[0]["24hr_kWh"]
    let total_network_carbon_footprint = data[0]["24hr_kgCO2"]
    let avg_energy_consumed_per_transaction = data[0]["Output_kWh"]
    let carbon_footprint_per_transaction = data[0]["Output_kgCO2"]

    insertCrypto(total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, 'BTC', url)
  })
  
}

function insertCrypto(total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, crypto, url){
  const sql = 'INSERT INTO emission (total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, crypto, url) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, crypto, url];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully, ID:', results.insertId);
  })
}

// console.log(start_date.getFullYear())
// console.log(start_date.getMonth() + 1)
// console.log(start_date.getDate())

// console.log(end_date.getFullYear())
// console.log(end_date.getMonth() + 1)
// console.log(end_date.getDate() - 3)