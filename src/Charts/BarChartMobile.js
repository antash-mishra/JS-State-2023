import * as d3 from 'd3'
import RectangleMobile from '../ChartComponents/RectangleMobile';
import Axis from '../ChartComponents/Axis'
import ChartContainer from '../ChartComponents/ChartContainer';
import Card from '../UI/Card';
import Label from '../ChartComponents/Label';

const BarChartMobile = props => {
  const width = 300;
  const height = 245;
  const marginBottom = 10;
  const marginTop = 15;
  const marginRight = 40;
  const marginLeft = 85;
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const awarenessData = []

  props.data.map(d => (
    awarenessData.push({
      id: d.id,
      name: d.name,
      awarness_percentage: d.awareness[d.awareness.length - 1].percentage_question
    })
  ))

  const frameworks = awarenessData.sort((a, b) => a.awarness_percentage -b.awarness_percentage)
    .map(framework => framework.id)

  console.log("Awarness Data: ", awarenessData)

  const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([innerHeight, 0])
    .paddingInner(0.2);
  
  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer 
        width={width}
        height={height}
        margin={{top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft}}>

      <Axis 
        type="bandLeft"
        scale={yScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        ticks={awarenessData.map(d => d.name)}
        label={"Framework"} />
      
      {/* <Axis 
        type="bottom"
        scale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        ticks={frameworks}
        label={"Awarness %"}
      /> */}
        {awarenessData.map(awarness => (
          <g class = "axis" transform={`translate(0, ${yScale(awarness.name)})`}>
          <RectangleMobile 
            key = {`circle-${awarness.awarness_percentage}`}
            x = {0}
            y = {0}
            width =  {xScale(awarness.awarness_percentage)}
            height = {yScale.bandwidth()}
            fill={props.colorScale(awarness.id)}
          />
          <text
            x={ `${xScale(awarness.awarness_percentage)+5}`}
            y={(yScale.bandwidth() / 2)+3}
            fill={props.colorScale(awarness.id)}
            textAnchor={"start"}
            alignmentBaseline="middle"
          >
            {awarness.awarness_percentage.toFixed(0).toString().concat("%")}
          </text>
          </g>
        ))}
      
      </ChartContainer>
    </Card>
  )
};

export default BarChartMobile;