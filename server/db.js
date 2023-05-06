const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'whysoserious',
  host: 'localhost',
  port: 5432,
  database: 'vaccine_census',
});

module.exports = pool;
