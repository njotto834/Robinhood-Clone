import React, { useEffect, useState} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement, 
    Tooltip,
  } from 'chart.js';
import {Line} from "react-chartjs-2"
import { format } from 'date-fns';
import 'chartjs-adapter-date-fns';
import {enUS} from 'date-fns/locale';
import './LineGraph.css'

function LineGraph() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        TimeScale,
        PointElement,
        LineElement,
        Tooltip,
    );

    const [ graphData, setGraphData ] = useState([]);

    const data = {
        datasets: [{
            data: graphData,
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
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    unit: "day",
                    tooltipFormat: "MMM dd, yyyy"
                },
                display: false, // Hide x-axis labels
                adapters: {
                    date: {
                        locale: enUS
                    }
                }
            },
            y: {
                type: 'linear',
                display: false // Hide y-axis labels
                
            },
            
        }
    }

    const createMockData = () => {
        let data = [];
        let value = 50;
        for (var i = 0; i < 366; i++){
            let date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(i);
            value += Math.floor(Math.random() * 21) - 10;
            data.push({x: date, y: value});
        }
        setGraphData(data);
    }

    useEffect(() => { //runs once on the loading of the component?
        createMockData();
    }, [])

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