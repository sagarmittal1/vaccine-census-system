import React, { useEffect, useState } from 'react';
import { Box, Center, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ refresh }) => {
  const [choice, setChoice] = useState('vaccinated');
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);

  const getChartData = async (choice) => {
    const URL =
      choice === 'vaccinated'
        ? 'http://localhost:5000/counts?is_vaccinated=true'
        : 'http://localhost:5000/counts?is_vaccinated=false';

    const response = await fetch(URL);
    const jsonData = await response.json();

    setChartData([]);
    setLabels([]);

    jsonData.data.map((point) => {
      setChartData((prev) => [...prev, point.count]);
      setLabels((prev) => [...prev, point.age]);
    });
  };

  useEffect(() => {
    getChartData(choice);
  }, [choice, refresh]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of vaccinated / unvaccinated people vs age',
      },
    },
    tension: 0.4,
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
        label: choice === 'vaccinated' ? 'Vaccinated' : 'Unvaccinated',
        data: chartData,
        borderColor:
          choice === 'vaccinated' ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)',
        backgroundColor:
          choice === 'vaccinated'
            ? 'rgba(255, 99, 132, 0.5)'
            : 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Box mt={2}>
      <Center>
        <RadioGroup defaultValue="vaccinated" onChange={(e) => setChoice(e)}>
          <Stack direction="row" spacing="4">
            <Radio value="vaccinated">Vaccinated</Radio>
            <Radio value="unvaccinated">Unvaccinated</Radio>
          </Stack>
        </RadioGroup>
      </Center>
      <Line data={data} options={options} />
    </Box>
  );
};

export default LineChart;
