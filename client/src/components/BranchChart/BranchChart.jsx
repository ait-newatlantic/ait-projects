import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'

export default function StackedBar(props){
  const data = {
    labels: ['NVL', 'Gia Lai', 'Lâm Đồng', 'Vũng Tàu', 'Bình Phước', 'Cần Thơ', 'Đăk Lăk', 'Đà Nẵng', 'Quảng Trị', 'Hưng Yên', 'Tây Ninh', 'Đồng Nai', 'PDA'],
    datasets: [
      {
        label: '6460',
        data: [
          props.nvl_6460, 
          props.gialai_6460, 
          props.lamdong_6460, 
          props.vungtau_6460, 
          props.binhphuoc_6460, 
          props.cantho_6460, 
          props.daklak_6460, 
          props.danang_6460, 
          props.quangtri_6460, 
          props.hungyen_6460, 
          props.tayninh_6460, 
          props.dongnai_6460,
          props.pda_6460
        ],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '6540',
        data: [
          props.nvl_6540, 
          props.gialai_6540, 
          props.lamdong_6540, 
          props.vungtau_6540, 
          props.binhphuoc_6540, 
          props.cantho_6540, 
          props.daklak_6540, 
          props.danang_6540, 
          props.quangtri_6540, 
          props.hungyen_6540, 
          props.tayninh_6540, 
          props.dongnai_6540,
          props.pda_6540
        ],
        backgroundColor: 'rgb(54, 150, 235)',
      },
      {
        label: '43253',
        data: [
          props.nvl_43253, 
          props.gialai_43253, 
          props.lamdong_43253, 
          props.vungtau_43253, 
          props.binhphuoc_43253, 
          props.cantho_43253, 
          props.daklak_43253, 
          props.danang_43253, 
          props.quangtri_43253, 
          props.hungyen_43253, 
          props.tayninh_43253, 
          props.dongnai_43253,
          props.pda_43253
        ],
        backgroundColor: 'rgb(75, 75, 192)',
      },
      {
        label: '43265',
        data: [
          props.nvl_43265, 
          props.gialai_43265, 
          props.lamdong_43265, 
          props.vungtau_43265, 
          props.binhphuoc_43265, 
          props.cantho_43265, 
          props.daklak_43265, 
          props.danang_43265, 
          props.quangtri_43265, 
          props.hungyen_43265, 
          props.tayninh_43265, 
          props.dongnai_43265,
          props.pda_43265
        ],
        backgroundColor: 'rgb(255, 99, 75)',
      },
      {
        label: '43266',
        data: [
          props.nvl_43266, 
          props.gialai_43266, 
          props.lamdong_43266, 
          props.vungtau_43266, 
          props.binhphuoc_43266, 
          props.cantho_43266, 
          props.daklak_43266, 
          props.danang_43266, 
          props.quangtri_43266, 
          props.hungyen_43266, 
          props.tayninh_43266, 
          props.dongnai_43266,
          props.pda_43266
        ],
        backgroundColor: 'rgb(111, 162, 235)',
      },
      {
        label: '53228',
        data: [
          props.nvl_53228, 
          props.gialai_53228, 
          props.lamdong_53228, 
          props.vungtau_53228, 
          props.binhphuoc_53228, 
          props.cantho_53228, 
          props.daklak_53228, 
          props.danang_53228, 
          props.quangtri_53228, 
          props.hungyen_53228, 
          props.tayninh_53228, 
          props.dongnai_53228,
          props.pda_53228
        ],
        backgroundColor: 'rgb(132, 192, 192)',
      },
      {
        label: '53229',
        data: [
          props.nvl_53229, 
          props.gialai_53229, 
          props.lamdong_53229, 
          props.vungtau_53229, 
          props.binhphuoc_53229, 
          props.cantho_53229, 
          props.daklak_53229, 
          props.danang_53229, 
          props.quangtri_53229, 
          props.hungyen_53229, 
          props.tayninh_53229, 
          props.dongnai_53229,
          props.pda_53229
        ],
        backgroundColor: 'rgb(113, 99, 132)',
      },
      {
        label: '65115',
        data: [
          props.nvl_65115, 
          props.gialai_65115, 
          props.lamdong_65115, 
          props.vungtau_65115, 
          props.binhphuoc_65115, 
          props.cantho_65115, 
          props.daklak_65115, 
          props.danang_65115, 
          props.quangtri_65115, 
          props.hungyen_65115, 
          props.tayninh_65115, 
          props.dongnai_65115,
          props.pda_65115
        ],
        backgroundColor: 'rgb(54, 152, 200)',
      },
      {
        label: '65116',
        data: [
          props.nvl_65116, 
          props.gialai_65116, 
          props.lamdong_65116, 
          props.vungtau_65116, 
          props.binhphuoc_65116, 
          props.cantho_65116, 
          props.daklak_65116, 
          props.danang_65116, 
          props.quangtri_65116, 
          props.hungyen_65116, 
          props.tayninh_65116, 
          props.dongnai_65116,
          props.pda_65116
        ],
        backgroundColor: 'rgb(75, 142, 192)',
      },
      {
        label: '65117',
        data: [
          props.nvl_65117, 
          props.gialai_65117, 
          props.lamdong_65117, 
          props.vungtau_65117, 
          props.binhphuoc_65117, 
          props.cantho_65117, 
          props.daklak_65117, 
          props.danang_65117, 
          props.quangtri_65117, 
          props.hungyen_65117, 
          props.tayninh_65117, 
          props.dongnai_65117,
          props.pda_65117
        ],
        backgroundColor: 'rgb(75, 12, 192)',
      },
      {
        label: 'Cẩu 5-7 tấn',
        data: [
          props.nvl_c57, 
          props.gialai_c57, 
          props.lamdong_c57, 
          props.vungtau_c57, 
          props.binhphuoc_c57, 
          props.cantho_c57, 
          props.daklak_c57, 
          props.danang_c57, 
          props.quangtri_c57, 
          props.hungyen_c57, 
          props.tayninh_c57, 
          props.dongnai_c57,
          props.pda_c57
        ],
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
  return(
  <>
    <Bar data={data} options={options} />
  </>
  )
}


