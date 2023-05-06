CREATE DATABASE vaccine_census;

CREATE TYPE genders AS ENUM ('male', 'female', 'other');

CREATE TABLE people(
  id SERIAL NOT NULL PRIMARY KEY,
  fullname TEXT NOT NULL,
  is_vaccinated BOOLEAN,
  birthdate TIMESTAMP NOT NULL,
  gender genders NOT NULL
);