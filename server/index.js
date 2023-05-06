const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// add the submission
app.post('/vote', async (req, res) => {
  try {
    const { fullname, is_vaccinated, birthdate, gender } = req.body;
    const newPerson = await pool.query(
      'INSERT INTO people (fullname, is_vaccinated, birthdate, gender) VALUES($1, $2, $3, $4) RETURNING *',
      [fullname, is_vaccinated, birthdate, gender]
    );
    res.json(newPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// getting data
app.get('/data', async (req, res) => {
  try {
    const allPersons = await pool.query('SELECT * FROM people');
    const data = {
      data: allPersons.rows,
    };
    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
