import React from 'react'
import { Pie } from '@reactchartjs/react-chart.js'

export default function BranchCustomerPieChart(props) {
    const data = {
        labels: ['NVL', 'Gia Lai', 'Lâm Đồng', 'Vũng Tàu', 'Bình Phước', 'Cần Thơ', 'Đăk Lăk', 'Đà Nẵng', 'Quảng Trị', 'Hưng Yên', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'PDA'],
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
                    props.binhduong,
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
                    '#e6beff',
                    '#9a6324',
                    '#fffac8'
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
