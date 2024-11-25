import { useState, useEffect } from 'react';

import * as d3 from 'd3';
import Charts from './Charts/Charts';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData]  = useState([])

  useEffect(() => {
    const dataUrl = "http://127.0.0.1:8000/static/framework.json"

    d3.json(dataUrl).then(data => {
      console.log("Data: ", data);
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Charts data = {data}/>}
    </div>
  );
};

export default App;