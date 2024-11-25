const Rectangle = props => {
  return (
    <rect 
      x={props.x}
      y={props.y}
      width={20}
      height={props.height}
      fill={props.fill}
    />
  )
};

export default Rectangle;