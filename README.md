# Census System and Trend Analysis

A basic vaccination census system and trend analysis

## Tech Stack

ReactJS, [ChakraUI](https://chakra-ui.com/), [ChartJS](https://www.chartjs.org/), [Vite](https://vitejs.dev/) [reactdatagrid](https://reactdatagrid.io/), NodeJS, Express, PostgreSQL

## Installation

### Frontend

- Clone this repository to your local machine.
- Open a terminal in the project folder & move to `client` folder.
- Run `yarn install` to install dependencies.
- Run `yarn run dev` to start the development server.
- Open a web browser and go to http://localhost:3000.

### Backend

- Move to `server` folder.
- Run `yarn install` to install dependencies.
- Run `yarn run dev` to start the development server.

### Database

In this I used postgreSQL db. Download & install it & then run following commands to setup database.

```sql
CREATE DATABASE vaccine_census;

CREATE TYPE genders AS ENUM ('male', 'female', 'other');

CREATE TABLE people(
  id SERIAL NOT NULL PRIMARY KEY,
  fullname TEXT NOT NULL,
  is_vaccinated BOOLEAN,
  birthdate TIMESTAMP NOT NULL,
  gender genders NOT NULL
);
```

Then in open [server -> db.js](./server/db.js) & change user & password to your credentials.

## Demo

![Screenshot (21)](https://github.com/sagarmittal1/vaccine-census-system/assets/54253848/3b341862-432c-42a5-a0d6-728fd794ae9d)

![Screenshot (22)](https://github.com/sagarmittal1/vaccine-census-system/assets/54253848/6db0d1e1-29ca-42bb-8da9-19064c2412fd)

https://github.com/sagarmittal1/vaccine-census-system/assets/54253848/3a66cd52-fdab-48bf-8bf2-734d959c3690
