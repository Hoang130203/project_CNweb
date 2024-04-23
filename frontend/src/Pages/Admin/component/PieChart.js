import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function PieChart({ parts }) {
    const [series, setSeries] = useState(parts.map((part) => part.value));
    const [options] = useState({
        chart: {
            width: 250,
            type: 'donut',
        },
        dataLabels: {
            enabled: false,
            show: false
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
            show: false
        },
        tooltip: {
            enabled: false,
        }
    });


    return (
        <div>
            <ReactApexChart options={options} series={series} type="donut" width={250} />
        </div>
    );
}

export default PieChart;
