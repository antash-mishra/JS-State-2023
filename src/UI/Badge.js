import "./Label.css"
import Circle from "../ChartComponents/Circle";
const Badge = props => {
  return (
    <g className="badge">
      <g className="circle" transform={`translate(${props.xScale(props.data.year)}, ${props.yScale(props.data.rank)})`}>
        <Circle 
          key={`badge-${props.data.id}`} 
          cx = {0}
          cy = {0}
          r = {18}
          fill = {"white"}
          stroke = {props.stroke}
          strokeWidth = {"3px"}
        />
      </g>
      <g className="label" transform={`translate(${props.xScale(props.data.year)}, ${props.yScale(props.data.rank)})`}>
        <text
          x={0}
          y={0}
          key={"badge-text"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={12}
          fill={"#374f5e"}
        >
          {Math.round(props.data.percentage_question).toString().concat("%")}
        </text>
      </g>
    </g>
  );
};

export default Badge;