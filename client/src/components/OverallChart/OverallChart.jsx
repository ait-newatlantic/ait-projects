import React, { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts'

export default function OverallChart(props) {
    const a = parseInt(props.tiepcanchaohang) || 0;
    const b = parseInt(props.chaythu) || 0;
    const c = parseInt(props.damphan) || 0;
    const d = parseInt(props.chotdonhang) || 0;
    const e = parseInt(props.dacoc) || 0;
    const f = parseInt(props.dathanhtoantamung) || 0;
    const g = parseInt(props.hoantatgiaodich) || 0;
    const h = parseInt(props.bangiaochuathanhtoan) || 0;
    const j = parseInt(props.lenhopdong) || 0;
    const k = parseInt(props.giaodichthatbai) || 0;

    const options = {
        series: [
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            j,
            k
        ],
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
            labels: ["Tiếp cận chào hàng: " + a, "Chạy thử: " + b, "Đàm phán: " + c, "Chốt đơn hàng: " + d, "Đã cọc: " + e, "Đã thanh toán tạm ứng: " + f, "Hoàn tất giao dịch: " + g, "Bàn giao chưa thanh toán: " + h, "Lên hợp đồng: " + j, "Giao dịch thất bại: " + k],
            colors: ["#FF4560", "#00E396", "#5653FE", "#7D02EB", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794',
                '#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
            ],
        },
    };

    return (
        <>
            <Chart options={options.options} series={options.series} type="donut" />
        </>
    );
}
