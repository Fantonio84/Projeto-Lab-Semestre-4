import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '147.15.111.221',
  port: 3306,
  user: 'odonto',
  password: '!dWtg67$yhnm481',
  database: 'odonto',
});

export default pool;