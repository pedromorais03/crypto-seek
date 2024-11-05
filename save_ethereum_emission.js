require('dotenv').config()
const mysql = require('mysql2')
const BASE_URL = 'https://digiconomist.net/wp-json/mo/v1/ethereum/stats/'

const start_date = new Date(2024, 6, 7)
const end_date = new Date(2024, 7, 1)

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

const connectionsPromise = connection.promise()

async function connect_db(){
  await connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database.');

    exec_loop()
  })
}

function exec_loop(){
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
    // console.log(url)
  
    fetch(url).then((res) => res.json()).then((data) => {
      if(data){
        console.log(url)
        let total_energy_consumption = data[0]["24hr_kWh"]
        let total_network_carbon_footprint = data[0]["24hr_kgCO2"]
        let avg_energy_consumed_per_transaction = data[0]["Gas_unit_Wh"]
        let carbon_footprint_per_transaction = data[0]["Gas_unit_gCO2"]
    
        insertCrypto(total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, 'ETH', url)
      }else{
        insertLog(url)
      }
    }).catch(error => {
      console.error(error.message);
    })
    
  }
}


async function insertCrypto(total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, crypto, url){
  const sql = 'INSERT INTO emission (total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, crypto, url) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [total_energy_consumption, total_network_carbon_footprint, avg_energy_consumed_per_transaction, carbon_footprint_per_transaction, crypto, url];

  await connectionsPromise.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully, ID:', results.insertId);
  })
}

async function insertLog(url){
  const sql = 'INSERT INTO log (url) VALUES (?)';
  const values = [url];

  await connectionsPromise.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully, ID:', results.insertId);
  })
}

connect_db()