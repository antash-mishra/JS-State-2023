import * as d3 from 'd3'
import Rectangle from '../ChartComponents/Rectangle';
import Axis from '../ChartComponents/Axis'
import ChartContainer from '../ChartComponents/ChartContainer';
import Card from '../UI/Card';

const BarChart = props => {
  const width = 300;
  const height = 245;
  const marginBottom = 85;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - marginBottom;

  const awarenessData = []

  props.data.map(d => (
    awarenessData.push({
      id: d.id,
      name: d.name,
      awarness_percentage: d.awareness[d.awareness.length - 1].percentage_question
    })
  ))

  const frameworks = awarenessData.sort((a, b) => b.awarness_percentage -a.awarness_percentage)
    .map(framework => framework.id)

  console.log("Awarness Data: ", awarenessData)

  const xScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);
  
  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer 
        width={width}
        height={height}
        margin={{top: props.margin.top, right: props.margin.right, bottom: marginBottom, left: props.margin.left}}>

      <Axis 
        type="band"
        scale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        ticks={awarenessData.map(d => d.name)}
        label={"Framework"} />
      
      <Axis 
        type="left"
        scale={yScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        label={"Awarness %"}
      />
        {awarenessData.map(awarness => (
          <Rectangle 
            key = {`circle-${awarness.id}`}
            x = {xScale(awarness.name)}
            y = {yScale(awarness.awarness_percentage)}
            width =  {xScale.bandwidth()}
            height = {innerHeight - yScale(awarness.awarness_percentage)}
            fill={props.colorScale(awarness.id)}

          />
        ))}
      </ChartContainer>
    </Card>
  )
};

export default BarChart;