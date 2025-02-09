import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';


export default function MyChart({currentCount, currentDate, title, width, height}) {

  var chartRef = useRef(null)
  useEffect(()=>{
    console.log("currentCount", currentCount)
    console.log("currentDate", currentDate)
    if (chartRef.current) {
      const existingChart = echarts.getInstanceByDom(chartRef.current);
      if (existingChart) {
        existingChart.dispose(); // 銷毀現有實例
      }
    }
    var myChart = echarts.init(chartRef.current);
    var option = {
      title:{
        text:title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      xAxis: {
        type:'category',
        data: currentDate
      },
      yAxis: {
        type:'value',
        name:'Count',
        // axisLabel: {
        //   formatter: '{value}' + 'times'
        // }
      },
      series: [
        {
          data: currentCount,
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
                return value + ' times';
            }
        }
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };

  },[currentCount,currentDate,title])



  return (
    <div>
      <div ref={chartRef} style={{width:width, height:height}}></div>
    </div>
  )
}
