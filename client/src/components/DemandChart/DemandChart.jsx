import React from "react";
import { Bar } from "react-chartjs-2";

export default function DemandChart(props) {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Tổng số xe đang giao dịch hiện tại",
        data: [
          props.tongcongdanggiaodich1,
          props.tongcongdanggiaodich2,
          props.tongcongdanggiaodich3,
          props.tongcongdanggiaodich4,
          props.tongcongdanggiaodich5,
          props.tongcongdanggiaodich6,
          props.tongcongdanggiaodich7,
          props.tongcongdanggiaodich8,
          props.tongcongdanggiaodich9,
          props.tongcongdanggiaodich10,
          props.tongcongdanggiaodich11,
          props.tongcongdanggiaodich12,
        ],
        backgroundColor: "rgb(19,132,150)",
      },
      {
        label: "Đang giao dịch trong tháng",
        data: [
          props.danggiaodich1,
          props.danggiaodich2,
          props.danggiaodich3,
          props.danggiaodich4,
          props.danggiaodich5,
          props.danggiaodich6,
          props.danggiaodich7,
          props.danggiaodich8,
          props.danggiaodich9,
          props.danggiaodich10,
          props.danggiaodich11,
          props.danggiaodich12,
        ],
        backgroundColor: "rgb(108,117,125)",
      },
      {
        label: "Giao dịch thành công",
        data: [
          props.thanhcong1,
          props.thanhcong2,
          props.thanhcong3,
          props.thanhcong4,
          props.thanhcong5,
          props.thanhcong6,
          props.thanhcong7,
          props.thanhcong8,
          props.thanhcong9,
          props.thanhcong10,
          props.thanhcong11,
          props.thanhcong12,
        ],
        backgroundColor: "rgb(0, 123, 255)",
      },
      {
        label: "Giao dịch thất bại",
        data: [
          props.thatbai1,
          props.thatbai2,
          props.thatbai3,
          props.thatbai4,
          props.thatbai5,
          props.thatbai6,
          props.thatbai7,
          props.thatbai8,
          props.thatbai9,
          props.thatbai10,
          props.thatbai11,
          props.thatbai12,
        ],
        backgroundColor: "rgb(220, 53, 69)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
