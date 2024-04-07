import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChart = () => {
  const [label, setlabel] = useState([]);
  const [values, setvalues] = useState([]);

 var baseURL = "http://localhost:3040/api/get-yearly-data-here";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseURL}`,{
        method: 'Get',
        headers: {
          "Content-Type" : 'application/json'
        }
      }).then((res) => {
        res.json().then((json)=>{
          let labels_data = [];
          let values_data = [];

          let labelsDataIterate = json.yearlyData.map((item)=>{
            return labels_data.push(item.year)});
          
            let valuesDataIterate = json.yearlyData.map((item)=>{
              return values_data.push(item.count)});

          setlabel(labels_data);
          setvalues(values_data);
        })
      }).catch((error)=>{
        console.log(error);
      })
    }
    fetchData()
  }, [baseURL]);

  

  const dataHere = {
    labels: label ,
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: values,
      }
    ]
  }

  const config = {
    type: 'line',
    data: dataHere,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };
  
  return (<>
    
    <div style={{width:"500px"}}>
        <h1>Tittle Here</h1>
            <Line
            data={dataHere}
            options={config}
          />
        </div>
  </>);
 
};

export default LineChart;
