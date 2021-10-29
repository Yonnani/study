import './App.css';
import AddNumberRoot from './components/AddNumberRoot';
import DisplayNumberRoot from './components/DisplayNumberRoot';
import {useState} from 'react';

function App() {
  const [number, setNumber] = useState(0);

  return (
    <div className="App">
      <h1>Root</h1>
      <AddNumberRoot onClick={function (size) {
        setNumber(number + size);
      }}></AddNumberRoot>
      <DisplayNumberRoot number={number}></DisplayNumberRoot>
    </div>
  );
}





export default App;
