import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from 'chart.js';
import {Line} from "react-chartjs-2"

function LineGraph() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
    );

    const data = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            data: [10, 50, 100],
            backgroundColor: "black",
            borderColor: "#5AC53B",
            borderWidth: 2,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBackgroundColor: '#5AC53B',
            pointHoverBorderColor: '#00000',
            pointHoverBorderWidth: 4,
            pointHoverRadius: 6,
          }],
    };

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            x: {
                display: false // Hide x-axis labels
            },
            y: {
                display: false // Hide y-axis labels
            }
        }
    }

    return (
    <div className="linegraph">
        <Line 
            data = {data}
            options = {options}
        />
    </div>
    )
}

export default LineGraph