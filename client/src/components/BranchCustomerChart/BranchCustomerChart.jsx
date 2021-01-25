import React from 'react'
import { HorizontalBar } from '@reactchartjs/react-chart.js'

export default function BranchCustomerChart(props) {
  const data = {
    labels: ['NVL', 'Gia Lai', 'Lâm Đồng', 'Vũng Tàu', 'Bình Phước', 'Cần Thơ', 'Đăk Lăk', 'Đà Nẵng', 'Quảng Trị', 'Hưng Yên', 'Tây Ninh', 'Đồng Nai', 'PDA'],
    datasets: [
      {
        label: 'BIỂU ĐỒ SỐ KHÁCH HÀNG TỪNG CHI NHÁNH',
        data: [
          props.nvl,
          props.gialai,
          props.lamdong,
          props.vungtau,
          props.binhphuoc,
          props.cantho,
          props.daklak,
          props.danang,
          props.quangtri,
          props.hungyen,
          props.tayninh,
          props.dongnai,
          props.pda,
        ],
        backgroundColor: [
            '#e6194b', 
            '#3cb44b', 
            '#ffe119', 
            '#4363d8', 
            '#f58231', 
            '#911eb4', 
            '#46f0f0', 
            '#f032e6', 
            '#bcf60c', 
            '#fabebe', 
            '#008080', 
            '#9a6324', 
            '#fffac8'
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <>
      <HorizontalBar data={data} options={options} />
    </>
  )
}