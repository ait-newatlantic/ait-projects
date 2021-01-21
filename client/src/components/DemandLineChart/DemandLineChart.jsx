import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

export default function DemandLineChart(props) {

    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
            {
                label: 'Dự kiến',
                data: [props.dukien1, props.dukien2, props.dukien3, props.dukien4,
                props.dukien5, props.dukien6, props.dukien7, props.dukien8,
                props.dukien9, props.dukien10, props.dukien11, props.dukien12],
                backgroundColor: 'rgb(255, 99, 132)',
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y-axis-1',
            },
            {
                label: 'Thực tế',
                data: [props.thucte1, props.thucte2, props.thucte3, props.thucte4,
                props.thucte5, props.thucte6, props.thucte7, props.thucte8,
                props.thucte9, props.thucte10, props.thucte11, props.thucte12],
                backgroundColor: 'rgb(54, 162, 235)',
                fill: false,
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-2',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnArea: false,
                    },
                },
            ],
        },
    }

    return (
        <Line data={data} options={options} />
    )
}