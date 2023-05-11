import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({refresh}) => {
  const [labels, setLabels] = useState([]);
  const [maleData, setMaleData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);
  const [otherData, setOtherData] = useState([]);

  const getChartData = async () => {
    const response = await fetch('http://localhost:5000/results');
    const jsonData = await response.json();

    setLabels(jsonData.labels);

    setMaleData([]);
    setFemaleData([]);
    setOtherData([]);

    jsonData.genderData.map((person) => {
      setMaleData((prev) => [...prev, person.male]);
      setFemaleData((prev) => [...prev, person.female]);
      setOtherData((prev) => [...prev, person.other]);
    });
  };

  useEffect(() => {
    getChartData();
  }, [refresh]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'People from each gender polled in census Vs age',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ages',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Counts',
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Male',
        data: maleData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Female',
        data: femaleData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Other',
        data: otherData,
        backgroundColor: 'rgb(255, 205, 86)',
      },
    ],
  };

  return (
    <Box h={350} w={500}>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default BarChart;
