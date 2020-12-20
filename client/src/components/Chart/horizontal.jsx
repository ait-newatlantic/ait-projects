import React from 'react'
import {Bar} from 'react-chartjs-2';

export default function Horizontal (props){

    return(
        <div className="bar">
                    <Bar
                    data={{
                        labels: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        ],
                        datasets: [
                        {
                            label: "BIỂU ĐỒ ĐÁNH GIÁ KINH DOANH",
                            backgroundColor: [
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850",
                            "#3e95cd",
                            "#8e5ea2",
                            "#3cba9f",
                            "#e8c3b9",
                            "#c45850",
                            "#e8c3b9",
                            "#c45850",
                            ],
                            data: [2478, 5267, 734, 784, 433, 2000, 5267, 734, 784, 433, 5267, 734,]
                        }
                        ]
                    }}
                    options={{
                        legend: { display: false },
                        title: {
                        display: true,
                        text: "BIỂU ĐỒ ĐÁNH GIÁ KINH DOANH"
                        }
                    }}
                    />
      </div>
    )
}