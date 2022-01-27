import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
// import { uniq } from "lodash";
import census from "./census";

function App() {
  const chartHeight = 700;
  const chartWidth = 1100;
  const margin = 30;
  const legendPadding = 50;
  
  const _people = [];
  for (const entry of census) {
    _people.push(entry.People / 1000000);
  }

  const male1900 = [];
  const male2000 = [];
  const female1900 = [];
  const female2000 = [];
  
  for(const entry of census) {
    if (entry.Sex == 1) {
      if (entry.Year == 1900) {
        male1900.push(entry.People / 1000000);
      } else {
        male2000.push(entry.People / 1000000);
      }
    } else {
        if (entry.Year == 1900) {
          female1900.push(entry.People / 1000000);
        } else {
          female2000.push(entry.People / 1000000);
        }
    }
  }
  
  const _extent = extent(_people);
  const _extentMale = extent(male1900);
  console.log(male1900);
  const _scaleY = scaleLinear()
    .domain(_extent)
    .range([chartHeight - margin, margin]);

  const _scaleLine = scaleLinear()
  .domain([0, 18])
  .range([margin, chartWidth - margin]);

  const ages = [
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "60",
    "65",
    "70",
    "75",
    "80",
    "85",
    "90",
  ];
  const _scaleAge = scaleBand()
    .domain(ages)
    .range([0, chartWidth - margin - margin]);

  const _lineMaker = line()
    .x((d, i) => {
      return _scaleLine(i);
    })
    .y((d) => {
      return _scaleY(d);
    });

  return (
    <div style={{ margin: 20 }}>
      <h1>US Census Data Visualization</h1>
      <svg
        width={chartWidth + legendPadding}
        height={chartHeight}
        // style={{ border: "3px solid pink" }}
      >
        <AxisLeft left={margin} scale={_scaleY} />
        <AxisBottom
          top={chartHeight - margin}
          left={margin}
          scale={_scaleAge}
          tickValues={ages}
        />
        <text x="-200" y="45" transform="rotate(-90)" fontSize={12}>
          Numbers of people (in million)
        </text>
        <text x="1040" y="660" fontSize={12}>
          Ages
        </text>

        <path
          stroke={`#7ad7f0`}
          strokeWidth={2}
          fill="none"
          d={_lineMaker(male1900)}
        />
        <path
          stroke={`#ffcd91`}
          strokeWidth={2}
          fill="none"
          d={_lineMaker(female1900)}
        />
        <path
          stroke={`#fc6a03`}
          strokeWidth={2}
          fill="none"
          d={_lineMaker(female2000)}
        />
        <path
          stroke={"blue"}
          strokeWidth={2}
          fill="none"
          d={_lineMaker(male2000)}
        />
      </svg>

      <svg width={200}
        height={120} 
        style={{border: "1px solid black"}}>
        
        <line 
          x1={10} 
          y1={20} 
          x2={40} 
          y2={20}
          stroke={`#fc6a03`}
          strokeWidth={6}
        />
        <line 
          x1={10} 
          y1={45} 
          x2={40} 
          y2={45}
          stroke={"blue"}
          strokeWidth={6}
        />
        <line 
          x1={10} 
          y1={70} 
          x2={40} 
          y2={70}
          stroke={`#7ad7f0`}
          strokeWidth={6}
        />
        <line 
          x1={10} 
          y1={95} 
          x2={40} 
          y2={95}
          stroke={`#ffcd91`}
          strokeWidth={6}
        />

          <text x={60} y={25}>
            Female in 2000
          </text>
          <text x={60} y={50}>
            Male in 2000
          </text>
          <text x={60} y={75}>
            Male in 1900
          </text>
          <text x={60} y={100}>
            Female in 1900
          </text>

      </svg>
    </div>
  )
    
}

export default App
