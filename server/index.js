const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const calculateAge = (timestamp) => {
  const birthdate = new Date(timestamp);
  const diff = Date.now() - birthdate.getTime();
  const ageData = new Date(diff);
  const calculateAge = Math.abs(ageData.getUTCFullYear());

  return calculateAge - 1970;
};

// add the submission
app.post('/vote', async (req, res) => {
  try {
    const { fullname, is_vaccinated, birthdate, gender } = req.body;
    const newPerson = await pool.query(
      'INSERT INTO people (fullname, is_vaccinated, birthdate, gender) VALUES($1, $2, $3, $4) RETURNING *',
      [fullname, is_vaccinated, birthdate, gender]
    );
    console.log(newPerson.rows[0]);
    res.json(newPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// getting data for table
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

// line chart API
app.get('/counts', async (req, res) => {
  try {
    const allPersons = await pool.query('SELECT * FROM people');
    const vaccinated = req.query.is_vaccinated;

    const ages = [];

    allPersons.rows.forEach((person) => {
      if (vaccinated === 'true' && person.is_vaccinated === true) {
        ages.push(calculateAge(person.birthdate));
      }
      if (vaccinated === 'false' && person.is_vaccinated === false) {
        ages.push(calculateAge(person.birthdate));
      }
    });

    countData = [];

    for (let i = 1; i <= 100; i++) {
      let ageCount = ages.filter((age) => age == i).length;
      ageCount !== 0
        ? countData.push({
            count: ageCount,
            age: i,
          })
        : undefined;
    }

    const data = {
      data: countData,
    };

    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

// Bar Chart API
app.get('/results', async (req, res) => {
  try {
    const allPersons = await pool.query('SELECT * FROM people');
    const fetchedData = allPersons.rows.map((person) => ({
      age: calculateAge(person.birthdate),
      gender: person.gender,
    }));

    let labels = [];
    const genderData = [];

    fetchedData.map((person) => {
      labels.push(person.age);
    });

    labels = labels.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    labels.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    for (let i = 0; i < labels.length; i++) {
      const male = fetchedData.filter((person) => {
        return person.age === labels[i] && person.gender === 'male';
      }).length;
      const female = fetchedData.filter((person) => {
        return person.age === labels[i] && person.gender === 'female';
      }).length;
      const other = fetchedData.filter((person) => {
        return person.age === labels[i] && person.gender === 'other';
      }).length;

      const evalData = {
        age: labels[i],
        male,
        female,
        other,
      };
      genderData.push(evalData);
    }

    const data = {
      labels,
      genderData,
    };

    res.json(data);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
