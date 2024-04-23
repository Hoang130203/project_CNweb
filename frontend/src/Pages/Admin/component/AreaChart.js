import React from "react";
import Chart from "react-apexcharts";

const state = [
    {
        name: "Điện thoại",
        data: [31, 40, 28, 51, 42, 109, 100, 90],
    },
    {
        name: "Laptop",
        data: [11, 32, 45, 32, 34, 52, 41, 39],
    },
    {
        name: 'Đồng hồ',
        data: [20, 35, 45, 25, 30, 50, 40, 30]
    },
    {
        name: 'Phụ kiện',
        data: [15, 25, 35, 20, 25, 40, 30, 20]
    }
];

const options = {
    chart: {
        type: "area",
        animations: {
            easing: "linear",
            speed: 300,
        },
        sparkline: {
            enabled: false,
        },
        brush: {
            enabled: false,
        },
        id: "basic-bar",
        foreColor: "#fff",
        stacked: true,
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        categories: ['9/2023', '10/2023', '11/2023', '12/2023', '1/2024', '2/2024', '3/2024', '4/2024'],
        labels: {
            style: {
                colors: "#fff",
            },
        },
        axisBorder: {
            color: "#fff",
        },
        axisTicks: {
            color: "#fff",
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "#fff",
            },
        },
    },
    tooltip: {
        enabled: false,
    },
    grid: {
        show: true,
        borderColor: "hsl(var(--nextui-default-200))",
        strokeDashArray: 0,
        position: "back",
    },
    stroke: {
        curve: "smooth",
        fill: {
            colors: ["red"],
        },
    },
    markers: false,
};

export const AreaChart = () => {
    return (
        <>
            <div style={{ color: '#fff' }}>
                <div id="chart">
                    <Chart options={options} series={state} type="area" height={425} />
                </div>
            </div>
        </>
    );
};
