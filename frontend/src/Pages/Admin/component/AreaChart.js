import React from "react";
import Chart from "react-apexcharts";

const transformDashboardData = (dashboard) => {
    const categories = ['1/2024', '2/2024', '3/2024', '4/2024', '5/2024', '6/2024'];

    // Khởi tạo đối tượng để chứa tổng chi phí cho từng loại sản phẩm qua các tháng
    const productTotals = {
        "MOBILE": [0, 0, 0, 0, 0, 0],
        "LAPTOP": [0, 0, 0, 0, 0, 0],
        "WATCH": [0, 0, 0, 0, 0, 0],
        "ACCESSORY": [0, 0, 0, 0, 0, 0]
    };

    // Gán dữ liệu từ dashboard vào productTotals
    for (let i = 1; i <= 6; i++) {
        const key = `listmonths${i}`;
        if (dashboard[key]) {
            dashboard[key].forEach(([type, total]) => {
                if (productTotals[type]) {
                    productTotals[type][i - 1] = parseInt(Math.round(total / 1000000));
                }
            });
        }
    }

    // Chuyển đổi productTotals thành định dạng series cho react-apexcharts
    const series = Object.keys(productTotals).map(product => ({
        name: product,
        data: productTotals[product]
    }));

    return {
        categories,
        series
    };
};

export const AreaChart = ({ dashboard }) => {
    const { categories, series } = transformDashboardData(dashboard ? dashboard : {});

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
            categories,
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
    return (
        <>
            <div style={{ color: '#fff' }}>
                <div id="chart">
                    <Chart options={options} series={series} type="area" height={425} />
                </div>
            </div>
        </>
    );
};
