import React,{useState,useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

import './App.css';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    fetch('http://localhost:8001/api/radiobases')
      .then(response => response.json())
      .then(dat => {

        console.log(dat.length);
        console.log(dat[0]);
        console.log(dat[853005-1]);
        // dat = dat.slice(800000,dat.length);
        // dat = dat.slice(850000,dat.length);
        dat = dat.slice(0,50000);
        console.log(dat.length);
        setData(dat); 
      });
 
  }, []);

  return (
    <div>
      <div className="container">
        <label htmlFor="region">Region </label>
      
        <input
          name ="filtro"
          type ="text"
        />
        {/* {loading && <Roller/>} */}
          <table className="table table-bordered">
            <thead className="tabla-head">
              <tr>
                <th scope="col">RADIOBASES</th>
                {data.map((r) => {
                  let fechasArray = []
                  // console.log(r.FECHA.substr(5) + "--" + r.FECHA.substr(5).chartAt(0));
                  return (<td key={uuidv4()}>{r.FECHA.substr(5)}</td>)  
                  
                })}
              </tr>
            </thead>
            <tbody>
            {data.map(r => {
              //  r.FECHA
              let rb = [];
              rb.push(r);
              // console.log(rb)
              return (
                <tr key ={uuidv4()}>
                  <th scope="row">{r.RADIOBASE }</th>
                  <td className={
                    r.TRAFICO <= 15 ? 'bg-danger' : 
                    r.TRAFICO > 15 && r.TRAFICO <= 40 ?  'naranja' : 
                    r.TRAFICO > 40 && r.TRAFICO <= 90 ? 'bg-warning' : 
                    r.TRAFICO > 90 ? 'bg-success' : 'bg-secondary'}> 
                    
                    {r.TRAFICO }
                  </td> 
                </tr>
              ) 
            })}
            </tbody>
          </table>
  
      </div>
    </div>
  )
}

export default App;
