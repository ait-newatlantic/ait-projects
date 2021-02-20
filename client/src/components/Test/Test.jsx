import React from 'react';
import Chart from 'react-apexcharts'

export default function Test() {
    const options = {
        colors: ['#F44336', '#E91E63', '#9C27B0', '#7fe5f0', '#ff80ed', '#5ac18e', '#f7347a', '#4ca3dd', '#ff7373', '#696969'],
        series: [44, 55, 41, 17, 15, 12, 11, 10, 23, 22],
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true
                            }
                        }
                    }
                }
            },
            labels: ["Tiếp cận chào hàng", "Chạy thử", "Đàm phán", "Chốt đơn hàng", "Đã cọc", "Đã thanh toán tạm ứng", "Hoàn tất giao dịch", "Bàn giao chưa thanh toán", "Lên hợp đồng", "Giao dịch thất bại"],
        },
    };

    return (
        <div className="donut" >
            <Chart options={options.options} series={options.series} type="donut"/>
        </div >
    );
}
