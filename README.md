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

![Screenshot 1](/client/public/screenshot_1.png)

![Screenshot 2](/client/public/screenshot_2.png)

[![Census System and Trend Analysis](https://res.cloudinary.com/marcomontalbano/image/upload/v1686075630/video_to_markdown/images/youtube--Kux9kbj6PH0-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/Kux9kbj6PH0 'Census System and Trend Analysis')
