import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'

const data = {
  labels: ['NVL', 'Gia Lai', 'Lâm Đồng', 'Vũng Tàu', 'Bình Phước', 'Cần Thơ', 'Đăk Lăk', 'Đà Nẵng', 'Quảng Trị', 'Hưng Yên', 'Bình Định', 'Bình Dương', 'Đồng Nai'],
  datasets: [
    {
      label: '6460',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '6540',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 150, 235)',
    },
    {
      label: '43253',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 75, 192)',
    },
    {
      label: '43265',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 75)',
    },
    {
      label: '43266',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(111, 162, 235)',
    },
    {
      label: '53228',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(132, 192, 192)',
    },
    {
      label: '53229',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(113, 99, 132)',
    },
    {
      label: '65115',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 152, 235)',
    },
    {
      label: '65116',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 142, 192)',
    },
    {
      label: '65117',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 12, 192)',
    },
    {
      label: 'Cẩu 5-7 tấn',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 102, 192)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
}

const StackedBar = () => (
  <>
    <Bar data={data} options={options} />
  </>
)

export default StackedBar
