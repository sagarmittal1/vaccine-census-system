import React, { useEffect, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

const CensusTable = ({ refresh }) => {
  const [censusData, setCensusData] = useState([]);

  const getCensus = async () => {
    try {
      const response = await fetch('http://localhost:5000/data');
      const jsonData = await response.json();
      const fetchedData = jsonData.data;

      const data = fetchedData.map((person) => ({
        name: person.fullname,
        gender: person.gender,
        birthdate: person.birthdate.substring(0, 10),
        is_vaccinated: person.is_vaccinated === true ? 'Yes' : 'No',
      }));

      setCensusData(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCensus();
  }, [refresh]);

  const columns = [
    {
      name: 'name',
      header: 'Name',
    },
    {
      name: 'gender',
      header: 'Gender',
    },
    {
      name: 'birthdate',
      header: 'Birthdate',
    },
    {
      name: 'is_vaccinated',
      header: 'Vaccinated',
    },
  ];

  const gridStyle = { marginTop: 10, minHeight: 650 };

  return (
    <ReactDataGrid
      idProperty="id"
      columns={columns}
      dataSource={censusData}
      style={gridStyle}
      pagination
      defaultLimit={15}
    />
  );
};

export default CensusTable;
