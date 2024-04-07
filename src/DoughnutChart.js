import React, { useState,useEffect } from "react";
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

  
function DoughnutChart() {
  const [label, setlabel] = useState([]);
const [values, setvalues] = useState([]);

var baseURL = "http://localhost:3040/api/get-monthly-data-here";

useEffect(() => {
  const fetchData = async () => {
    await fetch(`${baseURL}`,{
      method: 'Get',
      headers: {
        "Content-Type" : 'application/json'
      }
    }).then((res) => {
      res.json().then((json)=>{
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        let labels_data = [];
        let values_data = [];

        let labelsDataIterate = json.monthlyData.map((item)=>{
          return labels_data.push(months[item.month])});
        
          let valuesDataIterate = json.monthlyData.map((item)=>{
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


const data = {
    labels: label,
    datasets: [{
      label: 'Monthly Data',
      data: values,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

const config = {
    type: 'doughnut',
    data: data,
  };
  return (
    <>
    <div  style={{width:"500px"}}>
      <h1>DoughnutChart</h1>
      <Doughnut data={data}
    options={config}></Doughnut></div>
    </>
  )
}

export default DoughnutChart