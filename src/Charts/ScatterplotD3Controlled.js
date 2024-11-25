import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

const ScatterplotD3Controlled = props => {
  
  const width = 300;
  const height = 245;
  const innerWidth = width - (props.margin.left + props.margin.right)
  const innerHeight = height - (props.margin.bottom + props.margin.top)

  const scatterplotRef = useRef();
  
  useEffect(() => {
    const scatterplotContainer = d3.select(scatterplotRef.current);

    // Scale for x-axis
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(props.data, d => d.user_count)])
      .range([0, innerWidth])
      .nice();
    
    // Scale for y-axis
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
      .ticks([3])
      .tickFormat(d3.format("d"));

    scatterplotContainer
      .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);
    
    const leftAxis = d3.axisLeft(yScale)
      .ticks([5]);

    scatterplotContainer
      .append("g")
        .attr("class", "axis")
        .call(leftAxis);

    scatterplotContainer
      .selectAll(".scatterplot-circle")
      .data(props.data)
      .join("circle")
        .attr("class", "scatterplot-circle")
        .attr("cx", data =>  xScale(data.user_count))
        .attr("cy", data => yScale(data.retention_percentage))
        .attr("r", 6)
        .attr("fill", data => props.colorScale(data.id));
  }, [innerWidth, innerHeight, props])

  return (
    <Card>
      <h2>Retention vs Usage</h2>
      <ChartContainer 
        width={width}
        height={height}
        margin={props.margin}>
          <g ref={scatterplotRef}></g>  
      </ChartContainer>
    </Card>
  )
};

export default ScatterplotD3Controlled;