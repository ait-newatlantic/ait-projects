import React from 'react'
import { Pie } from '@reactchartjs/react-chart.js'

export default function CarPieChart(props) {
  const data = {
    labels: ['6540', '6460', '43253', '43265', '43266', '53228', '53229', '65115', '65116', '65117', 'Cẩu 5-7 tấn'],
    datasets: [
      {
        label: 'BIỂU ĐỒ ĐÁNH GIÁ SỐ XE ĐÃ BÁN',
        data: [
          props.c6540,
          props.c6460,
          props.c43253,
          props.c43265,
          props.c43266,
          props.c53228,
          props.c53229,
          props.c65115,
          props.c65116,
          props.c65117,
          props.c57],
        backgroundColor: [
          'rgb(54, 150, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 75, 192)',
          'rgb(255, 99, 75)',
          'rgb(111, 162, 235)',
          'rgb(132, 192, 192)',
          'rgb(113, 99, 132)',
          'rgb(54, 152, 235)',
          'rgb(75, 142, 192)',
          'rgb(75, 12, 192)',
          'rgb(75, 102, 192)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <>
      <Pie data={data} />
    </>
  )
}
