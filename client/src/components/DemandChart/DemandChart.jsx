import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "react-apexcharts";

export function BarChart(props) {
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
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
        backgroundColor: "rgb(255,204,0)",
      },
      {
        label: "Đang giao dịch trong tháng",
        // type: "line",
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
      <label className="font-weight-bold text-uppercase">
        Biểu đồ thống kê số lượng giao dịch hàng năm
      </label>
      <Bar data={data} options={options} />
    </>
  );
}

export function DonutChart(props) {
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
    series: [a, b, c, d, e, f, g, h, j, k],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      labels: [
        "Tiếp cận chào hàng: " + a,
        "Chạy thử: " + b,
        "Đàm phán: " + c,
        "Chốt đơn hàng: " + d,
        "Đã cọc: " + e,
        "Đã thanh toán tạm ứng: " + f,
        "Hoàn tất giao dịch: " + g,
        "Bàn giao chưa thanh toán: " + h,
        "Lên hợp đồng: " + j,
        "Giao dịch thất bại: " + k,
      ],
      colors: [
        "#FF4560",
        "#00E396",
        "#5653FE",
        "#7D02EB",
        "#4E88B4",
        "#00A7C6",
        "#18D8D8",
        "#A9D794",
        "#46AF78",
        "#A93F55",
        "#8C5E58",
        "#2176FF",
        "#33A1FD",
        "#7A918D",
        "#BAFF29",
      ],
    },
  };

  return (
    <>
      <label className="font-weight-bold text-uppercase">
        Biểu đồ thống kê giai đoạn kinh doanh
      </label>
      <div className="text-left">
        <Chart options={options.options} series={options.series} type="donut" />
      </div>
    </>
  );
}

export function HorizontalBarChart(props) {
  const data = {
    labels: [
      "6540",
      "6460",
      "43253",
      "43265",
      "43266",
      "53228",
      "53229",
      "65115",
      "65116",
      "65117",
      "Cẩu 5-7 tấn",
    ],
    datasets: [
      {
        label: "Hoàn tất giao dịch",
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
          props.c57,
        ],
        backgroundColor: [
          "rgb(54, 150, 235)",
          "rgb(255, 99, 132)",
          "rgb(75, 75, 192)",
          "rgb(255, 99, 75)",
          "rgb(111, 162, 235)",
          "rgb(132, 192, 192)",
          "rgb(113, 99, 132)",
          "rgb(54, 152, 200)",
          "rgb(75, 142, 192)",
          "rgb(75, 12, 192)",
          "rgb(75, 102, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
  };
  return (
    <>
      <label className="font-weight-bold text-uppercase">
        Biểu đồ thống kê model xe đã bán
      </label>
      <Bar data={data} options={options} />
    </>
  );
}

export function LineChart(props) {
  const options = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
    },
  };

  const series = {
    series: [
      {
        name: "series-1",
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
      },
    ],
  };

  return (
    <>
      <label className="font-weight-bold text-uppercase">
        Biểu đồ thống kê tình hình kinh doanh hàng năm
      </label>
      <Chart
        options={options.options}
        series={series.series}
        type="line"
        width="500"
      />
    </>
  );
}
